import React, { useState, useContext } from 'react';
import { ArrowRight, MapPin, Users, Star, GraduationCap, Calendar, Send, CheckCircle, Download, Play } from 'lucide-react';
import Modal from './Modal';
import { useScrollAnimation } from '../utils/useScrollAnimation';
import { AppContext } from '../context/AppContext';
import type { AppContextType } from '../context/AppContext';
import { heroImages } from '../data/heroImages';

// Function to download fee structure PDFs
const downloadFeeStructurePDF = (category: string) => {
  let fileName = '';
  let displayName = '';
  
  switch (category) {
    case 'kindergarten':
      fileName = 'day-school-primary-fee.pdf';
      displayName = 'Kindergarten Fee Structure';
      break;
    case 'primary':
      fileName = 'day-school-primary-fee.pdf';
      displayName = 'Primary School Fee Structure';
      break;
    case 'juniorSecondary':
      fileName = 'day-school-primary-fee.pdf';
      displayName = 'Junior Secondary Fee Structure';
      break;
    case 'primaryBoarding':
      fileName = 'BOARDING PRIMARY BOARDING FEES STRUCTURE.pdf';
      displayName = 'Primary Boarding Fee Structure';
      break;
    case 'juniorSecondaryBoarding':
      fileName = 'BOARDING JUNIOR SCHOOL FEES STRUCTURE  2025.pdf';
      displayName = 'Junior Secondary Boarding Fee Structure';
      break;
    default:
      fileName = 'day-school-primary-fee.pdf';
      displayName = 'Fee Structure';
  }

  const pdfUrl = `/fee-structures/${fileName}`;
  
  // Create a temporary link element to trigger download
  const link = document.createElement('a');
  link.href = pdfUrl;
  link.download = `${displayName} 2025.pdf`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  
  // Append to body, click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const Hero: React.FC = () => {
  const { openAdmissionModal } = useContext(AppContext) as AppContextType;
  const [isVisitModalOpen, setVisitModalOpen] = useState(false);
  const [visitFormData, setVisitFormData] = useState({
    name: '',
    email: '',
    date: '',
    message: ''
  });
  const [isVisitSubmitted, setVisitSubmitted] = useState(false);
  const [showFeeDropdown, setShowFeeDropdown] = useState(false);
  const [isFeeModalOpen, setFeeModalOpen] = useState(false);

  // Scroll animation hooks
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation<HTMLHeadingElement>();
  const { elementRef: statsRef, isVisible: statsVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: imageRef, isVisible: imageVisible } = useScrollAnimation<HTMLDivElement>();

  const handleVisitInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVisitFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Visit Form Data:', visitFormData);
    setVisitSubmitted(true);
    setTimeout(() => {
      setVisitSubmitted(false);
      setVisitFormData({ name: '', email: '', date: '', message: '' });
      setVisitModalOpen(false);
    }, 3000);
  };

  const handleScheduleVisit = () => {
    setVisitModalOpen(true);
  };

  return (
    <section id="home" className="relative min-h-screen bg-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-academy-maroon/5 to-academy-blue/5"></div>
      
      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[70vh] lg:min-h-[80vh]">
          
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
            <div className="space-y-4 sm:space-y-6">
              <div 
                ref={headerRef}
                className={`inline-flex items-center px-3 sm:px-4 py-2 bg-gradient-to-r from-academy-maroon to-academy-blue text-white rounded-full text-xs sm:text-sm font-medium animate-on-scroll ${headerVisible ? 'animate-fade-in-up' : ''}`}
              >
                <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                Education For Excellence
              </div>
              
              <h1 
                ref={contentRef}
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight animate-on-scroll ${contentVisible ? 'animate-fade-in-up' : ''}`}
              >
                Nurturing
                <span className="block bg-gradient-to-r from-academy-maroon to-academy-blue bg-clip-text text-transparent">
                  Future Leaders
                </span>
              </h1>
              
              <p className={`text-base sm:text-lg lg:text-xl text-academy-grey leading-relaxed max-w-lg animate-on-scroll ${contentVisible ? 'animate-fade-in-up stagger-1' : ''}`}>
                At Ambassador Academy, we provide a comprehensive education that develops the intellectual, 
                social, emotional, and physical potential of each student.
              </p>
            </div>

            {/* Action Buttons */}
            <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 animate-on-scroll ${contentVisible ? 'animate-fade-in-up stagger-2' : ''}`}>
              <button
                onClick={openAdmissionModal}
                className="group bg-gradient-to-r from-academy-maroon to-academy-blue text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover-lift"
              >
                <span>Apply for Admission</span>
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={handleScheduleVisit}
                className="group border-2 border-academy-maroon text-academy-maroon px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-academy-maroon hover:text-white transition-all duration-300 flex items-center justify-center hover-lift"
              >
                <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                <span>Schedule a Visit</span>
              </button>
            </div>

            {/* Statistics */}
            <div 
              ref={statsRef}
              className={`grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 sm:pt-8 animate-on-scroll ${statsVisible ? 'animate-fade-in-up' : ''}`}
            >
              {[
                { number: '500+', label: 'Students', color: 'text-academy-maroon' },
                { number: '50+', label: 'Expert Teachers', color: 'text-academy-blue' },
                { number: '95%', label: 'Success Rate', color: 'text-green-600' },
                { number: '25+', label: 'Years Experience', color: 'text-orange-600' }
              ].map((stat, index) => (
                <div key={index} className={`text-center animate-on-scroll ${statsVisible ? `animate-scale-in stagger-${index + 1}` : ''}`}>
                  <div className={`text-xl sm:text-2xl lg:text-3xl font-bold ${stat.color} mb-1`}>{stat.number}</div>
                  <div className="text-xs sm:text-sm text-academy-grey">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Image Grid */}
          <div 
            ref={imageRef}
            className={`relative animate-on-scroll order-1 lg:order-2 ${imageVisible ? 'animate-fade-in-right' : ''}`}
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-4 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
              {/* Large Image */}
              <div className="col-span-2 row-span-2 relative group overflow-hidden rounded-xl sm:rounded-2xl hover:rounded-2xl sm:hover:rounded-[3rem] transition-all duration-700 ease-in-out">
                <img
                  src={heroImages[0].src}
                  alt={heroImages[0].alt}
                  className="w-full h-full object-cover group-hover:grayscale group-hover:scale-110 transition-all duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out"></div>
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out transform translate-y-2 sm:translate-y-4 group-hover:translate-y-0">
                  <h3 className="text-sm sm:text-lg font-semibold">{heroImages[0].title}</h3>
                </div>
                {/* Morph overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-academy-maroon/20 to-academy-blue/20 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out rounded-xl sm:rounded-2xl group-hover:rounded-2xl sm:group-hover:rounded-[3rem]"></div>
              </div>
              
              {/* Small Images */}
              {heroImages.slice(1, 3).map((image, index) => (
                <div key={index} className="relative group overflow-hidden rounded-lg sm:rounded-xl hover:rounded-xl sm:hover:rounded-2xl transition-all duration-700 ease-in-out">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:grayscale group-hover:scale-110 transition-all duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out"></div>
                  <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 text-white opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out transform translate-y-1 sm:translate-y-2 group-hover:translate-y-0">
                    <h3 className="text-xs sm:text-sm font-semibold">{image.title}</h3>
                  </div>
                  {/* Morph overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-academy-maroon/20 to-academy-blue/20 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out rounded-lg sm:rounded-xl group-hover:rounded-xl sm:group-hover:rounded-2xl"></div>
                </div>
              ))}
            </div>

            {/* Floating Elements with morph animation - Hidden on mobile */}
            <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 sm:p-4 shadow-lg group hover:scale-110 hover:rounded-2xl transition-all duration-700 ease-in-out hidden sm:block">
              <div className="bg-gradient-to-r from-academy-maroon to-academy-blue p-2 sm:p-3 rounded-full group-hover:rounded-xl transition-all duration-700 ease-in-out">
                <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-white group-hover:rotate-12 transition-transform duration-700 ease-in-out" />
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 sm:p-4 shadow-lg group hover:scale-110 hover:rounded-2xl transition-all duration-700 ease-in-out hidden sm:block">
              <div className="bg-gradient-to-r from-academy-blue to-academy-maroon p-2 sm:p-3 rounded-full group-hover:rounded-xl transition-all duration-700 ease-in-out">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white group-hover:rotate-12 transition-transform duration-700 ease-in-out" />
              </div>
            </div>
          </div>
        </div>

        {/* Fee Structure Download Section */}
        <div className={`mt-12 sm:mt-16 lg:mt-20 bg-gradient-to-r from-academy-maroon/10 to-academy-blue/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-academy-maroon/20 animate-on-scroll ${contentVisible ? 'animate-slide-in-up' : ''}`}>
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              📋 Download Our Complete Fee Structure
            </h3>
            <p className="text-sm sm:text-base text-academy-grey mb-4 sm:mb-6 max-w-2xl mx-auto">
              Get detailed information about our tuition fees, payment plans, scholarship opportunities, and boarding packages.
            </p>
            <button
              className="bg-gradient-to-r from-academy-maroon to-academy-blue text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center mx-auto hover-lift text-sm sm:text-base focus:outline-none"
              onClick={() => setFeeModalOpen(true)}
              type="button"
            >
              <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Download Fee Structure PDF
            </button>
          </div>
        </div>
      </div>

      {/* Visit Modal */}
      <Modal isOpen={isVisitModalOpen} onClose={() => setVisitModalOpen(false)} title="Schedule a Visit">
        {isVisitSubmitted ? (
          <div className="text-center py-6 sm:py-8">
            <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-500 mx-auto mb-3 sm:mb-4" />
            <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Request Submitted!</h4>
            <p className="text-sm sm:text-base text-academy-grey">We will get back to you soon to confirm your visit.</p>
          </div>
        ) : (
          <form onSubmit={handleVisitSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="visitName" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input 
                  type="text" 
                  id="visitName" 
                  name="name" 
                  value={visitFormData.name} 
                  onChange={handleVisitInputChange} 
                  required 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm sm:text-base" 
                />
              </div>
              <div>
                <label htmlFor="visitEmail" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input 
                  type="email" 
                  id="visitEmail" 
                  name="email" 
                  value={visitFormData.email} 
                  onChange={handleVisitInputChange} 
                  required 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm sm:text-base" 
                />
              </div>
            </div>
            <div>
              <label htmlFor="visitDate" className="block text-sm font-medium text-gray-700 mb-1">Preferred Visit Date *</label>
              <input 
                type="date" 
                id="visitDate" 
                name="date" 
                value={visitFormData.date} 
                onChange={handleVisitInputChange} 
                required 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm sm:text-base" 
              />
            </div>
            <div>
              <label htmlFor="visitMessage" className="block text-sm font-medium text-gray-700 mb-1">Additional Message</label>
              <textarea 
                id="visitMessage" 
                name="message" 
                value={visitFormData.message} 
                onChange={handleVisitInputChange} 
                rows={3} 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm sm:text-base"
                placeholder="Any specific areas you'd like to see or questions you have..."
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-academy-maroon to-academy-blue text-white py-3 rounded-lg font-semibold flex items-center justify-center text-sm sm:text-base hover:shadow-lg transition-all duration-200"
            >
              <Send className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              Schedule Visit
            </button>
          </form>
        )}
      </Modal>

      {/* Fee Structure Modal */}
      <Modal isOpen={isFeeModalOpen} onClose={() => setFeeModalOpen(false)} title="Select Fee Structure to Download">
        <div className="text-center py-4">
          <p className="mb-6 text-academy-grey text-base">Which fee structure would you like to download?</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => { 
                const link = document.createElement('a');
                link.href = '/fee-structures/day-school-primary-fee.pdf';
                link.download = 'Kindergarten Fee Structure 2025.pdf';
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setFeeModalOpen(false); 
              }}
              className="w-full bg-academy-maroon text-white py-3 rounded-lg font-semibold hover:bg-academy-blue transition-all duration-200"
            >
              Kindergarten Fee Structure
            </button>
            <button
              onClick={() => { 
                const link = document.createElement('a');
                link.href = '/fee-structures/day-school-primary-fee.pdf';
                link.download = 'Primary School Fee Structure 2025.pdf';
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setFeeModalOpen(false); 
              }}
              className="w-full bg-academy-maroon text-white py-3 rounded-lg font-semibold hover:bg-academy-blue transition-all duration-200"
            >
              Primary School Fee Structure
            </button>
            <button
              onClick={() => { 
                const link = document.createElement('a');
                link.href = '/fee-structures/day-school-primary-fee.pdf';
                link.download = 'Junior Secondary Fee Structure 2025.pdf';
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setFeeModalOpen(false); 
              }}
              className="w-full bg-academy-maroon text-white py-3 rounded-lg font-semibold hover:bg-academy-blue transition-all duration-200"
            >
              Junior Secondary Fee Structure
            </button>
            <button
              onClick={() => { 
                const link = document.createElement('a');
                link.href = '/fee-structures/BOARDING PRIMARY BOARDING FEES STRUCTURE.pdf';
                link.download = 'Primary Boarding Fee Structure 2025.pdf';
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setFeeModalOpen(false); 
              }}
              className="w-full bg-academy-blue text-white py-3 rounded-lg font-semibold hover:bg-academy-maroon transition-all duration-200"
            >
              Primary Boarding Fee Structure
            </button>
            <button
              onClick={() => { 
                const link = document.createElement('a');
                link.href = '/fee-structures/BOARDING JUNIOR SCHOOL FEES STRUCTURE  2025.pdf';
                link.download = 'Junior Secondary Boarding Fee Structure 2025.pdf';
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setFeeModalOpen(false); 
              }}
              className="w-full bg-academy-blue text-white py-3 rounded-lg font-semibold hover:bg-academy-maroon transition-all duration-200"
            >
              Junior Secondary Boarding Fee Structure
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default Hero;