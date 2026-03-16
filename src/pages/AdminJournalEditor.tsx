import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Image as ImageIcon, Eye, X, Loader2, AlertTriangle } from 'lucide-react';

export default function AdminJournalEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    category: 'Artisanship',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    excerpt: '',
    content: '',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=1000'
  });

  const [isLoading, setIsLoading] = useState(isEdit);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const fetchPost = async () => {
        setIsLoading(true);
        setError(null);
        try {
          // Simulated API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Placeholder data retrieval logic
          // In a real app, this would be a fetch(`/api/journal/${id}`)
          const mockPosts = [
            {
              id: '1',
              title: 'The Art of Stone Carving',
              category: 'Craftsmanship',
              date: 'Oct 12, 2023',
              excerpt: 'Exploring the ancient techniques used by Papuan artisans to create timeless stone artifacts.',
              image: 'https://picsum.photos/seed/stone/400/400',
              content: 'Full content of the article would go here. This is a placeholder for the editorial story about stone carving in Papua.'
            },
            {
              id: '2',
              title: 'Sustainable Sourcing in Papua',
              category: 'Ethics',
              date: 'Oct 08, 2023',
              excerpt: 'How we work with local communities to ensure our materials are sourced responsibly.',
              image: 'https://picsum.photos/seed/papua/400/400',
              content: 'Full content of the article would go here. This is a placeholder for the editorial story about sustainable sourcing.'
            }
          ];

          const post = mockPosts.find(p => p.id === id);
          if (post) {
            setFormData({
              title: post.title,
              category: post.category,
              date: post.date,
              excerpt: post.excerpt,
              content: post.content || '',
              image: post.image
            });
          } else {
            setError('Article not found');
          }
        } catch (err) {
          setError('Failed to load article data');
        } finally {
          setIsLoading(false);
        }
      };
      fetchPost();
    }
  }, [id, isEdit]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, image: url }));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Article saved successfully!');
      navigate('/admin/journal');
    } catch (err) {
      alert('Failed to save article');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-coffee animate-spin" />
        <p className="text-earth-dark/40 font-serif italic">Loading editor...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <header className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/journal')}
            className="p-2 hover:bg-white rounded-full transition-colors text-earth-dark/60"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-serif text-earth-dark italic">
              {isEdit ? 'Edit Article' : 'Write New Story'}
            </h1>
            <p className="text-sm text-earth-dark/50">Draft your editorial content for the boutique journal.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-earth-dark/60 hover:text-earth-dark transition-colors"
          >
            <Eye size={18} />
            Preview
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-earth-dark text-cream px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-coffee transition-colors shadow-lg disabled:opacity-50"
          >
            {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {isSaving ? 'Saving...' : 'Save Article'}
          </button>
        </div>
      </header>

      {error && (
        <div className="mb-8 p-6 bg-red-50 text-red-600 rounded-3xl flex items-center gap-4">
          <AlertTriangle size={24} />
          <div>
            <p className="font-bold">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Article Title</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full bg-gray-50 border border-gray-100 px-6 py-4 rounded-2xl text-xl font-serif focus:outline-none focus:border-coffee italic"
                placeholder="Enter a captivating title..."
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Excerpt</label>
              <textarea 
                rows={3}
                value={formData.excerpt}
                onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                className="w-full bg-gray-50 border border-gray-100 px-6 py-4 rounded-2xl text-sm focus:outline-none focus:border-coffee leading-relaxed"
                placeholder="A brief summary for the list view..."
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Full Content</label>
              <textarea 
                rows={15}
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="w-full bg-gray-50 border border-gray-100 px-6 py-4 rounded-2xl text-sm focus:outline-none focus:border-coffee leading-relaxed"
                placeholder="Tell your story here..."
                required
              />
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <h3 className="font-serif text-lg text-earth-dark border-b border-gray-50 pb-4 italic">Settings</h3>
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Category</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-coffee"
              >
                <option>Artisanship</option>
                <option>Interior</option>
                <option>Lifestyle</option>
                <option>Travel</option>
                <option>Ethics</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Publish Date</label>
              <input 
                type="text" 
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-coffee"
              />
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <h3 className="font-serif text-lg text-earth-dark border-b border-gray-50 pb-4 italic">Cover Image</h3>
            <label className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 group cursor-pointer block">
              <img src={formData.image} alt="Cover" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="p-3 bg-white rounded-full text-earth-dark shadow-xl">
                  <ImageIcon size={20} />
                </div>
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
            </label>
            <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest">Click to change image</p>
          </div>
        </div>
      </form>

      {/* Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
          <div className="absolute inset-0 bg-earth-dark/60 backdrop-blur-md" onClick={() => setIsPreviewOpen(false)} />
          <div className="relative bg-cream w-full max-w-4xl h-full rounded-3xl shadow-2xl overflow-hidden flex flex-col">
            <div className="px-8 py-4 border-b border-sand/10 flex justify-between items-center bg-white">
              <span className="text-[10px] uppercase tracking-[0.3em] text-sand font-bold">Article Preview</span>
              <button onClick={() => setIsPreviewOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto bg-white">
              <div className="max-w-2xl mx-auto py-16 px-8">
                <div className="text-center mb-12">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-sand font-bold mb-4 block">{formData.category}</span>
                  <h1 className="text-4xl md:text-5xl font-serif text-coffee mb-6 leading-tight italic">{formData.title || 'Untitled Story'}</h1>
                  <div className="flex items-center justify-center space-x-4 text-[10px] uppercase tracking-widest text-sand">
                    <span>{formData.date}</span>
                    <span className="w-1 h-1 bg-sand rounded-full" />
                    <span>By Earth & Stone Editorial</span>
                  </div>
                </div>

                <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-12 shadow-xl">
                  <img src={formData.image} alt="" className="w-full h-full object-cover" />
                </div>

                <div className="prose prose-coffee max-w-none">
                  <p className="text-xl font-serif italic text-coffee/70 mb-8 leading-relaxed border-l-4 border-sand/20 pl-6">
                    {formData.excerpt || 'No excerpt provided.'}
                  </p>
                  <div className="text-earth-dark/80 leading-relaxed space-y-6 whitespace-pre-wrap">
                    {formData.content || 'Start writing your story to see it here...'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
