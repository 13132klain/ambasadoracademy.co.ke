import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, UploadCloud, X, AlertCircle, Save } from 'lucide-react';
import { facilitiesService, fileService, Facility } from '../../services/firebaseService';

type FacilityFormData = Omit<Facility, 'id' | 'createdAt' | 'updatedAt'>;

const FacilitiesManagementPage: React.FC = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<FacilityFormData>({
    name: '',
    description: '',
    imageUrl: '',
    category: 'Academic',
    capacity: 0,
    location: '',
    status: 'Available',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    setLoading(true);
    try {
      const data = await facilitiesService.getAllFacilities();
      setFacilities(data);
    } catch (error) {
      console.error("Error fetching facilities:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFacilities = facilities.filter(facility =>
    facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    facility.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    facility.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetFormData = () => {
    setFormData({
      name: '',
      description: '',
      imageUrl: '',
      category: 'Academic',
      capacity: 0,
      location: '',
      status: 'Available',
    });
    setImageFile(null);
    setSelectedFacility(null);
  };

  const handleAddClick = () => {
    setIsEditing(false);
    resetFormData();
    setShowModal(true);
  };

  const handleEditClick = (facility: Facility) => {
    setIsEditing(true);
    setSelectedFacility(facility);
    setFormData({
      name: facility.name,
      description: facility.description,
      imageUrl: facility.imageUrl,
      category: facility.category,
      capacity: facility.capacity,
      location: facility.location,
      status: facility.status,
    });
    setImageFile(null);
    setShowModal(true);
  };

  const handleDeleteClick = (facility: Facility) => {
    setSelectedFacility(facility);
    setShowDeleteModal(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      let imageUrl = formData.imageUrl;
      if (imageFile) {
        imageUrl = await fileService.uploadFile(imageFile, 'facilities-images');
      }

      if (!imageUrl) {
        alert("Please upload an image for the facility.");
        setUploading(false);
        return;
      }

      const facilityData = { ...formData, imageUrl };

      if (isEditing && selectedFacility) {
        await facilitiesService.updateFacility(selectedFacility.id!, facilityData);
      } else {
        await facilitiesService.addFacility(facilityData);
      }

      await fetchFacilities();
      setShowModal(false);
      resetFormData();
    } catch (error) {
      console.error("Error saving facility:", error);
    } finally {
      setUploading(false);
    }
  };

  const confirmDelete = async () => {
    if (selectedFacility) {
      try {
        await facilitiesService.deleteFacility(selectedFacility.id!);
        await fetchFacilities();
        setShowDeleteModal(false);
        setSelectedFacility(null);
      } catch (error) {
        console.error("Error deleting facility:", error);
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
          <h1 className="text-2xl font-bold text-gray-900">Facilities Management</h1>
          <p className="text-gray-600">Add, edit, and manage school facilities.</p>
        </div>
        <button onClick={handleAddClick} className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-academy-maroon text-white rounded-lg hover:bg-academy-maroon/90 transition-colors">
          <Plus className="h-4 w-4 mr-2" /> Add Facility
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search facilities..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Facility</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFacilities.map((facility) => (
                <tr key={facility.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-16 w-16">
                        <img className="h-16 w-16 rounded-md object-cover" src={facility.imageUrl} alt={facility.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{facility.name}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{facility.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">{facility.category}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${facility.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{facility.status}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{facility.capacity || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{facility.location || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button onClick={() => handleEditClick(facility)} className="text-academy-maroon hover:text-academy-maroon/80"><Edit className="h-4 w-4" /></button>
                      <button onClick={() => handleDeleteClick(facility)} className="text-red-600 hover:text-red-800"><Trash2 className="h-4 w-4" /></button>
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
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">{isEditing ? 'Edit Facility' : 'Add New Facility'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name *</label>
                <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description *</label>
                <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg" rows={3}></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image *</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-academy-maroon hover:text-academy-maroon/80 focus-within:outline-none">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*"/>
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    {imageFile ? <p className="text-xs text-gray-500">{imageFile.name}</p> : <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>}
                    {formData.imageUrl && !imageFile && <img src={formData.imageUrl} alt="Current" className="mt-2 mx-auto h-24 rounded"/>}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category *</label>
                  <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as Facility['category']})} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Academic</option>
                    <option>Sports</option>
                    <option>Recreational</option>
                    <option>Boarding</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status *</label>
                  <select required value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as Facility['status']})} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Available</option>
                    <option>Under Maintenance</option>
                    <option>In Use</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Capacity</label>
                  <input type="number" value={formData.capacity} onChange={e => setFormData({...formData, capacity: Number(e.target.value)})} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"/>
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
                <button type="submit" disabled={uploading} className="px-4 py-2 bg-academy-maroon text-white rounded-lg hover:bg-academy-maroon/90 disabled:opacity-50">
                  <Save className="h-4 w-4 inline mr-2" />
                  {uploading ? 'Saving...' : (isEditing ? 'Update Facility' : 'Add Facility')}
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
              <h2 className="text-lg font-semibold text-gray-900">Delete Facility</h2>
            </div>
            <p className="text-gray-600 mb-6">Are you sure you want to delete <strong>{selectedFacility?.name}</strong>? This action is permanent.</p>
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

export default FacilitiesManagementPage; 