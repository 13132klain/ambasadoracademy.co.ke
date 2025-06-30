import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProgramsPage from './pages/ProgramsPage';
import FacilitiesPage from './pages/FacilitiesPage';
import BoardingPage from './pages/BoardingPage';
import AdmissionsPage from './pages/AdmissionsPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import TransportPage from './pages/TransportPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import SitemapPage from './pages/SitemapPage';
import AcademicCalendarPage from './pages/AcademicCalendarPage';
import AdminPage from './pages/AdminPage';
import EventsManagementPage from './pages/admin/EventsManagementPage';
import AdmissionsManagementPage from './pages/admin/AdmissionsManagementPage';
import CalendarManagementPage from './pages/admin/CalendarManagementPage';
import GalleryManagementPage from './pages/admin/GalleryManagementPage';
import UsersManagementPage from './pages/admin/UsersManagementPage';
import FacilitiesManagementPage from './pages/admin/FacilitiesManagementPage';
import TransportManagementPage from './pages/admin/TransportManagementPage';
import TransportRegistrationsPage from './pages/admin/TransportRegistrationsPage';
import LoginPage from './pages/LoginPage';
import SettingsManagementPage from './pages/admin/SettingsManagementPage';
import FeeStructurePage from './pages/FeeStructurePage';
import { useAuth } from './context/AuthContext';

function RequireAuth({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="programs" element={<ProgramsPage />} />
          <Route path="facilities" element={<FacilitiesPage />} />
          <Route path="boarding" element={<BoardingPage />} />
          <Route path="admissions" element={<AdmissionsPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="transport" element={<TransportPage />} />
          <Route path="academic-calendar" element={<AcademicCalendarPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="terms-of-service" element={<TermsOfServicePage />} />
          <Route path="sitemap" element={<SitemapPage />} />
          <Route path="fee-structure" element={<FeeStructurePage />} />
        </Route>
        
        {/* Admin Routes */}
        <Route path="/admin" element={
          <RequireAuth>
            <AdminPage />
          </RequireAuth>
        }>
          <Route index element={<AdminPage />} />
          <Route path="events" element={<EventsManagementPage />} />
          <Route path="admissions" element={<AdmissionsManagementPage />} />
          <Route path="calendar" element={<CalendarManagementPage />} />
          <Route path="gallery" element={<GalleryManagementPage />} />
          <Route path="users" element={<UsersManagementPage />} />
          <Route path="facilities" element={<FacilitiesManagementPage />} />
          <Route path="transport" element={<TransportManagementPage />} />
          <Route path="transport-registrations" element={<TransportRegistrationsPage />} />
          <Route path="settings" element={<SettingsManagementPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;