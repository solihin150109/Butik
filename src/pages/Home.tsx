import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';
import { PRODUCTS, JOURNAL_POSTS } from '../constants/data';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const newArrivals = PRODUCTS.slice(0, 3);
  const latestJournal = JOURNAL_POSTS[0];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000" 
            alt="Minimalist Interior"
            className="w-full h-full object-cover opacity-20 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-cream/60" />
          {/* Very subtle organic shape */}
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-sand/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sand uppercase tracking-[0.4em] text-xs md:text-sm font-semibold mb-6"
          >
            Est. 2024 — Curated Luxury
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-8xl font-serif text-coffee mb-8 leading-tight"
          >
            Timeless Pieces <br /> <span className="italic font-light text-earth-dark/80">for the Modern Home</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <a 
              href="https://wa.me/628123456789?text=Hello%20Earth%20%26%20Stone!%20I'd%20like%20to%20inquire%20about%20your%20collection."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-coffee hover:bg-earth-dark text-cream px-10 py-4 text-sm uppercase tracking-widest font-bold transition-all duration-300 shadow-lg"
            >
              Inquire via WhatsApp
            </a>
            <Link to="/collection" className="text-coffee hover:text-sand transition-colors uppercase tracking-widest text-xs font-bold border-b border-coffee/20 pb-1">
              Browse Collection
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/50 to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* New Arrivals */}
      <section className="py-32 px-6 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <p className="text-sand uppercase tracking-widest text-xs font-bold mb-4">The Latest</p>
              <h2 className="text-4xl md:text-5xl font-serif text-coffee italic">New Arrivals</h2>
            </div>
            <Link to="/collection" className="group flex items-center space-x-2 text-earth-dark hover:text-coffee transition-colors uppercase tracking-widest text-xs font-bold border-b border-earth-dark/20 pb-1">
              <span>View All Products</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Journal Preview */}
      <section className="py-32 px-6 bg-white border-y border-sand/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img 
                src={latestJournal.image} 
                alt={latestJournal.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-cream p-8 hidden md:block shadow-xl">
              <p className="text-sand uppercase tracking-widest text-[10px] font-bold mb-4">Featured Story</p>
              <h3 className="font-serif text-xl mb-4 italic leading-tight">{latestJournal.title}</h3>
              <Link to={`/journal/${latestJournal.id}`} className="text-coffee text-xs uppercase tracking-widest font-bold border-b border-coffee/30 pb-1">Read More</Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sand uppercase tracking-widest text-xs font-bold mb-6">Explore Journal</p>
            <h2 className="text-4xl md:text-6xl font-serif text-coffee mb-8 leading-tight">Editorial Stories <br /> <span className="italic font-light">from the Field</span></h2>
            <p className="text-earth-dark/70 leading-relaxed mb-10 text-lg">
              Our journal is a space where we share the stories behind our collections, the artisans we work with, and our philosophy on slow living and sustainable luxury.
            </p>
            <Link to="/journal" className="inline-block bg-earth-dark text-cream px-10 py-4 text-sm uppercase tracking-widest font-bold hover:bg-coffee transition-colors shadow-lg">
              Visit Journal
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Locations CTA */}
      <section className="py-32 px-6 bg-cream text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-serif text-coffee mb-8">Visit Our Flagship Stores</h2>
          <p className="text-earth-dark/70 mb-12">Experience the collection in person at our curated spaces in Jakarta and Papua.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 border border-sand/20 bg-white/50 hover:bg-white transition-colors">
              <h3 className="font-serif text-xl mb-2">Jakarta</h3>
              <p className="text-sm text-earth-dark/60 mb-4 italic">Senopati, South Jakarta</p>
              <Link to="/contact" className="text-sand text-xs uppercase tracking-widest font-bold">Get Directions</Link>
            </div>
            <div className="p-10 border border-sand/20 bg-white/50 hover:bg-white transition-colors">
              <h3 className="font-serif text-xl mb-2">Papua</h3>
              <p className="text-sm text-earth-dark/60 mb-4 italic">Jayapura City Center</p>
              <Link to="/contact" className="text-sand text-xs uppercase tracking-widest font-bold">Get Directions</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
