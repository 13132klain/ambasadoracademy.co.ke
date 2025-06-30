import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Mail,
  Phone,
  Calendar,
  GraduationCap,
  Filter,
  Loader2,
  Download,
  Upload,
  Printer
} from 'lucide-react';
import { admissionsService, Application, emailService } from '../../services/firebaseService';
import { exportToPDF, exportToCSV, importFromCSV } from '../../services/reportUtils';

const AdmissionsManagementPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingApplication, setEditingApplication] = useState<Application | null>(null);
  const [newApplication, setNewApplication] = useState<Partial<Application>>({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    level: 'primary',
    type: 'day',
    dateSubmitted: new Date().toISOString().split('T')[0],
    status: 'pending',
    documents: [],
    notes: ''
  });

  const levels = ['kindergarten', 'primary', 'junior-secondary', 'senior-secondary'];
  const types = ['day', 'boarding'];
  const statuses = ['pending', 'reviewed', 'approved', 'rejected', 'waitlisted'];

  // Load applications on component mount
  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      const applicationsData = await admissionsService.getAllApplications();
      setApplications(applicationsData);
    } catch (error) {
      console.error('Error loading applications:', error);
      alert('Failed to load applications. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'kindergarten': return 'bg-pink-100 text-pink-800';
      case 'primary': return 'bg-blue-100 text-blue-800';
      case 'junior-secondary': return 'bg-green-100 text-green-800';
      case 'senior-secondary': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'day': return 'bg-yellow-100 text-yellow-800';
      case 'boarding': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'waitlisted': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredApplications = applications.filter(application => {
    const matchesSearch = application.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || application.level === filterLevel;
    const matchesType = filterType === 'all' || application.type === filterType;
    const matchesStatus = filterStatus === 'all' || application.status === filterStatus;
    
    return matchesSearch && matchesLevel && matchesType && matchesStatus;
  });

  const handleAddApplication = async () => {
    if (newApplication.studentName && newApplication.parentName && newApplication.email) {
      try {
        await admissionsService.addApplication({
          studentName: newApplication.studentName!,
          parentName: newApplication.parentName!,
          email: newApplication.email!,
          phone: newApplication.phone || '',
          level: newApplication.level as Application['level'],
          type: newApplication.type as Application['type'],
          dateSubmitted: newApplication.dateSubmitted!,
          status: newApplication.status as Application['status'],
          documents: newApplication.documents || [],
          notes: newApplication.notes
        });
        
        setNewApplication({
          studentName: '',
          parentName: '',
          email: '',
          phone: '',
          level: 'primary',
          type: 'day',
          dateSubmitted: new Date().toISOString().split('T')[0],
          status: 'pending',
          documents: [],
          notes: ''
        });
        setShowAddModal(false);
        await loadApplications(); // Reload applications
        alert('Application added successfully!');
      } catch (error) {
        console.error('Error adding application:', error);
        alert('Failed to add application. Please try again.');
      }
    }
  };

  const handleEditApplication = async () => {
    if (editingApplication && editingApplication.id && editingApplication.studentName && editingApplication.parentName && editingApplication.email) {
      try {
        await admissionsService.updateApplication(editingApplication.id, {
          studentName: editingApplication.studentName,
          parentName: editingApplication.parentName,
          email: editingApplication.email,
          phone: editingApplication.phone,
          level: editingApplication.level,
          type: editingApplication.type,
          dateSubmitted: editingApplication.dateSubmitted,
          status: editingApplication.status,
          documents: editingApplication.documents,
          notes: editingApplication.notes,
          interviewDate: editingApplication.interviewDate,
          interviewTime: editingApplication.interviewTime
        });
        
        setEditingApplication(null);
        await loadApplications(); // Reload applications
        alert('Application updated successfully!');
      } catch (error) {
        console.error('Error updating application:', error);
        alert('Failed to update application. Please try again.');
      }
    }
  };

  const handleDeleteApplication = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await admissionsService.deleteApplication(id);
        await loadApplications(); // Reload applications
        alert('Application deleted successfully!');
      } catch (error) {
        console.error('Error deleting application:', error);
        alert('Failed to delete application. Please try again.');
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'reviewed': return <Eye className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'waitlisted': return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    approved: applications.filter(app => app.status === 'approved').length,
    rejected: applications.filter(app => app.status === 'rejected').length
  };

  // New functions for report generation
  const handlePrintApplications = () => {
    const headers = ['Student Name', 'Parent Name', 'Level', 'Type', 'Status', 'Date Submitted'];
    const data = applications.map(app => [
      app.studentName,
      app.parentName,
      app.level.charAt(0).toUpperCase() + app.level.slice(1).replace('-', ' '),
      app.type.charAt(0).toUpperCase() + app.type.slice(1),
      app.status.charAt(0).toUpperCase() + app.status.slice(1),
      new Date(app.dateSubmitted).toLocaleDateString()
    ]);
    exportToPDF('Admissions Applications Report', headers, data, 'landscape');
  };

  const handleExportCSV = () => {
    const data = applications.map(app => ({
      studentName: app.studentName,
      parentName: app.parentName,
      email: app.email,
      phone: app.phone,
      level: app.level,
      type: app.type,
      status: app.status,
      dateSubmitted: app.dateSubmitted,
      notes: app.notes
    }));
    exportToCSV('admissions_applications', data);
  };

  const handleImportCSV = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const importedData = await importFromCSV(e.target.files[0]);
        // Process and validate the imported data
        const validApplications = importedData.filter(data => 
          data.studentName && data.parentName && data.level && data.type
        ).map(data => ({
          ...data,
          dateSubmitted: data.dateSubmitted || new Date().toISOString().split('T')[0],
          status: data.status || 'pending',
          documents: data.documents || []
        }));

        // Batch upload to Firebase
        await Promise.all(validApplications.map(app => admissionsService.addApplication(app)));
        alert('Successfully imported applications');
        loadApplications(); // Refresh the list
      } catch (error) {
        console.error('Error importing applications:', error);
        alert('Error importing applications. Please check the file format.');
      }
    }
  };

  // Handler for approving an application
  const handleApproveApplication = async (application: Application) => {
    try {
      await admissionsService.updateApplication(application.id!, { status: 'approved' });
      try {
        await emailService.sendAdmissionApprovalEmail(application);
      } catch (emailError) {
        console.error('Failed to send approval email:', emailError);
        // Don't throw error - email failure shouldn't prevent approval
      }
      await loadApplications();
      alert('Application approved and parent notified!');
    } catch (err) {
      console.error('Failed to approve application:', err);
      alert('Failed to approve application.');
    }
  };

  // Handler for rejecting an application
  const handleRejectApplication = async (application: Application) => {
    try {
      await admissionsService.updateApplication(application.id!, { status: 'rejected' });
      try {
        await emailService.sendAdmissionRejectionEmail(application);
      } catch (emailError) {
        console.error('Failed to send rejection email:', emailError);
        // Don't throw error - email failure shouldn't prevent rejection
      }
      await loadApplications();
      alert('Application rejected and parent notified!');
    } catch (err) {
      console.error('Failed to reject application:', err);
      alert('Failed to reject application.');
    }
  };

  // Handler for waitlisting an application
  const handleWaitlistApplication = async (application: Application) => {
    try {
      await admissionsService.updateApplication(application.id!, { status: 'waitlisted' });
      try {
        await emailService.sendAdmissionWaitlistEmail(application);
      } catch (emailError) {
        console.error('Failed to send waitlist email:', emailError);
        // Don't throw error - email failure shouldn't prevent waitlisting
      }
      await loadApplications();
      alert('Application waitlisted and parent notified!');
    } catch (err) {
      console.error('Failed to waitlist application:', err);
      alert('Failed to waitlist application.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-academy-maroon" />
          <span className="text-gray-600">Loading applications...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admissions Management</h1>
          <p className="text-gray-600">Manage admission applications and student enrollment</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrintApplications}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Printer className="h-4 w-4" />
            <span>Print</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <label className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
            <Upload className="h-4 w-4" />
            <span>Import</span>
            <input
              type="file"
              accept=".csv"
              onChange={handleImportCSV}
              className="hidden"
            />
          </label>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-academy-maroon text-white rounded-lg hover:bg-academy-maroon/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Application</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
            >
              <option value="all">All Levels</option>
              {levels.map(level => (
                <option key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1).replace('-', ' ')}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
            >
              <option value="all">All Types</option>
              {types.map(type => (
                <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
            >
              <option value="all">All Status</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterLevel('all');
                setFilterType('all');
                setFilterStatus('all');
              }}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{application.studentName}</div>
                      <div className="text-sm text-gray-500">ID: {application.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{application.parentName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{application.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-500">{application.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(application.level)}`}>
                      {application.level.charAt(0).toUpperCase() + application.level.slice(1).replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(application.type)}`}>
                      {application.type.charAt(0).toUpperCase() + application.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{formatDate(application.dateSubmitted)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedApplication(application);
                          setShowDetailsModal(true);
                        }}
                        className="text-academy-maroon hover:text-academy-maroon/80"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setEditingApplication(application)}
                        className="text-academy-maroon hover:text-academy-maroon/80"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteApplication(application.id!)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      {application.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApproveApplication(application)}
                            className="text-green-600 hover:text-green-800"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectApplication(application)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => handleWaitlistApplication(application)}
                            className="text-orange-600 hover:text-orange-800"
                          >
                            Waitlist
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Application Details Modal */}
      {showDetailsModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Application Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Student Name</label>
                    <p className="text-sm text-gray-900">{selectedApplication.studentName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Parent Name</label>
                    <p className="text-sm text-gray-900">{selectedApplication.parentName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="text-sm text-gray-900">{selectedApplication.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="text-sm text-gray-900">{selectedApplication.phone}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Details</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Level</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(selectedApplication.level)}`}>
                      {selectedApplication.level.charAt(0).toUpperCase() + selectedApplication.level.slice(1).replace('-', ' ')}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(selectedApplication.type)}`}>
                      {selectedApplication.type.charAt(0).toUpperCase() + selectedApplication.type.slice(1)}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date Submitted</label>
                    <p className="text-sm text-gray-900">{formatDate(selectedApplication.dateSubmitted)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedApplication.status)}`}>
                      {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents Submitted</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedApplication.documents.map((doc, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {selectedApplication.notes && (
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{selectedApplication.notes}</p>
                </div>
              )}
              
              {selectedApplication.interviewDate && (
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Interview Schedule</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{formatDate(selectedApplication.interviewDate)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{selectedApplication.interviewTime}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-end space-x-4 mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {/* Handle schedule interview */}}
                className="px-4 py-2 bg-academy-maroon text-white rounded-lg hover:bg-academy-maroon/90 transition-colors"
              >
                Schedule Interview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Application Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Application</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Student Name</label>
                <input
                  type="text"
                  value={newApplication.studentName}
                  onChange={(e) => setNewApplication({...newApplication, studentName: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                  placeholder="Enter student name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Parent Name</label>
                <input
                  type="text"
                  value={newApplication.parentName}
                  onChange={(e) => setNewApplication({...newApplication, parentName: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                  placeholder="Enter parent name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={newApplication.email}
                  onChange={(e) => setNewApplication({...newApplication, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={newApplication.phone}
                  onChange={(e) => setNewApplication({...newApplication, phone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                  placeholder="Enter phone number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                <select
                  value={newApplication.level}
                  onChange={(e) => setNewApplication({...newApplication, level: e.target.value as Application['level']})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                >
                  {levels.map(level => (
                    <option key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1).replace('-', ' ')}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={newApplication.type}
                  onChange={(e) => setNewApplication({...newApplication, type: e.target.value as Application['type']})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                >
                  {types.map(type => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Submitted</label>
                <input
                  type="date"
                  value={newApplication.dateSubmitted}
                  onChange={(e) => setNewApplication({...newApplication, dateSubmitted: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={newApplication.status}
                  onChange={(e) => setNewApplication({...newApplication, status: e.target.value as Application['status']})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                <textarea
                  value={newApplication.notes}
                  onChange={(e) => setNewApplication({...newApplication, notes: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                  placeholder="Enter any additional notes"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddApplication}
                className="px-4 py-2 bg-academy-maroon text-white rounded-lg hover:bg-academy-maroon/90 transition-colors"
              >
                Add Application
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Application Modal */}
      {editingApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Edit Application</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Student Name</label>
                <input
                  type="text"
                  value={editingApplication.studentName}
                  onChange={(e) => setEditingApplication({...editingApplication, studentName: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Parent Name</label>
                <input
                  type="text"
                  value={editingApplication.parentName}
                  onChange={(e) => setEditingApplication({...editingApplication, parentName: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={editingApplication.email}
                  onChange={(e) => setEditingApplication({...editingApplication, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={editingApplication.phone}
                  onChange={(e) => setEditingApplication({...editingApplication, phone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                <select
                  value={editingApplication.level}
                  onChange={(e) => setEditingApplication({...editingApplication, level: e.target.value as Application['level']})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                >
                  {levels.map(level => (
                    <option key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1).replace('-', ' ')}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={editingApplication.type}
                  onChange={(e) => setEditingApplication({...editingApplication, type: e.target.value as Application['type']})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                >
                  {types.map(type => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Submitted</label>
                <input
                  type="date"
                  value={editingApplication.dateSubmitted}
                  onChange={(e) => setEditingApplication({...editingApplication, dateSubmitted: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={editingApplication.status}
                  onChange={(e) => setEditingApplication({...editingApplication, status: e.target.value as Application['status']})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Interview Date (Optional)</label>
                <input
                  type="date"
                  value={editingApplication.interviewDate || ''}
                  onChange={(e) => setEditingApplication({...editingApplication, interviewDate: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Interview Time (Optional)</label>
                <input
                  type="time"
                  value={editingApplication.interviewTime || ''}
                  onChange={(e) => setEditingApplication({...editingApplication, interviewTime: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                <textarea
                  value={editingApplication.notes || ''}
                  onChange={(e) => setEditingApplication({...editingApplication, notes: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-4 mt-6">
              <button
                onClick={() => setEditingApplication(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEditApplication}
                className="px-4 py-2 bg-academy-maroon text-white rounded-lg hover:bg-academy-maroon/90 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdmissionsManagementPage; 