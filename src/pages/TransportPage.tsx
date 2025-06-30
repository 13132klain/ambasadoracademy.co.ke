import React, { useState, useEffect } from 'react';
import { Bus, Map, Clock, ShieldCheck, Phone, Mail, Users, AlertTriangle, CheckCircle, Navigation, Star, Quote, Calendar, User, BadgeCheck, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { transportFees } from '../data/transportData';
import { TransportRoute, transportService } from '../services/firebaseService';
import { useScrollAnimation } from '../utils/useScrollAnimation';
import TransportRegistrationModal from '../components/TransportRegistrationModal';

const TransportPage: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [transportRoutes, setTransportRoutes] = useState<TransportRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: safetyRef, isVisible: safetyVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: feesRef, isVisible: feesVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: testimonialsRef, isVisible: testimonialsVisible } = useScrollAnimation<HTMLDivElement>();

  const drivers = [
    {
      name: 'John Kamau',
      experience: '8 years',
      phone: '+254 700 123 456',
      email: 'john.kamau@ambassador.edu',
      image: 'https://images.pexels.com/photos/5490235/pexels-photo-5490235.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      routes: ['Route 1', 'Route 2']
    },
    {
      name: 'Sarah Wanjiku',
      experience: '5 years',
      phone: '+254 700 123 457',
      email: 'sarah.wanjiku@ambassador.edu',
      image: 'https://images.pexels.com/photos/5490235/pexels-photo-5490235.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      routes: ['Route 3']
    },
    {
      name: 'Peter Ochieng',
      experience: '10 years',
      phone: '+254 700 123 458',
      email: 'peter.ochieng@ambassador.edu',
      image: 'https://images.pexels.com/photos/5490235/pexels-photo-5490235.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      routes: ['Route 1', 'Route 3']
    }
  ];

  const transportStats = [
    { number: '15+', label: 'Years Experience', icon: Calendar },
    { number: '500+', label: 'Students Transported', icon: Users },
    { number: '100%', label: 'Safety Record', icon: ShieldCheck },
    { number: '24/7', label: 'Support Available', icon: Phone }
  ];

  const emergencyContacts = [
    { name: 'Transport Manager', phone: '+254797727230', email: 'theambasadoracademy00@gmail.com' },
    { name: 'Emergency Hotline', phone: '+254797727230', email: 'theambasadoracademy00@gmail.com' },
    { name: 'Security Office', phone: '+254797727230', email: 'theambasadoracademy00@gmail.com' }
  ];

  const safetyProtocols = [
    {
      icon: ShieldCheck,
      title: 'Regular Vehicle Inspections',
      description: 'All buses undergo daily safety checks and monthly comprehensive inspections.'
    },
    {
      icon: Users,
      title: 'Trained Drivers',
      description: 'All drivers are certified, experienced, and undergo regular training programs.'
    },
    {
      icon: AlertTriangle,
      title: 'Emergency Procedures',
      description: 'Comprehensive emergency protocols and communication systems in place.'
    },
    {
      icon: CheckCircle,
      title: 'Student Safety Training',
      description: 'Students receive regular safety training and emergency drills.'
    }
  ];

  const testimonials = [
    {
      name: 'Mary Wambui',
      role: 'Parent',
      content: 'The transport service is excellent! My children are always on time and the drivers are very professional.',
      rating: 5,
      image: 'https://images.pexels.com/photos/5490235/pexels-photo-5490235.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'David Kimani',
      role: 'Parent',
      content: 'GPS tracking gives me peace of mind. I can always know where my child is during transport.',
      rating: 5,
      image: 'https://images.pexels.com/photos/5490235/pexels-photo-5490235.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Grace Akinyi',
      role: 'Parent',
      content: 'The drivers are punctual and the service is very reliable. Highly recommend!',
      rating: 4,
      image: 'https://images.pexels.com/photos/5490235/pexels-photo-5490235.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const routes = await transportService.getAllTransportRoutes();
        setTransportRoutes(routes.filter(route => route.status === 'Active'));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching transport routes:', error);
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  // Search filter
  const filteredRoutes = transportRoutes.filter(route =>
    route.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.busNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.driverName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Status badge color
  const statusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-200 text-gray-600';
      case 'Under Maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="transport" className="py-20 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div ref={headerRef} className={`text-center mb-16 animate-on-scroll ${headerVisible ? 'animate-fade-in-up' : ''}`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-academy-maroon to-academy-blue rounded-full mb-6">
            <Bus className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Transport Services</h2>
          <p className="text-xl text-academy-grey max-w-4xl mx-auto leading-relaxed">
            Safe, reliable, and convenient transport for our students across various routes with real-time tracking and professional drivers.
          </p>
          <button 
            onClick={() => setShowRegistrationForm(true)}
            className="mt-8 bg-gradient-to-r from-academy-maroon to-academy-blue text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            Register for Transport
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-10 max-w-xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by route, bus, or driver..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full px-5 py-3 pl-12 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-academy-maroon focus:border-transparent text-lg"
            />
            <Bus className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Route Cards Grid */}
        <div className="mb-20">
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-academy-maroon"></div>
              <p className="mt-4 text-academy-grey">Loading transport routes...</p>
            </div>
          ) : filteredRoutes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRoutes.map(route => (
                <div
                  key={route.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-academy-maroon flex items-center gap-2">
                      <MapPin className="h-6 w-6 text-academy-blue" />
                      {route.routeName}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(route.status)}`}>{route.status}</span>
                  </div>
                  <div className="flex items-center gap-4 mb-2">
                    <Bus className="h-5 w-5 text-academy-blue" />
                    <span className="font-medium">Bus:</span> {route.busNumber}
                    <Users className="h-5 w-5 text-academy-blue ml-4" />
                    <span className="font-medium">Capacity:</span> {route.capacity}
                  </div>
                  <div className="flex items-center gap-4 mb-2">
                    <User className="h-5 w-5 text-academy-blue" />
                    <span className="font-medium">Driver:</span> {route.driverName}
                  </div>
                  <div className="flex items-center gap-4 mb-2">
                    <Phone className="h-5 w-5 text-academy-blue" />
                    <span className="font-medium">Contact:</span> {route.driverContact}
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <BadgeCheck className="h-5 w-5 text-academy-blue" />
                    <span className="font-medium">Stops:</span> {route.stops.length}
                  </div>
                  <button
                    className="flex items-center gap-2 text-academy-maroon font-semibold focus:outline-none mt-auto"
                    onClick={() => setSelectedRoute(selectedRoute === route.id ? null : (route.id ?? null))}
                  >
                    {selectedRoute === route.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    {selectedRoute === route.id ? 'Hide Details' : 'Show Details'}
                  </button>
                  {selectedRoute === route.id && (
                    <div className="mt-4 border-t pt-4">
                      <h4 className="font-semibold mb-2 flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-academy-blue" /> Stops & Times</h4>
                      <ul className="space-y-2">
                        {route.stops.map((stop, idx) => (
                          <li key={idx} className="flex items-center justify-between text-sm bg-gray-50 rounded px-3 py-2">
                            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-academy-maroon" /> {stop.name}</span>
                            <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-academy-blue" /> {stop.time}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-academy-grey">No transport routes found.</p>
            </div>
          )}
        </div>

        {/* Transport Statistics */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Transport Statistics</h3>
            <p className="text-lg text-academy-grey">Our commitment to excellence in numbers</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {transportStats.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-academy-maroon to-academy-blue rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-academy-grey font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Emergency Contacts</h3>
            <p className="text-lg text-academy-grey">24/7 support for transport-related emergencies</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {emergencyContacts.map((contact, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-center mb-4">
                  <Phone className="h-12 w-12 text-academy-maroon mx-auto mb-3" />
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

        {/* Transport Policies */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Transport Policies</h3>
            <p className="text-lg text-academy-grey">Important guidelines for safe and efficient transport</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h4 className="text-xl font-bold text-academy-maroon mb-4">Student Responsibilities</h4>
              <ul className="space-y-3 text-academy-grey">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Be at the pick-up point 5 minutes before scheduled time</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Wear seatbelts at all times during transport</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Follow driver instructions and maintain proper behavior</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Notify parents immediately of any concerns</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h4 className="text-xl font-bold text-academy-maroon mb-4">Parent Responsibilities</h4>
              <ul className="space-y-3 text-academy-grey">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Ensure student is ready at pick-up time</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Provide accurate contact information and updates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Pay transport fees on time</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Report any issues or concerns promptly</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Safety Protocols */}
        <div ref={safetyRef} className={`mb-20 animate-on-scroll ${safetyVisible ? 'animate-fade-in-up' : ''}`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Safety & Security</h3>
            <p className="text-lg text-academy-grey">Your child's safety is our top priority</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {safetyProtocols.map((protocol, index) => (
              <div 
                key={index}
                className={`text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-on-scroll ${safetyVisible ? `animate-scale-in stagger-${index + 1}` : ''}`}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-academy-maroon to-academy-blue rounded-full mb-4">
                  <protocol.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{protocol.title}</h4>
                <p className="text-academy-grey">{protocol.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Transport Fees */}
        <div ref={feesRef} className={`mb-16 sm:mb-20 animate-on-scroll ${feesVisible ? 'animate-fade-in-up' : ''}`}>
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Transport Fees</h3>
            <p className="text-base sm:text-lg text-academy-grey">Competitive pricing based on distance zones</p>
          </div>
          <div className="table-responsive">
            <table className="min-w-full bg-white rounded-xl sm:rounded-2xl shadow-lg">
              <thead className="bg-gradient-to-r from-academy-maroon to-academy-blue text-white">
                <tr>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-sm sm:text-base">Zone</th>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-sm sm:text-base hidden sm:table-cell">Description</th>
                  <th className="text-right py-3 sm:py-4 px-3 sm:px-6 font-semibold text-sm sm:text-base">Fee (per term)</th>
                </tr>
              </thead>
              <tbody>
                {transportFees.map((fee, index) => (
                  <tr key={fee.zone} className={`border-b border-gray-200 animate-on-scroll ${feesVisible ? `animate-fade-in-up stagger-${index + 1}` : ''}`}>
                    <td className="py-3 sm:py-4 px-3 sm:px-6 font-medium text-gray-800 text-sm sm:text-base">
                      <div className="sm:hidden">
                        <div className="font-semibold">{fee.zone}</div>
                        <div className="text-xs text-academy-grey mt-1">{fee.description}</div>
                      </div>
                      <div className="hidden sm:block">{fee.zone}</div>
                    </td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-academy-grey text-sm sm:text-base hidden sm:table-cell">{fee.description}</td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-right font-semibold text-academy-maroon text-sm sm:text-base">KES {fee.fee.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Key Features */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h3>
            <p className="text-lg text-academy-grey">Why choose our transport service</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <ShieldCheck className="h-12 w-12 text-academy-maroon mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-3">Safety First</h4>
              <p className="text-academy-grey">All buses are equipped with safety features, GPS tracking, and are regularly inspected by certified mechanics.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <Clock className="h-12 w-12 text-academy-blue mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-3">Punctuality</h4>
              <p className="text-academy-grey">Our drivers adhere to strict schedules with real-time updates to ensure timely pick-ups and drop-offs.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <Navigation className="h-12 w-12 text-academy-maroon mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-3">Real-time Tracking</h4>
              <p className="text-academy-grey">Parents can monitor the location of the bus in real-time through our mobile app and web portal.</p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div ref={testimonialsRef} className={`mb-16 sm:mb-20 animate-on-scroll ${testimonialsVisible ? 'animate-fade-in-up' : ''}`}>
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">What Parents Say</h3>
            <p className="text-base sm:text-lg text-academy-grey">Testimonials from our transport service users</p>
          </div>
          <div className="testimonials-responsive">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-on-scroll ${testimonialsVisible ? `animate-scale-in stagger-${index + 1}` : ''}`}
              >
                <div className="flex items-center mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-3 w-3 sm:h-4 sm:w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-academy-maroon mb-3 sm:mb-4 opacity-50" />
                <p className="text-sm sm:text-base text-academy-grey mb-3 sm:mb-4 italic leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.name}</p>
                    <p className="text-xs sm:text-sm text-academy-grey">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transport Registration Form Modal */}
        {showRegistrationForm && (
          <TransportRegistrationModal
            isOpen={showRegistrationForm}
            onClose={() => setShowRegistrationForm(false)}
            onSuccess={() => {
              alert('Transport registration submitted successfully! We will review your application and contact you soon.');
            }}
          />
        )}

      </div>
    </section>
  );
};

export default TransportPage; 