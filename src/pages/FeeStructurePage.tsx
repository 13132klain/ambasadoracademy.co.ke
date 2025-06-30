import React from 'react';
import { FileText, Download, CreditCard, Hash } from 'lucide-react';
import { feeStructure as academyFeeStructure } from '../data/feeStructure';

const feeStructures = [
  {
    label: 'Kindergarten',
    file: '/fee-structures/day-school-primary-fee.pdf',
    description: 'Fee structure for Kindergarten students (Day School).',
  },
  {
    label: 'Primary Day',
    file: '/fee-structures/day-school-primary-fee.pdf',
    description: 'Fee structure for Primary Day students.',
  },
  {
    label: 'Primary Boarding',
    file: '/fee-structures/BOARDING PRIMARY BOARDING FEES STRUCTURE.pdf',
    description: 'Fee structure for Primary Boarding students.',
  },
  {
    label: 'Junior Secondary Boarding',
    file: '/fee-structures/BOARDING JUNIOR SCHOOL FEES STRUCTURE  2025.pdf',
    description: 'Fee structure for Junior Secondary Boarding students.',
  },
];

const FeeStructurePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-academy-maroon">School Fees Structure</h1>
        <p className="text-lg text-academy-grey max-w-2xl mx-auto">
          Download the latest fee structures for each school category. All files are in PDF format and provide detailed breakdowns for tuition, boarding, and other charges. For any questions, please <a href="/contact" className="text-academy-blue underline hover:text-academy-maroon">contact us</a>.
        </p>
      </div>
      {/* Fee Structure Cards */}
      <div className="grid gap-8 sm:grid-cols-2 mb-12">
        {feeStructures.map((item) => (
          <div key={item.label} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300">
            <div className="bg-gradient-to-r from-academy-maroon to-academy-blue p-4 rounded-full mb-4">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-xl font-bold mb-2 text-gray-900">{item.label}</h2>
            <p className="text-academy-grey mb-4 text-sm">{item.description}</p>
            <a
              href={item.file}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-academy-blue text-white px-5 py-2 rounded-lg font-semibold hover:bg-academy-maroon transition"
            >
              <Download className="h-5 w-5" />
              Download PDF
            </a>
          </div>
        ))}
      </div>
      {/* Payment Option Card */}
      <div className="bg-blue-50 rounded-2xl shadow-lg p-8 border border-blue-200 max-w-2xl mx-auto mb-12">
        <h3 className="text-xl font-bold text-blue-800 mb-6 text-center">Payment Options</h3>
        <ul className="text-blue-900 text-base divide-y divide-blue-100">
          {academyFeeStructure.paymentInfo.methods.map((method, index) => (
            <li key={index} className="py-4 first:pt-0 last:pb-0">
              <div className="font-semibold text-academy-blue text-lg flex items-center gap-2 mb-1">
                <CreditCard className="h-5 w-5 text-blue-400" /> {method.name}
              </div>
              {method.details && <div className="ml-7 text-blue-900 text-sm mb-1">{method.details}</div>}
              {method.accountNumber && (
                <div className="ml-7 flex items-center gap-2 bg-blue-100 rounded px-2 py-1 text-blue-900 text-sm font-mono mb-1">
                  <Hash className="h-4 w-4 text-blue-500" />
                  <span>Account Number:</span>
                  <span className="font-bold">{method.accountNumber}</span>
                </div>
              )}
              {method.paybillNumber && (
                <div className="ml-7 flex items-center gap-2 bg-blue-100 rounded px-2 py-1 text-blue-900 text-sm font-mono mb-1">
                  <Hash className="h-4 w-4 text-blue-500" />
                  <span>Paybill Number:</span>
                  <span className="font-bold">{method.paybillNumber}</span>
                </div>
              )}
              {method.instructions && <div className="ml-7 text-xs text-blue-700 italic mt-1">{method.instructions}</div>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeeStructurePage; 