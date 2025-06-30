import React from 'react';
import { Link } from 'react-router-dom';
import { Map, Home, Users, BookOpen, GraduationCap, Building, Bus, Home as HomeIcon, Camera, Mail, Shield, FileText } from 'lucide-react';
import { useScrollAnimation } from '../utils/useScrollAnimation';

const SitemapPage: React.FC = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation<HTMLDivElement>();

  const sitemapSections = [
    {
      title: 'Main Pages',
      icon: Home,
      links: [
        { name: 'Home', path: '/', description: 'Welcome to Ambassador Academy' },
        { name: 'About Us', path: '/about', description: 'Learn about our school and mission' },
        { name: 'Programs', path: '/programs', description: 'Academic programs and curriculum' },
        { name: 'Admissions', path: '/admissions', description: 'How to apply and admission process' },
        { name: 'Facilities', path: '/facilities', description: 'Our world-class facilities' },
        { name: 'Transport', path: '/transport', description: 'Transportation services' },
        { name: 'Boarding', path: '/boarding', description: 'Boarding facilities and services' },
        { name: 'Gallery', path: '/gallery', description: 'Photo gallery and school life' },
        { name: 'Contact', path: '/contact', description: 'Get in touch with us' }
      ]
    },
    {
      title: 'Academic Programs',
      icon: BookOpen,
      links: [
        { name: 'Kindergarten', path: '/programs#kindergarten', description: 'Early childhood education' },
        { name: 'Primary School', path: '/programs#primary', description: 'Primary education (Grades 1-8)' },
        { name: 'Junior Secondary', path: '/programs#secondary', description: 'Secondary education' },
        { name: 'Academic Calendar', path: '/academic-calendar', description: 'School calendar and events' },
        { name: 'Fee Structure', path: '/admissions#fees', description: 'Tuition and other fees' }
      ]
    },
    {
      title: 'Facilities & Services',
      icon: Building,
      links: [
        { name: 'Modern Classrooms', path: '/facilities#classrooms', description: 'State-of-the-art learning spaces' },
        { name: 'Science Laboratories', path: '/facilities#labs', description: 'Fully equipped science labs' },
        { name: 'Library & Media Center', path: '/facilities#library', description: 'Comprehensive library resources' },
        { name: 'Sports Facilities', path: '/facilities#sports', description: 'Athletic fields and courts' },
        { name: 'Computer Lab', path: '/facilities#computer', description: 'Technology and digital learning' },
        { name: 'Music & Arts Room', path: '/facilities#arts', description: 'Creative arts and music' },
        { name: 'Transport Services', path: '/transport', description: 'Safe and reliable transportation' },
        { name: 'Boarding Facilities', path: '/boarding', description: 'Comfortable boarding options' }
      ]
    },
    {
      title: 'Support & Information',
      icon: Users,
      links: [
        { name: 'Emergency Contacts', path: '/transport#emergency', description: '24/7 emergency contact information' },
        { name: 'Parent Portal', path: '/contact#portal', description: 'Access to student information' },
        { name: 'FAQ', path: '/contact#faq', description: 'Frequently asked questions' },
        { name: 'Student Life', path: '/about#student-life', description: 'Life at Ambassador Academy' },
        { name: 'Apply Now', path: '/', description: 'Start your application process' }
      ]
    },
    {
      title: 'Legal & Policies',
      icon: Shield,
      links: [
        { name: 'Privacy Policy', path: '/privacy-policy', description: 'How we protect your privacy' },
        { name: 'Terms of Service', path: '/terms-of-service', description: 'Terms and conditions of use' },
        { name: 'Data Protection', path: '/privacy-policy#data-protection', description: 'Data security measures' },
        { name: 'Cookie Policy', path: '/privacy-policy#cookies', description: 'Website cookie usage' }
      ]
    }
  ];

  const quickAccess = [
    { name: 'Apply for Admission', path: '/', icon: GraduationCap, color: 'from-academy-maroon to-academy-blue' },
    { name: 'View Facilities', path: '/facilities', icon: Building, color: 'from-green-500 to-blue-500' },
    { name: 'Transport Information', path: '/transport', icon: Bus, color: 'from-purple-500 to-pink-500' },
    { name: 'Contact Us', path: '/contact', icon: Mail, color: 'from-orange-500 to-red-500' },
    { name: 'Photo Gallery', path: '/gallery', icon: Camera, color: 'from-indigo-500 to-purple-500' },
    { name: 'About Our School', path: '/about', icon: HomeIcon, color: 'from-teal-500 to-cyan-500' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className={`text-center mb-16 animate-on-scroll ${headerVisible ? 'animate-fade-in-up' : ''}`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-academy-maroon to-academy-blue rounded-full mb-6">
            <Map className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Website Sitemap</h1>
          <p className="text-xl text-academy-grey max-w-3xl mx-auto">
            Navigate through all pages and sections of the Ambassador Academy website.
          </p>
        </div>

        {/* Quick Access */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Quick Access</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickAccess.map((item, index) => (
              <Link 
                key={index}
                to={item.path}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${item.color} rounded-full mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-academy-maroon transition-colors">
                  {item.name}
                </h3>
                <div className="w-8 h-0.5 bg-academy-maroon transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </Link>
            ))}
          </div>
        </div>

        {/* Detailed Sitemap */}
        <div ref={contentRef} className={`animate-on-scroll ${contentVisible ? 'animate-fade-in-up' : ''}`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Complete Site Structure</h2>
          <div className="space-y-8">
            {sitemapSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-academy-maroon to-academy-blue rounded-full mr-4">
                    <section.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{section.title}</h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.links.map((link, linkIndex) => (
                    <div key={linkIndex} className="group">
                      <Link 
                        to={link.path}
                        className="block p-4 rounded-lg border border-gray-200 hover:border-academy-maroon hover:bg-academy-maroon/5 transition-all duration-300"
                      >
                        <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-academy-maroon transition-colors">
                          {link.name}
                        </h4>
                        <p className="text-sm text-academy-grey leading-relaxed">
                          {link.description}
                        </p>
                        <div className="mt-2 flex items-center text-academy-maroon opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-xs font-medium">Visit Page</span>
                          <div className="w-4 h-0.5 bg-academy-maroon ml-2 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search Tips */}
        <div className="mt-16 bg-gradient-to-r from-academy-maroon to-academy-blue text-white p-8 rounded-2xl">
          <h3 className="text-2xl font-bold mb-6">Navigation Tips</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-3">Quick Navigation</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li>• Use the main navigation menu for primary pages</li>
                <li>• Footer links provide quick access to important information</li>
                <li>• Breadcrumbs help you track your location on the site</li>
                <li>• Search functionality is available on all pages</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Getting Help</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li>• Contact page for general inquiries</li>
                <li>• FAQ section for common questions</li>
                <li>• Emergency contacts for urgent matters</li>
                <li>• Social media for updates and news</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="mt-8 text-center">
          <p className="text-academy-grey text-sm">
            Sitemap last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SitemapPage; 