import React, { useState } from 'react';
import { 
  Camera, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Upload,
  Download,
  Eye,
  Tag,
  Calendar,
  MapPin
} from 'lucide-react';

interface GalleryItem {
  id: string;
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
}

const GalleryManagementPage: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([
    {
      id: '1',
      title: 'Annual Sports Day 2024',
      description: 'Students participating in various sports activities during the annual sports day',
      imageUrl: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Sports',
      tags: ['sports', 'students', 'competition', 'annual'],
      dateUploaded: '2024-08-15',
      dateTaken: '2024-07-20',
      location: 'School Sports Ground',
      photographer: 'School Photographer',
      featured: true
    },
    {
      id: '2',
      title: 'Science Laboratory',
      description: 'Modern science laboratory equipped with latest equipment for practical learning',
      imageUrl: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Facilities',
      tags: ['laboratory', 'science', 'equipment', 'learning'],
      dateUploaded: '2024-08-10',
      dateTaken: '2024-08-05',
      location: 'Science Block',
      photographer: 'Admin',
      featured: false
    },
    {
      id: '3',
      title: 'Graduation Ceremony',
      description: 'Graduating students receiving their certificates during the graduation ceremony',
      imageUrl: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Events',
      tags: ['graduation', 'ceremony', 'students', 'achievement'],
      dateUploaded: '2024-08-12',
      dateTaken: '2024-07-15',
      location: 'Main Hall',
      photographer: 'Professional Photographer',
      featured: true
    },
    {
      id: '4',
      title: 'Art Exhibition',
      description: 'Student artwork displayed during the annual art exhibition',
      imageUrl: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Arts',
      tags: ['art', 'exhibition', 'creativity', 'students'],
      dateUploaded: '2024-08-08',
      dateTaken: '2024-06-25',
      location: 'Art Room',
      photographer: 'Art Teacher',
      featured: false
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterFeatured, setFilterFeatured] = useState<string>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [newItem, setNewItem] = useState<Partial<GalleryItem>>({
    title: '',
    description: '',
    imageUrl: '',
    category: 'Events',
    tags: [],
    featured: false
  });

  const categories = ['Events', 'Facilities', 'Students', 'Staff', 'Sports', 'Arts', 'Academic', 'Other'];
  const featuredOptions = ['all', 'featured', 'not-featured'];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Events': return 'bg-blue-100 text-blue-800';
      case 'Facilities': return 'bg-green-100 text-green-800';
      case 'Students': return 'bg-purple-100 text-purple-800';
      case 'Staff': return 'bg-orange-100 text-orange-800';
      case 'Sports': return 'bg-red-100 text-red-800';
      case 'Arts': return 'bg-pink-100 text-pink-800';
      case 'Academic': return 'bg-indigo-100 text-indigo-800';
      case 'Other': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredItems = galleryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesFeatured = filterFeatured === 'all' || 
                           (filterFeatured === 'featured' && item.featured) ||
                           (filterFeatured === 'not-featured' && !item.featured);
    
    return matchesSearch && matchesCategory && matchesFeatured;
  });

  const handleAddItem = () => {
    if (newItem.title && newItem.imageUrl) {
      const item: GalleryItem = {
        id: Date.now().toString(),
        title: newItem.title!,
        description: newItem.description || '',
        imageUrl: newItem.imageUrl!,
        category: newItem.category as GalleryItem['category'],
        tags: newItem.tags || [],
        dateUploaded: new Date().toISOString().split('T')[0],
        dateTaken: newItem.dateTaken,
        location: newItem.location,
        photographer: newItem.photographer,
        featured: newItem.featured || false
      };
      
      setGalleryItems([...galleryItems, item]);
      setNewItem({
        title: '',
        description: '',
        imageUrl: '',
        category: 'Events',
        tags: [],
        featured: false
      });
      setShowUploadModal(false);
    }
  };

  const handleEditItem = () => {
    if (editingItem && editingItem.title && editingItem.imageUrl) {
      setGalleryItems(galleryItems.map(item => 
        item.id === editingItem.id ? editingItem : item
      ));
      setEditingItem(null);
    }
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      setGalleryItems(galleryItems.filter(item => item.id !== id));
    }
  };

  const handleToggleFeatured = (id: string) => {
    setGalleryItems(galleryItems.map(item => 
      item.id === id ? { ...item, featured: !item.featured } : item
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const stats = {
    total: galleryItems.length,
    featured: galleryItems.filter(item => item.featured).length,
    categories: new Set(galleryItems.map(item => item.category)).size
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gallery Management</h1>
          <p className="text-gray-600">Manage photo gallery and media content</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center space-x-2 bg-academy-maroon text-white px-4 py-2 rounded-lg hover:bg-academy-maroon/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Upload Image</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Images</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Camera className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Featured Images</p>
              <p className="text-2xl font-bold text-gray-900">{stats.featured}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <Tag className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-2xl font-bold text-gray-900">{stats.categories}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Filter className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search images..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Featured</label>
            <select
              value={filterFeatured}
              onChange={(e) => setFilterFeatured(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
            >
              <option value="all">All Images</option>
              <option value="featured">Featured Only</option>
              <option value="not-featured">Not Featured</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterCategory('all');
                setFilterFeatured('all');
              }}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  {item.featured && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Featured
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(item.dateUploaded)}</span>
                    </div>
                    {item.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{item.location}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        +{item.tags.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setShowDetailsModal(true);
                        }}
                        className="text-academy-maroon hover:text-academy-maroon/80"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setEditingItem(item)}
                        className="text-academy-maroon hover:text-academy-maroon/80"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => handleToggleFeatured(item.id)}
                      className={`px-2 py-1 text-xs rounded ${
                        item.featured 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {item.featured ? 'Featured' : 'Feature'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No images found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Upload New Image</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image Title</label>
                <input
                  type="text"
                  value={newItem.title}
                  onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                  placeholder="Enter image title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({...newItem, category: e.target.value as GalleryItem['category']})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  value={newItem.imageUrl}
                  onChange={(e) => setNewItem({...newItem, imageUrl: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                  placeholder="Enter image URL"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Taken (Optional)</label>
                <input
                  type="date"
                  value={newItem.dateTaken}
                  onChange={(e) => setNewItem({...newItem, dateTaken: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location (Optional)</label>
                <input
                  type="text"
                  value={newItem.location}
                  onChange={(e) => setNewItem({...newItem, location: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                  placeholder="Enter location"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Photographer (Optional)</label>
                <input
                  type="text"
                  value={newItem.photographer}
                  onChange={(e) => setNewItem({...newItem, photographer: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                  placeholder="Enter photographer name"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newItem.description}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                  placeholder="Enter image description"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
                <input
                  type="text"
                  value={newItem.tags?.join(', ') || ''}
                  onChange={(e) => setNewItem({...newItem, tags: e.target.value.split(',').map(tag => tag.trim())})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academy-maroon focus:border-transparent"
                  placeholder="Enter tags separated by commas"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newItem.featured}
                    onChange={(e) => setNewItem({...newItem, featured: e.target.checked})}
                    className="rounded border-gray-300 text-academy-maroon focus:ring-academy-maroon"
                  />
                  <span className="text-sm font-medium text-gray-700">Featured Image</span>
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddItem}
                className="px-4 py-2 bg-academy-maroon text-white rounded-lg hover:bg-academy-maroon/90 transition-colors"
              >
                Upload Image
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Details Modal */}
      {showDetailsModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Image Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedItem.title}</h3>
                  <p className="text-gray-600">{selectedItem.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(selectedItem.category)}`}>
                      {selectedItem.category}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Featured</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      selectedItem.featured ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedItem.featured ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tags</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedItem.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date Uploaded</label>
                    <p className="text-sm text-gray-900">{formatDate(selectedItem.dateUploaded)}</p>
                  </div>
                  {selectedItem.dateTaken && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date Taken</label>
                      <p className="text-sm text-gray-900">{formatDate(selectedItem.dateTaken)}</p>
                    </div>
                  )}
                </div>
                
                {selectedItem.location && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <p className="text-sm text-gray-900">{selectedItem.location}</p>
                  </div>
                )}
                
                {selectedItem.photographer && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Photographer</label>
                    <p className="text-sm text-gray-900">{selectedItem.photographer}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-4 mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setEditingItem(selectedItem);
                  setShowDetailsModal(false);
                }}
                className="px-4 py-2 bg-academy-maroon text-white rounded-lg hover:bg-academy-maroon/90 transition-colors"
              >
                Edit Image
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal would be similar to Upload Modal but with pre-filled values */}
    </div>
  );
};

export default GalleryManagementPage; 