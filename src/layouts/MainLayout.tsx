import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingVectors from '../components/FloatingVectors';
import Modal from '../components/Modal';
import { Send, CheckCircle } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { admissionsService, Application } from '../services/firebaseService';

const MainLayout: React.FC = () => {
  const [isAdmissionModalOpen, setAdmissionModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    level: 'kindergarten' as Application['level'],
    type: 'day' as Application['type'],
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const newApplication: Omit<Application, 'id' | 'createdAt' | 'updatedAt'> = {
        ...formData,
        studentName: `${formData.studentName}`, 
        status: 'pending',
        dateSubmitted: new Date().toISOString(),
        documents: [] // Placeholder for now
      };

      await admissionsService.addApplication(newApplication);

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          studentName: '',
          parentName: '',
          email: '',
          phone: '',
          level: 'kindergarten',
          type: 'day',
          notes: ''
        });
        setAdmissionModalOpen(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const openAdmissionModal = () => setAdmissionModalOpen(true);

  return (
    <AppContext.Provider value={{ openAdmissionModal }}>
      <div className="App bg-white">
        <FloatingVectors />
        <Header />
        <main className="pt-32">
          <Outlet />
        </main>
        <Footer />

        <Modal isOpen={isAdmissionModalOpen} onClose={() => setAdmissionModalOpen(false)} title="Apply for Admission">
          {isSubmitted ? (
            <div className="text-center py-6 sm:py-8">
              <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-500 mx-auto mb-3 sm:mb-4" />
              <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Application Submitted!</h4>
              <p className="text-sm sm:text-base text-academy-grey">Thank you for your interest. We will contact you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="form-responsive">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-1">Student's Full Name *</label>
                  <input type="text" id="studentName" name="studentName" value={formData.studentName} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm sm:text-base" />
                </div>
                <div>
                  <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-1">Parent's Full Name *</label>
                  <input type="text" id="parentName" name="parentName" value={formData.parentName} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm sm:text-base" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm sm:text-base" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm sm:text-base" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">Applying For (Level) *</label>
                  <select id="level" name="level" value={formData.level} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm sm:text-base">
                    <option value="kindergarten">Kindergarten</option>
                    <option value="primary">Primary School</option>
                    <option value="junior-secondary">Junior Secondary</option>
                    <option value="senior-secondary">Senior Secondary</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Applying As (Type) *</label>
                  <select id="type" name="type" value={formData.type} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm sm:text-base">
                    <option value="day">Day Student</option>
                    <option value="boarding">Boarding Student</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                <textarea id="notes" name="notes" value={formData.notes} onChange={handleInputChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm sm:text-base"></textarea>
              </div>

              <div className="p-3 sm:p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded-r-lg">
                <p className="text-xs sm:text-sm"><strong>Note:</strong> Document uploads are not yet available through this form. Please submit required documents via email after applying.</p>
              </div>

              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-academy-maroon to-academy-blue text-white py-3 rounded-lg font-semibold flex items-center justify-center disabled:opacity-50 text-sm sm:text-base"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'} <Send className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </form>
          )}
        </Modal>
      </div>
    </AppContext.Provider>
  );
};

export default MainLayout; 