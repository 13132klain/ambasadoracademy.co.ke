import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp,
  setDoc
} from 'firebase/firestore';
import { db, storage } from '../config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

// Types
export interface Event {
  id?: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'School Event' | 'Meeting' | 'Event' | 'Ceremony' | 'Examination' | 'Public Holiday' | 'School Holiday' | 'Competition' | 'Performance' | 'Religious' | 'Special Day';
  priority: 'high' | 'medium' | 'low';
  attendees?: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  createdAt?: any;
  updatedAt?: any;
}

export interface Application {
  id?: string;
  studentName: string;
  parentName: string;
  email: string;
  phone: string;
  level: 'kindergarten' | 'primary' | 'junior-secondary' | 'senior-secondary';
  type: 'day' | 'boarding';
  dateSubmitted: string;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected' | 'waitlisted';
  documents: string[];
  notes?: string;
  interviewDate?: string;
  interviewTime?: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface Term {
  id?: string;
  name: string;
  startDate: string;
  endDate: string;
  weeks: number;
  holidays: Holiday[];
  events: CalendarEvent[];
  createdAt?: any;
  updatedAt?: any;
}

export interface Holiday {
  id: string;
  name: string;
  date: string;
  type: 'Public Holiday' | 'School Holiday' | 'Mid-Term Break' | 'End of Term';
}

export interface CalendarEvent {
  id: string;
  name: string;
  title?: string;
  date: string;
  type: 'School Event' | 'Meeting' | 'Event' | 'Ceremony' | 'Examination' | 'Competition' | 'Performance' | 'Religious' | 'Special Day';
  description: string;
  duration?: string;
  location?: string;
  isAllDay?: boolean;
  organizer?: string;
  attendees?: string[];
}

export interface GalleryItem {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'Events' | 'Facilities' | 'Students' | 'Staff' | 'Sports' | 'Arts' | 'Academic' | 'Other';
  tags: string[];
  dateUploaded: string;
  dateTaken?: string;
  location?: string;
  photographer?: string;
  featured: boolean;
  createdAt?: any;
  updatedAt?: any;
}

export interface AdminUser {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'super_admin' | 'admin' | 'moderator' | 'viewer';
  department: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface Facility {
  id?: string;
  name: string;
  description: string;
  imageUrl: string;
  category: 'Academic' | 'Sports' | 'Recreational' | 'Boarding' | 'Other';
  capacity?: number;
  location?: string;
  status: 'Available' | 'Under Maintenance' | 'In Use';
  createdAt?: any;
  updatedAt?: any;
}

export interface TransportRoute {
  id?: string;
  routeName: string;
  driverName: string;
  driverContact: string;
  busNumber: string;
  capacity: number;
  stops: { name: string, time: string }[];
  status: 'Active' | 'Inactive' | 'Under Maintenance';
  createdAt?: any;
  updatedAt?: any;
}

export interface TransportRegistration {
  id?: string;
  studentName: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  studentLevel: 'kindergarten' | 'primary' | 'junior-secondary';
  routeId: string;
  routeName: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupTime: string;
  dropoffTime: string;
  specialNeeds?: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  status: 'pending' | 'approved' | 'rejected' | 'waitlisted' | 'cancelled';
  adminNotes?: string;
  approvedBy?: string;
  approvedAt?: any;
  createdAt?: any;
  updatedAt?: any;
}

export interface SiteSettings {
  siteTitle: string;
  contactEmail: string;
  contactPhone: string;
  theme: 'light' | 'dark';
}

// Events Service
export const eventsService = {
  // Get all events
  async getAllEvents(): Promise<Event[]> {
    try {
      const querySnapshot = await getDocs(collection(db, 'events'));
      const events: any[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const validatedEvents = events.filter(event => {
        if (typeof event.title !== 'string' || !event.title) {
          console.warn('Filtered out malformed event object:', event);
          return false;
        }
        return true;
      });

      return validatedEvents as Event[];
    } catch (error) {
      console.error('Error getting events:', error);
      throw error;
    }
  },

  // Get event by ID
  async getEventById(id: string): Promise<Event | null> {
    try {
      const docRef = doc(db, 'events', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Event;
      }
      return null;
    } catch (error) {
      console.error('Error getting event:', error);
      throw error;
    }
  },

  // Add new event
  async addEvent(event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'events'), {
        ...event,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding event:', error);
      throw error;
    }
  },

  // Update event
  async updateEvent(id: string, event: Partial<Event>): Promise<void> {
    try {
      const docRef = doc(db, 'events', id);
      await updateDoc(docRef, {
        ...event,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  },

  // Delete event
  async deleteEvent(id: string): Promise<void> {
    try {
      const docRef = doc(db, 'events', id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }
};

// Admissions Service
export const admissionsService = {
  // Get all applications
  async getAllApplications(): Promise<Application[]> {
    try {
      const querySnapshot = await getDocs(collection(db, 'applications'));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Application[];
    } catch (error) {
      console.error('Error getting applications:', error);
      throw error;
    }
  },

  // Get application by ID
  async getApplicationById(id: string): Promise<Application | null> {
    try {
      const docRef = doc(db, 'applications', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Application;
      }
      return null;
    } catch (error) {
      console.error('Error getting application:', error);
      throw error;
    }
  },

  // Add new application
  async addApplication(application: Omit<Application, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'applications'), {
        ...application,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding application:', error);
      throw error;
    }
  },

  // Update application
  async updateApplication(id: string, application: Partial<Application>): Promise<void> {
    try {
      const docRef = doc(db, 'applications', id);
      // Remove undefined fields before updating
      const cleanApplication = Object.fromEntries(
        Object.entries(application).filter(([_, v]) => v !== undefined)
      );
      await updateDoc(docRef, {
        ...cleanApplication,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating application:', error);
      throw error;
    }
  },

  // Delete application
  async deleteApplication(id: string): Promise<void> {
    try {
      const docRef = doc(db, 'applications', id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting application:', error);
      throw error;
    }
  }
};

// Calendar Service
export const calendarService = {
  // Get all terms
  async getAllTerms(): Promise<Term[]> {
    try {
      const querySnapshot = await getDocs(collection(db, 'terms'));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Term[];
    } catch (error) {
      console.error('Error getting terms:', error);
      throw error;
    }
  },

  // Get term by ID
  async getTermById(id: string): Promise<Term | null> {
    try {
      const docRef = doc(db, 'terms', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Term;
      }
      return null;
    } catch (error) {
      console.error('Error getting term:', error);
      throw error;
    }
  },

  // Add new term
  async addTerm(term: Omit<Term, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'terms'), {
        ...term,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding term:', error);
      throw error;
    }
  },

  // Update term
  async updateTerm(id: string, term: Partial<Term>): Promise<void> {
    try {
      const docRef = doc(db, 'terms', id);
      await updateDoc(docRef, {
        ...term,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating term:', error);
      throw error;
    }
  },

  // Delete term
  async deleteTerm(id: string): Promise<void> {
    try {
      const docRef = doc(db, 'terms', id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting term:', error);
      throw error;
    }
  }
};

// Gallery Service
export const galleryService = {
  // Get all gallery items
  async getAllGalleryItems(): Promise<GalleryItem[]> {
    try {
      const querySnapshot = await getDocs(collection(db, 'gallery'));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GalleryItem[];
    } catch (error) {
      console.error('Error getting gallery items:', error);
      throw error;
    }
  },

  // Get gallery item by ID
  async getGalleryItemById(id: string): Promise<GalleryItem | null> {
    try {
      const docRef = doc(db, 'gallery', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as GalleryItem;
      }
      return null;
    } catch (error) {
      console.error('Error getting gallery item:', error);
      throw error;
    }
  },

  // Add new gallery item
  async addGalleryItem(item: Omit<GalleryItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'gallery'), {
        ...item,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding gallery item:', error);
      throw error;
    }
  },

  // Update gallery item
  async updateGalleryItem(id: string, item: Partial<GalleryItem>): Promise<void> {
    try {
      const docRef = doc(db, 'gallery', id);
      await updateDoc(docRef, {
        ...item,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating gallery item:', error);
      throw error;
    }
  },

  // Delete gallery item
  async deleteGalleryItem(id: string): Promise<void> {
    try {
      const docRef = doc(db, 'gallery', id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      throw error;
    }
  },

  // Get featured gallery items
  async getFeaturedGalleryItems(): Promise<GalleryItem[]> {
    try {
      const q = query(
        collection(db, 'gallery'),
        where('featured', '==', true),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GalleryItem[];
    } catch (error) {
      console.error('Error getting featured gallery items:', error);
      throw error;
    }
  }
};

export const adminUsersService = {
  async getAllAdminUsers(): Promise<AdminUser[]> {
    try {
      const querySnapshot = await getDocs(collection(db, 'adminUsers'));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as AdminUser[];
    } catch (error) {
      console.error('Error getting admin users:', error);
      throw error;
    }
  },
  async addAdminUser(user: Omit<AdminUser, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'adminUsers'), {
        ...user,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding admin user:', error);
      throw error;
    }
  },
  async updateAdminUser(id: string, user: Partial<AdminUser>): Promise<void> {
    try {
      const docRef = doc(db, 'adminUsers', id);
      await updateDoc(docRef, {
        ...user,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating admin user:', error);
      throw error;
    }
  },
  async deleteAdminUser(id: string): Promise<void> {
    try {
      const docRef = doc(db, 'adminUsers', id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting admin user:', error);
      throw error;
    }
  }
};

// File Upload Service
export const fileService = {
  async uploadFile(file: File, path: string): Promise<string> {
    try {
      const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
      const uploadTask = await uploadBytesResumable(storageRef, file);
      const downloadURL = await getDownloadURL(uploadTask.ref);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }
};

// Facilities Service
export const facilitiesService = {
  // Get all facilities
  async getAllFacilities(): Promise<Facility[]> {
    try {
      const querySnapshot = await getDocs(collection(db, 'facilities'));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Facility[];
    } catch (error) {
      console.error('Error getting facilities:', error);
      throw error;
    }
  },

  // Add new facility
  async addFacility(facility: Omit<Facility, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'facilities'), {
        ...facility,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding facility:', error);
      throw error;
    }
  },

  // Update facility
  async updateFacility(id: string, facility: Partial<Facility>): Promise<void> {
    try {
      const docRef = doc(db, 'facilities', id);
      await updateDoc(docRef, {
        ...facility,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating facility:', error);
      throw error;
    }
  },

  // Delete facility
  async deleteFacility(id: string): Promise<void> {
    try {
      const docRef = doc(db, 'facilities', id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting facility:', error);
      throw error;
    }
  }
};

// Transport Service
export const transportService = {
  // Get all transport routes
  async getAllTransportRoutes(): Promise<TransportRoute[]> {
    try {
      const querySnapshot = await getDocs(collection(db, 'transportRoutes'));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as TransportRoute[];
    } catch (error) {
      console.error('Error getting transport routes:', error);
      throw error;
    }
  },

  // Add new transport route
  async addTransportRoute(route: Omit<TransportRoute, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'transportRoutes'), {
        ...route,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding transport route:', error);
      throw error;
    }
  },

  // Update transport route
  async updateTransportRoute(id: string, route: Partial<TransportRoute>): Promise<void> {
    try {
      const docRef = doc(db, 'transportRoutes', id);
      await updateDoc(docRef, {
        ...route,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating transport route:', error);
      throw error;
    }
  },

  // Delete transport route
  async deleteTransportRoute(id: string): Promise<void> {
    try {
      const docRef = doc(db, 'transportRoutes', id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting transport route:', error);
      throw error;
    }
  }
};

export const settingsService = {
  async getSettings(): Promise<SiteSettings> {
    const docRef = doc(db, 'settings', 'site');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as SiteSettings;
    } else {
      // Default settings if not found
      return {
        siteTitle: 'Ambassador Academy',
        contactEmail: 'theambasadoracademy00@gmail.com',
        contactPhone: '+254797727230',
        theme: 'light',
      };
    }
  },
  async updateSettings(settings: SiteSettings): Promise<void> {
    try {
      await setDoc(doc(db, 'settings', 'site'), settings);
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  },

  // Transport Registration Service
  async getAllTransportRegistrations(): Promise<TransportRegistration[]> {
    try {
      const querySnapshot = await getDocs(collection(db, 'transportRegistrations'));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as TransportRegistration[];
    } catch (error) {
      console.error('Error getting transport registrations:', error);
      throw error;
    }
  },

  async getTransportRegistrationById(id: string): Promise<TransportRegistration | null> {
    try {
      const docRef = doc(db, 'transportRegistrations', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as TransportRegistration;
      }
      return null;
    } catch (error) {
      console.error('Error getting transport registration:', error);
      throw error;
    }
  },

  async addTransportRegistration(registration: Omit<TransportRegistration, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'transportRegistrations'), {
        ...registration,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding transport registration:', error);
      throw error;
    }
  },

  async updateTransportRegistration(id: string, registration: Partial<TransportRegistration>): Promise<void> {
    try {
      const docRef = doc(db, 'transportRegistrations', id);
      await updateDoc(docRef, {
        ...registration,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating transport registration:', error);
      throw error;
    }
  },

  async deleteTransportRegistration(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'transportRegistrations', id));
    } catch (error) {
      console.error('Error deleting transport registration:', error);
      throw error;
    }
  },

  async approveTransportRegistration(id: string, adminId: string, notes?: string): Promise<void> {
    try {
      const docRef = doc(db, 'transportRegistrations', id);
      const updateData: any = {
        status: 'approved',
        approvedBy: adminId,
        approvedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      if (typeof notes === 'string') {
        updateData.adminNotes = notes;
      }
      await updateDoc(docRef, updateData);
      
      // Send approval email notification
      const registration = await this.getTransportRegistrationById(id);
      if (registration) {
        try {
          await emailService.sendApprovalEmail(registration);
        } catch (emailError) {
          console.error('Failed to send approval email:', emailError);
          // Don't throw error - email failure shouldn't prevent approval
        }
      }
    } catch (error) {
      console.error('Error approving transport registration:', error);
      throw error;
    }
  },

  async rejectTransportRegistration(id: string, adminId: string, notes: string): Promise<void> {
    try {
      const docRef = doc(db, 'transportRegistrations', id);
      const updateData: any = {
        status: 'rejected',
        approvedBy: adminId,
        approvedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      if (typeof notes === 'string') {
        updateData.adminNotes = notes;
      }
      await updateDoc(docRef, updateData);
      
      // Send rejection email notification
      const registration = await this.getTransportRegistrationById(id);
      if (registration) {
        try {
          await emailService.sendRejectionEmail(registration);
        } catch (emailError) {
          console.error('Failed to send rejection email:', emailError);
          // Don't throw error - email failure shouldn't prevent rejection
        }
      }
    } catch (error) {
      console.error('Error rejecting transport registration:', error);
      throw error;
    }
  },

  async waitlistTransportRegistration(id: string, adminId: string, notes?: string): Promise<void> {
    try {
      const docRef = doc(db, 'transportRegistrations', id);
      const updateData: any = {
        status: 'waitlisted',
        approvedBy: adminId,
        approvedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      if (typeof notes === 'string') {
        updateData.adminNotes = notes;
      }
      await updateDoc(docRef, updateData);
      
      // Send waitlist email notification
      const registration = await this.getTransportRegistrationById(id);
      if (registration) {
        try {
          await emailService.sendWaitlistEmail(registration);
        } catch (emailError) {
          console.error('Failed to send waitlist email:', emailError);
          // Don't throw error - email failure shouldn't prevent waitlisting
        }
      }
    } catch (error) {
      console.error('Error waitlisting transport registration:', error);
      throw error;
    }
  },

  async getTransportRegistrationsByStatus(status: TransportRegistration['status']): Promise<TransportRegistration[]> {
    try {
      const q = query(
        collection(db, 'transportRegistrations'),
        where('status', '==', status),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as TransportRegistration[];
    } catch (error) {
      console.error('Error getting transport registrations by status:', error);
      throw error;
    }
  }
};

// Email notification service using Google Apps Script
export const emailService = {
  // Replace this URL with your actual Google Apps Script Web App URL
  APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbwHYQ-_JhYWzy-TL69YZ6Ca7h6rA00saIVwYtY_KAHJSCwITrL_6VnxTtdJCpRqVD9v/exec', // Replace with your actual URL

  async sendTransportNotification(action: 'approved' | 'rejected' | 'waitlisted', registration: TransportRegistration): Promise<boolean> {
    try {
      const response = await fetch(this.APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: action,
          registration: registration
        })
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('Email notification sent successfully:', result);
        return true;
      } else {
        console.error('Failed to send email notification:', result.error);
        return false;
      }
    } catch (error) {
      console.error('Error sending email notification:', error);
      return false;
    }
  },

  async sendApprovalEmail(registration: TransportRegistration): Promise<boolean> {
    return this.sendTransportNotification('approved', registration);
  },

  async sendRejectionEmail(registration: TransportRegistration): Promise<boolean> {
    return this.sendTransportNotification('rejected', registration);
  },

  async sendWaitlistEmail(registration: TransportRegistration): Promise<boolean> {
    return this.sendTransportNotification('waitlisted', registration);
  },

  // Admission application email notifications
  async sendAdmissionNotification(action: 'approved' | 'rejected' | 'waitlisted', application: Application): Promise<boolean> {
    try {
      const response = await fetch(this.APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: action,
          application: application
        })
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('Admission email notification sent successfully:', result);
        return true;
      } else {
        console.error('Failed to send admission email notification:', result.error);
        return false;
      }
    } catch (error) {
      console.error('Error sending admission email notification:', error);
      return false;
    }
  },

  async sendAdmissionApprovalEmail(application: Application): Promise<boolean> {
    return this.sendAdmissionNotification('approved', application);
  },

  async sendAdmissionRejectionEmail(application: Application): Promise<boolean> {
    return this.sendAdmissionNotification('rejected', application);
  },

  async sendAdmissionWaitlistEmail(application: Application): Promise<boolean> {
    return this.sendAdmissionNotification('waitlisted', application);
  }
}; 