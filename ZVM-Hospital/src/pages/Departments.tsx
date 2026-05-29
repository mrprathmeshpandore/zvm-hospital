import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Smartphone, FlaskConical, Scissors, Baby, Activity, BookOpen, ArrowRight } from 'lucide-react';

const departments = [
  {
    name: 'Moalajat',
    alias: 'Medicine',
    tag: 'Clinical',
    image: 'https://images.unsplash.com/photo-1551076805-e18690237571?q=80&w=800&auto=format&fit=crop',
    description: 'The core department focusing on general medicine through the principles of Unani system. We emphasize holistic diagnosis and treatment using natural, herbal formulations.',
    featured: true
  },
  {
    name: 'Jarahat',
    alias: 'Surgery',
    icon: Scissors,
    color: 'bg-primary-fixed text-primary',
    description: 'Combining ancient surgical techniques described by Unani scholars with modern surgical procedures for comprehensive patient care.'
  },
  {
    name: 'Amraz-e-Niswan',
    alias: 'Gynecology & Obstetrics',
    icon: Activity,
    color: 'bg-tertiary-fixed text-tertiary',
    description: "Dedicated to women's health, offering specialized care from adolescence through menopause using safe, effective Unani remedies."
  },
  {
    name: 'Ilmul Advia',
    alias: 'Pharmacology',
    icon: FlaskConical,
    color: 'bg-surface-tint text-on-primary',
    description: 'Study and identification of natural drugs (herbal, animal, and mineral origin), their properties, actions, and uses in Unani medicine.'
  },
  {
    name: 'Kulliyat',
    alias: 'Basic Principles',
    tag: 'Academic',
    description: 'The foundational department teaching the fundamental principles, philosophy, and history of the Unani system of medicine.',
    bgDark: true
  }
];

export default function Departments() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Our Medical & Academic Departments | ZVM Hospital";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Explore academic and clinical departments at ZVM Unani College Pune: Moalajat, Jarahat (Surgery), Niswan (Gynecology), Atfal, and Kulliyat.");
    }
  }, []);

  const handleExplore = (deptName: string) => {
    let unit = 'Others';
    if (deptName === 'Moalajat') unit = 'Moalajat';
    else if (deptName === 'Jarahat') unit = 'Jarahat';
    else if (deptName === 'Amraz-e-Niswan') unit = 'Niswan';
    else if (deptName === 'Ilmul Atfal') unit = 'Atfal';
    else if (deptName === 'Jild') unit = 'Jild';
    
    navigate('/appointment', { state: { department: unit } });
  };
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
      <header className="text-center mb-20 max-w-3xl mx-auto">
        <h1 className="heading-h1 text-primary mb-6">Our Departments</h1>
        <p className="body-lg text-on-surface-variant">
          Explore our specialized academic and clinical departments, blending traditional Unani medical wisdom with modern scientific rigor.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {departments.map((dep, idx) => {
          if (dep.featured) {
            return (
              <motion.div 
                key={dep.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="md:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row"
              >
                <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                  <img 
                    src={dep.image} 
                    alt={dep.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="md:w-1/2 p-10 flex flex-col justify-center">
                  <span className="bg-secondary-container text-on-secondary-container label-caps px-3 py-1 rounded-full w-fit mb-4">{dep.tag}</span>
                  <h2 className="heading-h2 text-primary mb-1">{dep.name}</h2>
                  <h3 className="heading-h3 text-on-surface-variant mb-6 text-sm">({dep.alias})</h3>
                  <p className="body-md text-on-surface-variant mb-8">{dep.description}</p>
                  <button onClick={() => handleExplore(dep.name)} className="inline-flex items-center text-secondary font-bold hover:gap-2 transition-all">
                    Explore Department <ArrowRight className="h-4 w-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            );
          }

          if (dep.bgDark) {
            return (
              <motion.div 
                key={dep.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="md:col-span-4 bg-primary-container text-on-primary border border-outline-variant rounded-2xl p-8 flex flex-col group transition-all"
              >
                <span className="bg-primary-fixed text-primary label-caps px-3 py-1 rounded-full w-fit mb-4">{dep.tag}</span>
                <h2 className="heading-h2 text-on-primary mb-1 text-2xl">{dep.name}</h2>
                <h3 className="heading-h3 text-on-primary-container mb-6 text-sm">({dep.alias})</h3>
                <p className="body-md text-on-primary-container mb-8 flex-grow">{dep.description}</p>
                <button onClick={() => handleExplore(dep.name)} className="inline-flex items-center text-white font-bold hover:gap-2 transition-all">
                  Explore Department <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </motion.div>
            );
          }

          return (
            <motion.div 
              key={dep.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="md:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-2xl p-8 flex flex-col group hover:shadow-xl transition-all"
            >
              <div className={`w-12 h-12 ${dep.color} rounded-full flex items-center justify-center mb-6`}>
                {dep.icon && <dep.icon className="h-6 w-6" />}
              </div>
              <h2 className="heading-h2 text-primary mb-1 text-2xl">{dep.name}</h2>
              <h3 className="heading-h3 text-on-surface-variant mb-6 text-sm">({dep.alias})</h3>
              <p className="body-md text-on-surface-variant mb-8 flex-grow">{dep.description}</p>
              <button onClick={() => handleExplore(dep.name)} className="inline-flex items-center text-secondary font-bold hover:gap-2 transition-all">
                Explore Department <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
