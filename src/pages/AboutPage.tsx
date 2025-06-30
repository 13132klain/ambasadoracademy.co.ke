import React from 'react';
import { 
  Target, 
  Heart, 
  Lightbulb, 
  Trophy, 
  Eye, 
  User, 
  Users, 
  Calendar, 
  Award, 
  Star, 
  Quote, 
  Building, 
  BookOpen, 
  Globe, 
  Shield, 
  Zap,
  MapPin,
  Phone,
  Mail,
  Clock,
  GraduationCap,
  CheckCircle,
  ArrowRight,
  Play
} from 'lucide-react';
import { useScrollAnimation } from '../utils/useScrollAnimation';
import { useNavigate } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  // Scroll animation hooks
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: missionRef, isVisible: missionVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: visionRef, isVisible: visionVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: statsRef, isVisible: statsVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: historyRef, isVisible: historyVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: valuesRef, isVisible: valuesVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: facultyRef, isVisible: facultyVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: directorRef, isVisible: directorVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: testimonialsRef, isVisible: testimonialsVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: facilitiesRef, isVisible: facilitiesVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: achievementsRef, isVisible: achievementsVisible } = useScrollAnimation<HTMLDivElement>();

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, setting high standards for our students and ourselves.',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Heart,
      title: 'Integrity',
      description: 'We uphold the highest standards of integrity, honesty, and ethical behavior in all our interactions.',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We embrace innovation and creativity, preparing students for the challenges of a rapidly changing world.',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: Trophy,
      title: 'Achievement',
      description: 'We celebrate and encourage achievement in all areas of student development and growth.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Globe,
      title: 'Global Perspective',
      description: 'We foster a global mindset, preparing students to be citizens of the world.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Shield,
      title: 'Character',
      description: 'We build strong character and values that will serve students throughout their lives.',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const stats = [
    { icon: Users, number: '500+', label: 'Students Enrolled', description: 'Growing community of learners' },
    { icon: Award, number: '95%', label: 'Pass Rate', description: 'Consistent academic excellence' },
    { icon: Calendar, number: '15+', label: 'Years Experience', description: 'Proven track record' },
    { icon: Star, number: '50+', label: 'Expert Teachers', description: 'Qualified and experienced staff' },
    { icon: GraduationCap, number: '200+', label: 'Graduates', description: 'Successful alumni worldwide' },
    { icon: CheckCircle, number: '100%', label: 'Parent Satisfaction', description: 'Trusted by families' }
  ];

  const history = [
    { 
      year: '2008', 
      title: 'Foundation', 
      description: 'Ambassador Academy was established with a vision for excellence in education and character development.',
      achievement: 'Started with 50 students'
    },
    { 
      year: '2012', 
      title: 'Expansion', 
      description: 'Added new facilities and expanded to accommodate growing student population.',
      achievement: 'Reached 200 students'
    },
    { 
      year: '2016', 
      title: 'Recognition', 
      description: 'Received national recognition for academic excellence and innovative teaching methods.',
      achievement: 'National Education Award'
    },
    { 
      year: '2020', 
      title: 'Digital Transformation', 
      description: 'Implemented cutting-edge technology and modern teaching methodologies.',
      achievement: 'Technology Integration Award'
    },
    { 
      year: '2023', 
      title: 'Modernization', 
      description: 'Complete campus renovation with state-of-the-art facilities and expanded programs.',
      achievement: 'Excellence in Education'
    }
  ];

  const faculty = [
    { 
      name: 'Mrs Fridah Katei', 
      role: 'Manager', 
      experience: '5+ years',
      specialization: 'Management',
      image: 'https://images.pexels.com/photos/5490235/pexels-photo-5490235.jpeg?auto=compress&cs=tinysrgb&w=400',
      quote: 'Every child has the potential to achieve greatness.'
    },
    { 
      name: 'Mr.Solomon Kusimba', 
      role: 'Headteacher', 
      experience: '12+ years',
      specialization: 'Education',
      image: 'https://images.pexels.com/photos/5490235/pexels-photo-5490235.jpeg?auto=compress&cs=tinysrgb&w=400',
      quote: 'Education is the key to success.'
    },
    { 
      name: 'Ms.Johnas Wekesa', 
      role: 'Deputy Headteacher', 
      experience: '10+ years',
      specialization: 'Mathematics',
      image: 'https://images.pexels.com/photos/5490235/pexels-photo-5490235.jpeg?auto=compress&cs=tinysrgb&w=400',
      quote: 'We are here to help you succeed.'
    },
    { 
      name: 'Madam Secretary',
      role: 'Secretary', 
      experience: '14+ years',
      specialization: 'Secretary',
      image: 'https://images.pexels.com/photos/5490235/pexels-photo-5490235.jpeg?auto=compress&cs=tinysrgb&w=400',
      quote: 'Ambassador Academy is a place of learning and growth.'
    }
  ];

  const facilities = [
    {
      icon: BookOpen,
      title: 'Modern Library',
      description: 'Extensive collection of books, digital resources, and study spaces',
      image: '/images/Best Practices in School Libraries.jpeg'
    },
    {
      icon: Zap,
      title: 'Science Labs',
      description: 'Fully equipped laboratories for physics, chemistry, and biology',
      image: '/images/IMG-20250628-WA0001.jpg'
    },
    {
      icon: Trophy,
      title: 'Sports Complex',
      description: 'Multi-purpose sports facilities including football, basketball, and athletics',
      image: '/images/IMG-20250628-WA0000.jpg'
    },
    {
      icon: Lightbulb,
      title: 'Computer Lab',
      description: 'State-of-the-art computer facilities with latest technology',
      image: '/images/IMG-20250629-WA0014.jpg'
    }
  ];

  const achievements = [
    {
      year: '2023',
      title: 'National Academic Excellence Award',
      description: 'Recognized for outstanding academic performance and student achievement'
    },
    {
      year: '2022',
      title: 'Best School in Nairobi County',
      description: 'Awarded for comprehensive educational excellence and community impact'
    },
    {
      year: '2021',
      title: 'Innovation in Education Award',
      description: 'Recognized for implementing cutting-edge teaching methodologies'
    },
    {
      year: '2020',
      title: 'Community Service Excellence',
      description: 'Awarded for outstanding contributions to local community development'
    }
  ];

  const testimonials = [
    {
      name: 'Mary Wambui',
      role: 'Parent',
      content: 'Ambassador Academy has transformed my child\'s learning experience. The teachers are dedicated, the facilities are excellent, and the academic results speak for themselves. My daughter has grown not just academically, but as a confident, well-rounded individual.',
      image: 'https://images.pexels.com/photos/5490235/pexels-photo-5490235.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5
    },
    {
      name: 'John Mwangi',
      role: 'Alumni',
      content: 'The foundation I received at Ambassador Academy prepared me well for university and my career. The teachers went beyond academics to mentor us in life skills. I\'m grateful for the excellent education and lasting friendships.',
      image: 'https://images.pexels.com/photos/5490235/pexels-photo-5490235.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5
    },
    {
      name: 'Grace Akinyi',
      role: 'Parent',
      content: 'The school\'s commitment to both academic excellence and character development is outstanding. My children love coming to school, and I can see their growth in confidence and knowledge. The communication with parents is excellent.',
      image: 'https://images.pexels.com/photos/5490235/pexels-photo-5490235.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/IMG-20250628-WA0000.jpg" alt="Ambassador Academy" className="w-full h-full object-cover object-center" style={{filter: 'brightness(0.55)'}} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-academy-maroon/80 to-academy-blue/80"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={heroRef}
            className={`text-center text-white animate-on-scroll ${heroVisible ? 'animate-fade-in-up' : ''}`}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full mb-6 sm:mb-8 backdrop-blur-sm">
              <Building className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              About Ambassador Academy
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-2xl sm:max-w-4xl mx-auto leading-relaxed">
              Nurturing excellence, fostering character, and building future leaders through quality education since 2008
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <button className="bg-white text-academy-maroon px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                onClick={() => window.open('https://www.youtube.com/results?search_query=Ambassador+Academy+School', '_blank')}
              >
                <Play className="h-5 w-5" />
                Watch Our Story
              </button>
              <button className="bg-gradient-to-r from-academy-maroon to-academy-blue text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-colors flex items-center gap-2"
                onClick={() => navigate('/admissions')}
              >
                <ArrowRight className="h-5 w-5" />
                Apply for Admission
              </button>
              <button className="bg-white text-academy-maroon px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                onClick={() => navigate('/contact')}
              >
                <Mail className="h-5 w-5" />
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={statsRef}
            className={`grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 animate-on-scroll ${statsVisible ? 'animate-fade-in-up' : ''}`}
          >
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-on-scroll ${statsVisible ? `animate-scale-in stagger-${index + 1}` : ''}`}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-academy-maroon to-academy-blue rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-academy-grey font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mission Section */}
          <div 
            ref={missionRef}
            className={`grid lg:grid-cols-2 gap-12 items-center mb-20 animate-on-scroll ${missionVisible ? 'animate-fade-in-up' : ''}`}
          >
            <div className={`animate-on-scroll ${missionVisible ? 'animate-fade-in-left' : ''}`}>
              <img
                src="/images/IMG-20250629-WA0008.jpg"
                alt="Ambassador Academy Mission"
                className="rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 w-full object-cover"
              />
            </div>
            <div className={`space-y-6 animate-on-scroll ${missionVisible ? 'animate-fade-in-right' : ''}`}>
              <div className="flex items-center space-x-4 mb-8">
                <div className="p-4 bg-gradient-to-r from-academy-maroon to-academy-blue rounded-full">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-xl text-academy-grey leading-relaxed">
                To provide a comprehensive education that develops the intellectual, social, emotional, 
                and physical potential of each student. We create an environment where students can 
                discover their passions, develop critical thinking skills, and become responsible global citizens.
              </p>
              <p className="text-lg text-academy-grey leading-relaxed">
                Our dedicated faculty works tirelessly to ensure that every student receives personalized 
                attention and support, helping them achieve their academic goals while building strong 
                character and values that will serve them throughout their lives.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-academy-maroon font-semibold">
                  <CheckCircle className="h-5 w-5" />
                  Academic Excellence
                </div>
                <div className="flex items-center gap-2 text-academy-maroon font-semibold">
                  <CheckCircle className="h-5 w-5" />
                  Character Development
                </div>
                <div className="flex items-center gap-2 text-academy-maroon font-semibold">
                  <CheckCircle className="h-5 w-5" />
                  Global Perspective
                </div>
              </div>
            </div>
          </div>

          {/* Vision Section */}
          <div 
            ref={visionRef}
            className={`grid lg:grid-cols-2 gap-12 items-center animate-on-scroll ${visionVisible ? 'animate-fade-in-up' : ''}`}
          >
            <div className={`space-y-6 lg:order-2 animate-on-scroll ${visionVisible ? 'animate-fade-in-left' : ''}`}>
              <div className="flex items-center space-x-4 mb-8">
                <div className="p-4 bg-gradient-to-r from-academy-blue to-academy-maroon rounded-full">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-xl text-academy-grey leading-relaxed">
                To be a leading center of educational excellence, inspiring a community of learners to 
                achieve their highest potential and make a positive impact on the world.
              </p>
              <p className="text-lg text-academy-grey leading-relaxed">
                We envision a future where our graduates are innovative thinkers, compassionate leaders, 
                and lifelong learners who contribute meaningfully to society and drive positive change.
              </p>
              <div className="bg-gradient-to-r from-academy-blue/10 to-academy-maroon/10 p-6 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-2">Our Aspirations:</h4>
                <ul className="space-y-2 text-academy-grey">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-academy-blue" />
                    Global recognition for educational excellence
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-academy-blue" />
                    Innovation hub for teaching and learning
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-academy-blue" />
                    Community of lifelong learners and leaders
                  </li>
                </ul>
              </div>
            </div>
            <div className={`lg:order-1 animate-on-scroll ${visionVisible ? 'animate-fade-in-right' : ''}`}> 
              <img
                src="/images/IMG-20250629-WA0009.jpg"
                alt="Ambassador Academy Vision"
                className="rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 lg:mb-20">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">Our Core Values</h3>
              <p className="text-base sm:text-lg text-academy-grey mt-2">The principles that guide us.</p>
            </div>
            <div 
              ref={valuesRef}
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 animate-on-scroll ${valuesVisible ? 'animate-fade-in-up' : ''}`}
            >
              {values.map((value, index) => (
                <div 
                  key={index} 
                  className={`group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-on-scroll ${valuesVisible ? `animate-scale-in stagger-${index + 1}` : ''}`}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${value.color} rounded-full mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h4>
                  <p className="text-academy-grey leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* School History Timeline */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Our Journey</h2>
            <p className="text-base sm:text-xl text-academy-grey">A timeline of our school's growth, achievements, and milestones</p>
          </div>
          <div 
            ref={historyRef}
            className={`relative animate-on-scroll ${historyVisible ? 'animate-fade-in-up' : ''}`}
          >
            {/* Timeline vertical line for md+ screens */}
            <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-academy-maroon to-academy-blue"></div>
            <div className="flex flex-col space-y-12">
              {history.map((item, index) => (
                <div key={index} className="relative flex flex-col sm:flex-row items-center">
                  {/* Timeline dot for all screens */}
                  <div className="sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 w-6 h-6 bg-academy-maroon rounded-full border-4 border-white shadow-lg z-10 mb-4 sm:mb-0"></div>
                  {/* Timeline card */}
                  <div className={`w-full sm:w-5/12 ${index % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12 sm:text-left'} mx-auto`}>
                    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-academy-maroon">
                      <div className="text-2xl sm:text-3xl font-bold text-academy-maroon mb-2 sm:mb-3">{item.year}</div>
                      <h4 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">{item.title}</h4>
                      <p className="text-academy-grey mb-3 sm:mb-4 leading-relaxed">{item.description}</p>
                      <div className="inline-block bg-academy-maroon/10 text-academy-maroon px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                        {item.achievement}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">World-Class Facilities</h2>
            <p className="text-xl text-academy-grey max-w-3xl mx-auto">
              State-of-the-art facilities designed to enhance learning and provide the best educational experience
            </p>
          </div>
          <div 
            ref={facilitiesRef}
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 animate-on-scroll ${facilitiesVisible ? 'animate-fade-in-up' : ''}`}
          >
            {facilities.map((facility, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group animate-on-scroll ${facilitiesVisible ? `animate-scale-in stagger-${index + 1}` : ''}`}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={facility.image} 
                    alt={facility.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 p-3 bg-white/90 rounded-full">
                    <facility.icon className="h-6 w-6 text-academy-maroon" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{facility.title}</h3>
                  <p className="text-academy-grey leading-relaxed">{facility.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Highlights */}
      <div 
        ref={facultyRef}
        className={`mb-20 animate-on-scroll ${facultyVisible ? 'animate-fade-in-up' : ''}`}
      >
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Leadership Team</h3>
          <p className="text-lg text-academy-grey">Experienced educators dedicated to your child's success</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {faculty.map((member, index) => (
            <div 
              key={index}
              className={`text-center bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-on-scroll ${facultyVisible ? `animate-scale-in stagger-${index + 1}` : ''}`}
            >
              <div className="relative flex justify-center">
                {/* SVG Illustration instead of profile image */}
                {index === 0 && (
                  <svg className="w-32 h-32 mx-auto mb-6" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="32" fill="#E0E7FF"/>
                    <ellipse cx="32" cy="28" rx="12" ry="14" fill="#A5B4FC"/>
                    <ellipse cx="32" cy="50" rx="16" ry="8" fill="#6366F1"/>
                  </svg>
                )}
                {index === 1 && (
                  <svg className="w-32 h-32 mx-auto mb-6" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="32" fill="#FDE68A"/>
                    <ellipse cx="32" cy="28" rx="12" ry="14" fill="#FBBF24"/>
                    <ellipse cx="32" cy="50" rx="16" ry="8" fill="#F59E42"/>
                  </svg>
                )}
                {index === 2 && (
                  <svg className="w-32 h-32 mx-auto mb-6" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="32" fill="#FECACA"/>
                    <ellipse cx="32" cy="28" rx="12" ry="14" fill="#F87171"/>
                    <ellipse cx="32" cy="50" rx="16" ry="8" fill="#EF4444"/>
                  </svg>
                )}
                {index === 3 && (
                  <svg className="w-32 h-32 mx-auto mb-6" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="32" fill="#BBF7D0"/>
                    <ellipse cx="32" cy="28" rx="12" ry="14" fill="#34D399"/>
                    <ellipse cx="32" cy="50" rx="16" ry="8" fill="#059669"/>
                  </svg>
                )}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-academy-maroon text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {member.experience}
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h4>
                <p className="text-academy-maroon font-semibold mb-2">{member.role}</p>
                <p className="text-sm text-academy-grey mb-4">{member.specialization}</p>
                <blockquote className="text-sm text-academy-grey italic">
                  "{member.quote}"
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Director's Message Section */}
      <div 
        ref={directorRef}
        className={`bg-gradient-to-r from-academy-maroon to-academy-blue text-white rounded-3xl p-12 mb-20 animate-on-scroll ${directorVisible ? 'animate-fade-in-up' : ''}`}
      >
        {/* Director's message content */}
      </div>
    </div>
  );
};

export default AboutPage;