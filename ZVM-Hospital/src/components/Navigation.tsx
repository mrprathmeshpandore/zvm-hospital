import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Landmark, Heart, BookOpen, Users, Building2, Phone, Briefcase, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Home', path: '/', icon: Heart },
  { name: 'About', path: '/about', icon: Landmark },
  { name: 'Departments', path: '/departments', icon: Building2 },
  { name: 'Doctors', path: '/doctors', icon: Users },
  { name: 'Services', path: '/services', icon: Briefcase },
  { name: 'Academic', path: '/academic', icon: BookOpen },
  { name: 'Blog', path: '/blog', icon: BookOpen },
  { name: 'Contact', path: '/contact', icon: Phone },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [patientEmail, setPatientEmail] = useState<string | null>(null);
  const location = useLocation();

  // Keep patient session status synchronized with routing changes
  useEffect(() => {
    const saved = localStorage.getItem('zvm_patient');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPatientEmail(parsed.email);
      } catch (e) {
        setPatientEmail(null);
      }
    } else {
      setPatientEmail(null);
    }
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 w-full bg-surface/80 backdrop-blur-md border-b border-outline-variant">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
            <Landmark className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl italic tracking-tighter text-primary leading-none">
              ZVM.
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">
              Unani Medical
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-xl text-sm font-black transition-all hover:bg-primary-container ${
                location.pathname === item.path ? 'bg-primary text-white shadow-md' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Patient Portal Entry / Dashboard Icon */}
          <Link
            to="/patient-portal"
            className={`ml-3 px-5 py-2.5 rounded-xl text-sm font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              location.pathname === '/patient-portal'
                ? 'bg-primary/20 text-primary border-2 border-primary/20'
                : 'border-2 border-primary-container text-primary hover:bg-primary-container'
            }`}
          >
            <User className="h-4 w-4" />
            {patientEmail ? 'Dashboard' : 'Portal'}
          </Link>

          <Link
            to="/appointment"
            className="ml-2 bg-secondary text-white px-5 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest shadow-lg hover:-translate-y-0.5 transition-all"
          >
            Book
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden w-10 h-10 bg-surface-container rounded-xl flex items-center justify-center text-primary shadow-sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-4 top-24 z-40 bg-white rounded-[32px] shadow-2xl border border-outline-variant lg:hidden overflow-hidden"
          >
            <div className="flex flex-col p-8 gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-4 text-lg font-black p-4 rounded-2xl transition-all ${
                    location.pathname === item.path ? 'bg-primary text-white shadow-lg' : 'text-on-surface-variant hover:bg-slate-100'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              ))}

              <Link
                to="/patient-portal"
                onClick={() => setIsOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 border-2 border-primary-container text-primary py-4 rounded-2xl font-black uppercase tracking-widest"
              >
                <User className="h-5 w-5" />
                {patientEmail ? 'Patient Dashboard' : 'Patient Portal'}
              </Link>

              <Link
                to="/appointment"
                onClick={() => setIsOpen(false)}
                className="mt-2 w-full bg-secondary text-white text-center px-8 py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl"
              >
                Book Appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mx-4 sm:mx-8 mb-8 mt-16 bg-[#1A1A1A] text-white rounded-[40px] shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="mx-auto max-w-7xl px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary">
                <Landmark className="h-8 w-8" />
              </div>
              <span className="font-black text-3xl tracking-tighter italic">ZVM.</span>
            </Link>
            <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-sm">
              Discovering the harmony of ancient Unani wisdom and modern surgical frontiers.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-8 underline decoration-secondary decoration-4 underline-offset-8">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/patient-portal" className="text-slate-300 font-bold hover:text-secondary transition-colors text-lg">
                  Patient Portal
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-300 font-bold hover:text-secondary transition-colors text-lg">
                  About College
                </Link>
              </li>
              <li>
                <Link to="/departments" className="text-slate-300 font-bold hover:text-secondary transition-colors text-lg">
                  Departments
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-slate-300 font-bold hover:text-secondary transition-colors text-lg">
                  Medical Faculty
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-300 font-bold hover:text-secondary transition-colors text-lg">
                  Clinical Services
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-8 underline decoration-primary decoration-4 underline-offset-8">Pune Campus</h4>
            <p className="text-slate-300 font-bold text-lg leading-relaxed">
              Azam Campus, Camp,<br />
              Pune, MH 411001
            </p>
            <div className="mt-8 flex gap-4">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center cursor-pointer hover:bg-primary transition-colors">📱</div>
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center cursor-pointer hover:bg-secondary transition-colors">✉️</div>
            </div>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-500">
          <span>&copy; {new Date().getFullYear()} Z.V.M. Unani Medical College</span>
          <div className="flex gap-8">
            <Link to="#" className="hover:text-white">Privacy</Link>
            <Link to="#" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

