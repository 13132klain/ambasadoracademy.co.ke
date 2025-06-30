import React, { useState } from 'react';
import Modal from '../components/Modal';
import { BookOpen, Users, Target, Award, Clock, MapPin, Star, CheckCircle, X } from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation } from '../utils/useScrollAnimation';
import { admissionsService } from '../services/firebaseService';

const ProgramsPage: React.FC = () => {
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAppModal, setShowAppModal] = useState(false);
  const [appForm, setAppForm] = useState({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [appSuccess, setAppSuccess] = useState(false);
  const [appLoading, setAppLoading] = useState(false);
  const [appError, setAppError] = useState<string | null>(null);

  // Scroll animation hooks
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: programsRef, isVisible: programsVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: highlightsRef, isVisible: highlightsVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: statsRef, isVisible: statsVisible } = useScrollAnimation<HTMLDivElement>();
  const { getStaggerClass } = useStaggeredAnimation<HTMLDivElement>(4);

  const programs = [
    {
      id: 'kindergarten',
      title: 'Kindergarten',
      subtitle: 'Ages 3-6',
      description: 'Early childhood development through play-based learning and structured activities',
      longDescription: 'Our kindergarten program provides a nurturing environment where young learners develop essential skills through play, exploration, and guided activities. We focus on building a strong foundation for lifelong learning.',
      features: ['Play-based curriculum', 'Social skills development', 'Basic literacy & numeracy', 'Creative arts & music', 'Physical development', 'Character building'],
      highlights: ['Small class sizes (max 15 students)', 'Daily outdoor activities', 'Parent involvement programs', 'Progress tracking system'],
      duration: '3 years',
      classSize: '12-15 students',
      image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-academy-maroon to-red-600',
      icon: '🎨',
      brochure: '/brochures/kindergarten.pdf',
    },
    {
      id: 'primary',
      title: 'Primary School',
      subtitle: 'Grades 1-6',
      description: 'Comprehensive primary education with strong academic foundation and character development',
      longDescription: 'Our primary school program offers a well-rounded education that balances academic excellence with character development. Students develop critical thinking skills while building strong moral values.',
      features: ['Core academic subjects', 'Extracurricular activities', 'Technology integration', 'Sports & physical education', 'Arts & culture', 'Leadership development'],
      highlights: ['Interactive learning methods', 'Regular assessments', 'Talent development programs', 'Community service projects'],
      duration: '6 years',
      classSize: '20-25 students',
      image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-academy-blue to-blue-600',
      icon: '📚',
      brochure: '/brochures/primary.pdf',
    },
    {
      id: 'junior-secondary',
      title: 'Junior Secondary',
      subtitle: 'Grades 7-9',
      description: 'Preparing students for senior secondary and beyond with advanced academic preparation',
      longDescription: 'Our junior secondary program focuses on preparing students for the challenges of senior secondary education while developing their independence and critical thinking abilities.',
      features: ['Advanced academic subjects', 'Career guidance', 'Research skills', 'Digital literacy', 'Community service', 'International exposure'],
      highlights: ['Subject specialization options', 'Career counseling sessions', 'Research project opportunities', 'International exchange programs'],
      duration: '3 years',
      classSize: '25-30 students',
      image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-academy-maroon to-academy-blue',
      icon: '🔬',
      brochure: '/brochures/junior-secondary.pdf',
    },
    {
      id: 'senior-secondary',
      title: 'Senior Secondary',
      subtitle: 'Grades 10-12',
      description: 'University preparation with specialized subject streams and career-focused learning',
      longDescription: 'Our senior secondary program is designed to prepare students for university education and future careers. We offer specialized streams and comprehensive career guidance.',
      features: ['Specialized subject streams', 'University preparation', 'Career counseling', 'Research projects', 'Leadership opportunities', 'Global partnerships'],
      highlights: ['University application support', 'Career pathway guidance', 'Leadership development programs', 'International university partnerships'],
      duration: '3 years',
      classSize: '25-30 students',
      image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-academy-blue to-indigo-600',
      icon: '🎓',
      brochure: '/brochures/senior-secondary.pdf',
    }
  ];

  const handleProgramClick = (programId: string) => {
    setSelectedProgram(programId);
    setShowModal(true);
  };

  const selectedProgramData = programs.find(p => p.id === selectedProgram);

  // Handler for Apply button
  const handleApply = () => {
    setShowModal(false);
    setTimeout(() => {
      setAppForm({ studentName: '', parentName: '', email: '', phone: '', notes: '' });
      setAppSuccess(false);
      setShowAppModal(true);
    }, 300);
  };

  // Handler for Download Brochure button
  const handleDownloadBrochure = () => {
    if (selectedProgramData?.brochure) {
      window.open(selectedProgramData.brochure, '_blank');
    }
  };

  const handleAppFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAppForm({ ...appForm, [e.target.name]: e.target.value });
  };

  const handleAppFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAppLoading(true);
    setAppError(null);
    try {
      if (!selectedProgramData) throw new Error('No program selected');
      await admissionsService.addApplication({
        studentName: appForm.studentName,
        parentName: appForm.parentName,
        email: appForm.email,
        phone: appForm.phone,
        notes: appForm.notes,
        level: selectedProgramData.id as any, // 'kindergarten' | 'primary' | 'junior-secondary' | 'senior-secondary'
        type: 'day', // or let user select if needed
        status: 'pending',
        dateSubmitted: new Date().toISOString().slice(0, 10),
        documents: [],
      });
      setAppSuccess(true);
      setTimeout(() => setShowAppModal(false), 2000);
    } catch (err: any) {
      setAppError(err.message || 'Failed to submit application.');
    } finally {
      setAppLoading(false);
    }
  };

  return (
    <section id="programs" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={headerRef}
          className={`text-center mb-12 sm:mb-16 animate-on-scroll ${headerVisible ? 'animate-fade-in-up' : ''}`}
        >
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-academy-maroon to-academy-blue rounded-full mb-4 sm:mb-6">
            <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Our Academic Programs</h2>
          <p className="text-lg sm:text-xl text-academy-grey max-w-3xl mx-auto px-4">
            Comprehensive education programs designed to nurture every aspect of student development from early childhood to university preparation
          </p>
        </div>

        <div 
          ref={programsRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 sm:mb-16 animate-on-scroll ${programsVisible ? 'animate-fade-in-up' : ''}`}
        >
          {programs.map((program, index) => (
            <div
              key={program.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 animate-on-scroll ${programsVisible ? `animate-scale-in stagger-${index + 1}` : ''}`}
              onClick={() => handleProgramClick(program.id)}
            >
              <div className={`bg-gradient-to-r ${program.color} p-4 sm:p-6 text-white relative overflow-hidden`}>
                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{program.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{program.title}</h3>
                <p className="text-xs sm:text-sm opacity-90 mb-2 sm:mb-3">{program.subtitle}</p>
                <div className="flex items-center text-xs sm:text-sm opacity-75">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  <span>{program.duration}</span>
                </div>
                <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-white opacity-10 rounded-full -mr-8 -mt-8 sm:-mr-10 sm:-mt-10"></div>
              </div>
              <div className="p-4 sm:p-6">
                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                  {program.description}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-between mb-3 sm:mb-4 gap-2 sm:gap-0">
                  <div className="flex items-center text-xs sm:text-sm text-gray-500">
                    <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    <span>Max {program.classSize}</span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-gray-500">
                    <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-yellow-400" />
                    <span>4.8/5</span>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-academy-maroon to-academy-blue text-white py-2 sm:py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 text-sm sm:text-base">
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Program Highlights Section */}
        <div 
          ref={highlightsRef}
          className={`bg-white rounded-xl shadow-lg p-8 mb-16 animate-on-scroll ${highlightsVisible ? 'animate-fade-in-up' : ''}`}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Programs?
            </h3>
            <p className="text-lg text-academy-grey max-w-2xl mx-auto">
              We provide a comprehensive educational experience that prepares students for success in all aspects of life
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Target, title: 'Personalized Learning', desc: 'Tailored approach to meet individual student needs and learning styles', color: 'from-academy-maroon to-red-600' },
              { icon: BookOpen, title: 'Academic Excellence', desc: 'Rigorous curriculum designed to achieve outstanding academic results', color: 'from-academy-blue to-blue-600' },
              { icon: Users, title: 'Expert Teachers', desc: 'Qualified and experienced teaching staff committed to student success', color: 'from-academy-maroon to-academy-blue' },
              { icon: Award, title: 'Holistic Development', desc: 'Academic, social, emotional, and physical growth in a nurturing environment', color: 'from-academy-blue to-indigo-600' },
              { icon: MapPin, title: 'Global Perspective', desc: 'International curriculum with local relevance and cultural awareness', color: 'from-academy-maroon to-red-600' },
              { icon: Star, title: 'Future Ready', desc: 'Skills and knowledge preparation for tomorrow\'s challenges and opportunities', color: 'from-academy-blue to-blue-600' }
            ].map((feature, index) => (
              <div key={index} className={`text-center p-6 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100 animate-on-scroll ${highlightsVisible ? `animate-scale-in stagger-${index + 1}` : ''}`}>
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full mb-4`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Excellence Section */}
        <div 
          ref={statsRef}
          className={`bg-gradient-to-r from-academy-maroon to-academy-blue rounded-xl p-8 text-white animate-on-scroll ${statsVisible ? 'animate-slide-in-up' : ''}`}
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">Academic Excellence</h3>
            <p className="text-xl opacity-90">Our commitment to providing the highest quality education</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { number: '95%', label: 'Pass Rate' },
              { number: '500+', label: 'Students' },
              { number: '50+', label: 'Expert Teachers' },
              { number: '25+', label: 'Years Experience' }
            ].map((stat, index) => (
              <div key={index} className={`text-center animate-on-scroll ${statsVisible ? `animate-scale-in stagger-${index + 1}` : ''}`}>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Program Details Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={selectedProgramData?.title || 'Program Details'}>
        {selectedProgramData && (
          <div className="max-w-5xl mx-auto animate-fade-in-up">
            {/* Modal Header with Icon and Title */}
            <div className="flex flex-col items-center mb-6">
              <div className={`w-20 h-20 flex items-center justify-center rounded-full shadow-lg bg-gradient-to-r ${selectedProgramData.color} mb-3`}>
                <span className="text-4xl">{selectedProgramData.icon}</span>
              </div>
              <h3 className="text-3xl font-extrabold text-gray-800 mb-1 text-center">{selectedProgramData.title}</h3>
              <p className="text-lg text-gray-500 text-center">{selectedProgramData.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Program Image - Enhanced Layout */}
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden shadow-2xl border-4 border-white group">
                <img
                  src={selectedProgramData.image}
                  alt={selectedProgramData.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Gradient overlay for style */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                {/* Icon and title overlay */}
                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                  <span className="text-3xl drop-shadow-lg">{selectedProgramData.icon}</span>
                  <span className="text-xl font-bold text-white drop-shadow-lg">{selectedProgramData.title}</span>
                </div>
              </div>

              {/* Program Details */}
              <div className="space-y-6">
                <div>
                  <p className="text-gray-700 leading-relaxed text-lg mb-2">{selectedProgramData.longDescription}</p>
                </div>
                <div className="flex gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg flex-1 text-center shadow-sm">
                    <div className="text-sm text-gray-600 mb-1">Duration</div>
                    <div className="font-semibold text-gray-900 text-lg">{selectedProgramData.duration}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg flex-1 text-center shadow-sm">
                    <div className="text-sm text-gray-600 mb-1">Class Size</div>
                    <div className="font-semibold text-gray-900 text-lg">{selectedProgramData.classSize}</div>
                  </div>
                </div>
                <hr className="my-2 border-gray-200" />
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Key Features</h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {selectedProgramData.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-700">
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 text-green-600 rounded-full"><CheckCircle className="h-4 w-4" /></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <hr className="my-2 border-gray-200" />
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2"><Star className="h-5 w-5 text-blue-500" /> Program Highlights</h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {selectedProgramData.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-700">
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full"><Star className="h-4 w-4" /></span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                <hr className="my-2 border-gray-200" />
                <div className="pt-2 space-y-3">
                  <button
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-academy-maroon to-academy-blue text-white py-3 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 text-lg"
                    onClick={handleApply}
                  >
                    <Users className="h-5 w-5" /> Apply for This Program
                  </button>
                  <button
                    className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 text-lg"
                    onClick={handleDownloadBrochure}
                    disabled={!selectedProgramData?.brochure}
                  >
                    <BookOpen className="h-5 w-5" /> Download Program Brochure
                  </button>
                </div>
                {/* Optional: Testimonial/Quote Section */}
                <div className="mt-6 p-4 bg-gradient-to-r from-academy-blue to-academy-maroon rounded-xl shadow-md text-white text-center">
                  <p className="italic text-lg">“This program transformed my child's learning experience!”</p>
                  <div className="mt-2 font-semibold">— Happy Parent</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* One-off Application Modal for Programs */}
      <Modal isOpen={showAppModal} onClose={() => setShowAppModal(false)} title={`Apply for ${selectedProgramData?.title || 'Program'}`}>
        {appSuccess ? (
          <div className="flex flex-col items-center justify-center min-h-[200px]">
            <div className="bg-green-100 text-green-700 rounded-full p-4 mb-4">
              <CheckCircle className="h-10 w-10" />
            </div>
            <div className="text-2xl font-bold mb-2">Application Submitted!</div>
            <div className="text-gray-600">Thank you for your interest in our {selectedProgramData?.title} program. We will contact you soon.</div>
          </div>
        ) : (
          <form onSubmit={handleAppFormSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Program</label>
              <input
                type="text"
                value={selectedProgramData?.title || ''}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
              <input
                type="text"
                name="studentName"
                value={appForm.studentName}
                onChange={handleAppFormChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter student name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parent Name</label>
              <input
                type="text"
                name="parentName"
                value={appForm.parentName}
                onChange={handleAppFormChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter parent name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={appForm.email}
                onChange={handleAppFormChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={appForm.phone}
                onChange={handleAppFormChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
              <textarea
                name="notes"
                value={appForm.notes}
                onChange={handleAppFormChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter any additional notes"
              />
            </div>
            {appError && <div className="text-red-600 text-sm">{appError}</div>}
            <div className="flex items-center justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={() => setShowAppModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                disabled={appLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-academy-maroon text-white rounded-lg hover:bg-academy-maroon/90 transition-colors"
                disabled={appLoading}
              >
                {appLoading ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </section>
  );
};

export default ProgramsPage;