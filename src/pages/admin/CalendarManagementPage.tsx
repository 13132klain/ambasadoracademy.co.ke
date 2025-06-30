import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  Download,
  Upload,
  Clock,
  MapPin,
  Users,
  BookOpen,
  GraduationCap,
  Loader2,
  Filter,
  ChevronDown,
  ChevronUp,
  Printer
} from 'lucide-react';
import { calendarService, Term, Holiday, CalendarEvent } from '../../services/firebaseService';
import { exportToPDF, exportToCSV, importFromCSV } from '../../services/reportUtils';

const CalendarManagementPage: React.FC = () => {
  const [academicYear, setAcademicYear] = useState('2024-2025');
  const [selectedTerm, setSelectedTerm] = useState<string>('term1');
  const [terms, setTerms] = useState<Term[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddHolidayModal, setShowAddHolidayModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [editingHoliday, setEditingHoliday] = useState<Holiday | null>(null);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [newHoliday, setNewHoliday] = useState<Partial<Holiday>>({
    name: '',
    date: '',
    type: 'Public Holiday'
  });
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    name: '',
    date: '',
    type: 'School Event',
    description: ''
  });

  const [uniqueTerms, setUniqueTerms] = useState<Term[]>([]);

  const holidayTypes = ['Public Holiday', 'School Holiday', 'Mid-Term Break', 'End of Term'];
  const eventTypes = ['School Event', 'Meeting', 'Event', 'Ceremony', 'Examination', 'Competition', 'Performance', 'Religious', 'Special Day'];

  // Load terms on component mount
  useEffect(() => {
    loadTerms();
  }, []);

  const loadTerms = async () => {
    try {
      setLoading(true);
      const termsData = await calendarService.getAllTerms();
      setTerms(termsData);

      // Create a unique list of terms for display
      const unique = termsData.reduce((acc, current) => {
        if (!acc.find(item => item.name === current.name)) {
          acc.push(current);
        }
        return acc;
      }, [] as Term[]);
      setUniqueTerms(unique);
      
      // If no terms exist, create default terms
      if (termsData.length === 0) {
        await createDefaultTerms();
      }
    } catch (error) {
      console.error('Error loading terms:', error);
      alert('Failed to load calendar data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const createDefaultTerms = async () => {
    try {
      // Safeguard: re-check if terms exist right before creating them
      const existingTerms = await calendarService.getAllTerms();
      if (existingTerms.length > 0) {
        console.log("Default terms already exist. Skipping creation.");
        // If they exist, we just set them in the state and return
        setTerms(existingTerms);
        return;
      }

      const defaultTerms = [
        {
          name: 'First Term',
          startDate: '2024-09-02',
          endDate: '2024-12-13',
          weeks: 14,
          holidays: [
            { id: '1', name: 'Mashujaa Day', date: '2024-10-10', type: 'Public Holiday' as const },
            { id: '2', name: 'Mid-Term Break', date: '2024-11-01', type: 'Mid-Term Break' as const },
            { id: '3', name: 'End of Term Exams', date: '2024-12-02', type: 'End of Term' as const }
          ],
          events: [
            { id: '1', name: 'Opening Day', date: '2024-09-09', type: 'School Event' as const, description: 'First day of the new academic year' },
            { id: '2', name: 'Parent-Teacher Meeting', date: '2024-09-16', type: 'Meeting' as const, description: 'Quarterly parent-teacher conference' },
            { id: '3', name: 'Sports Day', date: '2024-10-15', type: 'Event' as const, description: 'Annual sports competition' },
            { id: '4', name: 'Academic Awards Ceremony', date: '2024-11-20', type: 'Ceremony' as const, description: 'Recognition of academic excellence' },
            { id: '5', name: 'Christmas Concert', date: '2024-12-10', type: 'Performance' as const, description: 'Annual Christmas celebration' }
          ]
        },
        {
          name: 'Second Term',
          startDate: '2025-01-06',
          endDate: '2025-04-04',
          weeks: 13,
          holidays: [
            { id: '4', name: 'Valentine\'s Day', date: '2025-02-14', type: 'School Holiday' as const },
            { id: '5', name: 'Mid-Term Break', date: '2025-03-03', type: 'Mid-Term Break' as const },
            { id: '6', name: 'End of Term Exams', date: '2025-03-31', type: 'End of Term' as const }
          ],
          events: [
            { id: '6', name: 'Opening Day', date: '2025-01-06', type: 'School Event' as const, description: 'Second term begins' },
            { id: '7', name: 'Science Fair', date: '2025-01-20', type: 'Event' as const, description: 'Annual science exhibition' },
            { id: '8', name: 'Parent-Teacher Meeting', date: '2025-02-10', type: 'Meeting' as const, description: 'Second quarter meeting' },
            { id: '9', name: 'Cultural Day', date: '2025-03-15', type: 'Event' as const, description: 'Cultural celebration' },
            { id: '10', name: 'Easter Celebration', date: '2025-04-02', type: 'Religious' as const, description: 'Easter service and activities' }
          ]
        },
        {
          name: 'Third Term',
          startDate: '2025-04-28',
          endDate: '2025-07-25',
          weeks: 12,
          holidays: [
            { id: '7', name: 'Labour Day', date: '2025-05-01', type: 'Public Holiday' as const },
            { id: '8', name: 'Mid-Term Break', date: '2025-06-02', type: 'Mid-Term Break' as const },
            { id: '9', name: 'End of Term Exams', date: '2025-07-21', type: 'End of Term' as const }
          ],
          events: [
            { id: '11', name: 'Opening Day', date: '2025-04-28', type: 'School Event' as const, description: 'Third term begins' },
            { id: '12', name: 'Mathematics Competition', date: '2025-05-12', type: 'Competition' as const, description: 'Inter-school math competition' },
            { id: '13', name: 'Parent-Teacher Meeting', date: '2025-05-26', type: 'Meeting' as const, description: 'Third quarter meeting' },
            { id: '14', name: 'Graduation Ceremony', date: '2025-06-20', type: 'Ceremony' as const, description: 'Graduation for final year students' },
            { id: '15', name: 'Annual Sports Day', date: '2025-07-15', type: 'Event' as const, description: 'Final sports competition of the year' }
          ]
        }
      ];

      for (const term of defaultTerms) {
        await calendarService.addTerm(term);
      }
      
      await loadTerms(); // Reload terms after creating defaults
    } catch (error) {
      console.error('Error creating default terms:', error);
      alert('Failed to create default calendar data.');
    }
  };

  const selectedTermData = terms.find(term => term.id === selectedTerm);

  const getHolidayTypeColor = (type: string) => {
    switch (type) {
      case 'Public Holiday': return 'bg-red-100 text-red-800';
      case 'School Holiday': return 'bg-orange-100 text-orange-800';
      case 'Mid-Term Break': return 'bg-yellow-100 text-yellow-800';
      case 'End of Term': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'School Event': return 'bg-blue-100 text-blue-800';
      case 'Meeting': return 'bg-purple-100 text-purple-800';
      case 'Event': return 'bg-green-100 text-green-800';
      case 'Ceremony': return 'bg-yellow-100 text-yellow-800';
      case 'Examination': return 'bg-red-100 text-red-800';
      case 'Competition': return 'bg-pink-100 text-pink-800';
      case 'Performance': return 'bg-indigo-100 text-indigo-800';
      case 'Religious': return 'bg-teal-100 text-teal-800';
      case 'Special Day': return 'bg-rose-100 text-rose-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleAddHoliday = async () => {
    if (newHoliday.name && newHoliday.date && selectedTermData) {
      try {
        const holiday: Holiday = {
          id: Date.now().toString(),
          name: newHoliday.name!,
          date: newHoliday.date!,
          type: newHoliday.type as Holiday['type']
        };
        
        const updatedHolidays = [...selectedTermData.holidays, holiday];
        await calendarService.updateTerm(selectedTermData.id!, {
          holidays: updatedHolidays
        });
        
        setNewHoliday({ name: '', date: '', type: 'Public Holiday' });
        setShowAddHolidayModal(false);
        await loadTerms(); // Reload terms
        alert('Holiday added successfully!');
      } catch (error) {
        console.error('Error adding holiday:', error);
        alert('Failed to add holiday. Please try again.');
      }
    }
  };

  const handleAddEvent = async () => {
    if (newEvent.name && newEvent.date && selectedTermData) {
      try {
        const event: CalendarEvent = {
          id: Date.now().toString(),
          name: newEvent.name!,
          date: newEvent.date!,
          type: newEvent.type as CalendarEvent['type'],
          description: newEvent.description || ''
        };
        
        const updatedEvents = [...selectedTermData.events, event];
        await calendarService.updateTerm(selectedTermData.id!, {
          events: updatedEvents
        });
        
        setNewEvent({ name: '', date: '', type: 'School Event', description: '' });
        setShowAddEventModal(false);
        await loadTerms(); // Reload terms
        alert('Event added successfully!');
      } catch (error) {
        console.error('Error adding event:', error);
        alert('Failed to add event. Please try again.');
      }
    }
  };

  const handleEditHoliday = async () => {
    if (editingHoliday && selectedTermData) {
      try {
        const updatedHolidays = selectedTermData.holidays.map(h => 
          h.id === editingHoliday.id ? editingHoliday : h
        );
        
        await calendarService.updateTerm(selectedTermData.id!, {
          holidays: updatedHolidays
        });
        
        setEditingHoliday(null);
        await loadTerms(); // Reload terms
        alert('Holiday updated successfully!');
      } catch (error) {
        console.error('Error updating holiday:', error);
        alert('Failed to update holiday. Please try again.');
      }
    }
  };

  const handleEditEvent = async () => {
    if (editingEvent && selectedTermData) {
      try {
        const updatedEvents = selectedTermData.events.map(e => 
          e.id === editingEvent.id ? editingEvent : e
        );
        
        await calendarService.updateTerm(selectedTermData.id!, {
          events: updatedEvents
        });
        
        setEditingEvent(null);
        await loadTerms(); // Reload terms
        alert('Event updated successfully!');
      } catch (error) {
        console.error('Error updating event:', error);
        alert('Failed to update event. Please try again.');
      }
    }
  };

  const handleDeleteHoliday = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this holiday?') && selectedTermData) {
      try {
        const updatedHolidays = selectedTermData.holidays.filter(h => h.id !== id);
        await calendarService.updateTerm(selectedTermData.id!, {
          holidays: updatedHolidays
        });
        
        await loadTerms(); // Reload terms
        alert('Holiday deleted successfully!');
      } catch (error) {
        console.error('Error deleting holiday:', error);
        alert('Failed to delete holiday. Please try again.');
      }
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?') && selectedTermData) {
      try {
        const updatedEvents = selectedTermData.events.filter(e => e.id !== id);
        await calendarService.updateTerm(selectedTermData.id!, {
          events: updatedEvents
        });
        
        await loadTerms(); // Reload terms
        alert('Event deleted successfully!');
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Failed to delete event. Please try again.');
      }
    }
  };

  const handlePrintCalendar = () => {
    if (!selectedTermData) return;

    const headers = ['Event', 'Type', 'Date', 'Duration', 'Location', 'Description'];
    const data = selectedTermData.events.map(event => [
      event.name,
      event.type,
      new Date(event.date).toLocaleDateString(),
      event.duration || 'N/A',
      event.location || 'N/A',
      event.description || 'N/A'
    ]);

    exportToPDF(`Calendar Events - ${selectedTermData.name}`, headers, data, 'landscape');
  };

  const handleExportCalendar = () => {
    if (!selectedTermData) return;

    const data = selectedTermData.events.map(event => ({
      name: event.name,
      type: event.type,
      date: event.date,
      duration: event.duration || '',
      location: event.location || '',
      description: event.description,
      isAllDay: event.isAllDay || false,
      organizer: event.organizer || '',
      attendees: event.attendees?.join(', ') || ''
    }));

    exportToCSV(`calendar_events_${selectedTermData.name.toLowerCase()}`, data);
  };

  const handleImportCalendar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedTermData || !e.target.files || !e.target.files[0]) return;

    try {
      const importedData = await importFromCSV(e.target.files[0]);
      
      // Process and validate the imported data
      const validEvents = importedData.filter(data => 
        data.title && data.date && data.type
      ).map(data => ({
        ...data,
        isAllDay: data.isAllDay === 'true',
        attendees: data.attendees ? data.attendees.split(',').map((a: string) => a.trim()) : []
      }));

      // Update the term with new events
      await calendarService.updateTerm(selectedTermData.id!, {
        events: [...selectedTermData.events, ...validEvents]
      });

      await loadTerms(); // Reload terms
      alert('Successfully imported calendar events');
    } catch (error) {
      console.error('Error importing calendar events:', error);
      alert('Error importing calendar events. Please check the file format.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-academy-maroon" />
          <span className="text-gray-600">Loading calendar data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar Management</h1>
          <p className="text-gray-600">Manage academic calendar, terms, holidays, and events</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrintCalendar}
            disabled={!selectedTermData}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Printer className="h-4 w-4" />
            <span>Print</span>
          </button>
          <button
            onClick={handleExportCalendar}
            disabled={!selectedTermData}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <label className={`flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors ${!selectedTermData ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
            <Upload className="h-4 w-4" />
            <span>Import</span>
            <input
              type="file"
              accept=".csv"
              onChange={handleImportCalendar}
              disabled={!selectedTermData}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Academic Year */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center space-x-4">
          <BookOpen className="h-6 w-6 text-academy-maroon" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
            <input
              type="text"
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              className="text-xl font-bold text-gray-900 bg-transparent border-none focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Term Selection */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Term</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uniqueTerms.map((term) => (
            <div
              key={term.id}
              onClick={() => setSelectedTerm(term.id!)}
              className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                selectedTerm === term.id
                  ? 'border-academy-maroon bg-academy-maroon/5'
                  : 'border-gray-200 hover:border-academy-maroon/50'
              }`}
            >
              <h3 className="font-semibold text-gray-900 mb-1">{term.name}</h3>
              <p className="text-sm text-gray-600">{term.startDate} - {term.endDate}</p>
              <p className="text-sm text-gray-500">{term.weeks} weeks</p>
            </div>
          ))}
        </div>
      </div>

      {/* Term Details */}
      {selectedTermData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Holidays */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Holidays & Breaks</h3>
              <button
                onClick={() => setShowAddHolidayModal(true)}
                className="flex items-center space-x-1 text-academy-maroon hover:text-academy-maroon/80"
              >
                <Plus className="h-4 w-4" />
                <span className="text-sm">Add Holiday</span>
              </button>
            </div>
            
            <div className="space-y-3">
              {selectedTermData.holidays.map((holiday) => (
                <div key={holiday.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">{holiday.name}</div>
                      <div className="text-sm text-gray-600">{formatDate(holiday.date)}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getHolidayTypeColor(holiday.type)}`}>
                      {holiday.type}
                    </span>
                    <button
                      onClick={() => setEditingHoliday(holiday)}
                      className="text-academy-maroon hover:text-academy-maroon/80"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteHoliday(holiday.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Events */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">School Events</h3>
              <button
                onClick={() => setShowAddEventModal(true)}
                className="flex items-center space-x-1 text-academy-maroon hover:text-academy-maroon/80"
              >
                <Plus className="h-4 w-4" />
                <span className="text-sm">Add Event</span>
              </button>
            </div>
            
            <div className="space-y-3">
              {selectedTermData.events.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">{event.name}</div>
                      <div className="text-sm text-gray-600">{formatDate(event.date)}</div>
                      {event.description && (
                        <div className="text-xs text-gray-500">{event.description}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                      {event.type}
                    </span>
                    <button
                      onClick={() => setEditingEvent(event)}
                      className="text-academy-maroon hover:text-academy-maroon/80"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Holiday Modal */}
      {showAddHolidayModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Add Holiday</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Holiday Name</label>
                <input
                  type="text"
                  value={newHoliday.name}
                  onChange={(e) => setNewHoliday({...newHoliday, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                  placeholder="Enter holiday name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={newHoliday.date}
                  onChange={(e) => setNewHoliday({...newHoliday, date: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={newHoliday.type}
                  onChange={(e) => setNewHoliday({...newHoliday, type: e.target.value as Holiday['type']})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                >
                  {holidayTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowAddHolidayModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddHoliday}
                className="px-4 py-2 bg-academy-maroon text-white rounded-lg hover:bg-academy-maroon/90 transition-colors"
              >
                Add Holiday
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {showAddEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Add Event</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
                <input
                  type="text"
                  value={newEvent.name}
                  onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                  placeholder="Enter event name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({...newEvent, type: e.target.value as CalendarEvent['type']})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                >
                  {eventTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                  placeholder="Enter event description"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowAddEventModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEvent}
                className="px-4 py-2 bg-academy-maroon text-white rounded-lg hover:bg-academy-maroon/90 transition-colors"
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Holiday Modal */}
      {editingHoliday && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Edit Holiday</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Holiday Name</label>
                <input
                  type="text"
                  value={editingHoliday.name}
                  onChange={(e) => setEditingHoliday({...editingHoliday, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={editingHoliday.date}
                  onChange={(e) => setEditingHoliday({...editingHoliday, date: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={editingHoliday.type}
                  onChange={(e) => setEditingHoliday({...editingHoliday, type: e.target.value as Holiday['type']})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                >
                  {holidayTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-4 mt-6">
              <button
                onClick={() => setEditingHoliday(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEditHoliday}
                className="px-4 py-2 bg-academy-maroon text-white rounded-lg hover:bg-academy-maroon/90 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Event Modal */}
      {editingEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Edit Event</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
                <input
                  type="text"
                  value={editingEvent.name}
                  onChange={(e) => setEditingEvent({...editingEvent, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={editingEvent.date}
                  onChange={(e) => setEditingEvent({...editingEvent, date: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={editingEvent.type}
                  onChange={(e) => setEditingEvent({...editingEvent, type: e.target.value as CalendarEvent['type']})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                >
                  {eventTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={editingEvent.description}
                  onChange={(e) => setEditingEvent({...editingEvent, description: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-4 mt-6">
              <button
                onClick={() => setEditingEvent(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEditEvent}
                className="px-4 py-2 bg-academy-maroon text-white rounded-lg hover:bg-academy-maroon/90 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarManagementPage; 