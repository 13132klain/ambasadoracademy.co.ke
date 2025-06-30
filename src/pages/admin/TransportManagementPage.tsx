import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, X, AlertCircle, Save, MapPin } from 'lucide-react';
import { transportService, TransportRoute } from '../../services/firebaseService';

type TransportFormData = Omit<TransportRoute, 'id' | 'createdAt' | 'updatedAt'>;

const TransportManagementPage: React.FC = () => {
  const [routes, setRoutes] = useState<TransportRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<TransportRoute | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<TransportFormData>({
    routeName: '',
    driverName: '',
    driverContact: '',
    busNumber: '',
    capacity: 0,
    stops: [{ name: '', time: '' }],
    status: 'Active',
  });

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    setLoading(true);
    try {
      const data = await transportService.getAllTransportRoutes();
      setRoutes(data);
    } catch (error) {
      console.error("Error fetching transport routes:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const filteredRoutes = routes.filter(route =>
    route.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.busNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetFormData = () => {
    setFormData({
      routeName: '',
      driverName: '',
      driverContact: '',
      busNumber: '',
      capacity: 0,
      stops: [{ name: '', time: '' }],
      status: 'Active',
    });
    setSelectedRoute(null);
  };

  const handleAddClick = () => {
    setIsEditing(false);
    resetFormData();
    setShowModal(true);
  };

  const handleEditClick = (route: TransportRoute) => {
    setIsEditing(true);
    setSelectedRoute(route);
    setFormData({ ...route });
    setShowModal(true);
  };

  const handleDeleteClick = (route: TransportRoute) => {
    setSelectedRoute(route);
    setShowDeleteModal(true);
  };

  const handleStopChange = (index: number, field: 'name' | 'time', value: string) => {
    const newStops = [...formData.stops];
    newStops[index][field] = value;
    setFormData({ ...formData, stops: newStops });
  };

  const addStop = () => {
    setFormData({ ...formData, stops: [...formData.stops, { name: '', time: '' }] });
  };

  const removeStop = (index: number) => {
    const newStops = formData.stops.filter((_, i) => i !== index);
    setFormData({ ...formData, stops: newStops });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && selectedRoute) {
        await transportService.updateTransportRoute(selectedRoute.id!, formData);
      } else {
        await transportService.addTransportRoute(formData);
      }
      await fetchRoutes();
      setShowModal(false);
      resetFormData();
    } catch (error) {
      console.error("Error saving transport route:", error);
    }
  };

  const confirmDelete = async () => {
    if (selectedRoute) {
      try {
        await transportService.deleteTransportRoute(selectedRoute.id!);
        await fetchRoutes();
        setShowDeleteModal(false);
        setSelectedRoute(null);
      } catch (error) {
        console.error("Error deleting transport route:", error);
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-academy-maroon"></div></div>;
  }

  return (
    <div className="p-6 space-y-6">
       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transport Management</h1>
          <p className="text-gray-600">Manage school bus routes, drivers, and schedules.</p>
        </div>
        <button onClick={handleAddClick} className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-academy-maroon text-white rounded-lg hover:bg-academy-maroon/90 transition-colors">
          <Plus className="h-4 w-4 mr-2" /> Add Route
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by route, driver, or bus number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bus Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stops</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRoutes.map((route) => (
                <tr key={route.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{route.routeName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{route.driverName}</div>
                    <div className="text-sm text-gray-500">{route.driverContact}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Bus: {route.busNumber}</div>
                    <div className="text-sm text-gray-500">Capacity: {route.capacity}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{route.stops.length} stops</td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${route.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{route.status}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button onClick={() => handleEditClick(route)} className="text-academy-maroon hover:text-academy-maroon/80"><Edit className="h-4 w-4" /></button>
                      <button onClick={() => handleDeleteClick(route)} className="text-red-600 hover:text-red-800"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">{isEditing ? 'Edit Transport Route' : 'Add New Route'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input-group>
                  <label className="block text-sm font-medium text-gray-700">Route Name *</label>
                  <input type="text" required value={formData.routeName} onChange={e => setFormData({...formData, routeName: e.target.value})} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"/>
                </input-group>
                <input-group>
                  <label className="block text-sm font-medium text-gray-700">Bus Number *</label>
                  <input type="text" required value={formData.busNumber} onChange={e => setFormData({...formData, busNumber: e.target.value})} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"/>
                </input-group>
                <input-group>
                  <label className="block text-sm font-medium text-gray-700">Driver Name *</label>
                  <input type="text" required value={formData.driverName} onChange={e => setFormData({...formData, driverName: e.target.value})} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"/>
                </input-group>
                <input-group>
                  <label className="block text-sm font-medium text-gray-700">Driver Contact *</label>
                  <input type="tel" required value={formData.driverContact} onChange={e => setFormData({...formData, driverContact: e.target.value})} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"/>
                </input-group>
                <input-group>
                  <label className="block text-sm font-medium text-gray-700">Capacity *</label>
                  <input type="number" required value={formData.capacity} onChange={e => setFormData({...formData, capacity: Number(e.target.value)})} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"/>
                </input-group>
                <input-group>
                  <label className="block text-sm font-medium text-gray-700">Status *</label>
                  <select required value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as TransportRoute['status']})} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Under Maintenance</option>
                  </select>
                </input-group>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Route Stops</h3>
                <div className="space-y-4">
                  {formData.stops.map((stop, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="flex-grow grid grid-cols-2 gap-3">
                        <input type="text" placeholder="Stop Name" required value={stop.name} onChange={e => handleStopChange(index, 'name', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg"/>
                        <input type="time" placeholder="Pickup Time" required value={stop.time} onChange={e => handleStopChange(index, 'time', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg"/>
                      </div>
                      <button type="button" onClick={() => removeStop(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-full"><Trash2 className="h-4 w-4"/></button>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={addStop} className="mt-4 text-sm font-medium text-academy-maroon hover:text-academy-maroon/80">
                  + Add Stop
                </button>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-academy-maroon text-white rounded-lg hover:bg-academy-maroon/90">
                  <Save className="h-4 w-4 inline mr-2" />
                  {isEditing ? 'Update Route' : 'Add Route'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center mb-4">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3" />
              <h2 className="text-lg font-semibold text-gray-900">Delete Route</h2>
            </div>
            <p className="text-gray-600 mb-6">Are you sure you want to delete the <strong>{selectedRoute?.routeName}</strong> route? This is permanent.</p>
            <div className="flex justify-end space-x-3">
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransportManagementPage; 