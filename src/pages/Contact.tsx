import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
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
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-sand">Full Name</label>
                <input type="text" className="w-full bg-cream/50 border border-sand/20 px-4 py-3 text-sm focus:outline-none focus:border-coffee transition-colors" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-sand">Email Address</label>
                <input type="email" className="w-full bg-cream/50 border border-sand/20 px-4 py-3 text-sm focus:outline-none focus:border-coffee transition-colors" placeholder="john@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-sand">Subject</label>
              <select className="w-full bg-cream/50 border border-sand/20 px-4 py-3 text-sm focus:outline-none focus:border-coffee transition-colors">
                <option>General Inquiry</option>
                <option>Order Status</option>
                <option>Wholesale</option>
                <option>Press</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-sand">Message</label>
              <textarea rows={6} className="w-full bg-cream/50 border border-sand/20 px-4 py-3 text-sm focus:outline-none focus:border-coffee transition-colors" placeholder="How can we help you?"></textarea>
            </div>
            <button className="w-full bg-earth-dark text-cream py-4 uppercase tracking-widest font-bold hover:bg-coffee transition-colors flex items-center justify-center gap-3">
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
                <div className="h-32 bg-gray-200 rounded-lg overflow-hidden grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                  {/* Map Placeholder */}
                  <div className="w-full h-full flex items-center justify-center text-[10px] uppercase tracking-widest text-earth-dark/40 font-bold">Map Integration</div>
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
                <div className="h-32 bg-gray-200 rounded-lg overflow-hidden grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                  {/* Map Placeholder */}
                  <div className="w-full h-full flex items-center justify-center text-[10px] uppercase tracking-widest text-earth-dark/40 font-bold">Map Integration</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
