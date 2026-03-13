import { PRODUCTS, JOURNAL_POSTS } from '../constants/data';
import { Package, FileText, AlertTriangle, TrendingUp, Users, ShoppingCart } from 'lucide-react';

export default function AdminDashboard() {
  const totalProducts = PRODUCTS.length;
  const totalJournal = JOURNAL_POSTS.length;
  const lowStockJKT = PRODUCTS.filter(p => p.stock.jakarta < 5).length;
  const lowStockPAP = PRODUCTS.filter(p => p.stock.papua < 5).length;

  const stats = [
    { name: 'Total Products', value: totalProducts, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Journal Articles', value: totalJournal, icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50' },
    { name: 'Total Customers', value: '1,284', icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'Monthly Revenue', value: 'Rp 42.5M', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-serif text-earth-dark mb-2">Dashboard Overview</h1>
        <p className="text-sm text-earth-dark/50">Welcome back, Admin. Here's what's happening today.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">+12%</span>
            </div>
            <p className="text-sm text-earth-dark/50 mb-1">{stat.name}</p>
            <h3 className="text-2xl font-bold text-earth-dark">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stock Alerts */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-serif text-earth-dark">Inventory Alerts</h2>
            <button className="text-xs uppercase tracking-widest font-bold text-sand hover:text-coffee">View Inventory</button>
          </div>
          <div className="space-y-4">
            {lowStockJKT > 0 && (
              <div className="flex items-center justify-between p-4 bg-orange-50 border border-orange-100 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="text-orange-600"><AlertTriangle size={20} /></div>
                  <div>
                    <p className="text-sm font-bold text-earth-dark">{lowStockJKT} Products Low in Jakarta</p>
                    <p className="text-xs text-earth-dark/50">Stock level is below 5 units.</p>
                  </div>
                </div>
                <button className="text-xs font-bold text-orange-600 hover:underline">Restock</button>
              </div>
            )}
            {lowStockPAP > 0 && (
              <div className="flex items-center justify-between p-4 bg-red-50 border border-red-100 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="text-red-600"><AlertTriangle size={20} /></div>
                  <div>
                    <p className="text-sm font-bold text-earth-dark">{lowStockPAP} Products Low in Papua</p>
                    <p className="text-xs text-earth-dark/50">Critical stock level reached.</p>
                  </div>
                </div>
                <button className="text-xs font-bold text-red-600 hover:underline">Restock</button>
              </div>
            )}
            {lowStockJKT === 0 && lowStockPAP === 0 && (
              <p className="text-center py-10 text-earth-dark/40 italic">All stock levels are healthy.</p>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-serif text-earth-dark mb-8">Recent Orders</h2>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-earth-dark/40">
                  <ShoppingCart size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-earth-dark">Order #829{i}</p>
                  <p className="text-xs text-earth-dark/50">2 mins ago • Rp 1.2M</p>
                </div>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg uppercase">New</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
