import React, { useEffect, useState } from 'react';
import { settingsService, TransportRegistration, emailService } from '../../services/firebaseService';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  waitlisted: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-gray-100 text-gray-800',
};

const TransportRegistrationsPage: React.FC = () => {
  const [registrations, setRegistrations] = useState<TransportRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | TransportRegistration['status']>('pending');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError('');
    let unsubscribe: (() => void) | undefined;
    try {
      let q;
      if (statusFilter === 'all') {
        q = query(collection(db, 'transportRegistrations'), orderBy('createdAt', 'desc'));
      } else {
        q = query(
          collection(db, 'transportRegistrations'),
          where('status', '==', statusFilter),
          orderBy('createdAt', 'desc')
        );
      }
      unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as TransportRegistration[];
        setRegistrations(data);
        setLoading(false);
      }, (err) => {
        setError('Failed to fetch registrations.');
        setLoading(false);
      });
    } catch (err) {
      setError('Failed to fetch registrations.');
      setLoading(false);
    }
    return () => {
      if (unsubscribe) unsubscribe();
    };
    // eslint-disable-next-line
  }, [statusFilter]);

  const handleApprove = async (id: string) => {
    setActionLoading(id);
    try {
      await settingsService.approveTransportRegistration(id, 'admin');
      // Email is automatically sent by the service
    } catch (err) {
      setError('Failed to approve registration.');
      console.error('Approve error:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id: string) => {
    setActionLoading(id);
    try {
      await settingsService.rejectTransportRegistration(id, 'admin', 'Rejected by admin');
      // Email is automatically sent by the service
    } catch (err) {
      setError('Failed to reject registration.');
      console.error('Reject error:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleWaitlist = async (id: string) => {
    setActionLoading(id);
    try {
      await settingsService.waitlistTransportRegistration(id, 'admin', 'Placed on waitlist');
      // Email is automatically sent by the service
    } catch (err) {
      setError('Failed to waitlist registration.');
      console.error('Waitlist error:', err);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transport Registrations</h1>
          <p className="text-gray-600">Review and manage student transport registrations.</p>
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as any)}
          className="mt-4 sm:mt-0 border rounded px-3 py-2"
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="waitlisted">Waitlisted</option>
          <option value="cancelled">Cancelled</option>
          <option value="all">All</option>
        </select>
      </div>
      {error && <div className="text-red-600">{error}</div>}
      {loading ? (
        <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-academy-maroon"></div></div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Parent</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Pickup/Dropoff</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Level</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {registrations.map(reg => (
                <tr key={reg.id}>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="font-semibold">{reg.studentName}</div>
                    <div className="text-xs text-gray-500">{reg.parentEmail}</div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div>{reg.parentName}</div>
                    <div className="text-xs text-gray-500">{reg.parentPhone}</div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div>{reg.routeName}</div>
                    <div className="text-xs text-gray-500">{reg.pickupLocation} → {reg.dropoffLocation}</div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="text-xs">{reg.pickupTime} / {reg.dropoffTime}</div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">{reg.studentLevel}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[reg.status]}`}>{reg.status}</span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {reg.status === 'pending' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApprove(reg.id!)}
                          className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600"
                          disabled={actionLoading === reg.id}
                        >Approve</button>
                        <button
                          onClick={() => handleWaitlist(reg.id!)}
                          className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
                          disabled={actionLoading === reg.id}
                        >Waitlist</button>
                        <button
                          onClick={() => handleReject(reg.id!)}
                          className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                          disabled={actionLoading === reg.id}
                        >Reject</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {registrations.length === 0 && (
                <tr><td colSpan={7} className="text-center py-8 text-gray-400">No registrations found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransportRegistrationsPage; 