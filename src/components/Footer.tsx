import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-earth-dark text-cream pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        {/* Brand */}
        <div>
          <Link to="/" className="inline-block mb-6">
            <span className="font-serif text-2xl tracking-tighter text-sand">EARTH & STONE</span>
          </Link>
          <p className="text-cream/60 text-sm leading-relaxed mb-6">
            Curating timeless pieces that bridge the gap between traditional craftsmanship and modern luxury. Sourced from the heart of Indonesia.
          </p>
          <div className="flex space-x-4">
            <Instagram size={20} className="text-sand hover:text-white cursor-pointer transition-colors" />
            <Facebook size={20} className="text-sand hover:text-white cursor-pointer transition-colors" />
            <Twitter size={20} className="text-sand hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="font-serif text-lg mb-6 text-sand italic">Shop</h4>
          <ul className="space-y-4 text-sm text-cream/70">
            <li><Link to="/collection" className="hover:text-sand transition-colors">New Arrivals</Link></li>
            <li><Link to="/collection" className="hover:text-sand transition-colors">All Collections</Link></li>
            <li><Link to="/collection" className="hover:text-sand transition-colors">Home Decor</Link></li>
            <li><Link to="/collection" className="hover:text-sand transition-colors">Furniture</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-serif text-lg mb-6 text-sand italic">Company</h4>
          <ul className="space-y-4 text-sm text-cream/70">
            <li><Link to="/about" className="hover:text-sand transition-colors">Our Story</Link></li>
            <li><Link to="/journal" className="hover:text-sand transition-colors">Journal</Link></li>
            <li><Link to="/contact" className="hover:text-sand transition-colors">Contact Us</Link></li>
            <li><Link to="/about" className="hover:text-sand transition-colors">Sustainability</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-serif text-lg mb-6 text-sand italic">Newsletter</h4>
          <p className="text-cream/60 text-sm mb-6">Join our community for exclusive updates and early access to new collections.</p>
          <form className="flex">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-white/5 border border-white/10 px-4 py-2 text-sm w-full focus:outline-none focus:border-sand transition-colors"
            />
            <button className="bg-sand text-earth-dark px-4 py-2 text-sm font-semibold hover:bg-white transition-colors">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-cream/40">
        <p>© 2024 Earth & Stone Boutique. All rights reserved.</p>
        <div className="flex space-x-8 mt-4 md:mt-0">
          <Link to="/admin/dashboard" className="hover:text-sand">Admin Portal</Link>
          <Link to="#" className="hover:text-sand">Privacy Policy</Link>
          <Link to="#" className="hover:text-sand">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
