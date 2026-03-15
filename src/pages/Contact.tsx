import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappNumber = "6281234567890"; // Replace with real number
    const text = `Hello Earth & Stone Boutique!%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Subject:* ${formData.subject}%0A*Message:* ${formData.message}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <header className="mb-20 text-center max-w-2xl mx-auto">
        <p className="text-sand uppercase tracking-[0.3em] text-xs font-bold mb-4">Get in Touch</p>
        <h1 className="text-5xl md:text-7xl font-serif text-coffee italic mb-8">Contact Us</h1>
        <p className="text-earth-dark/60 leading-relaxed">
          Whether you have a question about our collection, shipping, or just want to say hello, we'd love to hear from you.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Contact Form */}
        <div className="bg-white p-8 md:p-12 shadow-xl border border-sand/10">
          <h2 className="font-serif text-3xl mb-8 italic text-coffee">Send a Message</h2>
          <form onSubmit={handleSendMessage} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-sand">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-cream/50 border border-sand/20 px-4 py-3 text-sm focus:outline-none focus:border-coffee transition-colors" 
                  placeholder="John Doe" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-sand">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-cream/50 border border-sand/20 px-4 py-3 text-sm focus:outline-none focus:border-coffee transition-colors" 
                  placeholder="john@example.com" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-sand">Subject</label>
              <select 
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full bg-cream/50 border border-sand/20 px-4 py-3 text-sm focus:outline-none focus:border-coffee transition-colors"
              >
                <option>General Inquiry</option>
                <option>Order Status</option>
                <option>Wholesale</option>
                <option>Press</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-sand">Message</label>
              <textarea 
                rows={6} 
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-cream/50 border border-sand/20 px-4 py-3 text-sm focus:outline-none focus:border-coffee transition-colors" 
                placeholder="How can we help you?"
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-earth-dark text-cream py-4 uppercase tracking-widest font-bold hover:bg-coffee transition-colors flex items-center justify-center gap-3">
              <Send size={18} />
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info & Locations */}
        <div className="space-y-16">
          <div>
            <h2 className="font-serif text-3xl mb-8 italic text-coffee">Connect</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-sand/10 rounded-full flex items-center justify-center text-coffee flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-sand mb-1">Email</p>
                  <p className="text-earth-dark font-medium">hello@earthandstone.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-sand/10 rounded-full flex items-center justify-center text-coffee flex-shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-sand mb-1">Phone</p>
                  <p className="text-earth-dark font-medium">+62 812 3456 7890</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-serif text-3xl mb-8 italic text-coffee">Locations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-coffee">
                  <MapPin size={18} />
                  <h3 className="font-serif text-xl">Jakarta</h3>
                </div>
                <p className="text-sm text-earth-dark/60 leading-relaxed">
                  Jl. Senopati No. 45, Kebayoran Baru<br />
                  South Jakarta, 12110<br />
                  Indonesia
                </p>
                <div className="h-48 bg-gray-200 rounded-lg overflow-hidden grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.257577531773!2d106.8064563!3d-6.2310557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f14371520e51%3A0x2897463f25373a69!2sJl.%20Senopati%2C%20Kby.%20Baru%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sen!2sid!4v1710500000000!5m2!1sen!2sid" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-coffee">
                  <MapPin size={18} />
                  <h3 className="font-serif text-xl">Papua</h3>
                </div>
                <p className="text-sm text-earth-dark/60 leading-relaxed">
                  Kawasan Bisnis Jayapura, Blok C-12<br />
                  Jayapura, Papua, 99111<br />
                  Indonesia
                </p>
                <div className="h-48 bg-gray-200 rounded-lg overflow-hidden grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3985.908745612345!2d140.7123456!3d-2.5345678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x686cf01234567890%3A0x1234567890abcdef!2sJayapura%2C%20Papua!5e0!3m2!1sen!2sid!4v1710500000000!5m2!1sen!2sid" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
