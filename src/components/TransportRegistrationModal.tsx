import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { settingsService, transportService, TransportRoute, TransportRegistration } from '../services/firebaseService';

interface TransportRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type FormState = Omit<TransportRegistration, 'id' | 'status' | 'adminNotes' | 'approvedBy' | 'approvedAt' | 'createdAt' | 'updatedAt'> & { specialNeeds?: string };

const initialForm: FormState = {
  studentName: '',
  parentName: '',
  parentEmail: '',
  parentPhone: '',
  studentLevel: '' as any,
  routeId: '',
  routeName: '',
  pickupLocation: '',
  dropoffLocation: '',
  pickupTime: '',
  dropoffTime: '',
  specialNeeds: '',
  emergencyContact: {
    name: '',
    phone: '',
    relationship: ''
  }
};

const levels = [
  { value: 'kindergarten', label: 'Kindergarten' },
  { value: 'primary', label: 'Primary' },
  { value: 'junior-secondary', label: 'Junior Secondary' }
];

const TransportRegistrationModal: React.FC<TransportRegistrationModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [routes, setRoutes] = useState<TransportRoute[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isOpen) {
      setForm(initialForm);
      setError('');
      setSuccess('');
      transportService.getAllTransportRoutes().then(r => setRoutes(r.filter(rt => rt.status === 'Active')));
    }
  }, [isOpen]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('emergencyContact.')) {
      const key = name.split('.')[1] as keyof FormState['emergencyContact'];
      setForm(f => ({ ...f, emergencyContact: { ...f.emergencyContact, [key]: value } }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleRouteChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const routeId = e.target.value;
    const route = routes.find(r => r.id === routeId);
    setForm(f => ({
      ...f,
      routeId,
      routeName: route ? route.routeName : '',
      pickupTime: route && route.stops[0] ? route.stops[0].time : '',
      dropoffTime: route && route.stops[route.stops.length - 1] ? route.stops[route.stops.length - 1].time : ''
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      // Validate required fields
      const requiredFields: (keyof FormState)[] = [
        'studentName','parentName','parentEmail','parentPhone','studentLevel','routeId','pickupLocation','dropoffLocation','pickupTime','dropoffTime','emergencyContact'
      ];
      for (const key of requiredFields) {
        if (key === 'emergencyContact') {
          if (!form.emergencyContact.name || !form.emergencyContact.phone || !form.emergencyContact.relationship) {
            setError('Please fill all required fields.');
            setLoading(false);
            return;
          }
        } else if (!form[key]) {
          setError('Please fill all required fields.');
          setLoading(false);
          return;
        }
      }
      await settingsService.addTransportRegistration({
        ...form,
        status: 'pending',
      });
      setSuccess('Registration submitted! We will review your application and contact you soon.');
      setLoading(false);
      if (onSuccess) onSuccess();
      setTimeout(() => {
        setSuccess('');
        onClose();
      }, 1500);
    } catch (err) {
      setError('Failed to submit registration. Please try again.');
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-lg relative max-h-[90vh] flex flex-col">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl">&times;</button>
        <h2 className="text-2xl font-bold mb-4 text-academy-maroon">Transport Registration</h2>
        {success ? (
          <div className="flex flex-col items-center justify-center h-full py-12 animate-fade-in">
            <div className="bg-green-100 rounded-full p-4 mb-4">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-green-700 mb-2">Registration Submitted!</h3>
            <p className="text-gray-700 text-center mb-6">Thank you for registering for transport. We will review your application and contact you soon.</p>
            <button onClick={onClose} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold shadow">Close</button>
          </div>
        ) : (
          <form id="transport-registration-form" onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-y-auto space-y-4 pb-24 sm:pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="studentName" value={form.studentName} onChange={handleChange} placeholder="Student Name" className="border rounded px-3 py-2 w-full" required />
              <select name="studentLevel" value={form.studentLevel} onChange={handleChange} className="border rounded px-3 py-2 w-full" required>
                <option value="">Select Level</option>
                {levels.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
              </select>
              <input name="parentName" value={form.parentName} onChange={handleChange} placeholder="Parent Name" className="border rounded px-3 py-2 w-full" required />
              <input name="parentEmail" value={form.parentEmail} onChange={handleChange} placeholder="Parent Email" type="email" className="border rounded px-3 py-2 w-full" required />
              <input name="parentPhone" value={form.parentPhone} onChange={handleChange} placeholder="Parent Phone" className="border rounded px-3 py-2 w-full" required />
              <select name="routeId" value={form.routeId} onChange={handleRouteChange} className="border rounded px-3 py-2 w-full" required>
                <option value="">Select Route</option>
                {routes.map(r => <option key={r.id} value={r.id}>{r.routeName} (Bus {r.busNumber})</option>)}
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="pickupLocation" value={form.pickupLocation} onChange={handleChange} placeholder="Pickup Location" className="border rounded px-3 py-2 w-full" required />
              <input name="dropoffLocation" value={form.dropoffLocation} onChange={handleChange} placeholder="Dropoff Location" className="border rounded px-3 py-2 w-full" required />
              <input name="pickupTime" value={form.pickupTime} onChange={handleChange} placeholder="Pickup Time" className="border rounded px-3 py-2 w-full" required />
              <input name="dropoffTime" value={form.dropoffTime} onChange={handleChange} placeholder="Dropoff Time" className="border rounded px-3 py-2 w-full" required />
            </div>
            <textarea name="specialNeeds" value={form.specialNeeds} onChange={handleChange} placeholder="Special Needs (optional)" className="border rounded px-3 py-2 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input name="emergencyContact.name" value={form.emergencyContact.name} onChange={handleChange} placeholder="Emergency Contact Name" className="border rounded px-3 py-2 w-full" required />
              <input name="emergencyContact.phone" value={form.emergencyContact.phone} onChange={handleChange} placeholder="Emergency Contact Phone" className="border rounded px-3 py-2 w-full" required />
              <input name="emergencyContact.relationship" value={form.emergencyContact.relationship} onChange={handleChange} placeholder="Relationship" className="border rounded px-3 py-2 w-full" required />
            </div>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            {/* Spacer for sticky button */}
            <div className="h-20 sm:h-0" />
          </form>
        )}
        {/* Sticky submit button for mobile (only show if not success) */}
        {!success && (
          <div className="fixed left-0 right-0 bottom-0 sm:static bg-white sm:bg-transparent p-4 sm:p-0 z-50 border-t sm:border-0 flex justify-center">
            <button type="submit" form="transport-registration-form" className="w-full max-w-lg bg-academy-maroon text-white py-2 rounded font-semibold" disabled={loading}>{loading ? 'Submitting...' : 'Submit Registration'}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransportRegistrationModal;
