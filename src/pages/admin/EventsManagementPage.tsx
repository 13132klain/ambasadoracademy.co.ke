import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  X,
  AlertCircle,
  Save,
  Filter,
  Loader2
} from 'lucide-react';
import { eventsService, Event } from '../../services/firebaseService';

type EventFormData = Omit<Event, 'id' | 'createdAt' | 'updatedAt'>;

const EventsManagementPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    type: 'School Event',
    priority: 'medium',
    attendees: '',
    status: 'upcoming'
  });

  const eventTypes = [
    'School Event', 'Meeting', 'Event', 'Ceremony', 'Examination', 
    'Public Holiday', 'School Holiday', 'Competition', 'Performance', 
    'Religious', 'Special Day'
  ];
  const priorities: Event['priority'][] = ['high', 'medium', 'low'];
  const statuses: Event['status'][] = ['upcoming', 'ongoing', 'completed', 'cancelled'];

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const eventsData = await eventsService.getAllEvents();
      setEvents(eventsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || event.type === filterType;
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const resetFormData = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      type: 'School Event',
      priority: 'medium',
      attendees: '',
      status: 'upcoming'
    });
    setSelectedEvent(null);
  };

  const handleAddClick = () => {
    setIsEditing(false);
    resetFormData();
    setShowModal(true);
  };

  const handleEditClick = (event: Event) => {
    setIsEditing(true);
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      type: event.type,
      priority: event.priority,
      attendees: event.attendees,
      status: event.status
    });
    setShowModal(true);
  };

  const handleDeleteClick = (event: Event) => {
    setSelectedEvent(event);
    setShowDeleteModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && selectedEvent) {
        await eventsService.updateEvent(selectedEvent.id!, formData);
      } else {
        await eventsService.addEvent(formData);
      }
      await loadEvents();
      setShowModal(false);
      resetFormData();
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const confirmDelete = async () => {
    if (selectedEvent) {
      try {
        await eventsService.deleteEvent(selectedEvent.id!);
        await loadEvents();
        setShowDeleteModal(false);
        setSelectedEvent(null);
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };
  
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-CA');

  const getStatusColor = (status: string) => {
    if (status === 'upcoming') return 'bg-blue-100 text-blue-800';
    if (status === 'ongoing') return 'bg-yellow-100 text-yellow-800';
    if (status === 'completed') return 'bg-green-100 text-green-800';
    if (status === 'cancelled') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-academy-maroon" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events Management</h1>
          <p className="text-gray-600">Add, edit, and manage all school events.</p>
        </div>
        <button onClick={handleAddClick} className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-academy-maroon text-white rounded-lg hover:bg-academy-maroon/90 transition-colors">
          <Plus className="h-4 w-4 mr-2" /> Add Event
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by event title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent">
              <option value="all">All Types</option>
              {eventTypes.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent">
              <option value="all">All Statuses</option>
              {statuses.map(status => <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEvents.map((event) => (
                <tr key={event.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{event.title}</div>
                    <div className="text-sm text-gray-500 truncate max-w-sm">{event.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(event.date)} at {event.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm text-gray-900">{event.type}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(event.status)}`}>{event.status}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button onClick={() => handleEditClick(event)} className="text-academy-maroon hover:text-academy-maroon/80"><Edit className="h-4 w-4" /></button>
                      <button onClick={() => handleDeleteClick(event)} className="text-red-600 hover:text-red-800"><Trash2 className="h-4 w-4" /></button>
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
              <h2 className="text-xl font-semibold text-gray-900">{isEditing ? 'Edit Event' : 'Add New Event'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title *</label>
                <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg" rows={3}></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date *</label>
                  <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Time</label>
                  <input type="time" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"/>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"/>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as Event['type']})} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg">
                    {eventTypes.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
                 <div>
                  <label className="block text-sm font-medium text-gray-700">Priority</label>
                  <select value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value as Event['priority']})} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg">
                    {priorities.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
                  </select>
                </div>
              </div>
               <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as Event['status']})} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg">
                  {statuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-academy-maroon text-white rounded-lg hover:bg-academy-maroon/90">
                  <Save className="h-4 w-4 inline mr-2" />
                  {isEditing ? 'Update Event' : 'Add Event'}
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
              <h2 className="text-lg font-semibold text-gray-900">Delete Event</h2>
            </div>
            <p className="text-gray-600 mb-6">Are you sure you want to delete the event <strong>"{selectedEvent?.title}"</strong>? This is permanent.</p>
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

export default EventsManagementPage; 