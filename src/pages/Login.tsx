import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simple mock login validation
      if (email === 'admin@earthstone.com' && password === 'admin123') {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid credentials. Please check your email and password.');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl border border-sand/10"
      >
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl text-coffee mb-2 italic">Admin Portal</h1>
          <p className="text-xs uppercase tracking-[0.3em] text-sand">Earth & Stone Boutique</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-medium border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 pl-12 pr-4 py-4 rounded-2xl text-sm focus:outline-none focus:border-coffee transition-colors"
                placeholder="admin@earthstone.com"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 pl-12 pr-4 py-4 rounded-2xl text-sm focus:outline-none focus:border-coffee transition-colors"
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-coffee text-cream py-4 rounded-2xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:bg-earth-dark transition-all shadow-lg group disabled:opacity-70"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Sign In'}
            {!isLoading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="mt-10 text-center">
          <button 
            onClick={() => navigate('/')}
            className="text-[10px] uppercase tracking-widest text-sand hover:text-coffee font-bold transition-colors"
          >
            Back to Boutique
          </button>
        </div>
      </motion.div>
    </div>
  );
}
