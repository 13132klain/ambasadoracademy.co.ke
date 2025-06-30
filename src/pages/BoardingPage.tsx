import React, { useState } from 'react';
import { CheckCircle, Shield, BookOpen, Users, Star, Home, Utensils, Heart, Bed, Calendar, Phone, Dumbbell, Stethoscope } from 'lucide-react';
import { feeStructure as academyFeeStructure } from '../data/feeStructure';

const BoardingPage: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<'primary' | 'junior-secondary'>('primary');

  const getBoardingFees = () => {
    const levelKey = selectedLevel === 'junior-secondary' ? 'juniorSecondary' : 'primary';
    return academyFeeStructure.boardingSchool[levelKey];
  };

  return (
    <>
      <section id="boarding" className="py-20 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-academy-maroon">Boarding School Fees</h1>
            <p className="text-lg text-academy-grey max-w-2xl mx-auto">
              View the latest boarding fee structure for each school category. For any questions, please <a href="/contact" className="text-academy-blue underline hover:text-academy-maroon">contact us</a>.
            </p>
          </div>
          <div className="flex justify-center mb-8 gap-4">
            <button
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${selectedLevel === 'primary' ? 'bg-academy-maroon text-white' : 'bg-gray-100 text-academy-maroon hover:bg-academy-maroon/10'}`}
              onClick={() => setSelectedLevel('primary')}
              type="button"
            >
              Primary School Boarding
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${selectedLevel === 'junior-secondary' ? 'bg-academy-maroon text-white' : 'bg-gray-100 text-academy-maroon hover:bg-academy-maroon/10'}`}
              onClick={() => setSelectedLevel('junior-secondary')}
              type="button"
            >
              Junior Secondary Boarding
            </button>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-academy-maroon/20 mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                {selectedLevel === 'junior-secondary' ? 'Junior Secondary Boarding' : 'Primary School Boarding'}
              </h4>
              <div className="space-y-2">
                {(() => {
                  const boardingFees = getBoardingFees();
                  return [
                    ...boardingFees.fees.map(fee => ({ key: fee.name, value: fee.amount, type: 'fee' })),
                    { key: 'Total Per Term', value: boardingFees.total, type: 'total' }
                  ].map((item) => (
                    <div key={item.key} className={`flex flex-col sm:flex-row justify-between items-center p-2 rounded-lg ${
                      item.type === 'total' ? 'bg-academy-maroon text-white font-bold' : 'bg-gray-50'
                    }`}>
                      <span className={item.type === 'total' ? 'text-white' : 'text-academy-grey'}>
                        {item.key}:
                      </span>
                      <span className={`font-semibold ${
                        item.type === 'total' ? 'text-white text-lg sm:text-xl' :
                        item.key.includes('Admission') ? 'text-academy-maroon' :
                        item.key.includes('Tuition') ? 'text-academy-blue' : 'text-gray-700'
                      }`}>
                        {item.value}
                      </span>
                    </div>
                  ));
                })()}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <h5 className="font-semibold text-green-800 mb-2">What's Included:</h5>
                <ul className="text-green-700 text-sm space-y-1">
                  {academyFeeStructure.boardingIncludes.map((item, index) => (
                    <li key={index} className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-600" />{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <h5 className="font-semibold text-blue-800 mb-2">Payment Options:</h5>
                <ul className="text-blue-700 text-sm space-y-1">
                  {academyFeeStructure.paymentInfo.methods.map((method, index) => (
                    <li key={index} className="mb-2">
                      <div className="font-semibold text-academy-blue">{method.name}</div>
                      {method.details && <div className="ml-2">{method.details}</div>}
                      {method.accountNumber && <div className="ml-2">Account Number: <span className="font-mono">{method.accountNumber}</span></div>}
                      {method.paybillNumber && <div className="ml-2">Paybill Number: <span className="font-mono">{method.paybillNumber}</span></div>}
                      {method.instructions && <div className="ml-2 text-xs text-blue-700 italic">{method.instructions}</div>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Boarding Facilities Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-academy-maroon mb-10 text-center">Boarding Facilities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Facility Card: Modern Dormitories */}
            <div className="group bg-gray-50 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:bg-academy-maroon hover:text-white hover:scale-105 hover:shadow-2xl cursor-pointer">
              <Home className="h-10 w-10 mb-3 text-academy-maroon group-hover:text-white transition-all duration-300" />
              <h3 className="text-lg font-bold mb-2">Modern Dormitories</h3>
              <p className="text-academy-grey group-hover:text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">Comfortable, well-ventilated rooms with secure storage and cozy beds.</p>
            </div>
            {/* Facility Card: Study Halls */}
            <div className="group bg-gray-50 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:bg-academy-maroon hover:text-white hover:scale-105 hover:shadow-2xl cursor-pointer">
              <BookOpen className="h-10 w-10 mb-3 text-academy-maroon group-hover:text-white transition-all duration-300" />
              <h3 className="text-lg font-bold mb-2">Supervised Study Halls</h3>
              <p className="text-academy-grey group-hover:text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">Quiet, well-lit spaces for homework, group work, and academic support.</p>
            </div>
            {/* Facility Card: Nutritious Dining */}
            <div className="group bg-gray-50 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:bg-academy-maroon hover:text-white hover:scale-105 hover:shadow-2xl cursor-pointer">
              <Utensils className="h-10 w-10 mb-3 text-academy-maroon group-hover:text-white transition-all duration-300" />
              <h3 className="text-lg font-bold mb-2">Nutritious Dining</h3>
              <p className="text-academy-grey group-hover:text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">Balanced, tasty meals and snacks prepared fresh every day.</p>
            </div>
            {/* Facility Card: 24/7 Security */}
            <div className="group bg-gray-50 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:bg-academy-maroon hover:text-white hover:scale-105 hover:shadow-2xl cursor-pointer">
              <Shield className="h-10 w-10 mb-3 text-academy-maroon group-hover:text-white transition-all duration-300" />
              <h3 className="text-lg font-bold mb-2">24/7 Security</h3>
              <p className="text-academy-grey group-hover:text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">Trained staff, secure campus, and round-the-clock supervision.</p>
            </div>
            {/* Facility Card: Recreation & Sports */}
            <div className="group bg-gray-50 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:bg-academy-maroon hover:text-white hover:scale-105 hover:shadow-2xl cursor-pointer">
              <Dumbbell className="h-10 w-10 mb-3 text-academy-maroon group-hover:text-white transition-all duration-300" />
              <h3 className="text-lg font-bold mb-2">Recreation & Sports</h3>
              <p className="text-academy-grey group-hover:text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">Spacious fields, courts, and equipment for all interests.</p>
            </div>
            {/* Facility Card: Medical Care */}
            <div className="group bg-gray-50 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:bg-academy-maroon hover:text-white hover:scale-105 hover:shadow-2xl cursor-pointer">
              <Stethoscope className="h-10 w-10 mb-3 text-academy-maroon group-hover:text-white transition-all duration-300" />
              <h3 className="text-lg font-bold mb-2">Medical Care</h3>
              <p className="text-academy-grey group-hover:text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">On-site medical care and first aid for all boarders.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BoardingPage;