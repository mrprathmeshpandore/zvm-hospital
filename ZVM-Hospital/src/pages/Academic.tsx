import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, GraduationCap, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const facultyMembers = [
  { name: 'Dr. A. Rahman', role: 'HOD & Professor', dept: 'Kulliyat', image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=300&auto=format&fit=crop' },
  { name: 'Dr. S. Fatima', role: 'Associate Professor', dept: 'Moalajat', image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?q=80&w=300&auto=format&fit=crop' },
  { name: 'Dr. M. Ansari', role: 'Professor', dept: 'Ilmul Advia', image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=300&auto=format&fit=crop' },
  { name: 'Dr. N. Ali', role: 'Assistant Professor', dept: 'Jarahat', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300&auto=format&fit=crop' },
];

export default function Academic() {
  useEffect(() => {
    document.title = "Academic Programs & Unani Education | ZVM College";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Explore academic offerings at Z.V.M. Unani Medical College, Pune. Bachelor of Unani Medicine & Surgery (BUMS), clinical courses, and our distinguished faculty.");
    }
  }, []);

  return (
    <div className="flex flex-col gap-12 p-4 sm:p-8">
      {/* Hero Section */}
      <section className="bg-tertiary rounded-[48px] py-24 px-8 lg:px-16 shadow-2xl relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8 flex flex-col gap-8"
          >
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md px-6 py-2 rounded-full self-start border border-white/20">
              <GraduationCap className="h-4 w-4 text-white" />
              <span className="label-caps">Academic Excellence</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[1.1] tracking-tighter italic">Master the <br />Ancient Art.</h1>
            <p className="text-xl text-white/80 font-bold max-w-xl leading-relaxed">
              Z.V.M. offers the premier B.U.M.S. program, blending classical treatises with contemporary surgical and clinical mastery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-12">
              <div className="bg-white rounded-[40px] p-12 border border-outline-variant shadow-xl overflow-hidden relative">
                <div className="absolute top-0 left-0 w-2 h-full bg-secondary"></div>
                <h2 className="text-4xl font-black text-primary tracking-tight mb-8">BUMS Eligibility</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    { label: 'Degree', val: 'Kamil-e-Tib-o-Jarahat' },
                    { label: 'Intake', val: '60 Students' },
                    { label: 'Duration', val: '5.5 Years' },
                    { label: 'Entrance', val: 'NEET Qualified' }
                  ].map((info) => (
                    <div key={info.label} className="flex flex-col gap-1">
                      <span className="text-xs font-black uppercase tracking-widest text-slate-500">{info.label}</span>
                      <span className="text-lg font-black text-primary">{info.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-3xl font-black text-primary tracking-tighter italic">Eminent Faculty</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {facultyMembers.map((member) => (
                    <motion.div 
                      key={member.name}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-6 p-6 bg-white rounded-[32px] border border-outline-variant shadow-sm"
                    >
                      <img src={member.image} className="w-20 h-20 rounded-2xl object-cover shadow-lg" alt={member.name} />
                      <div>
                        <h4 className="text-xl font-black text-primary tracking-tight">{member.name}</h4>
                        <p className="text-xs font-black uppercase tracking-widest text-slate-500">{member.dept}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
              <div className="bg-secondary rounded-[40px] p-10 text-white shadow-xl relative overflow-hidden">
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
                <h3 className="text-3xl font-black mb-6 tracking-tight">Admissions</h3>
                <p className="text-white/80 font-bold mb-8 italic">"Ready to join Pune's elite circle of Unani healers?"</p>
                <Link to="/contact" className="w-full bg-white text-secondary py-5 rounded-2xl font-black uppercase tracking-widest text-center block shadow-lg hover:-translate-y-1 transition-transform">
                  Inquire Now
                </Link>
              </div>

              <div className="bg-[#1A1A1A] rounded-[40px] p-10 text-white shadow-xl">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6 underline decoration-tertiary decoration-4 underline-offset-8">Affiliations</h4>
                <div className="space-y-4 font-bold text-slate-300">
                  <p>• NCISM Recognized</p>
                  <p>• MUHS Nashik Affiliated</p>
                  <p>• Azam Campus Resource</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-surface-container rounded-[48px] border border-outline-variant shadow-inner">
        <div className="mx-auto max-w-3xl px-8">
          <h2 className="text-5xl font-black text-primary text-center mb-16 tracking-tighter italic decoration-secondary decoration-8 underline underline-offset-12">FAQs.</h2>
          <div className="space-y-6">
            {[
              { q: 'What is the intake capacity?', a: 'The current annual intake for the BUMS program is 60 students, as approved by NCISM.' },
              { q: 'Is NEET qualification mandatory?', a: 'Yes, qualification in the NEET (UG) entrance examination is mandatory for admission.' },
              { q: 'Any postgraduate courses?', a: 'We are currently focused on our premier BUMS program, with specialized MJ courses in development.' },
              { q: 'Hostel facilities?', a: 'Yes, separate hostel facilities for male/female students with modern amenities within Azam Campus.' }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white border border-outline-variant p-8 rounded-[32px] shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-xl font-black text-primary mb-4 tracking-tight">Q: {faq.q}</h4>
                <p className="text-on-surface-variant font-bold leading-relaxed">A: {faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
