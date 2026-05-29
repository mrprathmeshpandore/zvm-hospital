import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, GraduationCap, Calendar, ArrowRight, ChevronDown } from 'lucide-react';

const doctors = [
  {
    name: 'Dr. Aliyah Rahman',
    role: 'Senior Consultant & Professor',
    specialty: 'Moalijat (Internal Medicine)',
    qual: 'BUMS, MD (Unani)',
    image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?q=80&w=300&auto=format&fit=crop'
  },
  {
    name: 'Dr. Tariq Mahmood',
    role: 'Head of Department, Jarahat',
    specialty: 'Jarahat (Surgery)',
    qual: 'BUMS, MS (Unani Surgery)',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=300&auto=format&fit=crop'
  },
  {
    name: 'Dr. Fatima Zain',
    role: 'Consultant Pediatrician',
    specialty: 'Ilmul Atfal (Pediatrics)',
    qual: 'BUMS, MD (Ilmul Atfal)',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop'
  },
  {
    name: 'Dr. Yasmeen Shah',
    role: 'Senior Consultant',
    specialty: 'Amraz-e-Niswan (Gynecology)',
    qual: 'BUMS, MD (Unani)',
    image: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?q=80&w=300&auto=format&fit=crop'
  }
];

export default function Doctors() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Our Medical Faculty & Specialists | ZVM Hospital";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Meet our elite team of Unani practitioners, physicians, and surgeons at ZVM Hospital, Azam Campus. Over 20 years of clinical experience.");
    }
  }, []);

  const handleBookDoctor = (doc: typeof doctors[0]) => {
    let unit = 'Others';
    if (doc.specialty.includes('Moalijat')) unit = 'Moalajat';
    else if (doc.specialty.includes('Jarahat')) unit = 'Jarahat';
    else if (doc.specialty.includes('Atfal')) unit = 'Atfal';
    else if (doc.specialty.includes('Niswan')) unit = 'Niswan';

    navigate('/appointment', { state: { department: unit, doctorName: doc.name } });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
      <header className="mb-16 text-center md:text-left">
        <h1 className="heading-h1 text-primary mb-4">Our Medical Faculty</h1>
        <p className="body-lg text-on-surface-variant max-w-2xl">
          Discover our team of expert Unani practitioners and clinical specialists dedicated to providing holistic, patient-centered care rooted in ancient traditions and modern science.
        </p>
      </header>

      {/* Search and Filter */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 mb-12 shadow-sm">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline h-5 w-5" />
            <input 
              type="text" 
              placeholder="Search by name or specialty..."
              className="w-full pl-12 pr-4 py-3 bg-surface-container border-transparent focus:border-primary focus:bg-white focus:ring-0 rounded-xl font-medium transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <button className="bg-primary text-on-primary px-4 py-2 rounded-full label-caps transition-colors">All Departments</button>
            <button className="bg-surface-container hover:bg-surface-container-high text-on-surface-variant px-4 py-2 rounded-full label-caps border border-outline-variant transition-colors">Moalijat</button>
            <button className="bg-surface-container hover:bg-surface-container-high text-on-surface-variant px-4 py-2 rounded-full label-caps border border-outline-variant transition-colors">Jarahat</button>
            <button className="bg-surface-container hover:bg-surface-container-high text-on-surface-variant px-4 py-2 rounded-full label-caps border border-outline-variant transition-colors">Ilmul Atfal</button>
          </div>
        </div>
      </div>

      {/* Doctor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctors.filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase())).map((doc, idx) => (
          <motion.article 
            key={doc.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden flex flex-col group hover:shadow-xl transition-all"
          >
            <div className="h-[320px] w-full overflow-hidden bg-surface-container">
              <img 
                src={doc.image} 
                alt={doc.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <span className="inline-block bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full label-caps mb-4 self-start border border-secondary/10">
                {doc.specialty}
              </span>
              <h3 className="heading-h3 text-primary mb-1">{doc.name}</h3>
              <p className="body-md text-on-surface-variant mb-4">{doc.role}</p>
              <div className="flex items-center gap-2 text-on-surface-variant text-sm mb-8">
                <GraduationCap className="h-4 w-4" />
                <span>{doc.qual}</span>
              </div>
              <div className="mt-auto pt-6 border-t border-outline-variant/30">
                <button onClick={() => handleBookDoctor(doc)} className="w-full border border-secondary text-secondary hover:bg-secondary hover:text-white transition-all px-6 py-3 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Book Appointment
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-16 text-center">
        <button className="text-primary hover:bg-surface-container px-6 py-3 rounded-xl label-caps transition-all inline-flex items-center gap-2">
          Load More Specialists <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
