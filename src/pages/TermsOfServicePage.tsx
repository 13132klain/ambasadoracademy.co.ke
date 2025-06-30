import React from 'react';
import { FileText, Shield, Users, BookOpen, Mail, Phone, AlertTriangle, CheckCircle, Clock, Globe } from 'lucide-react';
import { useScrollAnimation } from '../utils/useScrollAnimation';

const TermsOfServicePage: React.FC = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: contactRef, isVisible: contactVisible } = useScrollAnimation<HTMLDivElement>();

  const termsSections = [
    {
      icon: Users,
      title: 'Acceptance of Terms',
      content: [
        'By accessing and using this website, you accept and agree to be bound by these terms and conditions',
        'If you disagree with any part of these terms, you may not access our services',
        'These terms apply to all visitors, users, and others who access or use our services',
        'We reserve the right to modify these terms at any time',
        'Continued use of our services after changes constitutes acceptance of new terms'
      ]
    },
    {
      icon: BookOpen,
      title: 'Educational Services',
      content: [
        'Ambassador Academy provides educational services for students from Kindergarten to Junior Secondary',
        'All academic programs follow the national curriculum guidelines',
        'We maintain high standards of education and student welfare',
        'Regular assessments and progress reports are provided to parents',
        'Extra-curricular activities are offered to enhance student development'
      ]
    },
    {
      icon: Shield,
      title: 'Student Conduct and Safety',
      content: [
        'Students must adhere to school rules and regulations',
        'Respect for teachers, staff, and fellow students is mandatory',
        'Bullying, harassment, or disruptive behavior will not be tolerated',
        'School uniform and dress code must be followed',
        'Safety protocols must be observed at all times'
      ]
    },
    {
      icon: Clock,
      title: 'Attendance and Punctuality',
      content: [
        'Regular attendance is required for all enrolled students',
        'Parents must notify the school of absences in advance',
        'Late arrivals may result in disciplinary action',
        'Excessive absences may affect academic progress',
        'School hours and schedules must be strictly followed'
      ]
    },
    {
      icon: Globe,
      title: 'Website Usage',
      content: [
        'This website is for informational and educational purposes only',
        'Users may not use the website for any unlawful purpose',
        'Content may not be reproduced without permission',
        'We are not responsible for external links or third-party content',
        'Website availability is not guaranteed and may be interrupted'
      ]
    },
    {
      icon: AlertTriangle,
      title: 'Limitation of Liability',
      content: [
        'We strive to provide accurate and up-to-date information',
        'We are not liable for any damages arising from website use',
        'Educational outcomes may vary based on individual circumstances',
        'We are not responsible for third-party services or content',
        'Force majeure events may affect service delivery'
      ]
    }
  ];

  const feeStructure = [
    { item: 'Tuition Fees', description: 'Payable per term as per current fee structure' },
    { item: 'Transport Fees', description: 'Optional service based on distance zones' },
    { item: 'Boarding Fees', description: 'For students using boarding facilities' },
    { item: 'Extra-curricular', description: 'Additional fees for specialized programs' },
    { item: 'Late Payment', description: 'Penalties may apply for overdue payments' }
  ];

  const parentResponsibilities = [
    'Ensure regular attendance and punctuality',
    'Pay fees on time as per agreed schedule',
    'Support school policies and disciplinary measures',
    'Attend parent-teacher meetings and school events',
    'Provide accurate and updated contact information',
    'Support homework and academic activities at home'
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className={`text-center mb-16 animate-on-scroll ${headerVisible ? 'animate-fade-in-up' : ''}`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-academy-maroon to-academy-blue rounded-full mb-6">
            <FileText className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-xl text-academy-grey max-w-3xl mx-auto">
            Please read these terms and conditions carefully before using our services or website.
          </p>
          <div className="mt-6 text-sm text-academy-grey">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
          <p className="text-academy-grey leading-relaxed mb-4">
            These Terms of Service ("Terms") govern your use of Ambassador Academy's website and services. 
            By accessing or using our services, you agree to be bound by these Terms and our Privacy Policy.
          </p>
          <p className="text-academy-grey leading-relaxed">
            Ambassador Academy reserves the right to modify these terms at any time. Changes will be effective 
            immediately upon posting on this page. Your continued use of our services after any changes constitutes 
            acceptance of the new terms.
          </p>
        </div>

        {/* Terms Sections */}
        <div ref={contentRef} className={`space-y-8 animate-on-scroll ${contentVisible ? 'animate-fade-in-up' : ''}`}>
          {termsSections.map((section, index) => (
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

        {/* Fee Structure */}
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Fee Structure and Payments</h3>
          <div className="space-y-4">
            {feeStructure.map((fee, index) => (
              <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900">{fee.item}</h4>
                  <p className="text-sm text-academy-grey">{fee.description}</p>
                </div>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Parent Responsibilities */}
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Parent/Guardian Responsibilities</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {parentResponsibilities.map((responsibility, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-academy-maroon mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-academy-grey">{responsibility}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Intellectual Property */}
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h3>
          <p className="text-academy-grey leading-relaxed mb-4">
            All content on this website, including text, graphics, logos, images, and software, is the property 
            of Ambassador Academy and is protected by copyright laws.
          </p>
          <ul className="space-y-2 text-academy-grey">
            <li>• Content may not be reproduced, distributed, or used without permission</li>
            <li>• School logos and branding are protected trademarks</li>
            <li>• Student work may be displayed with appropriate permissions</li>
            <li>• Third-party content is used with proper attribution</li>
          </ul>
        </div>

        {/* Termination */}
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Termination and Withdrawal</h3>
          <p className="text-academy-grey leading-relaxed mb-4">
            Either party may terminate this agreement with appropriate notice. Students may be withdrawn for 
            violations of school policies or failure to meet academic standards.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Withdrawal Process</h4>
              <ul className="text-sm text-academy-grey space-y-1">
                <li>• Written notice required</li>
                <li>• Outstanding fees must be settled</li>
                <li>• Academic records will be provided</li>
                <li>• School property must be returned</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Refund Policy</h4>
              <ul className="text-sm text-academy-grey space-y-1">
                <li>• Pro-rated refunds may apply</li>
                <li>• Administrative fees may be deducted</li>
                <li>• Refund processing takes 30 days</li>
                <li>• Special circumstances considered</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div ref={contactRef} className={`bg-gradient-to-r from-academy-maroon to-academy-blue text-white p-8 rounded-2xl animate-on-scroll ${contactVisible ? 'animate-fade-in-up' : ''}`}>
          <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
          <p className="mb-6 leading-relaxed">
            If you have any questions about these Terms of Service, please contact us:
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
            <strong>Note:</strong> These Terms of Service may be updated from time to time. We will notify you of any changes 
            by posting the new Terms on this page and updating the "Last updated" date.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TermsOfServicePage; 