import React, { useState } from 'react';
import { Building, Book, FlaskConical, Globe, Music, Computer, Bus, Home, Users, Wifi, Shield, Clock, Star, MapPin, Phone, Mail, ArrowRight, Play, Image as ImageIcon } from 'lucide-react';
import { useScrollAnimation } from '../utils/useScrollAnimation';

const FacilitiesPage: React.FC = () => {
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null);
  const [showVirtualTour, setShowVirtualTour] = useState(false);

  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: facilitiesRef, isVisible: facilitiesVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: specsRef, isVisible: specsVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: galleryRef, isVisible: galleryVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: contactRef, isVisible: contactVisible } = useScrollAnimation<HTMLDivElement>();

  const facilities = [
    {
      id: 'classrooms',
      icon: Building,
      title: 'Modern Classrooms',
      description: 'Spacious, well-lit classrooms equipped with the latest teaching aids to create a stimulating learning environment.',
      image: '/images/modernclassroom.jpeg',
      capacity: '25-30 students per class',
      features: ['Interactive whiteboards', 'Air conditioning', 'Natural lighting', 'Ergonomic furniture', 'Audio-visual equipment'],
      specifications: {
        size: '60-80 sq meters',
        technology: 'Smart boards & projectors',
        seating: 'Adjustable desks & chairs',
        lighting: 'LED lighting system'
      }
    },
    {
      id: 'library',
      icon: Book,
      title: 'Library & Media Center',
      description: 'A comprehensive collection of books, journals, and digital resources to support research and reading for pleasure.',
      image: '/images/Best Practices in School Libraries.jpeg',
      capacity: '50+ students simultaneously',
      features: ['Extensive book collection', 'Digital resources', 'Study spaces', 'Research computers', 'Quiet zones'],
      specifications: {
        books: '10,000+ volumes',
        computers: '20 workstations',
        seating: 'Comfortable study areas',
        hours: '7:00 AM - 6:00 PM'
      }
    },
    {
      id: 'labs',
      icon: FlaskConical,
      title: 'Science Laboratories',
      description: 'Fully equipped labs for Physics, Chemistry, and Biology, allowing students to conduct hands-on experiments.',
      image: '/images/IMG-20250628-WA0001.jpg',
      capacity: '20 students per lab',
      features: ['Modern equipment', 'Safety protocols', 'Experienced technicians', 'Regular maintenance', 'Emergency systems'],
      specifications: {
        labs: '3 specialized labs',
        equipment: 'Latest scientific instruments',
        safety: 'Full safety equipment',
        ventilation: 'Advanced ventilation system'
      }
    },
    {
      id: 'computer',
      icon: Computer,
      title: 'Computer Lab',
      description: 'State-of-the-art computer lab with high-speed internet to foster digital literacy and coding skills.',
      image: '/images/IMG-20250629-WA0014.jpg',
      capacity: '30 students',
      features: ['Latest computers', 'High-speed internet', 'Software suite', 'Coding programs', 'Digital skills training'],
      specifications: {
        computers: '30 workstations',
        internet: 'Fiber optic connection',
        software: 'Educational software suite',
        maintenance: 'Regular updates'
      }
    },
    {
      id: 'sports',
      icon: Globe,
      title: 'Sports Facilities',
      description: 'Expansive sports grounds for football, basketball, and athletics, encouraging physical fitness and teamwork.',
      image: '/images/IMG-20250628-WA0000.jpg',
      capacity: 'Multiple teams',
      features: ['Football field', 'Basketball court', 'Athletics track', 'Indoor sports', 'Equipment storage'],
      specifications: {
        football: 'Full-size pitch',
        basketball: '2 courts',
        track: '400m running track',
        equipment: 'Professional sports gear'
      }
    },
    {
      id: 'arts',
      icon: Music,
      title: 'Music & Arts Room',
      description: 'A dedicated space for students to explore their creativity in music, drama, and visual arts.',
      image: '/images/IMG-20250629-WA0008.jpg',
      capacity: '25 students',
      features: ['Musical instruments', 'Art supplies', 'Performance space', 'Recording equipment', 'Exhibition area'],
      specifications: {
        instruments: 'Pianos, guitars, drums',
        art: 'Complete art supplies',
        space: 'Performance stage',
        equipment: 'Audio recording system'
      }
    },
    {
      id: 'transport',
      icon: Bus,
      title: 'Transport Services',
      description: 'A fleet of modern, safe, and reliable buses covering various routes to ensure students travel comfortably.',
      image: '/images/IMG-20250629-WA0015.jpg',
      capacity: '500+ students daily',
      features: ['GPS tracking', 'Safety features', 'Professional drivers', 'Regular maintenance', 'Emergency protocols'],
      specifications: {
        buses: '10 modern vehicles',
        routes: '15+ routes covered',
        safety: 'Full safety equipment',
        tracking: 'Real-time GPS'
      }
    },
    {
      id: 'boarding',
      icon: Home,
      title: 'Boarding Facilities',
      description: 'Comfortable and secure boarding facilities with dedicated staff to provide a home away from home.',
      image: '/images/Ankara Cebeci Erkek Yurdu.jpeg',
      capacity: '200+ students',
      features: ['Comfortable dormitories', '24/7 security', 'Medical care', 'Recreation areas', 'Study rooms'],
      specifications: {
        rooms: '4-bed dormitories',
        security: '24/7 monitoring',
        medical: 'On-site nurse',
        recreation: 'Common areas & games'
      }
    }
  ];

  const facilityStats = [
    { number: '50+', label: 'Classrooms', icon: Building },
    { number: '10,000+', label: 'Books in Library', icon: Book },
    { number: '3', label: 'Science Labs', icon: FlaskConical },
    { number: '30', label: 'Computer Stations', icon: Computer },
    { number: '5', label: 'Sports Fields', icon: Globe },
    { number: '200+', label: 'Boarding Capacity', icon: Home }
  ];

  const contactInfo = [
    { name: 'Facilities Manager', phone: '+254797727230', email: 'theambasadoracademy00@gmail.com' },
    { name: 'Maintenance Team', phone: '+254797727230', email: 'theambasadoracademy00@gmail.com' },
    { name: 'Security Office', phone: '+254797727230', email: 'theambasadoracademy00@gmail.com' }
  ];

  return (
    <section id="facilities" className="py-12 sm:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div ref={headerRef} className={`text-center mb-20 animate-on-scroll ${headerVisible ? 'animate-fade-in-up' : ''}`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-academy-maroon to-academy-blue rounded-full mb-6">
            <Building className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">World-Class Facilities</h2>
          <p className="text-xl text-academy-grey max-w-4xl mx-auto leading-relaxed">
            We provide a world-class environment with top-notch facilities to support every aspect of student life and learning.
          </p>
          <button 
            onClick={() => setShowVirtualTour(true)}
            className="mt-8 bg-gradient-to-r from-academy-maroon to-academy-blue text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center mx-auto"
          >
            <Play className="h-5 w-5 mr-2" />
            Take Virtual Tour
          </button>
        </div>

        {/* Facility Statistics */}
        <div className="mb-12 lg:mb-20">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">Facility Overview</h3>
            <p className="text-base sm:text-lg text-academy-grey">Our commitment to excellence in numbers</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {facilityStats.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-academy-maroon to-academy-blue rounded-full mb-3 sm:mb-4">
                  <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">{stat.number}</div>
                <div className="text-academy-grey text-xs sm:text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Facilities Grid */}
        <div ref={facilitiesRef} className={`mb-12 lg:mb-20 animate-on-scroll ${facilitiesVisible ? 'animate-fade-in-up' : ''}`}> 
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">Explore Our Facilities</h3>
            <p className="text-base sm:text-lg text-academy-grey">Click on any facility to learn more</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {facilities.map((facility, index) => (
              <div 
                key={facility.id}
                onClick={() => setSelectedFacility(selectedFacility === facility.id ? null : facility.id)}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 animate-on-scroll ${facilitiesVisible ? `animate-scale-in stagger-${index + 1}` : ''}`}
              >
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img 
                    src={facility.image} 
                    alt={facility.title}
                    className="w-full h-40 sm:h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                    <div className="flex items-center justify-center h-8 w-8 sm:h-12 sm:w-12 bg-white/90 rounded-full">
                      <facility.icon className="h-5 w-5 sm:h-6 sm:w-6 text-academy-maroon" />
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{facility.title}</h3>
                  <p className="text-academy-grey mb-2 sm:mb-4 leading-relaxed text-sm sm:text-base">{facility.description}</p>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
                    <span className="text-xs sm:text-sm text-academy-maroon font-medium">{facility.capacity}</span>
                    <ArrowRight className={`h-4 w-4 sm:h-5 sm:w-5 text-academy-maroon transition-transform duration-300 ${selectedFacility === facility.id ? 'rotate-90' : ''}`} />
                  </div>
                  {selectedFacility === facility.id && (
                    <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100 space-y-3 sm:space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2">Key Features:</h4>
                        <div className="flex flex-wrap gap-2">
                          {facility.features.map((feature, idx) => (
                            <span key={idx} className="bg-academy-maroon/10 text-academy-maroon px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2">Specifications:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-academy-grey">
                          {Object.entries(facility.specifications).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="capitalize">{key}:</span>
                              <span className="font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Infrastructure Highlights */}
        <div ref={specsRef} className={`mb-20 animate-on-scroll ${specsVisible ? 'animate-fade-in-up' : ''}`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Infrastructure Highlights</h3>
            <p className="text-lg text-academy-grey">Modern amenities for enhanced learning</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <Wifi className="h-12 w-12 text-academy-maroon mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-3">High-Speed Internet</h4>
              <p className="text-academy-grey">Fiber optic connection throughout campus for seamless digital learning</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <Shield className="h-12 w-12 text-academy-blue mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-3">24/7 Security</h4>
              <p className="text-academy-grey">Comprehensive security system with CCTV monitoring and trained personnel</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <Users className="h-12 w-12 text-academy-maroon mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-3">Medical Care</h4>
              <p className="text-academy-grey">On-site medical facility with qualified nurse and first aid equipment</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <Clock className="h-12 w-12 text-academy-blue mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-3">Extended Hours</h4>
              <p className="text-academy-grey">Facilities available from early morning to late evening for student use</p>
            </div>
          </div>
        </div>

        {/* Facility Gallery */}
        <div ref={galleryRef} className={`mb-20 animate-on-scroll ${galleryVisible ? 'animate-fade-in-up' : ''}`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Facility Gallery</h3>
            <p className="text-lg text-academy-grey">Take a visual tour of our world-class facilities</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.slice(0, 6).map((facility, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg">
                <img 
                  src={facility.image} 
                  alt={facility.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="text-lg font-bold mb-2">{facility.title}</h4>
                  <p className="text-sm text-white/90">{facility.capacity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div ref={contactRef} className={`animate-on-scroll ${contactVisible ? 'animate-fade-in-up' : ''}`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Facility Management</h3>
            <p className="text-lg text-academy-grey">Contact our facilities team for any inquiries</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {contactInfo.map((contact, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-academy-maroon to-academy-blue rounded-full mb-4">
                    <Phone className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{contact.name}</h4>
                </div>
                <div className="space-y-3 text-center">
                  <div className="flex items-center justify-center">
                    <Phone className="h-4 w-4 text-academy-maroon mr-2" />
                    <span className="text-academy-grey font-medium">{contact.phone}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <Mail className="h-4 w-4 text-academy-maroon mr-2" />
                    <span className="text-academy-grey text-sm">{contact.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Virtual Tour Modal */}
        {showVirtualTour && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Virtual Tour</h3>
                <button 
                  onClick={() => setShowVirtualTour(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="text-center">
                <div className="bg-gray-100 rounded-xl p-12 mb-6">
                  <Play className="h-16 w-16 text-academy-maroon mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Interactive Virtual Tour</h4>
                  <p className="text-academy-grey">Experience our facilities in 360° virtual reality</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-academy-maroon/10 p-6 rounded-xl">
                    <h5 className="font-bold text-academy-maroon mb-2">What You'll See:</h5>
                    <ul className="text-sm text-academy-grey space-y-1">
                      <li>• Interactive classroom tours</li>
                      <li>• Science laboratory walkthroughs</li>
                      <li>• Sports facility exploration</li>
                      <li>• Boarding facility overview</li>
                    </ul>
                  </div>
                  <div className="bg-academy-blue/10 p-6 rounded-xl">
                    <h5 className="font-bold text-academy-blue mb-2">Tour Features:</h5>
                    <ul className="text-sm text-academy-grey space-y-1">
                      <li>• 360° panoramic views</li>
                      <li>• Detailed facility information</li>
                      <li>• Student testimonials</li>
                      <li>• Real-time navigation</li>
                    </ul>
                  </div>
                </div>
                <button 
                  className="mt-6 bg-gradient-to-r from-academy-maroon to-academy-blue text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg"
                >
                  Start Virtual Tour
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default FacilitiesPage;