import React, { useState, useEffect, useMemo } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin, Loader2, X, Star } from 'lucide-react';
import { eventsService, Event } from '../services/firebaseService';
import { calendarService, Term } from '../services/firebaseService';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

// A unified type for all items displayed on the calendar
type CalendarDisplayItem = Omit<Event, 'type'> & { type: string };

// --- Main Page Component ---
const AcademicCalendarPage: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [allCalendarItems, setAllCalendarItems] = useState<CalendarDisplayItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<CalendarDisplayItem | null>(null);

  // Real-time Firestore listeners for events and terms
  useEffect(() => {
    setLoading(true);
    const unsubEvents = onSnapshot(collection(db, 'events'), (snapshot) => {
      eventsService.getAllEvents().then(eventsData => {
        // Wait for terms to be fetched as well
        calendarService.getAllTerms().then(termsData => {
          setAllCalendarItems(normalizeData(eventsData, termsData));
          setLoading(false);
        });
      });
    });
    const unsubTerms = onSnapshot(collection(db, 'terms'), (snapshot) => {
      eventsService.getAllEvents().then(eventsData => {
        calendarService.getAllTerms().then(termsData => {
          setAllCalendarItems(normalizeData(eventsData, termsData));
          setLoading(false);
        });
      });
    });
    return () => {
      unsubEvents();
      unsubTerms();
    };
  }, []);

  // Handle body scroll lock for the drawer
  useEffect(() => {
    if (selectedEvent) {
      const scrollbarWidth = window.innerWidth - document.body.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [selectedEvent]);

  const eventsForSelectedDay = useMemo(() => {
    return allCalendarItems.filter(item => isSameDay(new Date(item.date), selectedDay))
      .sort((a, b) => (a.time || '').localeCompare(b.time || ''));
  }, [allCalendarItems, selectedDay]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-screen-xl mx-auto p-4 lg:p-6 flex flex-col lg:flex-row gap-6">
        {/* Left Column */}
        <div className="lg:w-1/3">
          <MiniCalendar 
            currentMonth={currentMonth}
            selectedDay={selectedDay}
            onMonthChange={setCurrentMonth}
            onDateSelect={setSelectedDay}
            events={allCalendarItems}
          />
        </div>

        {/* Right Column */}
        <div className="lg:w-2/3">
          <EventList 
            selectedDay={selectedDay}
            events={eventsForSelectedDay}
            onEventSelect={setSelectedEvent}
          />
        </div>
      </div>

      <EventSideDrawer 
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
};

// --- Helper Functions & Child Components ---

const normalizeData = (events: Event[], terms: Term[]): CalendarDisplayItem[] => {
    const combined: CalendarDisplayItem[] = events.map(e => ({...e, id: `event-${e.id}`}));
    
    terms.forEach(term => {
      term.holidays?.forEach(holiday => {
        combined.push({
          id: `holiday-${term.id}-${holiday.id}`,
          title: holiday.name,
          description: `Holiday: ${holiday.name}`,
          date: holiday.date,
          type: holiday.type,
          priority: 'medium', status: 'completed', time: '', location: ''
        });
      });
      term.events?.forEach(termEvent => {
        combined.push({
          id: `term-event-${term.id}-${termEvent.id}`,
          title: termEvent.name,
          description: termEvent.description,
          date: termEvent.date,
          type: termEvent.type,
          priority: 'medium', status: 'upcoming', time: '', location: ''
        });
      });
    });
    return combined;
};

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="flex items-center space-x-2">
      <Loader2 className="h-8 w-8 animate-spin text-academy-maroon" />
      <span className="text-xl text-gray-600">Loading Calendar...</span>
    </div>
  </div>
);

const MiniCalendar: React.FC<{
  currentMonth: Date;
  selectedDay: Date;
  onMonthChange: (date: Date) => void;
  onDateSelect: (date: Date) => void;
  events: CalendarDisplayItem[];
}> = ({ currentMonth, selectedDay, onMonthChange, onDateSelect, events }) => {
  const monthStart = startOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: startOfWeek(monthStart), end: endOfWeek(endOfMonth(monthStart)) });
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
  
  const eventsByDate = useMemo(() => {
    const set = new Set<string>();
    events.forEach(event => {
      if (event.date) set.add(format(new Date(event.date), 'yyyy-MM-dd'));
    });
    return set;
  }, [events]);

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => onMonthChange(subMonths(currentMonth, 1))} className="p-2 rounded-full hover:bg-gray-100"><ChevronLeft /></button>
        <h2 className="font-bold text-lg text-gray-800">{format(currentMonth, 'MMMM yyyy')}</h2>
        <button onClick={() => onMonthChange(addMonths(currentMonth, 1))} className="p-2 rounded-full hover:bg-gray-100"><ChevronRight /></button>
      </div>
      <div className="grid grid-cols-7 gap-y-2 text-center text-sm text-gray-500">
        {weekDays.map(day => <div key={day}>{day}</div>)}
        {days.map(day => {
          const isSelected = isSameDay(day, selectedDay);
          const isCurrent = isSameMonth(day, currentMonth);
          const hasEvent = eventsByDate.has(format(day, 'yyyy-MM-dd'));

          return (
            <div key={day.toString()} className="relative">
              <button 
                onClick={() => onDateSelect(day)}
                className={`w-8 h-8 rounded-full transition-colors ${!isCurrent && 'text-gray-300'} ${isSelected ? 'bg-academy-maroon text-white' : 'hover:bg-gray-100'}`}
              >
                {format(day, 'd')}
              </button>
              {hasEvent && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full"></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const EventList: React.FC<{
  selectedDay: Date;
  events: CalendarDisplayItem[];
  onEventSelect: (event: CalendarDisplayItem) => void;
}> = ({ selectedDay, events, onEventSelect }) => (
  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200 h-full">
    <h2 className="font-bold text-xl text-gray-800 mb-4">Events for {format(selectedDay, 'MMMM d, yyyy')}</h2>
    <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
      {events.length > 0 ? events.map(event => (
        <button key={event.id} onClick={() => onEventSelect(event)} className="w-full text-left p-4 rounded-lg flex items-center gap-4 hover:bg-gray-50 transition-colors">
          <div className={`w-1.5 h-16 rounded-full ${getEventTypeColor(event.type, 'bg')}`}></div>
          <div>
            <p className="font-semibold text-gray-800">{event.title}</p>
            {event.time && <p className="text-sm text-gray-500">{event.time}</p>}
          </div>
        </button>
      )) : (
        <div className="text-center py-12 text-gray-500">
          <Calendar className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <p>No events scheduled for this day.</p>
        </div>
      )}
    </div>
  </div>
);

const EventSideDrawer: React.FC<{
  event: CalendarDisplayItem | null;
  onClose: () => void;
}> = ({ event, onClose }) => (
  <>
    <div onClick={onClose} className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${event ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}></div>
    <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${event ? 'translate-x-0' : 'translate-x-full'}`}>
      {event && (
        <div className="flex flex-col h-full">
          <div className="p-6 flex justify-between items-center border-b">
            <h2 className="text-2xl font-bold text-gray-800">{event.title}</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200"><X /></button>
          </div>
          <div className="p-6 space-y-4 flex-grow overflow-y-auto">
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getEventTypeColor(event.type, 'tag')}`}>{event.type}</span>
            <p className="text-gray-600">{event.description}</p>
            <div className="flex items-center text-gray-700"><Calendar className="h-5 w-5 mr-3 text-academy-maroon" /><span className="font-semibold">{format(new Date(event.date), 'EEEE, MMMM d, yyyy')}</span></div>
            {event.time && <div className="flex items-center text-gray-700"><Clock className="h-5 w-5 mr-3 text-academy-maroon" /><span className="font-semibold">{event.time}</span></div>}
            {event.location && <div className="flex items-center text-gray-700"><MapPin className="h-5 w-5 mr-3 text-academy-maroon" /><span className="font-semibold">{event.location}</span></div>}
          </div>
          {event.priority && (
            <div className="bg-gray-50 p-6 border-t">
              <div className="flex items-center text-gray-600"><Star className="h-5 w-5 mr-3 text-yellow-500" /><span className="font-semibold">{event.priority.charAt(0).toUpperCase() + event.priority.slice(1)} Priority</span></div>
            </div>
          )}
        </div>
      )}
    </div>
  </>
);

const getEventTypeColor = (type: string, variant: 'bg' | 'tag'): string => {
  const colors: { [key: string]: { bg: string, tag: string } } = {
      'School Event':   { bg: 'bg-blue-500',   tag: 'bg-blue-100 text-blue-800' },
      'Meeting':        { bg: 'bg-purple-500', tag: 'bg-purple-100 text-purple-800' },
      'Examination':    { bg: 'bg-red-500',    tag: 'bg-red-100 text-red-800' },
      'Competition':    { bg: 'bg-pink-500',   tag: 'bg-pink-100 text-pink-800' },
      'Public Holiday': { bg: 'bg-orange-500', tag: 'bg-orange-100 text-orange-800' },
      'School Holiday': { bg: 'bg-yellow-500', tag: 'bg-yellow-100 text-yellow-800' },
      'Performance':    { bg: 'bg-indigo-500', tag: 'bg-indigo-100 text-indigo-800' },
      'Religious':      { bg: 'bg-teal-500',   tag: 'bg-teal-100 text-teal-800' },
      'Special Day':    { bg: 'bg-rose-500',   tag: 'bg-rose-100 text-rose-800' },
      'Ceremony':       { bg: 'bg-green-500',  tag: 'bg-green-100 text-green-800' },
      'Mid-Term Break': { bg: 'bg-cyan-500',   tag: 'bg-cyan-100 text-cyan-800' },
      'End of Term':    { bg: 'bg-gray-700',   tag: 'bg-gray-200 text-gray-800' },
  };
  return (colors[type] || { bg: 'bg-gray-500', tag: 'bg-gray-100 text-gray-800' })[variant];
};

export default AcademicCalendarPage;
