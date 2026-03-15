import { useState } from 'react';
import { motion } from 'motion/react';
import { Filter, ChevronDown, X } from 'lucide-react';
import { PRODUCTS } from '../constants/data';
import ProductCard from '../components/ProductCard';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Collection() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [category, setCategory] = useState('All');
  const [origin, setOrigin] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [sortBy, setSortBy] = useState('Newest');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const categories = ['All', 'Home Decor', 'Apparel', 'Furniture', 'Kitchen', 'Lifestyle'];
  const origins = ['All', 'Jakarta', 'Papua', 'Both'];
  const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Name: A-Z'];

  const filteredProducts = PRODUCTS.filter(p => {
    const catMatch = category === 'All' || p.category === category;
    const originMatch = origin === 'All' || p.origin === origin || p.origin === 'Both';
    const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1];
    return catMatch && originMatch && priceMatch;
  }).sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.price - b.price;
    if (sortBy === 'Price: High to Low') return b.price - a.price;
    if (sortBy === 'Name: A-Z') return a.name.localeCompare(b.name);
    // Default to newest (assuming ID or order in array represents age for mock data)
    return 0;
  });

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-16 text-center">
        <p className="text-sand uppercase tracking-[0.3em] text-xs font-bold mb-4">The Collection</p>
        <h1 className="text-5xl md:text-7xl font-serif text-coffee italic">Curated Essentials</h1>
      </header>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block w-64 space-y-12">
          <div>
            <h3 className="font-serif text-xl mb-6 border-b border-sand/20 pb-2">Category</h3>
            <div className="flex flex-col space-y-3">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`text-left text-sm uppercase tracking-widest transition-colors ${category === cat ? 'text-coffee font-bold' : 'text-earth-dark/60 hover:text-coffee'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl mb-6 border-b border-sand/20 pb-2">Stock Origin</h3>
            <div className="flex flex-col space-y-3">
              {origins.map(o => (
                <button 
                  key={o}
                  onClick={() => setOrigin(o)}
                  className={`text-left text-sm uppercase tracking-widest transition-colors ${origin === o ? 'text-coffee font-bold' : 'text-earth-dark/60 hover:text-coffee'}`}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl mb-6 border-b border-sand/20 pb-2">Price Range</h3>
            <div className="space-y-4">
              <input 
                type="range" 
                min="0" 
                max="10000000" 
                step="500000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full h-1 bg-sand/20 rounded-lg appearance-none cursor-pointer accent-coffee"
              />
              <div className="flex justify-between text-[10px] uppercase tracking-widest text-sand font-bold">
                <span>Rp 0</span>
                <span>Rp {priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex justify-between items-center mb-8 border-y border-sand/10 py-4">
          <button 
            onClick={() => setFilterOpen(true)}
            className="flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-coffee"
          >
            <Filter size={16} />
            <span>Filter & Sort</span>
          </button>
          <span className="text-xs text-earth-dark/50 italic">{filteredProducts.length} Results</span>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-8 hidden lg:flex">
            <span className="text-sm text-earth-dark/50 italic">Showing {filteredProducts.length} results</span>
            <div className="flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-earth-dark/70 relative">
              <span>Sort By:</span>
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center space-x-1 hover:text-coffee transition-colors"
              >
                <span>{sortBy}</span>
                <ChevronDown size={14} className={cn("transition-transform", isSortOpen && "rotate-180")} />
              </button>

              {isSortOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-xl border border-sand/10 rounded-xl overflow-hidden z-50">
                  {sortOptions.map(option => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setIsSortOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-4 py-3 text-[10px] uppercase tracking-widest transition-colors hover:bg-sand/5",
                        sortBy === option ? "text-coffee font-bold" : "text-earth-dark/60"
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-40 text-center">
              <p className="font-serif text-2xl text-sand italic">No products found matching your criteria.</p>
              <button 
                onClick={() => { setCategory('All'); setOrigin('All'); setPriceRange([0, 10000000]); }}
                className="mt-6 text-xs uppercase tracking-widest font-bold text-coffee border-b border-coffee/30 pb-1"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {filterOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setFilterOpen(false)} />
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            className="absolute bottom-0 left-0 w-full bg-cream p-8 rounded-t-[2rem] shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-serif text-2xl">Filters</h2>
              <button onClick={() => setFilterOpen(false)}><X size={24} /></button>
            </div>
            
            <div className="space-y-8 max-h-[60vh] overflow-y-auto pb-10">
              <div>
                <h3 className="text-xs uppercase tracking-widest font-bold text-sand mb-4">Category</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`px-4 py-2 text-xs uppercase tracking-widest border transition-colors ${category === cat ? 'bg-coffee text-white border-coffee' : 'border-sand/30 text-earth-dark'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest font-bold text-sand mb-4">Origin</h3>
                <div className="flex flex-wrap gap-2">
                  {origins.map(o => (
                    <button 
                      key={o}
                      onClick={() => setOrigin(o)}
                      className={`px-4 py-2 text-xs uppercase tracking-widest border transition-colors ${origin === o ? 'bg-coffee text-white border-coffee' : 'border-sand/30 text-earth-dark'}`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={() => setFilterOpen(false)}
              className="w-full bg-earth-dark text-cream py-4 uppercase tracking-widest font-bold mt-4"
            >
              Show {filteredProducts.length} Results
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
