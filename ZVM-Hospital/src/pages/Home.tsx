import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Shield, Award, FlaskConical, Stethoscope, Heart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  useEffect(() => {
    document.title = "ZVM Unani Medical College & Hospital | Best Unani Care & Surgery in Pune";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Welcome to Z.V.M. Unani Medical College & Hospital, Pune. Discover the perfect harmony of traditional Unani medicine and advanced modern healthcare. OPD, IPD, and specialist Unani treatments.");
    }
  }, []);
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-8">
      {/* Hero Section */}
      <section className="relative bg-primary rounded-[48px] overflow-hidden min-h-[600px] flex items-center shadow-2xl">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,#fff_0%,transparent_70%)]"></div>
        <div className="mx-auto max-w-7xl px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full py-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 flex flex-col gap-8"
          >
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md px-6 py-2 rounded-full self-start border border-white/20">
              <FlaskConical className="h-4 w-4 text-secondary-container" />
              <span className="label-caps text-white">Clinical Excellence</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[1.1] tracking-tighter">
              Ancient <br />
              <span className="text-secondary-container italic">Wisdom.</span> <br />
              Modern Fix.
            </h1>
            <p className="text-xl text-white/80 font-medium max-w-xl leading-relaxed">
              Z.V.M. Unani integrates profound herbal traditions with rigorous contemporary clinical practices for elite academic instruction.
            </p>
            <div className="flex flex-wrap items-center gap-6 mt-4">
              <Link to="/academic" className="bg-white text-primary px-10 py-5 rounded-2xl font-black text-lg shadow-xl hover:-translate-y-1 transition-transform">
                Explore Programs
              </Link>
              <Link to="/departments" className="bg-transparent border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition-colors">
                View Units
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 h-[550px] rounded-[40px] overflow-hidden border-8 border-white/10 shadow-2xl relative group"
          >
            <img 
              src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop" 
              alt="Medical professional at work"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
          </motion.div>
        </div>
      </section>

      {/* Institutional Pillars - Bento Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-12 gap-6">
            <motion.div 
              whileHover={{ y: -5 }}
              className="col-span-12 md:col-span-4 bg-secondary rounded-[40px] p-10 flex flex-col justify-between text-white shadow-xl min-h-[320px]"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">🏆</div>
              <div>
                <h3 className="text-3xl font-black mb-2 tracking-tight">Accredited Excellence</h3>
                <p className="text-white/80 font-bold">Fully recognized by central medical councils.</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="col-span-12 md:col-span-4 bg-tertiary rounded-[40px] p-10 flex flex-col justify-between text-white shadow-xl min-h-[320px]"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">🌿</div>
              <div>
                <h3 className="text-3xl font-black mb-2 tracking-tight">Authentic Tibb</h3>
                <p className="text-white/80 font-bold">Pioneering research in pharmacognosy labs.</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="col-span-12 md:col-span-4 bg-secondary-container rounded-[40px] p-10 flex flex-col justify-between text-on-secondary-container shadow-xl min-h-[320px]"
            >
              <div className="w-16 h-16 rounded-2xl bg-black/5 flex items-center justify-center text-3xl">🛡️</div>
              <div>
                <h3 className="text-3xl font-black mb-2 tracking-tight">Full Care</h3>
                <p className="opacity-80 font-bold">Multi-specialty clinical facility.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Heritage & Innovation */}
      <section className="bg-surface-container rounded-[48px] p-8 sm:p-12 lg:p-16 shadow-inner border border-outline-variant">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 h-[500px] rounded-[40px] overflow-hidden shadow-2xl rotate-[-2deg]">
            <img 
              src="https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=800&auto=format&fit=crop" 
              alt="Traditional Unani ingredients"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-7 flex flex-col gap-8">
            <span className="label-caps text-primary bg-primary/10 px-4 py-1 rounded-full w-fit">Deep Roots</span>
            <h2 className="text-5xl md:text-7xl font-black text-primary leading-[1.1] tracking-tighter">Legacy of Healing, Future of Discovery.</h2>
            <p className="text-xl text-on-surface-variant font-medium leading-relaxed">
              Choosing Z.V.M. means entrusting your health to an institution that honors centuries of Unani wisdom while embracing modern science.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-3xl border border-outline-variant shadow-sm">
                <CheckCircle className="h-6 w-6 text-secondary mb-4" />
                <h4 className="font-black text-xl mb-1">Expert Faculty</h4>
                <p className="text-on-surface-variant font-medium text-sm">Renowned practitioners of Unani medicine.</p>
              </div>
              <div className="p-6 bg-white rounded-3xl border border-outline-variant shadow-sm">
                <CheckCircle className="h-6 w-6 text-tertiary mb-4" />
                <h4 className="font-black text-xl mb-1">Regimenal Therapy</h4>
                <p className="text-on-surface-variant font-medium text-sm">Specialized holistic detoxification procedures.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Departments Preview */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 px-4">
            <div>
              <h2 className="text-5xl font-black text-primary tracking-tight">Clinical Units</h2>
              <p className="text-xl text-on-surface-variant font-bold mt-2">Specialized holistic care units.</p>
            </div>
            <Link to="/departments" className="bg-primary text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg inline-flex items-center gap-2">
              All Units <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Moalajat', sub: 'Internal Med', icon: Heart, color: 'bg-primary text-white' },
              { name: 'Jarahat', sub: 'Surgery', icon: Stethoscope, color: 'bg-secondary text-white' },
              { name: 'Atfal', sub: 'Pediatrics', icon: Users, color: 'bg-tertiary text-white' },
              { name: 'Qabalat', sub: 'Obstetrics', icon: Shield, color: 'bg-secondary-container text-on-secondary-container' },
            ].map((dep) => (
              <motion.div 
                key={dep.name}
                whileHover={{ scale: 1.02, rotate: 1 }}
                className="group p-10 border border-outline-variant rounded-[40px] bg-white hover:shadow-2xl transition-all duration-300 text-center"
              >
                <div className={`w-20 h-20 mx-auto rounded-3xl ${dep.color} flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                  <dep.icon className="h-10 w-10" />
                </div>
                <h4 className="text-3xl font-black text-primary mb-1 tracking-tight">{dep.name}</h4>
                <p className="text-sm font-black uppercase tracking-widest text-on-surface-variant opacity-60">{dep.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
