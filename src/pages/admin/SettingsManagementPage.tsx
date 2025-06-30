import React, { useState, useEffect } from 'react';
import { settingsService } from '../../services/firebaseService';

const SettingsManagementPage: React.FC = () => {
  const [siteTitle, setSiteTitle] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await settingsService.getSettings();
        setSiteTitle(data.siteTitle);
        setContactEmail(data.contactEmail);
        setContactPhone(data.contactPhone);
        setTheme(data.theme);
      } catch (err) {
        setError('Failed to load settings.');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError('');
    try {
      await settingsService.updateSettings({ siteTitle, contactEmail, contactPhone, theme });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      setError('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-academy-maroon"></div></div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-academy-maroon mb-6">Website Settings</h1>
      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Site Title</label>
          <input
            type="text"
            value={siteTitle}
            onChange={e => setSiteTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
          <input
            type="email"
            value={contactEmail}
            onChange={e => setContactEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
          <input
            type="tel"
            value={contactPhone}
            onChange={e => setContactPhone(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
          <select
            value={theme}
            onChange={e => setTheme(e.target.value as 'light' | 'dark')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="w-full py-2 px-4 bg-academy-maroon text-white rounded-lg hover:bg-academy-maroon/90 transition-colors disabled:opacity-60 font-semibold"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
        {success && <div className="text-green-600 text-center font-medium">Settings saved!</div>}
        {error && <div className="text-red-600 text-center font-medium">{error}</div>}
      </form>
    </div>
  );
};

export default SettingsManagementPage; 