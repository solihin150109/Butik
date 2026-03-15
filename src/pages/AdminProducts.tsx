import React, { useState } from 'react';
import { PRODUCTS } from '../constants/data';
import { Plus, Search, Edit2, Trash2, X, Image as ImageIcon, AlertTriangle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function AdminProducts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Home Decor',
    price: '',
    origin: 'Both',
    stockJakarta: 0,
    stockPapua: 0,
    description: '',
    images: [] as string[]
  });

  const filteredProducts = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      origin: product.origin || 'Both',
      stockJakarta: product.stock.jakarta,
      stockPapua: product.stock.papua,
      description: product.description,
      images: product.images
    });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'Home Decor',
      price: '',
      origin: 'Both',
      stockJakarta: 0,
      stockPapua: 0,
      description: '',
      images: []
    });
    setIsModalOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, upload to storage. Here we use a local preview URL
      const url = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, images: [...prev.images, url] }));
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-serif text-earth-dark mb-2">Product Management</h1>
          <p className="text-sm text-earth-dark/50">Manage your boutique inventory and stock levels.</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="bg-earth-dark text-cream px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-coffee transition-colors shadow-lg"
        >
          <Plus size={18} />
          Add New Product
        </button>
      </header>

      {/* Search & Filters */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 flex items-center">
        <Search size={20} className="text-gray-400 ml-2" />
        <input 
          type="text" 
          placeholder="Search products by name or category..." 
          className="flex-1 bg-transparent border-none px-4 py-2 text-sm focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-gray-400">Product</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-gray-400">Category</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-gray-400">Price</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-gray-400">Stock (JKT/PAP)</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-gray-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                      <img src={product.images[0]} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <span className="text-sm font-bold text-earth-dark">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs bg-sand/10 text-coffee px-2 py-1 rounded-lg font-medium">{product.category}</span>
                </td>
                <td className="px-6 py-4 text-sm font-medium">Rp {product.price.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2 text-xs">
                    <span className={`font-bold ${product.stock.jakarta < 5 ? 'text-red-500' : 'text-green-600'}`}>{product.stock.jakarta}</span>
                    <span className="text-gray-300">/</span>
                    <span className={`font-bold ${product.stock.papua < 5 ? 'text-red-500' : 'text-green-600'}`}>{product.stock.papua}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <button 
                      onClick={() => handleEdit(product)}
                      className="p-2 text-gray-400 hover:text-coffee hover:bg-coffee/5 rounded-lg transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => setDeleteConfirmId(product.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-earth-dark/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-2xl font-serif text-earth-dark">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-earth-dark"><X size={24} /></button>
            </div>
            
            <form className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Product Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-coffee" 
                    placeholder="e.g. Terra Cotta Vase" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-coffee"
                  >
                    <option>Home Decor</option>
                    <option>Apparel</option>
                    <option>Furniture</option>
                    <option>Kitchen</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Price (IDR)</label>
                  <input 
                    type="number" 
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-coffee" 
                    placeholder="1250000" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Origin</label>
                  <select 
                    value={formData.origin}
                    onChange={(e) => setFormData({...formData, origin: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-coffee"
                  >
                    <option value="Jakarta">Jakarta</option>
                    <option value="Papua">Papua</option>
                    <option value="Both">Both</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={cn("text-[10px] uppercase tracking-widest font-bold text-gray-400", formData.origin === 'Papua' && "opacity-30")}>Jakarta Stock</label>
                  <input 
                    type="number" 
                    value={formData.stockJakarta}
                    onChange={(e) => setFormData({...formData, stockJakarta: parseInt(e.target.value) || 0})}
                    disabled={formData.origin === 'Papua'}
                    className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-coffee disabled:opacity-30 disabled:cursor-not-allowed" 
                    placeholder="0" 
                  />
                </div>
                <div className="space-y-2">
                  <label className={cn("text-[10px] uppercase tracking-widest font-bold text-gray-400", formData.origin === 'Jakarta' && "opacity-30")}>Papua Stock</label>
                  <input 
                    type="number" 
                    value={formData.stockPapua}
                    onChange={(e) => setFormData({...formData, stockPapua: parseInt(e.target.value) || 0})}
                    disabled={formData.origin === 'Jakarta'}
                    className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-coffee disabled:opacity-30 disabled:cursor-not-allowed" 
                    placeholder="0" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Description</label>
                <textarea 
                  rows={4} 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-coffee" 
                  placeholder="Describe the product..."
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Product Images</label>
                <div className="grid grid-cols-4 gap-4 mb-4">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }))}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  <label className="aspect-square border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-sand hover:text-sand transition-all cursor-pointer">
                    <ImageIcon size={24} className="mb-1" />
                    <span className="text-[8px] font-bold uppercase tracking-widest">Add</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </label>
                </div>
              </div>
            </form>

            <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-4">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 text-sm font-bold text-gray-400 hover:text-earth-dark transition-colors"
              >
                Cancel
              </button>
              <button className="bg-earth-dark text-cream px-8 py-3 rounded-xl text-sm font-bold hover:bg-coffee transition-colors shadow-lg">
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-earth-dark/40 backdrop-blur-sm" onClick={() => setDeleteConfirmId(null)} />
          <div className="relative bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 text-center">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={32} />
            </div>
            <h2 className="text-2xl font-serif text-earth-dark mb-2">Delete Product?</h2>
            <p className="text-sm text-earth-dark/50 mb-8 leading-relaxed">
              Are you sure you want to remove this item from inventory? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 px-6 py-3 rounded-xl text-sm font-bold text-earth-dark/60 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  // In a real app, perform delete
                  setDeleteConfirmId(null);
                  alert('Product deleted successfully');
                }}
                className="flex-1 px-6 py-3 rounded-xl text-sm font-bold bg-red-500 text-white hover:bg-red-600 transition-colors shadow-lg shadow-red-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
