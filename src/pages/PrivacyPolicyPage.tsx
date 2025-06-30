import React from 'react';
import { Shield, Lock, Eye, Users, Database, Globe, Mail, Phone } from 'lucide-react';
import { useScrollAnimation } from '../utils/useScrollAnimation';

const PrivacyPolicyPage: React.FC = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: contactRef, isVisible: contactVisible } = useScrollAnimation<HTMLDivElement>();

  const privacySections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: [
        'Personal information (name, contact details, academic records)',
        'Student information (age, grade level, emergency contacts)',
        'Parent/Guardian information (contact details, relationship)',
        'Website usage data (cookies, analytics)',
        'Communication records (emails, phone calls)'
      ]
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: [
        'To provide educational services and support',
        'To communicate with parents and students',
        'To maintain academic records and progress tracking',
        'To ensure student safety and security',
        'To improve our services and website experience'
      ]
    },
    {
      icon: Lock,
      title: 'Data Protection',
      content: [
        'All data is encrypted and securely stored',
        'Access is restricted to authorized personnel only',
        'Regular security audits and updates',
        'Compliance with data protection regulations',
        'Secure transmission of sensitive information'
      ]
    },
    {
      icon: Users,
      title: 'Information Sharing',
      content: [
        'We do not sell or rent personal information',
        'Information may be shared with educational authorities as required',
        'Emergency situations may require sharing with relevant authorities',
        'Parental consent required for third-party sharing',
        'Aggregated, anonymous data may be used for research'
      ]
    },
    {
      icon: Globe,
      title: 'Your Rights',
      content: [
        'Right to access your personal information',
        'Right to correct inaccurate information',
        'Right to request deletion of information',
        'Right to withdraw consent at any time',
        'Right to file a complaint about data handling'
      ]
    },
    {
      icon: Shield,
      title: 'Data Retention',
      content: [
        'Student records retained for required academic period',
        'Parent information retained while student is enrolled',
        'Website data retained for analytics purposes',
        'Secure disposal of data when no longer needed',
        'Compliance with legal retention requirements'
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className={`text-center mb-16 animate-on-scroll ${headerVisible ? 'animate-fade-in-up' : ''}`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-academy-maroon to-academy-blue rounded-full mb-6">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-academy-grey max-w-3xl mx-auto">
            At Ambassador Academy, we are committed to protecting your privacy and ensuring the security of your personal information.
          </p>
          <div className="mt-6 text-sm text-academy-grey">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Privacy</h2>
          <p className="text-academy-grey leading-relaxed mb-4">
            Ambassador Academy respects your privacy and is committed to protecting your personal information. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
            visit our website, use our services, or interact with us.
          </p>
          <p className="text-academy-grey leading-relaxed">
            By using our services, you agree to the collection and use of information in accordance with this policy. 
            We will not use or share your information with anyone except as described in this Privacy Policy.
          </p>
        </div>

        {/* Privacy Sections */}
        <div ref={contentRef} className={`space-y-8 animate-on-scroll ${contentVisible ? 'animate-fade-in-up' : ''}`}>
          {privacySections.map((section, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-academy-maroon to-academy-blue rounded-full mr-4">
                  <section.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{section.title}</h3>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="w-2 h-2 bg-academy-maroon rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-academy-grey leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Cookies Policy */}
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h3>
          <p className="text-academy-grey leading-relaxed mb-4">
            Our website uses cookies to enhance your browsing experience. Cookies are small text files stored on your device 
            that help us provide and improve our services.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Essential Cookies</h4>
              <p className="text-sm text-academy-grey">Required for basic website functionality and security.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Analytics Cookies</h4>
              <p className="text-sm text-academy-grey">Help us understand how visitors use our website.</p>
            </div>
          </div>
        </div>

        {/* Children's Privacy */}
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h3>
          <p className="text-academy-grey leading-relaxed mb-4">
            We are committed to protecting the privacy of children. Our services are designed for educational purposes 
            and we collect information about children only with parental consent.
          </p>
          <ul className="space-y-2 text-academy-grey">
            <li>• Parental consent is required for collecting information from children under 13</li>
            <li>• We do not knowingly collect personal information from children without consent</li>
            <li>• Parents can review, modify, or delete their child's information</li>
            <li>• We use appropriate security measures to protect children's data</li>
          </ul>
        </div>

        {/* Contact Information */}
        <div ref={contactRef} className={`bg-gradient-to-r from-academy-maroon to-academy-blue text-white p-8 rounded-2xl animate-on-scroll ${contactVisible ? 'animate-fade-in-up' : ''}`}>
          <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
          <p className="mb-6 leading-relaxed">
            If you have any questions about this Privacy Policy or our data practices, please contact us:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-3" />
              <span>theambasadoracademy00@gmail.com</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 mr-3" />
              <span>+254797727230</span>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-sm opacity-90">
              Ambassador Academy<br />
              Rongai, Kajiado County, Kenya
            </p>
          </div>
        </div>

        {/* Updates */}
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <p className="text-academy-grey">
            <strong>Note:</strong> This Privacy Policy may be updated from time to time. We will notify you of any changes 
            by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicyPage; 