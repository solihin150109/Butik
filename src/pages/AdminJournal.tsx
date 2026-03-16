import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Edit2, Trash2, Eye, FileText, AlertTriangle, Loader2 } from 'lucide-react';

interface JournalPost {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
}

export default function AdminJournal() {
  const [posts, setPosts] = useState<JournalPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Placeholder data
        const mockPosts: JournalPost[] = [
          {
            id: '1',
            title: 'The Art of Stone Carving',
            category: 'Craftsmanship',
            date: 'Oct 12, 2023',
            excerpt: 'Exploring the ancient techniques used by Papuan artisans to create timeless stone artifacts.',
            image: 'https://picsum.photos/seed/stone/400/400'
          },
          {
            id: '2',
            title: 'Sustainable Sourcing in Papua',
            category: 'Ethics',
            date: 'Oct 08, 2023',
            excerpt: 'How we work with local communities to ensure our materials are sourced responsibly.',
            image: 'https://picsum.photos/seed/papua/400/400'
          }
        ];
        setPosts(mockPosts);
      } catch (err) {
        setError('Failed to load journal stories. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    setIsDeleting(true);
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPosts(prev => prev.filter(p => p.id !== deleteConfirmId));
      setDeleteConfirmId(null);
    } catch (err) {
      alert('Failed to delete article');
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-coffee animate-spin" />
        <p className="text-earth-dark/40 font-serif italic">Loading stories...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-serif text-earth-dark mb-2 italic">Journal Management</h1>
          <p className="text-sm text-earth-dark/50">Create and edit editorial stories for your boutique journal.</p>
        </div>
        <button 
          onClick={() => navigate('/admin/journal/new')}
          className="bg-earth-dark text-cream px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-coffee transition-colors shadow-lg"
        >
          <Plus size={18} />
          Write New Article
        </button>
      </header>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 flex items-center">
        <Search size={20} className="text-gray-400 ml-2" />
        <input 
          type="text" 
          placeholder="Search articles by title or category..." 
          className="flex-1 bg-transparent border-none px-4 py-2 text-sm focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 text-sm">
          <AlertTriangle size={18} />
          {error}
        </div>
      )}

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-32 aspect-square rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
              <img src={post.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-sand">{post.category}</span>
                  <span className="text-[10px] text-gray-400">{post.date}</span>
                </div>
                <h3 className="font-serif text-xl text-earth-dark mb-2 line-clamp-1 italic">{post.title}</h3>
                <p className="text-xs text-earth-dark/50 line-clamp-2 leading-relaxed">{post.excerpt}</p>
              </div>
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-50">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => navigate(`/admin/journal/edit/${post.id}`)}
                    className="p-2 text-gray-400 hover:text-coffee hover:bg-coffee/5 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => setDeleteConfirmId(post.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <button 
                  onClick={() => window.open(`/journal/${post.id}`, '_blank')}
                  className="flex items-center space-x-1 text-xs font-bold text-sand hover:text-coffee transition-colors"
                >
                  <Eye size={14} />
                  <span>View Live</span>
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Empty State / Add New Card */}
        <button 
          onClick={() => navigate('/admin/journal/new')}
          className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center text-gray-400 hover:border-sand hover:text-sand transition-all group"
        >
          <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-sand/10 transition-colors">
            <FileText size={24} />
          </div>
          <span className="text-sm font-bold uppercase tracking-widest">Create New Story</span>
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-earth-dark/40 backdrop-blur-sm" onClick={() => !isDeleting && setDeleteConfirmId(null)} />
          <div className="relative bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 text-center">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={32} />
            </div>
            <h2 className="text-2xl font-serif text-earth-dark mb-2 italic">Delete Article?</h2>
            <p className="text-sm text-earth-dark/50 mb-8 leading-relaxed">
              Are you sure you want to remove this story? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setDeleteConfirmId(null)}
                disabled={isDeleting}
                className="flex-1 px-6 py-3 rounded-xl text-sm font-bold text-earth-dark/60 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 px-6 py-3 rounded-xl text-sm font-bold bg-red-500 text-white hover:bg-red-600 transition-colors shadow-lg shadow-red-200 flex items-center justify-center gap-2"
              >
                {isDeleting && <Loader2 size={16} className="animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
