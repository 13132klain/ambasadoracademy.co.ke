import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, GraduationCap, Facebook, Twitter, Instagram } from 'lucide-react';
import { useScrollAnimation } from '../utils/useScrollAnimation';
import { AppContext } from '../context/AppContext';
import type { AppContextType } from '../context/AppContext';

const Header: React.FC = () => {
  const { openAdmissionModal } = useContext(AppContext) as AppContextType;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreTimeout = React.useRef<NodeJS.Timeout | null>(null);
  
  // Scroll animation hook
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();

  // Revert nav bar: all links visible, no dropdown
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Fees', path: '/fee-structure' },
    { name: 'Facilities', path: '/facilities' },
    { name: 'Transport', path: '/transport' },
    { name: 'Boarding', path: '/boarding' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Calendars', path: '/academic-calendar' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent body scroll when menu is open
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleMoreEnter = () => {
    if (moreTimeout.current) clearTimeout(moreTimeout.current);
    setIsMoreOpen(true);
  };
  const handleMoreLeave = () => {
    moreTimeout.current = setTimeout(() => setIsMoreOpen(false), 150);
  };

  return (
    <header 
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-white'
      } animate-on-scroll ${headerVisible ? 'animate-fade-in-up' : ''}`}
    >
      {/* Top Bar - Hidden on mobile */}
      <div className="bg-gradient-to-r from-academy-maroon to-academy-blue text-white py-2 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4 lg:space-x-6">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">+254797727230</span>
                <span className="md:hidden">+254797727230</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span className="hidden lg:inline">theambasadoracademy00@gmail.com</span>
                <span className="lg:hidden">theambasadoracademy00@gmail.com</span>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Rongai, Kajiado County</span>
              <span className="md:hidden">Rongai, Kenya</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <img
                src="/images/School logo.png"
                alt="Ambassador Academy Logo"
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-lg bg-white shadow"
                style={{ minWidth: '2.5rem', minHeight: '2.5rem' }}
              />
              <div className="flex flex-col justify-center items-center h-full">
                <h1 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 leading-tight">Ambassador Academy</h1>
                <p className="text-xs sm:text-sm text-academy-grey hidden sm:block">Education For Excellence</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium transition-colors duration-200 hover-lift text-sm xl:text-base ${location.pathname === link.path ? 'text-academy-maroon' : 'text-gray-700 hover:text-academy-maroon'}`}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={openAdmissionModal}
              className="bg-gradient-to-r from-academy-maroon to-academy-blue text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 hover-lift text-sm xl:text-base"
            >
              Apply Now
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-academy-maroon p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 z-[60] bg-black bg-opacity-50 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`fixed right-0 top-0 h-screen w-full sm:w-80 sm:max-w-[85vw] bg-white shadow-xl transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} pt-0`}>
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <img
                  src="/images/School logo.png"
                  alt="Ambassador Academy Logo"
                  className="w-10 h-10 object-contain rounded-lg bg-white shadow"
                  style={{ minWidth: '2.5rem', minHeight: '2.5rem' }}
                />
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Ambassador Academy</h2>
                  <p className="text-sm text-academy-grey">Education For Excellence</p>
                </div>
              </div>
              <button
                onClick={closeMenu}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Minimal Mobile Navigation Links */}
            <nav className="flex-1 overflow-y-auto py-8 px-6 sm:hidden">
              <div className="flex flex-col space-y-4">
                {navLinks.map(link => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={closeMenu}
                    className="block w-full text-center py-4 rounded-lg font-semibold text-lg text-gray-700 bg-gray-100 hover:bg-academy-maroon hover:text-white transition-colors duration-200 shadow-sm"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Full navigation for desktop/tablet only */}
            <nav className="hidden sm:flex-1 sm:overflow-y-auto sm:py-6 sm:px-6">
              <div className="px-6 space-y-2">
                {navLinks.map(link => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={closeMenu}
                    className={`block px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                      location.pathname === link.path 
                        ? 'bg-academy-maroon text-white' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-academy-maroon'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;