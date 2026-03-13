import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { JOURNAL_POSTS } from '../constants/data';

export default function Journal() {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <header className="mb-20 text-center max-w-2xl mx-auto">
        <p className="text-sand uppercase tracking-[0.3em] text-xs font-bold mb-4">The Journal</p>
        <h1 className="text-5xl md:text-7xl font-serif text-coffee italic mb-8">Editorial Stories</h1>
        <p className="text-earth-dark/60 leading-relaxed">
          Exploring the intersections of design, culture, and craftsmanship. A curated collection of thoughts and journeys from the heart of Earth & Stone.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
        {JOURNAL_POSTS.map((post, idx) => (
          <motion.article 
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group"
          >
            <Link to={`/journal/${post.id}`} className="block">
              <div className="aspect-[16/10] overflow-hidden mb-8 bg-gray-100">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-[10px] uppercase tracking-widest text-sand font-bold">
                  <span>{post.category}</span>
                  <span className="w-1 h-1 bg-sand rounded-full" />
                  <span>{post.date}</span>
                </div>
                <h2 className="text-3xl font-serif text-earth-dark group-hover:text-coffee transition-colors leading-tight">
                  {post.title}
                </h2>
                <p className="text-earth-dark/60 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="pt-4">
                  <span className="text-xs uppercase tracking-widest font-bold text-coffee border-b border-coffee/30 pb-1">Read Article</span>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
