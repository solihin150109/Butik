import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, FileText, Settings, LogOut, Home } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function AdminSidebar() {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Journal', path: '/admin/journal', icon: FileText },
  ];

  return (
    <aside className="w-64 bg-earth-dark text-cream h-screen sticky top-0 flex flex-col">
      <div className="p-8 border-b border-white/5">
        <Link to="/" className="flex flex-col">
          <span className="font-serif text-xl tracking-tighter text-sand">EARTH & STONE</span>
          <span className="text-[8px] uppercase tracking-[0.3em] text-cream/40">Admin Panel</span>
        </Link>
      </div>

      <nav className="flex-1 p-6 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
              location.pathname === item.path 
                ? "bg-sand text-earth-dark font-medium" 
                : "text-cream/60 hover:bg-white/5 hover:text-cream"
            )}
          >
            <item.icon size={20} />
            <span className="text-sm">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-white/5 space-y-2">
        <Link to="/" className="flex items-center space-x-3 px-4 py-3 text-cream/60 hover:text-cream transition-colors">
          <Home size={20} />
          <span className="text-sm">View Shop</span>
        </Link>
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
          <LogOut size={20} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}
