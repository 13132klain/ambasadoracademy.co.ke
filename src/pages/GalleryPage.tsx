import React, { useState } from 'react';
import { Camera, Mail, Phone, MapPin, Calendar, Users, CheckCircle, Heart, Star, Play, BookOpen, Trophy, Music, Palette, Dumbbell } from 'lucide-react';
import Modal from '../components/Modal';

const GalleryPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isViewMoreModalOpen, setViewMoreModalOpen] = useState(false);
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isContactSubmitted, setContactSubmitted] = useState(false);

  const galleryImages = [
    {
      src: "/images/IMG-20250628-WA0000.jpg",
      alt: "Sports Day",
      title: "Sports Day",
      category: "Recreation",
      description: "Students enjoying sports and teamwork"
    },
    {
      src: "/images/IMG-20250629-WA0008.jpg",
      alt: "Classroom Learning",
      title: "Classroom Learning",
      category: "Academic",
      description: "Interactive classroom sessions"
    },
    {
      src: "/images/IMG-20250629-WA0009.jpg",
      alt: "Library Time",
      title: "Library Time",
      category: "Facilities",
      description: "Students reading in the modern library"
    },
    {
      src: "/images/IMG-20250629-WA0010.jpg",
      alt: "Science Lab",
      title: "Science Lab",
      category: "Academic",
      description: "Hands-on science experiments"
    },
    {
      src: "/images/IMG-20250629-WA0012.jpg",
      alt: "Computer Lab",
      title: "Computer Lab",
      category: "Facilities",
      description: "Digital learning in our computer lab"
    },
    {
      src: "/images/IMG-20250629-WA0014.jpg",
      alt: "Music & Arts",
      title: "Music & Arts",
      category: "Recreation",
      description: "Creative arts and music programs"
    }
  ];

  const campusHighlights = [
    {
      icon: BookOpen,
      title: "Academic Excellence",
      description: "Rigorous curriculum with personalized learning approaches",
      color: "from-academy-maroon to-red-600"
    },
    {
      icon: Heart,
      title: "Nurturing Environment",
      description: "Safe and supportive atmosphere for student growth",
      color: "from-academy-blue to-blue-600"
    },
    {
      icon: Trophy,
      title: "Achievement Recognition",
      description: "Celebrating student accomplishments and milestones",
      color: "from-academy-maroon to-academy-blue"
    },
    {
      icon: Users,
      title: "Community Spirit",
      description: "Strong bonds between students, teachers, and families",
      color: "from-academy-blue to-indigo-600"
    }
  ];

  const studentActivities = [
    { icon: Music, title: "Music & Arts", count: "15+ Programs" },
    { icon: Palette, title: "Creative Arts", count: "8 Studios" },
    { icon: Dumbbell, title: "Sports Teams", count: "12 Teams" },
    { icon: Star, title: "Clubs & Societies", count: "20+ Clubs" }
  ];

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleViewMorePhotos = () => {
    setViewMoreModalOpen(true);
  };

  const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Gallery Contact Form:', contactFormData);
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactFormData({ name: '', email: '', phone: '', message: '' });
      setViewMoreModalOpen(false);
    }, 3000);
  };

  const handlePrevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage > 0 ? selectedImage - 1 : galleryImages.length - 1);
    }
  };

  const handleNextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage < galleryImages.length - 1 ? selectedImage + 1 : 0);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-academy-maroon/5 to-academy-blue/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-academy-maroon to-academy-blue rounded-full mb-6">
            <Camera className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Campus Life at Ambassador Academy</h2>
          <p className="text-xl text-academy-grey max-w-3xl mx-auto">
            Experience the vibrant atmosphere where learning comes alive, friendships flourish, and dreams take flight. 
            Our campus is more than just a place to study—it's a community where every student thrives.
          </p>
        </div>

        {/* Campus Highlights */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {campusHighlights.map((highlight, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${highlight.color} rounded-lg mb-4`}>
                <highlight.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{highlight.title}</h3>
              <p className="text-academy-grey text-sm leading-relaxed">{highlight.description}</p>
            </div>
          ))}
        </div>

        {/* Enhanced Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100"
              onClick={() => handleImageClick(index)}
            >
              <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover group-hover:scale-110 group-hover:grayscale transition-all duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 text-academy-maroon px-2 py-1 rounded-full text-xs font-medium">
                  {image.category}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <h3 className="text-lg font-semibold mb-1">{image.title}</h3>
                <p className="text-sm opacity-90">{image.description}</p>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="bg-white/90 rounded-full p-2">
                  <Play className="h-4 w-4 text-academy-maroon" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Student Activities Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Student Activities & Programs</h3>
            <p className="text-academy-grey max-w-2xl mx-auto">
              Beyond academics, we offer a wide range of activities that help students discover their passions, 
              develop new skills, and build lasting friendships.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {studentActivities.map((activity, index) => (
              <div key={index} className="text-center p-4 rounded-lg bg-gradient-to-br from-academy-maroon/5 to-academy-blue/5 hover:from-academy-maroon/10 hover:to-academy-blue/10 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-academy-maroon to-academy-blue rounded-lg mb-3">
                  <activity.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{activity.title}</h4>
                <p className="text-sm text-academy-grey">{activity.count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-academy-maroon to-academy-blue rounded-2xl p-8 text-white mb-8">
            <h3 className="text-2xl font-bold mb-4">Experience Our Campus Virtually</h3>
            <p className="text-lg opacity-90 mb-6">
              Get a comprehensive view of our facilities, student life, and learning environment
            </p>
            <button 
              onClick={handleViewMorePhotos}
              className="bg-white text-academy-maroon px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center mx-auto"
            >
              <Camera className="mr-2 h-5 w-5" />
              View Complete Gallery
            </button>
          </div>
        </div>

        {/* View More Photos Modal */}
        <Modal isOpen={isViewMoreModalOpen} onClose={() => setViewMoreModalOpen(false)} title="Gallery & Campus Tours">
          {isContactSubmitted ? (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Request Submitted!</h4>
              <p className="text-academy-grey">We will send you our complete photo gallery and tour information within 24 hours.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <div className="bg-gradient-to-r from-academy-maroon to-academy-blue p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Camera className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Get Photo Gallery Access</h4>
                <p className="text-academy-grey mb-6">Enter your details to receive access to our complete photo gallery</p>
              </div>

              <div className="bg-gradient-to-r from-academy-maroon/5 to-academy-blue/5 p-4 rounded-lg">
                <h5 className="font-semibold text-gray-900 mb-3">What You'll Receive:</h5>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-academy-maroon mr-2" />
                    <span className="text-gray-700">Complete campus photo gallery (100+ images)</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-academy-maroon mr-2" />
                    <span className="text-gray-700">Virtual campus tour video</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-academy-maroon mr-2" />
                    <span className="text-gray-700">Student life and activities photos</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-academy-maroon mr-2" />
                    <span className="text-gray-700">Facilities and classroom images</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-academy-maroon mr-2" />
                    <span className="text-gray-700">Information about scheduling a physical visit</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-academy-maroon/5 to-academy-blue/5 p-4 rounded-lg">
                <h5 className="font-semibold text-gray-900 mb-2">Alternative Contact Methods:</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-academy-maroon mr-2" />
                    <span className="text-academy-grey">Email: theambasadoracademy00@gmail.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-academy-maroon mr-2" />
                    <span className="text-academy-grey">Phone: +254797727230</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-academy-maroon mr-2" />
                    <span className="text-academy-grey">Schedule a physical tour: Mon-Fri, 9:00 AM - 4:00 PM</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="galleryName" className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                    <input type="text" id="galleryName" name="name" value={contactFormData.name} onChange={handleContactInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label htmlFor="galleryEmail" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <input type="email" id="galleryEmail" name="email" value={contactFormData.email} onChange={handleContactInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                </div>
                <div>
                  <label htmlFor="galleryPhone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" id="galleryPhone" name="phone" value={contactFormData.phone} onChange={handleContactInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label htmlFor="galleryMessage" className="block text-sm font-medium text-gray-700 mb-1">Additional Requests</label>
                  <textarea id="galleryMessage" name="message" value={contactFormData.message} onChange={handleContactInputChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Any specific areas you'd like to see more photos of..."></textarea>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-academy-maroon to-academy-blue text-white py-3 rounded-lg font-semibold flex items-center justify-center">
                  Get Photo Gallery <Camera className="ml-2 h-5 w-5" />
                </button>
              </form>
            </div>
          )}
        </Modal>

        {/* Enhanced Image Modal */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-5xl max-h-full">
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-white text-2xl font-bold z-10 bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-75 transition-colors"
              >
                ×
              </button>
              
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl font-bold z-10 bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-75 transition-colors"
              >
                ‹
              </button>
              
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl font-bold z-10 bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-75 transition-colors"
              >
                ›
              </button>

              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              
              <div className="absolute bottom-4 left-4 right-4 text-white text-center bg-black bg-opacity-50 rounded-lg p-4">
                <h3 className="text-xl font-semibold">{galleryImages[selectedImage].title}</h3>
                <p className="text-sm opacity-75 mt-1">
                  {selectedImage + 1} of {galleryImages.length} • {galleryImages[selectedImage].category}
                </p>
                <p className="text-sm opacity-90 mt-2">{galleryImages[selectedImage].description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GalleryPage;