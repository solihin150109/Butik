import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Product } from '../constants/data';

interface ProductCardProps {
  product: Product;
  key?: string | number;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link to={`/collection/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.origin === 'Jakarta' && (
              <span className="bg-white/90 backdrop-blur-sm text-coffee text-[10px] uppercase tracking-widest px-2 py-1 font-semibold">Jakarta</span>
            )}
            {product.origin === 'Papua' && (
              <span className="bg-coffee text-white text-[10px] uppercase tracking-widest px-2 py-1 font-semibold">Papua</span>
            )}
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-sand mb-1">{product.category}</p>
          <h3 className="font-serif text-lg text-earth-dark group-hover:text-coffee transition-colors">{product.name}</h3>
          <p className="text-sm font-medium text-coffee mt-1">
            Rp {product.price.toLocaleString('id-ID')}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
