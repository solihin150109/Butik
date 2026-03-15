import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS, JOURNAL_POSTS } from '../constants/data';
import { Package, FileText, AlertTriangle, Eye, ArrowUpRight, ArrowDownRight, Layers, MapPin, BarChart2, PieChart as PieChartIcon, MousePointer2 } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';

const visitorData = [
  { name: 'Mon', visitors: 400 },
  { name: 'Tue', visitors: 300 },
  { name: 'Wed', visitors: 600 },
  { name: 'Thu', visitors: 800 },
  { name: 'Fri', visitors: 500 },
  { name: 'Sat', visitors: 900 },
  { name: 'Sun', visitors: 700 },
];

const categoryData = [
  { name: 'Rings', value: 40, color: '#5A4634' },
  { name: 'Necklaces', value: 30, color: '#8B735B' },
  { name: 'Earrings', value: 20, color: '#C2B280' },
  { name: 'Bracelets', value: 10, color: '#E5D3B3' },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics'>('overview');
  
  const totalProducts = PRODUCTS.length;
  const totalJournal = JOURNAL_POSTS.length;
  const categoriesCount = new Set(PRODUCTS.map(p => p.category)).size;
  const lowStockJKT = PRODUCTS.filter(p => p.stock.jakarta < 5).length;
  const lowStockPAP = PRODUCTS.filter(p => p.stock.papua < 5).length;
  const totalLowStock = lowStockJKT + lowStockPAP;

  const stats = [
    { 
      name: 'Total Products', 
      value: totalProducts, 
      change: '+2', 
      isUp: true, 
      icon: Package, 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50' 
    },
    { 
      name: 'Journal Stories', 
      value: totalJournal, 
      change: '+1', 
      isUp: true, 
      icon: FileText, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50' 
    },
    { 
      name: 'Total Visitors', 
      value: '12,842', 
      change: '-2.4%', 
      isUp: false, 
      icon: Eye, 
      color: 'text-amber-600', 
      bg: 'bg-amber-50' 
    },
    { 
      name: 'Product Categories', 
      value: categoriesCount, 
      change: 'Stable', 
      isUp: true, 
      icon: Layers, 
      color: 'text-indigo-600', 
      bg: 'bg-indigo-50' 
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif text-earth-dark mb-1 italic">
            {activeTab === 'overview' ? 'Management Overview' : 'Detailed Analytics'}
          </h1>
          <p className="text-sm text-earth-dark/40 font-medium uppercase tracking-widest">
            {activeTab === 'overview' ? 'Inventory & Editorial Insights' : 'Visitor Behavior & Content Reach'}
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'overview' ? 'bg-earth-dark text-cream shadow-md' : 'text-earth-dark/40 hover:text-earth-dark'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'analytics' ? 'bg-earth-dark text-cream shadow-md' : 'text-earth-dark/40 hover:text-earth-dark'}`}
          >
            Analytics
          </button>
        </div>
      </header>

      {activeTab === 'overview' ? (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.name} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-sand/30 transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                    <stat.icon size={20} />
                  </div>
                  <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg ${stat.isUp ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>
                    {stat.change}
                  </div>
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-earth-dark/30 mb-1">{stat.name}</p>
                <h3 className="text-2xl font-bold text-earth-dark tracking-tight">{stat.value}</h3>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Visitor Analysis Chart */}
            <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-serif text-earth-dark italic">Visitor Analysis</h2>
                  <p className="text-xs text-earth-dark/40 uppercase tracking-widest font-bold mt-1">Weekly traffic and engagement</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-coffee" />
                    <span className="text-[10px] uppercase tracking-widest font-bold text-earth-dark/60">Daily Visitors</span>
                  </div>
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={visitorData}>
                    <defs>
                      <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#5A4634" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#5A4634" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: '#A3A3A3', fontWeight: 600 }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: '#A3A3A3', fontWeight: 600 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '12px', 
                        border: 'none', 
                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                        fontSize: '12px'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="visitors" 
                      stroke="#5A4634" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorVisitors)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Inventory Status */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
              <h2 className="text-xl font-serif text-earth-dark italic mb-2">Inventory Health</h2>
              <p className="text-xs text-earth-dark/40 uppercase tracking-widest font-bold mb-8">Stock distribution summary</p>
              
              <div className="space-y-6 flex-1">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-coffee" />
                      <span className="text-xs font-bold text-earth-dark/60">Jakarta Warehouse</span>
                    </div>
                    <span className="text-xs font-bold text-earth-dark">{PRODUCTS.reduce((acc, p) => acc + p.stock.jakarta, 0)} units</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-coffee" />
                      <span className="text-xs font-bold text-earth-dark/60">Papua Boutique</span>
                    </div>
                    <span className="text-xs font-bold text-earth-dark">{PRODUCTS.reduce((acc, p) => acc + p.stock.papua, 0)} units</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-50 space-y-3">
                  <h3 className="text-[10px] uppercase tracking-widest font-bold text-earth-dark/30">Stock Alerts</h3>
                  {totalLowStock > 0 ? (
                    <div className="space-y-2">
                      {lowStockJKT > 0 && (
                        <div className="flex items-center gap-3 p-3 bg-red-50 text-red-700 rounded-xl text-xs font-medium">
                          <AlertTriangle size={16} />
                          <span>{lowStockJKT} items low in Jakarta</span>
                        </div>
                      )}
                      {lowStockPAP > 0 && (
                        <div className="flex items-center gap-3 p-3 bg-amber-50 text-amber-700 rounded-xl text-xs font-medium">
                          <AlertTriangle size={16} />
                          <span>{lowStockPAP} items low in Papua</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-emerald-600 font-medium italic">All stock levels are optimal.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Categories Summary */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-serif text-earth-dark italic">Inventory Mix</h2>
                <button 
                  onClick={() => navigate('/admin/products')}
                  className="text-[10px] uppercase tracking-widest font-bold text-sand hover:text-coffee transition-colors"
                >
                  View All Products
                </button>
              </div>
              <div className="space-y-4">
                {Array.from(new Set(PRODUCTS.map(p => p.category))).map((cat, idx) => {
                  const count = PRODUCTS.filter(p => p.category === cat).length;
                  const percentage = Math.round((count / totalProducts) * 100);
                  return (
                    <div key={cat} className="space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-earth-dark/60">{cat}</span>
                        <span className="text-earth-dark">{count} items ({percentage}%)</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-coffee rounded-full" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Content Summary */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-serif text-earth-dark italic">Journal Activity</h2>
                <button 
                  onClick={() => navigate('/admin/journal')}
                  className="text-[10px] uppercase tracking-widest font-bold text-sand hover:text-coffee transition-colors"
                >
                  Manage Stories
                </button>
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                      <FileText size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-earth-dark">Editorial Reach</p>
                      <p className="text-[10px] text-earth-dark/40">{totalJournal} published stories</p>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-earth-dark/20" />
                </div>
                
                <div className="pt-6 border-t border-gray-50">
                  <h3 className="text-[10px] uppercase tracking-widest font-bold text-earth-dark/30 mb-4">Latest Drafts & Stories</h3>
                  <div className="space-y-4">
                    {JOURNAL_POSTS.slice(0, 3).map((post, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={post.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-earth-dark truncate">{post.title}</p>
                          <p className="text-[10px] text-earth-dark/40">{post.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Detailed Visitor Stats */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-serif text-earth-dark italic mb-8">Traffic Sources</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'Direct', value: 450 },
                  { name: 'Social', value: 320 },
                  { name: 'Search', value: 210 },
                  { name: 'Referral', value: 120 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#A3A3A3' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#A3A3A3' }} />
                  <Tooltip cursor={{ fill: '#f9f9f9' }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                  <Bar dataKey="value" fill="#5A4634" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Engagement Metrics */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-serif text-earth-dark italic mb-8">Content Engagement</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-cream/30 border border-sand/10">
                <MousePointer2 size={24} className="text-coffee mb-4" />
                <p className="text-[10px] uppercase tracking-widest font-bold text-earth-dark/40 mb-1">Avg. Session</p>
                <h4 className="text-2xl font-bold text-earth-dark">4m 32s</h4>
              </div>
              <div className="p-6 rounded-2xl bg-cream/30 border border-sand/10">
                <BarChart2 size={24} className="text-coffee mb-4" />
                <p className="text-[10px] uppercase tracking-widest font-bold text-earth-dark/40 mb-1">Bounce Rate</p>
                <h4 className="text-2xl font-bold text-earth-dark">24.5%</h4>
              </div>
              <div className="p-6 rounded-2xl bg-cream/30 border border-sand/10">
                <Eye size={24} className="text-coffee mb-4" />
                <p className="text-[10px] uppercase tracking-widest font-bold text-earth-dark/40 mb-1">Page Views</p>
                <h4 className="text-2xl font-bold text-earth-dark">42.8k</h4>
              </div>
              <div className="p-6 rounded-2xl bg-cream/30 border border-sand/10">
                <PieChartIcon size={24} className="text-coffee mb-4" />
                <p className="text-[10px] uppercase tracking-widest font-bold text-earth-dark/40 mb-1">New Visitors</p>
                <h4 className="text-2xl font-bold text-earth-dark">68%</h4>
              </div>
            </div>
          </div>

          {/* Device Distribution */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-serif text-earth-dark italic mb-8">Device Distribution</h2>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Mobile', value: 65 },
                      { name: 'Desktop', value: 25 },
                      { name: 'Tablet', value: 10 },
                    ]}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {[0, 1, 2].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#5A4634', '#8B735B', '#C2B280'][index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {['Mobile', 'Desktop', 'Tablet'].map((device, i) => (
                <div key={device} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ['#5A4634', '#8B735B', '#C2B280'][i] }} />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-earth-dark/60">{device}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Pages */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-serif text-earth-dark italic mb-8">Most Visited Pages</h2>
            <div className="space-y-4">
              {[
                { path: '/collection', views: '12.4k', trend: '+15%' },
                { path: '/journal', views: '8.2k', trend: '+8%' },
                { path: '/about', views: '4.1k', trend: '-2%' },
                { path: '/contact', views: '2.8k', trend: '+5%' },
              ].map((page) => (
                <div key={page.path} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <span className="text-xs font-bold text-earth-dark/70">{page.path}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-earth-dark">{page.views}</span>
                    <span className={`text-[10px] font-bold ${page.trend.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                      {page.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
