import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="pt-32 pb-20">
      <header className="max-w-4xl mx-auto px-6 text-center mb-24">
        <p className="text-sand uppercase tracking-[0.3em] text-xs font-bold mb-4">Our Story</p>
        <h1 className="text-5xl md:text-8xl font-serif text-coffee italic mb-8">Bridging Worlds</h1>
        <p className="text-xl text-earth-dark/70 leading-relaxed font-light">
          Earth & Stone was born from a desire to celebrate the raw beauty of Indonesian craftsmanship while elevating it to a global luxury standard.
        </p>
      </header>

      {/* Vision Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="h-[60vh] lg:h-auto">
          <img 
            src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=1200" 
            alt="Craftsmanship" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="bg-earth-dark text-cream p-12 md:p-24 flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-8 italic text-sand">The Vision</h2>
          <div className="space-y-6 text-cream/70 leading-loose">
            <p>
              Founded in 2024, our journey began in the vibrant markets of Jakarta and the remote artisan villages of Papua. We saw a disconnect between the incredible talent of local makers and the accessibility of their work to those who appreciate fine design.
            </p>
            <p>
              Our mission is simple: to source, curate, and refine. We work directly with artisans, ensuring fair trade practices and sustainable sourcing, to bring you pieces that carry a soul and a story.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="text-center">
            <h3 className="font-serif text-2xl mb-4 italic text-coffee">Authenticity</h3>
            <p className="text-sm text-earth-dark/60 leading-relaxed">Every piece is verified for its origin and craftsmanship, ensuring you receive a genuine work of art.</p>
          </div>
          <div className="text-center">
            <h3 className="font-serif text-2xl mb-4 italic text-coffee">Sustainability</h3>
            <p className="text-sm text-earth-dark/60 leading-relaxed">We prioritize natural materials and ethical production methods to minimize our environmental footprint.</p>
          </div>
          <div className="text-center">
            <h3 className="font-serif text-2xl mb-4 italic text-coffee">Community</h3>
            <p className="text-sm text-earth-dark/60 leading-relaxed">A portion of every sale goes back into supporting artisan education and local infrastructure in Papua.</p>
          </div>
        </div>
      </section>

      {/* Team/Founder */}
      <section className="bg-cream py-32 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow-xl">
            <img src="https://picsum.photos/seed/founder/600/600" alt="Founder" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div>
            <p className="text-sand uppercase tracking-widest text-xs font-bold mb-4">The Founder</p>
            <h2 className="text-4xl font-serif text-coffee mb-6 italic">Elena Stone</h2>
            <p className="text-earth-dark/70 leading-relaxed mb-8">
              "I believe that the objects we surround ourselves with should be more than just functional. They should be a reflection of our values and a connection to the natural world. Earth & Stone is my way of sharing that connection with you."
            </p>
            <div className="w-32 h-[1px] bg-sand" />
          </div>
        </div>
      </section>
    </div>
  );
}
