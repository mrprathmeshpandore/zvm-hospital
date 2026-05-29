import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Stethoscope, FlaskConical, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    name: 'Inpatient Department (IPD)',
    description: 'Comprehensive round-the-clock medical care with specialized Unani wards, modern monitoring equipment, and dedicated nursing staff.',
    icon: Activity,
    color: 'bg-secondary-container text-on-secondary-container'
  },
  {
    name: 'Outpatient Department (OPD)',
    description: 'Daily consultation clinics spanning general medicine, surgery, pediatrics, and specialized Unani disciplines for swift, effective care.',
    icon: Stethoscope,
    color: 'bg-primary-fixed text-primary'
  },
  {
    name: 'Diagnostic Labs',
    description: 'State-of-the-art pathological and radiological diagnostic services ensuring precise clinical evaluation to support treatment protocols.',
    icon: FlaskConical,
    color: 'bg-tertiary-fixed text-on-tertiary-fixed'
  }
];

export default function Services() {
  useEffect(() => {
    document.title = "Clinical Services & Diagnostics | ZVM Hospital";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Explore ZVM Hospital clinical services: 24/7 Inpatient Department (IPD), Outpatient Department (OPD), advanced Pathology Labs, and Unani Regimenal therapies.");
    }
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7">
          <h1 className="heading-h1 text-primary mb-6">Comprehensive Clinical Care</h1>
          <p className="body-lg text-on-surface-variant mb-8 max-w-2xl">
            Bridging traditional Unani medicine with modern diagnostic excellence. Our medical services are designed to provide holistic, patient-centered care.
          </p>
          <div className="flex flex-wrap gap-3">
            {['UNANI MEDICINE', 'MODERN DIAGNOSTICS', '24/7 CARE'].map(tag => (
              <span key={tag} className="px-4 py-1 rounded-full bg-surface-container border border-outline-variant label-caps text-primary-container">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="md:col-span-5 h-[300px] lg:h-[400px] bg-surface-container-high rounded-2xl overflow-hidden shadow-lg">
          <img 
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" 
            alt="Hospital interior" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Primary Services */}
      <section className="py-24 bg-surface border-y border-outline-variant">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="heading-h2 text-primary mb-12 text-center">Our Primary Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div 
                key={service.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white border border-outline-variant rounded-2xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col items-start group"
              >
                <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className="h-8 w-8" />
                </div>
                <h3 className="heading-h3 text-primary mb-4">{service.name}</h3>
                <p className="body-md text-on-surface-variant flex-grow">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Unani Feature */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <span className="label-caps text-secondary mb-4 block">SPECIALIZED CARE</span>
          <h2 className="heading-h2 text-primary mb-6">Ilaj-bit-Tadbeer (Regimenal Therapy)</h2>
          <p className="body-lg text-on-surface-variant mb-8">
            Experience the profound healing of specialized Unani therapies. Ilaj-bit-Tadbeer involves specific physical methods to modify the body's constitution and eliminate morbid humors.
          </p>
          <ul className="space-y-4 mb-10">
            {['Cupping Therapy (Hijama)', 'Massage Therapy (Dalk)', 'Leeching (Irsal-e-Alaq)'].map(item => (
              <li key={item} className="flex items-center gap-3 text-on-surface body-md font-medium">
                <CheckCircle className="h-5 w-5 text-secondary" />
                {item}
              </li>
            ))}
          </ul>
          <Link to="/about" className="bg-secondary text-on-secondary px-10 py-4 rounded-xl font-bold uppercase tracking-wider hover:opacity-90 transition-all">
            Learn More About Therapies
          </Link>
        </div>
        <div className="order-1 lg:order-2 h-[500px] rounded-[3rem] overflow-hidden shadow-2xl relative">
          <img 
            src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800&auto=format&fit=crop" 
            alt="Unani medicine herbs" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>
    </div>
  );
}
