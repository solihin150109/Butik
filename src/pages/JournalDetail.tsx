import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Share2, Bookmark } from 'lucide-react';
import { JOURNAL_POSTS } from '../constants/data';

export default function JournalDetail() {
  const { id } = useParams();
  const post = JOURNAL_POSTS.find(p => p.id === id);

  if (!post) return <div className="pt-40 text-center font-serif text-2xl">Article not found.</div>;

  return (
    <div className="pt-32 pb-20">
      <article>
        {/* Header */}
        <header className="max-w-4xl mx-auto px-6 text-center mb-16">
          <Link to="/journal" className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-sand hover:text-coffee transition-colors mb-12">
            <ArrowLeft size={16} />
            <span>Back to Journal</span>
          </Link>
          <div className="flex items-center justify-center space-x-4 text-[10px] uppercase tracking-widest text-sand font-bold mb-6">
            <span>{post.category}</span>
            <span className="w-1 h-1 bg-sand rounded-full" />
            <span>{post.date}</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-serif text-coffee mb-8 leading-tight italic">{post.title}</h1>
          <div className="flex items-center justify-center space-x-4 text-sm text-earth-dark/60 italic">
            <span>Written by {post.author}</span>
          </div>
        </header>

        {/* Hero Image */}
        <div className="w-full h-[70vh] overflow-hidden mb-20">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6">
          <div className="prose prose-lg prose-stone mx-auto">
            <p className="text-2xl font-serif italic text-coffee mb-12 leading-relaxed">
              {post.excerpt}
            </p>
            <div className="text-earth-dark/80 leading-loose space-y-8">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <h2 className="text-3xl font-serif text-coffee mt-12 mb-6">The Essence of Craftsmanship</h2>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <blockquote className="border-l-4 border-sand pl-8 py-4 italic text-xl text-coffee my-12">
                "Design is not just what it looks like and feels like. Design is how it works and the stories it tells."
              </blockquote>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-20 pt-10 border-t border-sand/20 flex justify-between items-center">
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-earth-dark/60 hover:text-coffee transition-colors">
                <Share2 size={16} />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-earth-dark/60 hover:text-coffee transition-colors">
                <Bookmark size={16} />
                <span>Save</span>
              </button>
            </div>
            <div className="text-[10px] uppercase tracking-widest text-sand font-bold">
              Earth & Stone Editorial
            </div>
          </footer>
        </div>
      </article>

      {/* Related Posts Placeholder */}
      <section className="mt-32 bg-cream py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-serif text-3xl mb-12 italic text-center text-coffee">More Stories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {JOURNAL_POSTS.filter(p => p.id !== id).map(p => (
              <Link key={p.id} to={`/journal/${p.id}`} className="group flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-40 aspect-square overflow-hidden flex-shrink-0">
                  <img src={p.image} alt="" className="w-full h-full object-cover transition-transform group-hover:scale-110" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-sand font-bold mb-2">{p.date}</p>
                  <h4 className="font-serif text-xl group-hover:text-coffee transition-colors">{p.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
