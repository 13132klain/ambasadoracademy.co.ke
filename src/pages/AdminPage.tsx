import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  Settings, 
  Users, 
  Calendar, 
  FileText, 
  Building, 
  Bus, 
  Camera, 
  BarChart3, 
  Shield,
  LogOut,
  Menu,
  X,
  Home,
  Plus,
  Edit,
  Trash2,
  Eye,
  Loader2,
  Clock
} from 'lucide-react';
import { admissionsService } from '../services/firebaseService';
import { eventsService } from '../services/firebaseService';
import { useAuth } from '../context/AuthContext';

const AdminPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { role, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingReviews: 0,
    upcomingEvents: 0,
    activeStudents: 0 // Will be based on approved applications
  });
  const [loadingStats, setLoadingStats] = useState(true);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [loadingActivities, setLoadingActivities] = useState(true);

  useEffect(() => {
    if (location.pathname === '/admin') {
      fetchDashboardStats();
      fetchRecentActivities();
    }
  }, [location.pathname]);

  const fetchRecentActivities = async () => {
    setLoadingActivities(true);
    try {
      const applications = await admissionsService.getAllApplications();
      const events = await eventsService.getAllEvents();

      const activities: any[] = [];

      // Add recent applications (last 5)
      const recentApplications = applications
        .sort((a, b) => new Date(b.createdAt?.toDate?.() || b.dateSubmitted).getTime() - new Date(a.createdAt?.toDate?.() || a.dateSubmitted).getTime())
        .slice(0, 3);

      recentApplications.forEach(app => {
        activities.push({
          action: `New application from ${app.studentName}`,
          user: app.parentName,
          time: formatTimeAgo(app.createdAt?.toDate?.() || app.dateSubmitted),
          type: 'admission',
          timestamp: new Date(app.createdAt?.toDate?.() || app.dateSubmitted).getTime()
        });
      });

      // Add recent events (last 5)
      const recentEvents = events
        .sort((a, b) => new Date(b.createdAt?.toDate?.() || b.date).getTime() - new Date(a.createdAt?.toDate?.() || a.date).getTime())
        .slice(0, 2);

      recentEvents.forEach(event => {
        activities.push({
          action: `Event created: ${event.title}`,
          user: 'Admin',
          time: formatTimeAgo(event.createdAt?.toDate?.() || event.date),
          type: 'event',
          timestamp: new Date(event.createdAt?.toDate?.() || event.date).getTime()
        });
      });

      // Sort all activities by timestamp and take the most recent 5
      const sortedActivities = activities
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 5);

      setRecentActivities(sortedActivities);
    } catch (error) {
      console.error("Error fetching recent activities:", error);
    } finally {
      setLoadingActivities(false);
    }
  };

  const formatTimeAgo = (date: Date | string) => {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  };

  const fetchDashboardStats = async () => {
    setLoadingStats(true);
    try {
      const applications = await admissionsService.getAllApplications();
      const events = await eventsService.getAllEvents();

      const totalApplications = applications.length;
      const pendingReviews = applications.filter(app => app.status === 'pending').length;
      
      const now = new Date();
      const upcomingEvents = events.filter(event => new Date(event.date) > now).length;
      
      // Active students based on approved applications
      const activeStudents = applications.filter(app => app.status === 'approved').length;

      setStats({
        totalApplications,
        pendingReviews,
        upcomingEvents,
        activeStudents
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      // Keep existing or default stats on error
    } finally {
      setLoadingStats(false);
    }
  };

  const adminSections = [
    {
      name: 'Dashboard',
      path: '/admin',
      icon: BarChart3,
      description: 'Overview and analytics'
    },
    {
      name: 'Events Management',
      path: '/admin/events',
      icon: Calendar,
      description: 'Manage school events and calendar'
    },
    {
      name: 'Admissions',
      path: '/admin/admissions',
      icon: FileText,
      description: 'Manage student applications'
    },
    {
      name: 'Transport Registrations',
      path: '/admin/transport-registrations',
      icon: Bus,
      description: 'Review and approve transport applications'
    },
    {
      name: 'Academic Calendar',
      path: '/admin/calendar',
      icon: Calendar,
      description: 'Edit academic calendar'
    },
    {
      name: 'Facilities',
      path: '/admin/facilities',
      icon: Building,
      description: 'Manage facilities information'
    },
    {
      name: 'Transport',
      path: '/admin/transport',
      icon: Bus,
      description: 'Manage transport services'
    },
    {
      name: 'Gallery',
      path: '/admin/gallery',
      icon: Camera,
      description: 'Manage photo gallery'
    },
    {
      name: 'Settings',
      path: '/admin/settings',
      icon: Settings,
      description: 'Website settings and configuration'
    }
  ];

  const quickStatsData = [
    { title: 'Total Applications', value: stats.totalApplications, Icon: FileText, color: 'text-blue-500', bgColor: 'bg-blue-50' },
    { title: 'Pending Reviews', value: stats.pendingReviews, Icon: Clock, color: 'text-yellow-500', bgColor: 'bg-yellow-50' },
    { title: 'Upcoming Events', value: stats.upcomingEvents, Icon: Calendar, color: 'text-green-500', bgColor: 'bg-green-50' },
    { title: 'Active Students', value: stats.activeStudents, Icon: Users, color: 'text-purple-500', bgColor: 'bg-purple-50' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'admission': return <FileText className="h-4 w-4" />;
      case 'event': return <Calendar className="h-4 w-4" />;
      case 'gallery': return <Camera className="h-4 w-4" />;
      case 'transport': return <Bus className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      // Optionally show an error message to the user
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } flex flex-col justify-between h-full`}>
        <div>
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-academy-maroon to-academy-blue rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">Admin Panel</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          <nav className="mt-6 px-4">
            <div className="space-y-2">
              {adminSections.map((section) => {
                if (section.name === 'Users' && role !== 'super_admin' && role !== 'admin') return null;
                return (
                  <Link
                    key={section.path}
                    to={section.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                      location.pathname === section.path
                        ? 'bg-academy-maroon text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <section.icon className="h-5 w-5" />
                    <div>
                      <div className="font-medium">{section.name}</div>
                      <div className={`text-xs ${location.pathname === section.path ? 'text-white/80' : 'text-gray-500'}`}>
                        {section.description}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="h-5 w-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-academy-maroon transition-colors"
              >
                <Home className="h-4 w-4" />
                <span>View Site</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        {location.pathname === '/admin' && (
          <div className="p-6">
            {/* Welcome section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, Admin!</h2>
              <p className="text-gray-600">Here's what's happening with your school website today.</p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {loadingStats
                ? Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-pulse">
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))
                : quickStatsData.map((stat, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-full ${stat.bgColor}`}>
                        <stat.Icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link
                    to="/admin/events"
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-academy-maroon hover:text-white transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Plus className="h-5 w-5" />
                      <span>Add New Event</span>
                    </div>
                    <Calendar className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/admin/admissions"
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-academy-maroon hover:text-white transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Eye className="h-5 w-5" />
                      <span>Review Applications</span>
                    </div>
                    <FileText className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/admin/gallery"
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-academy-maroon hover:text-white transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Plus className="h-5 w-5" />
                      <span>Upload Photos</span>
                    </div>
                    <Camera className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
                <div className="space-y-4">
                  {loadingActivities
                    ? Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <Loader2 className="h-4 w-4 text-gray-500 animate-spin" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">Loading...</p>
                          </div>
                        </div>
                      ))
                    : recentActivities.length > 0
                    ? recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                            <p className="text-xs text-gray-500">by {activity.user} • {activity.time}</p>
                          </div>
                        </div>
                      ))
                    : (
                        <div className="text-center py-4">
                          <p className="text-sm text-gray-500">No recent activities</p>
                        </div>
                      )}
                </div>
              </div>
            </div>

            {/* System status */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Website: Online</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Database: Connected</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Backup: Up to date</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other admin pages content */}
        {location.pathname !== '/admin' && (
          <div className="p-6">
            <Outlet />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage; 