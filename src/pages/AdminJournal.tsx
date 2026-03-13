import { useState } from 'react';
import { JOURNAL_POSTS } from '../constants/data';
import { Plus, Search, Edit2, Trash2, Eye, FileText } from 'lucide-react';

export default function AdminJournal() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = JOURNAL_POSTS.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-serif text-earth-dark mb-2">Journal Management</h1>
          <p className="text-sm text-earth-dark/50">Create and edit editorial stories for your blog.</p>
        </div>
        <button className="bg-earth-dark text-cream px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-coffee transition-colors shadow-lg">
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
                <h3 className="font-serif text-xl text-earth-dark mb-2 line-clamp-1">{post.title}</h3>
                <p className="text-xs text-earth-dark/50 line-clamp-2 leading-relaxed">{post.excerpt}</p>
              </div>
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-50">
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-coffee hover:bg-coffee/5 rounded-lg transition-colors">
                    <Edit2 size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
                <button className="flex items-center space-x-1 text-xs font-bold text-sand hover:text-coffee transition-colors">
                  <Eye size={14} />
                  <span>Preview</span>
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Empty State / Add New Card */}
        <button className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center text-gray-400 hover:border-sand hover:text-sand transition-all group">
          <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-sand/10 transition-colors">
            <FileText size={24} />
          </div>
          <span className="text-sm font-bold uppercase tracking-widest">Create New Story</span>
        </button>
      </div>
    </div>
  );
}
