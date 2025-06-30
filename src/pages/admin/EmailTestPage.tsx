import React, { useState } from 'react';
import { emailService, TransportRegistration } from '../../services/firebaseService';

const EmailTestPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  const testRegistration: TransportRegistration = {
    id: 'test-123',
    studentName: 'John Doe',
    parentName: 'Jane Doe',
    parentEmail: 'test@example.com', // Replace with your email for testing
    parentPhone: '+254 700 123 456',
    studentLevel: 'primary',
    routeId: 'route-1',
    routeName: 'Nairobi Central Route',
    pickupLocation: 'Westlands',
    dropoffLocation: 'CBD',
    pickupTime: '7:00 AM',
    dropoffTime: '3:30 PM',
    emergencyContact: {
      name: 'Emergency Contact',
      phone: '+254 700 789 012',
      relationship: 'Parent'
    },
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const testEmail = async (action: 'approved' | 'rejected' | 'waitlisted') => {
    setLoading(true);
    setResult('');
    
    try {
      const success = await emailService.sendTransportNotification(action, testRegistration);
      if (success) {
        setResult(`✅ ${action.charAt(0).toUpperCase() + action.slice(1)} email sent successfully!`);
      } else {
        setResult(`❌ Failed to send ${action} email. Check console for details.`);
      }
    } catch (error) {
      setResult(`❌ Error sending ${action} email: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Email Notification Test</h1>
        <p className="text-gray-600">Test the email notification system for transport registrations.</p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-800 mb-2">Important:</h3>
        <p className="text-yellow-700 text-sm">
          Before testing, make sure to:
        </p>
        <ul className="text-yellow-700 text-sm list-disc list-inside mt-2 space-y-1">
          <li>Replace 'YOUR_APPS_SCRIPT_URL_HERE' in firebaseService.ts with your actual Google Apps Script URL</li>
          <li>Update the test email address below with your real email</li>
          <li>Deploy your Google Apps Script as a web app</li>
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Test Registration Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Student:</strong> {testRegistration.studentName}
          </div>
          <div>
            <strong>Parent:</strong> {testRegistration.parentName}
          </div>
          <div>
            <strong>Email:</strong> {testRegistration.parentEmail}
          </div>
          <div>
            <strong>Route:</strong> {testRegistration.routeName}
          </div>
          <div>
            <strong>Pickup:</strong> {testRegistration.pickupLocation} at {testRegistration.pickupTime}
          </div>
          <div>
            <strong>Dropoff:</strong> {testRegistration.dropoffLocation} at {testRegistration.dropoffTime}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Test Email Notifications</h3>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => testEmail('approved')}
            disabled={loading}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Test Approval Email'}
          </button>
          
          <button
            onClick={() => testEmail('rejected')}
            disabled={loading}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Test Rejection Email'}
          </button>
          
          <button
            onClick={() => testEmail('waitlisted')}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Test Waitlist Email'}
          </button>
        </div>
      </div>

      {result && (
        <div className={`p-4 rounded-lg ${
          result.includes('✅') 
            ? 'bg-green-50 border border-green-200 text-green-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {result}
        </div>
      )}

      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold mb-2">Troubleshooting</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Check the browser console for detailed error messages</li>
          <li>• Verify your Google Apps Script URL is correct</li>
          <li>• Ensure your Apps Script is deployed as a web app with "Anyone" access</li>
          <li>• Check that your Apps Script has permission to send emails</li>
        </ul>
      </div>
    </div>
  );
};

export default EmailTestPage; 