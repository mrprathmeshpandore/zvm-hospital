import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, User, Heart, ArrowRight, CheckCircle } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

export default function Appointment() {
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ department: '', date: '', time: '', name: '', phone: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  // Pre-populate patient details if logged in
  useEffect(() => {
    document.title = "Book an Appointment | ZVM Hospital";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Schedule an outpatient (OPD) or surgical consultation at ZVM Hospital, Pune Campus. Select your specialty unit and pick a time slot.");
    }
    const saved = localStorage.getItem('zvm_patient');
    if (saved) {
      setIsLoggedIn(true);
      try {
        const parsed = JSON.parse(saved);
        setFormData(prev => ({
          ...prev,
          name: parsed.name || '',
          phone: parsed.phone || '',
          email: parsed.email || ''
        }));
      } catch (e) {}
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Handle department/doctor prefill from navigation state
  useEffect(() => {
    if (location.state?.department) {
      setFormData(prev => ({
        ...prev,
        department: location.state.department
      }));
      setStep(2); // Skip Step 1 since department is pre-chosen
    }
  }, [location.state]);


  if (isLoggedIn === null) {
    return null;
  }

  if (isLoggedIn === false) {
    return (
      <div className="mx-auto max-w-5xl px-4 sm:p-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black text-primary mb-6 tracking-tighter italic">Consult.</h1>
          <p className="text-xl text-on-surface-variant font-bold">Begin your journey towards holistic health with Unani masters.</p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-outline-variant p-8 md:p-16 rounded-[64px] shadow-2xl overflow-hidden flex flex-col items-center justify-center text-center gap-8 min-h-[500px]"
        >
          <div className="w-24 h-24 bg-rose-50 rounded-[32px] flex items-center justify-center text-rose-500 text-4xl shadow-inner shadow-rose-100">
            🔒
          </div>
          <h2 className="text-4xl font-black text-primary tracking-tight">Portal Login Required</h2>
          <p className="text-lg text-on-surface-variant font-medium max-w-lg leading-relaxed">
            अपॉइंटमेंट बुक करण्यासाठी कृपया आधी पेशंट पोर्टलवर लॉग इन करा. जर तुमचे खाते नसेल, तर तुम्ही मोबाईल किंवा ईमेलद्वारे त्वरित नोंदणी करू शकता.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center max-w-md">
            <Link 
              to="/patient-portal" 
              className="bg-primary text-white text-center px-8 py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:-translate-y-1 transition-transform"
            >
              Log In to Portal
            </Link>
            <Link 
              to="/patient-portal" 
              className="border-2 border-outline-variant text-primary text-center px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-50 transition-colors"
            >
              Register Patient
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:p-8 py-20">
      <div className="text-center mb-20">
        <h1 className="text-6xl font-black text-primary mb-6 tracking-tighter italic">Consult.</h1>
        <p className="text-xl text-on-surface-variant font-bold">Begin your journey towards holistic health with Unani masters.</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-center mb-16 px-4">
        <div className="flex gap-4 w-full max-w-md">
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={`h-2 flex-1 rounded-full transition-all duration-500 ${step >= s ? 'bg-primary' : 'bg-surface-container-highest'}`}
            />
          ))}
        </div>
      </div>

      <motion.div 
        layout
        className="bg-white border border-outline-variant p-8 md:p-16 rounded-[64px] shadow-2xl overflow-hidden min-h-[600px] flex flex-col relative"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="flex flex-col gap-10"
            >
              <h2 className="text-4xl font-black text-primary flex items-center gap-4 tracking-tight">
                <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center text-white">❤️</div>
                Select Unit
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {['Moalajat', 'Jarahat', 'Niswan', 'Atfal', 'Jild', 'Others'].map(dept => (
                  <button 
                    key={dept} 
                    onClick={() => {
                      setFormData({ ...formData, department: dept });
                      setStep(2);
                    }}
                    className="p-8 border-2 border-outline-variant rounded-[40px] text-left hover:border-primary hover:shadow-xl transition-all group bg-white"
                  >
                    <span className="text-2xl font-black text-primary block mb-1 tracking-tight">{dept}</span>
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-primary transition-colors">Select & Continue</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="flex flex-col gap-10"
            >
              <h2 className="text-4xl font-black text-primary flex items-center gap-4 tracking-tight">
                <div className="w-12 h-12 bg-tertiary rounded-2xl flex items-center justify-center text-white text-2xl">📅</div>
                Pick a Time
              </h2>
              {location.state?.doctorName && (
                <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 text-primary font-bold text-sm -mt-4">
                  🏥 Selected Specialist: <span className="underline decoration-secondary decoration-2 font-black">{location.state.doctorName}</span> ({formData.department})
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex flex-col gap-6">
                   <label className="text-xs font-black uppercase tracking-widest text-slate-500">Target Date</label>
                   <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="p-6 bg-surface-container rounded-[32px] border-none font-bold text-lg outline-none focus:ring-4 focus:ring-primary/20" />
                </div>
                <div className="flex flex-col gap-6">
                   <label className="text-xs font-black uppercase tracking-widest text-slate-500">Available Slots</label>
                   <div className="grid grid-cols-2 gap-4">
                      {['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM'].map(time => (
                        <button 
                          key={time} 
                          onClick={() => setFormData({...formData, time})}
                          className={`p-5 border-2 rounded-2xl transition-all text-sm font-black uppercase tracking-widest shadow-sm ${formData.time === time ? 'bg-primary text-white border-primary' : 'border-outline-variant hover:bg-primary/10 hover:border-primary/50'}`}
                        >
                          {time}
                        </button>
                      ))}
                   </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="flex flex-col gap-6">
                   <label className="text-xs font-black uppercase tracking-widest text-slate-500">Patient Name</label>
                   <input type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="p-6 bg-surface-container rounded-[32px] border-none font-bold text-lg outline-none focus:ring-4 focus:ring-primary/20" />
                </div>
                <div className="flex flex-col gap-6">
                   <label className="text-xs font-black uppercase tracking-widest text-slate-500">Phone Number</label>
                   <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="p-6 bg-surface-container rounded-[32px] border-none font-bold text-lg outline-none focus:ring-4 focus:ring-primary/20" />
                </div>
                <div className="flex flex-col gap-6">
                   <label className="text-xs font-black uppercase tracking-widest text-slate-500">Email Address</label>
                   <input type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="p-6 bg-surface-container rounded-[32px] border-none font-bold text-lg outline-none focus:ring-4 focus:ring-primary/20" />
                </div>
              </div>
              <div className="mt-auto pt-10 flex justify-between items-center">
                <button onClick={() => setStep(1)} className="text-slate-400 font-black label-caps hover:text-primary transition-colors px-4">Back</button>
                <button 
                  onClick={async () => {
                    if (!formData.date || !formData.time || !formData.name || !formData.phone || !formData.email) {
                      return alert('Please fill in all patient details including email address.');
                    }
                    setIsSubmitting(true);
                    try {
                      const response = await fetch('http://localhost:8000/api/appointments/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData)
                      });
                      if (response.ok) {
                        setStep(3);
                      } else {
                        const errData = await response.json();
                        if (errData.suggested_slot) {
                          const confirmNext = window.confirm(
                            `${errData.error}\n\nWould you like to book the next available slot on ${errData.suggested_slot.date} at ${errData.suggested_slot.time} instead?`
                          );
                          if (confirmNext) {
                            const updatedForm = {
                              ...formData,
                              date: errData.suggested_slot.date,
                              time: errData.suggested_slot.time
                            };
                            setFormData(updatedForm);
                            
                            const retryResponse = await fetch('http://localhost:8000/api/appointments/', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify(updatedForm)
                            });
                            
                            if (retryResponse.ok) {
                              setStep(3);
                              setIsSubmitting(false);
                              return;
                            } else {
                              const retryErr = await retryResponse.json();
                              alert(retryErr.error || 'Failed to book slot.');
                            }
                          }
                        } else {
                          alert(errData.error || 'Failed to book appointment. Check details.');
                        }
                      }
                    } catch (e) {
                      alert('Failed to book appointment due to a connection error.');
                    }
                    setIsSubmitting(false);
                  }}
                  disabled={isSubmitting}
                  className="bg-primary text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl flex items-center gap-3 hover:-translate-y-1 transition-transform disabled:opacity-50"
                >
                  {isSubmitting ? 'Booking...' : 'Confirm'} <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center gap-8 py-12"
            >
              <div className="w-32 h-32 bg-tertiary rounded-[40px] flex items-center justify-center text-6xl shadow-2xl skew-y-1">✨</div>
              <h2 className="text-5xl font-black text-primary tracking-tighter">Registered!</h2>
              <p className="text-xl text-on-surface-variant font-bold max-w-md leading-relaxed">Our specialist will confirm your slot via SMS within 120 minutes.</p>
              <div className="p-10 bg-surface-container rounded-[40px] w-full max-w-md text-left border border-outline-variant shadow-inner rotate-1">
                 <p className="text-xs uppercase tracking-[0.2em] font-black mb-4 text-secondary italic">ID: #ZVM-{Math.floor(Math.random() * 10000)}LV</p>
                 <div className="space-y-2">
                   <p className="text-lg font-bold text-primary">Patient: <span className="font-medium text-slate-600">{formData.name}</span></p>
                   <p className="text-lg font-bold text-primary">Unit: <span className="font-medium text-slate-600">{formData.department}</span></p>
                   <p className="text-lg font-bold text-primary">Date: <span className="font-medium text-slate-600">{formData.date} at {formData.time}</span></p>
                 </div>
              </div>
              <button 
                onClick={() => setStep(1)}
                className="mt-8 text-primary font-black uppercase tracking-widest hover:underline decoration-secondary decoration-4 underline-offset-8"
              >
                Book Another
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
