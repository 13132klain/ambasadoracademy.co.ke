export interface TransportRoute {
  id: string;
  name: string;
  areas: string[];
  schedule: {
    morning: string;
    evening: string;
  };
}

export interface TransportFee {
  zone: string;
  fee: number;
  description: string;
}

export const transportRoutes: TransportRoute[] = [
  {
    id: 'route-1',
    name: 'Route 1: Ongata Rongai Main',
    areas: ['Kiserian', 'Matasia', 'Ongata Rongai Town', 'Tuskys', 'Maasai Lodge'],
    schedule: {
      morning: '6:00 AM - 7:00 AM',
      evening: '4:30 PM - 5:30 PM',
    },
  },
  {
    id: 'route-2',
    name: 'Route 2: Nkoroi & Kware',
    areas: ['Nkoroi', 'Kware', 'Mayor', 'Kandisi', 'Rangau'],
    schedule: {
      morning: '6:15 AM - 7:15 AM',
      evening: '4:45 PM - 5:45 PM',
    },
  },
  {
    id: 'route-3',
    name: 'Route 3: Gataka & Muthaura',
    areas: ['Gataka', 'Muthaura', 'Kandisi-Kobil', 'Rimpa', 'Olekasasi'],
    schedule: {
      morning: '6:00 AM - 7:00 AM',
      evening: '4:30 PM - 5:30 PM',
    },
  },
];

export const transportFees: TransportFee[] = [
  {
    zone: 'Muthaura and Kambi Moto',
    fee: 5000,
    description: 'Areas within a 5km radius of the school.',
  },
  {
    zone: 'Ole Kasasi',
    fee: 6000,
    description: 'Ole Kasasi and its environs',
  },
  {
    zone: 'Maasai Lodge',
    fee: 7000,
    description: 'Maasai Lodge and areas near it.',
  },
  {
    zone: 'Rimpa',
    fee: 6000,
    description: 'Rimpa and its environs.',
  },
  {
    zone: 'Metro',
    fee: 4500,
    description: 'Metro and its environs.',
  },
  {
    zone: 'Green Village',
    fee: 6000,
    description: 'Green Village and its environs.',
  },
  {
    zone: 'Ambassador Environs',
    fee: 3800,
    description: 'Areas near the schoool.',
  },
  {
    zone: 'Rangau Interior',
    fee: 5000,
    description: 'Interior of Rangau.',
  },
  
  
  
]; 