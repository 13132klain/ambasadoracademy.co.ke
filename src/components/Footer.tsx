import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Facebook, Twitter, Instagram, Mail, Linkedin, ArrowUp, Phone, MapPin, Clock, Users, BookOpen, Bus, Home, Building, Camera } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import type { AppContextType } from '../context/AppContext';

const Footer: React.FC = () => {
  const { openAdmissionModal } = useContext(AppContext) as AppContextType;

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'About Us', path: '/about', icon: Users },
    { name: 'Programs', path: '/programs', icon: BookOpen },
    { name: 'Admissions', path: '/admissions', icon: GraduationCap },
    { name: 'Facilities', path: '/facilities', icon: Building },
    { name: 'Transport', path: '/transport', icon: Bus },
    { name: 'Boarding', path: '/boarding', icon: Home },
    { name: 'Gallery', path: '/gallery', icon: Camera },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  const academicLinks = [
    { name: 'Kindergarten', path: '/programs#kindergarten' },
    { name: 'Primary School', path: '/programs#primary' },
    { name: 'Junior Secondary', path: '/programs#secondary' },
    { name: 'Academic Calendar', path: '/academic-calendar' },
    { name: 'Fee Structure', path: '/admissions#fees' },
    { name: 'Apply Now', action: openAdmissionModal },
  ];

  const facilityLinks = [
    { name: 'Modern Classrooms', path: '/facilities#classrooms' },
    { name: 'Science Labs', path: '/facilities#labs' },
    { name: 'Library', path: '/facilities#library' },
    { name: 'Sports Facilities', path: '/facilities#sports' },
    { name: 'Computer Lab', path: '/facilities#computer' },
    { name: 'Arts & Music', path: '/facilities#arts' },
  ];

  const supportLinks = [
    { name: 'Transport Services', path: '/transport' },
    { name: 'Boarding Facilities', path: '/boarding' },
    { name: 'Student Life', path: '/about#student-life' },
    { name: 'Parent Portal', path: '/contact#portal' },
    { name: 'FAQ', path: '/contact#faq' },
    { name: 'Emergency Contacts', path: '/transport#emergency' },
  ];

  const contactInfo = [
    { icon: MapPin, text: 'Rongai, Kajiado County, Kenya', link: 'https://maps.google.com' },
    { icon: Phone, text: '+254797727230', link: 'tel:+254797727230' },
    { icon: Mail, text: 'theambasadoracademy00@gmail.com', link: 'mailto:theambasadoracademy00@gmail.com' },
    { icon: Clock, text: 'Mon-Fri: 7:00 AM - 6:00 PM', link: null },
  ];

  const handleSocialClick = (platform: string) => {
    const urls = {
      facebook: 'https://facebook.com/ambassadoracademy',
      twitter: 'https://twitter.com/ambassadoracademy',
      instagram: 'https://instagram.com/ambassadoracademy',
      linkedin: 'https://linkedin.com/company/ambassadoracademy',
      email: 'mailto:theambasadoracademy00@gmail.com'
    };
    
    window.open(urls[platform as keyof typeof urls], platform === 'email' ? '_self' : '_blank');
  };

  // Minimal links for mobile
  const minimalLinks = [
    { name: 'Home', path: '/' },
    { name: 'Programs', path: '/programs' },
    { name: 'Boarding', path: '/boarding' },
    { name: 'Contact', path: '/contact' },
    { name: 'Apply', path: '/admissions' },
  ];

  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 flex flex-col items-center text-center space-y-4">
        {/* School Info */}
        <div className="flex flex-col items-center space-y-2 mb-2 cursor-pointer" onClick={handleScrollToTop}>
          <div className="bg-gradient-to-r from-academy-maroon to-academy-blue p-2 rounded-lg mb-1">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-lg font-bold">Ambassador Academy</h3>
          <p className="text-xs text-gray-400">Excellence in Education</p>
        </div>
        {/* Contact Info (minimal for mobile) */}
        <div className="text-xs text-gray-400 mb-2">
          <span className="block sm:hidden">theambasadoracademy00@gmail.com</span>
          <span className="hidden sm:block">Rongai, Kajiado County, Kenya</span>
        </div>
        {/* Social Media */}
        <div className="flex justify-center space-x-2 mt-2">
          <button onClick={() => handleSocialClick('facebook')} className="bg-gray-800 p-2 rounded-lg hover:bg-academy-maroon transition-colors" title="Facebook"><Facebook className="h-4 w-4" /></button>
          <button onClick={() => handleSocialClick('twitter')} className="bg-gray-800 p-2 rounded-lg hover:bg-academy-maroon transition-colors" title="Twitter"><Twitter className="h-4 w-4" /></button>
          <button onClick={() => handleSocialClick('instagram')} className="bg-gray-800 p-2 rounded-lg hover:bg-academy-maroon transition-colors" title="Instagram"><Instagram className="h-4 w-4" /></button>
        </div>
        {/* Minimal Links for mobile */}
        <div className="flex flex-wrap justify-center gap-4 mt-3 sm:hidden">
          {minimalLinks.map(link => (
            <Link key={link.name} to={link.path} className="text-xs text-gray-300 hover:text-academy-maroon transition-colors font-medium">
              {link.name}
            </Link>
          ))}
        </div>
        {/* Full links for desktop/tablet only */}
        <div className="hidden sm:flex flex-wrap justify-center gap-4 mt-3">
          {quickLinks.map(link => (
            <Link key={link.name} to={link.path} className="text-xs text-gray-300 hover:text-academy-maroon transition-colors font-medium">
              {link.name}
            </Link>
          ))}
        </div>
        {/* Copyright */}
        <div className="w-full bg-gray-800 bg-opacity-80 mt-4 pt-3 pb-2 rounded-t-lg text-xs text-gray-300">
          © 2024 Ambassador Academy. All rights reserved.<br />
          <Link to="/privacy-policy" className="hover:text-academy-maroon">Privacy Policy</Link> &nbsp;|&nbsp;
          <Link to="/terms-of-service" className="hover:text-academy-maroon">Terms of Service</Link> &nbsp;|&nbsp;
          <Link to="/sitemap" className="hover:text-academy-maroon">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;