import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Truck, ShieldCheck, ArrowLeft, MessageCircle, ChevronRight, ChevronLeft, Package } from 'lucide-react';
import { PRODUCTS } from '../constants/data';

export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) return <div className="pt-40 text-center font-serif text-2xl">Product not found.</div>;

  const whatsappMessage = `Hello Earth & Stone! I'm interested in the ${product.name} (Rp ${product.price.toLocaleString()}). Is it still available?`;
  const whatsappUrl = `https://wa.me/628123456789?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <Link to="/collection" className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-sand hover:text-coffee transition-colors mb-12">
        <ArrowLeft size={16} />
        <span>Back to Collection</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Image Gallery */}
        <div className="space-y-6">
          <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
            <motion.img 
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={product.images[activeImage]} 
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.images.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
                <button 
                  onClick={() => setActiveImage(prev => (prev === 0 ? product.images.length - 1 : prev - 1))}
                  className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-coffee pointer-events-auto hover:bg-white transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={() => setActiveImage(prev => (prev === product.images.length - 1 ? 0 : prev + 1))}
                  className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-coffee pointer-events-auto hover:bg-white transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
          
          {product.images.length > 1 && (
            <div className="flex gap-4">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-24 aspect-[3/4] overflow-hidden border-2 transition-colors ${activeImage === idx ? 'border-coffee' : 'border-transparent'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <p className="text-sand uppercase tracking-[0.3em] text-xs font-bold mb-4">{product.category}</p>
          <h1 className="text-4xl md:text-6xl font-serif text-coffee mb-6 leading-tight">{product.name}</h1>
          <p className="text-2xl font-medium text-earth-dark mb-8">Rp {product.price.toLocaleString('id-ID')}</p>
          
          <div className="prose prose-sm text-earth-dark/70 mb-10 leading-relaxed">
            <p>{product.description}</p>
          </div>

          {/* Stock Info */}
          <div className="bg-sand/5 border border-sand/10 p-6 rounded-xl mb-10">
            <h3 className="text-xs uppercase tracking-widest font-bold text-coffee mb-4 flex items-center gap-2">
              <Package size={14} />
              Availability
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-earth-dark/50 mb-1">Jakarta Warehouse</span>
                <span className={`text-sm font-bold ${product.stock.jakarta > 0 ? 'text-green-700' : 'text-red-400'}`}>
                  {product.stock.jakarta > 0 ? `${product.stock.jakarta} In Stock` : 'Out of Stock'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-earth-dark/50 mb-1">Papua Warehouse</span>
                <span className={`text-sm font-bold ${product.stock.papua > 0 ? 'text-green-700' : 'text-red-400'}`}>
                  {product.stock.papua > 0 ? `${product.stock.papua} In Stock` : 'Out of Stock'}
                </span>
              </div>
            </div>
          </div>

          {/* Shipping Estimator UI Placeholder */}
          <div className="border-t border-sand/10 pt-8 mb-10">
            <h3 className="text-xs uppercase tracking-widest font-bold text-coffee mb-4 flex items-center gap-2">
              <Truck size={14} />
              Shipping Estimator
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select className="bg-white border border-sand/20 px-4 py-2 text-sm focus:outline-none focus:border-coffee">
                <option>Select Destination</option>
                <option>Jakarta</option>
                <option>Surabaya</option>
                <option>Jayapura</option>
              </select>
              <select className="bg-white border border-sand/20 px-4 py-2 text-sm focus:outline-none focus:border-coffee">
                <option>Select Courier</option>
                <option>JNE</option>
                <option>Sicepat</option>
                <option>J&T</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4 mt-auto">
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-coffee text-cream h-14 uppercase tracking-widest font-bold hover:bg-earth-dark transition-colors flex items-center justify-center gap-3 shadow-lg"
            >
              <MessageCircle size={18} />
              Inquire via WhatsApp
            </a>
            <p className="text-center text-[10px] uppercase tracking-widest text-earth-dark/40 font-bold">
              Direct purchase via WhatsApp only
            </p>
          </div>

          <div className="mt-8 flex items-center gap-6 text-[10px] uppercase tracking-widest text-earth-dark/40 font-bold">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} />
              Secure Checkout
            </div>
            <div className="flex items-center gap-2">
              <Truck size={14} />
              Global Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
