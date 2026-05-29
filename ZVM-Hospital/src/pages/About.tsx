import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Landmark, Compass, Eye, User, Quote } from 'lucide-react';

export default function About() {
  useEffect(() => {
    document.title = "About Us | ZVM Unani Medical College & Hospital Pune";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Learn about Z.V.M. Unani Medical College & Hospital, our history, clinical values, and educational mission blending Unani philosophy with modern healthcare.");
    }
  }, []);
  return (
    <div className="flex flex-col gap-12 p-4 sm:p-8">
      {/* Hero Section */}
      <section className="bg-primary rounded-[48px] py-24 px-8 lg:px-16 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-6"
          >
            <span className="bg-white/20 backdrop-blur-md text-white label-caps px-6 py-2 rounded-full inline-block mb-8 border border-white/20">Institution Profile</span>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[1.1] tracking-tighter mb-8 italic">Ancient. <br/>Vital. <br/>Modern.</h1>
            <p className="text-xl text-white/80 font-bold max-w-xl leading-relaxed">
              Z.V.M. Unani Medical College stands as a premier beacon dedicated to scholarly advancement and clinical mastery.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-6 h-[500px] rounded-[40px] overflow-hidden border-8 border-white/10 shadow-2xl skew-y-1"
          >
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop" 
              alt="Medical college interior" 
              className="w-full h-full object-cover shadow-inner"
            />
          </motion.div>
        </div>
      </section>

      {/* Heritage */}
      <section className="bg-tertiary rounded-[48px] py-24 px-8 lg:px-16 shadow-xl text-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -ml-40 -mb-40"></div>
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          <div className="lg:col-span-5 rounded-[40px] overflow-hidden shadow-2xl border-4 border-white/20 h-[500px] rotate-[-2deg]">
            <img 
              src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=800&auto=format&fit=crop" 
              alt="Unani tibb heritage" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">🏛️</div>
              <span className="label-caps font-black tracking-widest text-white/70">Our Heritage</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter">The Tradition of Unani Tibb</h2>
            <div className="text-white/80 text-xl font-bold space-y-6">
              <p>The Unani system, with roots in ancient Greece and profound development in the Middle East, is a holistic approach to humeral balance.</p>
              <p>At Z.V.M., we preserve this legacy while subjecting it to modern scientific scrutiny, integrating classical treatises with contemporary diagnostic precision.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-black text-primary tracking-tighter mb-4 italic">Purpose.</h2>
            <p className="text-xl text-on-surface-variant font-bold">The foundational pillars guiding our pursuits.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-secondary rounded-[40px] p-12 text-white shadow-xl flex flex-col items-start gap-8">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">🚀</div>
              <h3 className="text-4xl font-black tracking-tight">Our Mission</h3>
              <p className="text-xl text-white/80 font-bold leading-relaxed">Producing compassionate physicians and diligent researchers, offering accessible, high-quality healthcare rooted in natural healing methodologies.</p>
            </div>
            <div className="bg-secondary-container rounded-[40px] p-12 text-on-secondary-container shadow-xl flex flex-col items-start gap-8">
              <div className="w-16 h-16 rounded-2xl bg-black/5 flex items-center justify-center text-3xl">👁️</div>
              <h3 className="text-4xl font-black tracking-tight">Our Vision</h3>
              <p className="text-xl opacity-80 font-bold leading-relaxed">Emerging as a global center of excellence, leading the integration of traditional wisdom with modern clinical advancements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Message */}
      <section className="py-24 bg-[#1A1A1A] rounded-[48px] mx-4 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-tertiary"></div>
        <div className="mx-auto max-w-7xl px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative">
              <div className="w-72 h-72 md:w-[400px] md:h-[400px] rounded-[40px] overflow-hidden border-8 border-white/5 shadow-2xl rotate-2 group-hover:rotate-0 transition-transform duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop" 
                  alt="Principal" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-secondary text-white w-24 h-24 rounded-3xl shadow-2xl flex items-center justify-center text-4xl">❝</div>
            </div>
          </div>
          <div className="lg:col-span-8 flex flex-col gap-8">
            <span className="bg-primary/20 text-primary label-caps px-6 py-2 rounded-full w-fit">From the Desk</span>
            <h2 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter">Commitment to Excellence.</h2>
            <div className="text-slate-400 text-xl font-bold space-y-6 italic">
              <p>"Our institution is a crucible where tradition meets clinical innovation. We honor the science of Unani Tibb while pushing the frontiers of modern surgery."</p>
            </div>
            <div>
              <p className="text-3xl font-black text-white italic tracking-tighter">Dr. S.A. Ansari</p>
              <p className="text-sm font-black uppercase tracking-widest text-slate-500">Principal & Superintendent</p>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Life */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-6xl font-black text-primary tracking-tighter italic">Vibe.</h2>
              <p className="text-xl text-on-surface-variant font-bold mt-2">Growth, camaraderie, and clinical development.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Blocks', img: 'https://images.unsplash.com/photo-1586773860418-d3b3da9601ee?q=80&w=800&auto=format&fit=crop' },
              { title: 'Gardens', img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=800&auto=format&fit=crop' },
              { title: 'Library', img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop' },
              { title: 'Life', img: 'https://images.unsplash.com/photo-1516534775068-ba3e84589d90?q=80&w=800&auto=format&fit=crop' },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 1 : -1 }}
                className="relative h-80 rounded-[40px] overflow-hidden group shadow-xl"
              >
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                  <h4 className="text-white font-black text-2xl tracking-tighter capitalize">{item.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
