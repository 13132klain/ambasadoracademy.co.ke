import React, { useState, useContext } from 'react';
import { Calendar, FileText, Users, CheckCircle, Clock, Phone, Send } from 'lucide-react';
import Modal from '../components/Modal';
import { generateFeeStructurePDF } from '../utils/feeStructurePDF';
import { AppContext } from '../context/AppContext';
import type { AppContextType } from '../context/AppContext';
import { feeStructure as academyFeeStructure } from '../data/feeStructure';
import { useScrollAnimation } from '../utils/useScrollAnimation';

const AdmissionsPage: React.FC = () => {
  const { openAdmissionModal } = useContext(AppContext) as AppContextType;
  const [selectedLevel, setSelectedLevel] = useState('kindergarten');
  const [selectedType, setSelectedType] = useState('day');
  const [isStartApplicationModalOpen, setStartApplicationModalOpen] = useState(false);
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [contactFormData, setContactFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [isContactSubmitted, setContactSubmitted] = useState(false);

  const { elementRef: processRef, isVisible: processVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: requirementsRef, isVisible: requirementsVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: feesRef, isVisible: feesVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: datesRef, isVisible: datesVisible } = useScrollAnimation<HTMLDivElement>();

  const admissionSteps = [
    {
      step: '1',
      title: 'Application',
      description: 'Submit completed application form with required documents',
      icon: Send
    },
    {
      step: '2',
      title: 'Assessment',
      description: 'Student assessment and interview with parents/guardians',
      icon: Users
    },
    {
      step: '3',
      title: 'Review',
      description: 'Application review and decision by admissions committee',
      icon: CheckCircle
    },
    {
      step: '4',
      title: 'Enrollment',
      description: 'Acceptance letter and enrollment confirmation',
      icon: Calendar
    }
  ];

  const requirements = {
    kindergarten: [
      'Birth certificate (original and copy)',
      'Immunization records',
      'Passport-size photographs (4 copies)',
      'Previous school report (if applicable)',
      'Parent/Guardian ID copies'
    ],
    primary: [
      'Birth certificate (original and copy)',
      'Previous school leaving certificate',
      'Academic transcripts from previous school',
      'Immunization records',
      'Passport-size photographs (4 copies)',
      'Parent/Guardian ID copies'
    ],
    'junior-secondary': [
      'KCPE certificate (original and copy)',
      'Primary school leaving certificate',
      'Academic transcripts',
      'Birth certificate (original and copy)',
      'Passport-size photographs (4 copies)',
      'Parent/Guardian ID copies'
    ]
  };

  const getCurrentFees = () => {
    if (selectedType === 'boarding') {
      return selectedLevel === 'kindergarten' ? null : academyFeeStructure.boardingSchool[selectedLevel as keyof typeof academyFeeStructure.boardingSchool];
    }
    return academyFeeStructure.daySchool[selectedLevel as keyof typeof academyFeeStructure.daySchool];
  };

  const handleStartApplication = () => {
    setStartApplicationModalOpen(true);
  };

  const handleCallUs = () => {
    setContactModalOpen(true);
  };

  const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact Form Data:', contactFormData);
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactFormData({ name: '', phone: '', message: '' });
      setContactModalOpen(false);
    }, 3000);
  };

  return (
    <section id="admissions" className="py-20 bg-gradient-to-br from-academy-maroon/5 to-academy-blue/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Admissions</h2>
          <p className="text-xl text-academy-grey max-w-3xl mx-auto">
            Join our community of learners! We welcome students who are eager to learn, grow, and contribute 
            to our vibrant school environment.
          </p>
        </div>

        {/* Admission Process */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Admission Process</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {admissionSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-academy-maroon/10">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-academy-maroon to-academy-blue rounded-full mb-4 mx-auto">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="bg-academy-maroon text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-3">
                      {step.step}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h4>
                    <p className="text-academy-grey text-sm">{step.description}</p>
                  </div>
                </div>
                {index < admissionSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-academy-maroon/30"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Requirements and Fees */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
          {/* Requirements */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-academy-maroon/10 mb-6 lg:mb-0">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Admission Requirements</h3>
            <div className="mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-3 sm:mb-4">
                {Object.keys(requirements).map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-xs sm:text-base ${
                      selectedLevel === level
                        ? 'bg-academy-maroon text-white'
                        : 'bg-gray-100 text-academy-grey hover:bg-academy-maroon/10'
                    }`}
                  >
                    {level === 'junior-secondary' ? 'Junior Sec.' : level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <ul className="space-y-2 sm:space-y-3">
              {requirements[selectedLevel as keyof typeof requirements].map((requirement, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-academy-maroon mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-academy-grey text-xs sm:text-base">{requirement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Fee Structure */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-academy-maroon/10">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Fee Structure</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs sm:text-base">
                <thead className="bg-gradient-to-r from-academy-maroon to-academy-blue text-white">
                  <tr>
                    <th className="text-left py-2 sm:py-4 px-2 sm:px-6 font-semibold">Level</th>
                    <th className="text-left py-2 sm:py-4 px-2 sm:px-6 font-semibold">Day Fees</th>
                    <th className="text-left py-2 sm:py-4 px-2 sm:px-6 font-semibold">Boarding Fees</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      level: 'Kindergarten',
                      day: academyFeeStructure.daySchool.kindergarten.total,
                      boarding: null
                    },
                    {
                      level: 'Primary',
                      day: academyFeeStructure.daySchool.primary.total,
                      boarding: academyFeeStructure.boardingSchool.primary.total
                    },
                    {
                      level: 'Junior Secondary',
                      day: academyFeeStructure.daySchool.juniorSecondary.total,
                      boarding: academyFeeStructure.boardingSchool.juniorSecondary.total
                    }
                  ].map((fee: {level: string, day: string, boarding: string | null}, index: number) => (
                    <tr key={fee.level} className="border-b border-gray-200">
                      <td className="py-2 sm:py-4 px-2 sm:px-6 font-medium text-gray-800">{fee.level}</td>
                      <td className="py-2 sm:py-4 px-2 sm:px-6 text-academy-grey">{fee.day}</td>
                      <td className="py-2 sm:py-4 px-2 sm:px-6 text-academy-maroon">{fee.boarding ? fee.boarding : <span className="text-gray-400 italic">N/A</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Important Dates */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-academy-maroon/10 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Important Dates {academyFeeStructure.academicYear}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(academyFeeStructure.importantDates).map(([date, value], index) => (
              <div key={date} className="text-center p-4 bg-academy-maroon/5 rounded-lg">
              <Clock className="h-8 w-8 text-academy-maroon mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">{date}</h4>
                <p className="text-academy-grey">{value}</p>
            </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-academy-maroon to-academy-blue rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Apply?</h3>
          <p className="text-xl mb-8 opacity-90">
            Take the first step towards your child's bright future at Ambassador Academy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleStartApplication}
              className="bg-white text-academy-maroon px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
            >
              Start Application
            </button>
            <button 
              onClick={handleCallUs}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-academy-maroon transition-all duration-200 flex items-center justify-center"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Us: +254797727230
            </button>
          </div>
        </div>

        {/* Start Application Modal */}
        <Modal isOpen={isStartApplicationModalOpen} onClose={() => setStartApplicationModalOpen(false)} title="Start Application">
          <div className="text-center py-8">
            <div className="bg-gradient-to-r from-academy-maroon to-academy-blue p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-4">Begin Your Application</h4>
            <p className="text-academy-grey mb-6">
              To start your application process, please click the button below to open our comprehensive application form.
            </p>
            <div className="space-y-3">
              <button 
                onClick={() => {
                  setStartApplicationModalOpen(false);
                  openAdmissionModal();
                }}
                className="w-full bg-gradient-to-r from-academy-maroon to-academy-blue text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
              >
                Open Application Form
              </button>
              <button 
                onClick={() => setStartApplicationModalOpen(false)}
                className="w-full border border-gray-300 text-gray-700 py-2 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>

        {/* Contact Information Modal */}
        <Modal isOpen={isContactModalOpen} onClose={() => setContactModalOpen(false)} title="Contact Information">
          {isContactSubmitted ? (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h4>
              <p className="text-academy-grey">We will call you back within 24 hours.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-academy-maroon/5 to-academy-blue/5 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Direct Contact</h4>
                <p className="text-academy-grey mb-3">You can also reach us directly:</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-academy-maroon mr-2" />
                    <span className="text-sm">+254797727230</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-academy-maroon mr-2" />
                    <span className="text-sm">Mon-Fri: 8:00 AM - 5:00 PM</span>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                  <input type="text" id="contactName" name="name" value={contactFormData.name} onChange={handleContactInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input type="tel" id="contactPhone" name="phone" value={contactFormData.phone} onChange={handleContactInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label htmlFor="contactMessage" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea id="contactMessage" name="message" value={contactFormData.message} onChange={handleContactInputChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Tell us about your inquiry..."></textarea>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-academy-maroon to-academy-blue text-white py-3 rounded-lg font-semibold flex items-center justify-center">
                  Send Message <Send className="ml-2 h-5 w-5" />
                </button>
              </form>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
};

export default AdmissionsPage;