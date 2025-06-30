import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, Building, User, MessageSquare } from 'lucide-react';
import { useScrollAnimation } from '../utils/useScrollAnimation';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const { elementRef: formRef, isVisible: formVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: infoRef, isVisible: infoVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: mapRef, isVisible: mapVisible } = useScrollAnimation<HTMLDivElement>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send data to an API)
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-academy-maroon to-academy-blue rounded-full mb-6">
            <MapPin className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-academy-grey max-w-3xl mx-auto">
            Get in touch with us. We're here to help and answer any questions you may have.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div ref={formRef} className={`bg-white p-8 rounded-2xl shadow-lg animate-on-scroll ${formVisible ? 'animate-fade-in-left' : ''}`}>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <User className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-blue"
                />
              </div>
              <div className="relative">
                <Mail className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-blue"
                />
              </div>
              <div className="relative">
                <MessageSquare className="absolute top-5 left-3 text-gray-400" />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-blue"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-academy-maroon to-academy-blue text-white py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover-lift"
              >
                <span>Send Message</span>
                <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div ref={infoRef} className={`bg-white p-8 rounded-2xl shadow-lg animate-on-scroll ${infoVisible ? 'animate-fade-in-right' : ''}`}>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-academy-maroon/10 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-academy-maroon" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-800">Our Address</h4>
                    <p className="text-academy-grey">Ambassador Academy, Rongai, Kajiado County, Kenya</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-academy-blue/10 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-academy-blue" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-800">Call Us</h4>
                    <p className="text-academy-grey">+254797727230</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-academy-maroon/10 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-academy-maroon" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-800">Email Us</h4>
                    <p className="text-academy-grey">theambasadoracademy00@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-academy-blue/10 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-academy-blue" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-800">Office Hours</h4>
                    <p className="text-academy-grey">Monday - Friday: 8:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div ref={mapRef} className={`bg-white rounded-2xl shadow-lg overflow-hidden animate-on-scroll ${mapVisible ? 'animate-scale-in' : ''}`}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.733923482202!2d36.72189441475438!3d-1.336996399026689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1d8c11add53b%3A0x28639c3e3a530f2c!2sRongai!5e0!3m2!1sen!2ske!4v1628594276774!5m2!1sen!2ske"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                title="Ambassador Academy Location"
                className="hover-lift"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;