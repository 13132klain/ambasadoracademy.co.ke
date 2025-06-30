export interface FeeItem {
  name: string;
  amount: string;
  description?: string;
}

export interface FeeLevel {
  title: string;
  subtitle?: string;
  fees: FeeItem[];
  total: string;
  notes?: string[];
}

export interface PaymentMethod {
  name: string;
  details?: string;
  accountNumber?: string;
  paybillNumber?: string;
  instructions?: string;
}

export interface FeeStructure {
  schoolName: string;
  academicYear: string;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
    website: string;
  };
  daySchool: {
    [key: string]: FeeLevel;
  };
  boardingSchool: {
    [key: string]: FeeLevel;
  };
  paymentInfo: {
    terms: string[];
    discounts: string[];
    methods: PaymentMethod[];
  };
  boardingIncludes: string[];
  scholarships: string[];
  importantDates: {
    [key: string]: string;
  };
  requiredDocuments: string[];
  additionalInfo?: string[];
}

// CUSTOMIZE YOUR FEE STRUCTURE HERE
export const feeStructure: FeeStructure = {
  schoolName: "Ambassador Academy",
  academicYear: "2025",
  contactInfo: {
    phone: "+254797727230",
    email: "theambasadoracademy00@gmail.com",
    address: "Rongai, Kajiado County, Kenya",
    website: "www.ambassadoracademy.ac.ke"
  },
  
  daySchool: {
    kindergarten: {
      title: "Kindergarten (Ages 3-6)",
      subtitle: "Baby Class, Middle Class, Top Class",
      fees: [
        { name: "Admission Fee", amount: "KES 1,000", description: "One-time payment" },
        { name: "Tuition Fee", amount: "KES 10,000", description: "Per term" },
        { name: "Development Fee", amount: "KES 0", description: "Per term" }
      ],
      total: "KES 10,000",
      notes: [
        "3 years program duration",
        "Maximum 20 students per class",
        "Play-based learning approach"
      ]
    },
    
    primary: {
      title: "Primary School (Grades 1-6)",
      subtitle: "Comprehensive primary education",
      fees: [
        { name: "Admission Fee", amount: "KES 1,000", description: "One-time payment" },
        { name: "Tuition Fee", amount: "KES 12,000", description: "Per term" },
        { name: "Development Fee", amount: "KES 0 ", description: "Per term" }
      ],
      total: "KES 12,000",
      notes: [
        "8 years program duration",
        "Maximum 25 students per class",
        "Kenyan National Curriculum"
      ]
    },
    
    juniorSecondary: {
      title: "Junior Secondary (Grades 7-9)",
      subtitle: "Advanced learning with career guidance",
      fees: [
        { name: "Admission Fee", amount: "KES 0", description: "One-time payment" },
        { name: "Tuition Fee", amount: "KES 15,000", description: "Per term" },
        { name: "Development Fee", amount: "KES 0", description: "Per term" }
      ],
      total: "KES 15,000",
      notes: [
        "3 years program duration",
        "Maximum 30 students per class",
        "Competency-Based Curriculum (CBC)"
      ]
    }
  },
  
  boardingSchool: {
    primary: {
      title: "Primary School Boarding (Grades 1-6)",
      subtitle: "Full boarding experience",
      fees: [
        { name: "Admission Fee", amount: "KES 0", description: "One-time payment" },
        { name: "Tuition Fee", amount: "KES 23,000", description: "Per term" },
        { name: "Boarding Fee", amount: "KES 0", description: "Per term" },
        { name: "Development Fee", amount: "KES 0", description: "Per term" }
      ],
      total: "KES 23,000",
      notes: [
        "Full boarding facilities",
        "24/7 supervision and care",
        "All meals and accommodation included"
      ]
    },
    
    juniorSecondary: {
      title: "Junior Secondary Boarding (Grades 7-9)",
      subtitle: "Advanced boarding program",
      fees: [
        { name: "Admission Fee", amount: "KES 0,000", description: "One-time payment" },
        { name: "Tuition Fee", amount: "KES 25,500", description: "Per term" },
        { name: "Boarding Fee", amount: "KES 0", description: "Per term" },
        { name: "Development Fee", amount: "KES 0", description: "Per term" }
      ],
      total: "KES 25,500",
      notes: [
        "Advanced academic support",
        "Career guidance and counseling",
        "Leadership development programs"
      ]
    }
  },
  
  paymentInfo: {
    terms: [
      "Fees are payable at the beginning of each term",
      "Payment plans available upon request",
      "Bank transfer details available at the administration office"
    ],
    discounts: [],
    methods: [
      {
        name: "Equity Bank",
        details: "Account Name: Ambassador Academy, Branch: Rongai",
        accountNumber: "1234567890",
        instructions: "Please use the student's full name as the payment reference."
      },
      {
        name: "Lipa na Mpesa Paybill (Option 1)",
        paybillNumber: "400222",
        details: "Account: 4086811#NAME OF STUDENT AND CLASS",
        instructions: "Go to M-Pesa > Lipa na Mpesa > Paybill. Enter Paybill 400222, Account: 4086811#NAME OF STUDENT AND CLASS."
      },
      {
        name: "Lipa na Mpesa Paybill (Option 2)",
        paybillNumber: "4088651",
        details: "Account: NAME OF STUDENT AND CLASS",
        instructions: "Go to M-Pesa > Lipa na Mpesa > Paybill. Enter Paybill 4088651, Account: NAME OF STUDENT AND CLASS."
      },
      {
        name: "Cash payment at school office",
        details: "Pay directly at the school's accounts office during working hours."
      }
    ]
  },
  
  boardingIncludes: [
    "Accommodation and bedding",
    "Three meals daily plus snacks",
    "Laundry services",
    "Medical care and first aid",
    "Study supervision and academic support",
    "Recreational activities and sports"
  ],
  
  scholarships: [
    "Merit-based scholarships available for exceptional students",
    "Need-based financial aid for qualifying families",
    "Academic excellence awards",
    "Sports and arts scholarships"
  ],
  
  importantDates: {
    "Application Deadline": "March 15, 2025",
    "Assessment Period": "March 20-30, 2025",
    "Term Begins": "April 15, 2025"
  },
  
  requiredDocuments: [
    "Birth certificate",
    "Immunization records",
    "Previous school reports (if applicable)",
    "Parent/Guardian ID copies",
    "Passport-size photographs",
    "KCPE certificate (for Junior Secondary)"
  ],
  
  additionalInfo: [
    "This fee structure is valid for the 2025 academic year",
    "Fees are subject to review annually",
    "Special arrangements can be made for families with financial constraints"
  ]
}; 