import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, Landmark } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Medical Appointment', message: '' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    document.title = "Contact Us & Campus Location | ZVM Hospital Pune";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Get in touch with Z.V.M. Unani Medical College & Hospital. Phone numbers, maps, coordinates, campus address in Camp, Pune, and direct enquiry forms.");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');
    try {
      const response = await fetch('http://localhost:8000/api/contacts/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: 'Medical Appointment', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  return (
    <div className="flex flex-col">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mb-16">
          <h1 className="heading-h1 text-primary mb-4">Contact Us</h1>
          <p className="body-lg text-on-surface-variant">We are here to assist you with inquiries regarding admissions, medical consultations, and hospital services. Reach out to our dedicated administrative and support teams.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Info Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-6">
            <div className="bg-surface-container-low border border-outline-variant p-8 rounded-3xl flex items-start gap-6">
              <div className="bg-primary text-on-primary p-4 rounded-2xl">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="heading-h3 text-primary mb-2">Campus Location</h3>
                <p className="body-md text-on-surface-variant">
                  2390-B, K.B. Hidayatullah Road,<br />
                  Azam Campus, Camp,<br />
                  Pune, Maharashtra 411001
                </p>
              </div>
            </div>

            <div className="bg-surface-container-low border border-outline-variant p-8 rounded-3xl flex items-start gap-6">
              <div className="bg-secondary text-on-secondary p-4 rounded-2xl">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="heading-h3 text-primary mb-2">Emergency & General</h3>
                <p className="body-md text-on-surface-variant">
                  <strong>Emergency:</strong> +91 20 2643 8500<br />
                  <strong>Reception:</strong> +91 20 2643 8000
                </p>
              </div>
            </div>

            <div className="bg-surface-container-low border border-outline-variant p-8 rounded-3xl flex items-start gap-6">
              <div className="bg-tertiary-container text-on-tertiary-container p-4 rounded-2xl">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="heading-h3 text-primary mb-2">Hospital Hours</h3>
                <p className="body-md text-on-surface-variant">
                  <strong>OPD:</strong> 9:00 AM - 4:00 PM<br />
                  <strong>IPD & Emergency:</strong> 24/7 Available
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-white border border-outline-variant p-8 md:p-12 rounded-[2.5rem] shadow-sm">
            <h2 className="heading-h2 text-primary mb-8">Send a Message</h2>
            {submitStatus === 'success' ? (
              <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-2xl">
                <h3 className="font-bold text-xl mb-2">Message Sent!</h3>
                <p>Thank you for reaching out. We will get back to you shortly.</p>
                <button onClick={() => setSubmitStatus('idle')} className="mt-4 text-green-800 font-bold underline">Send another message</button>
              </div>
            ) : (
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                  <label className="label-caps text-on-surface-variant">Full Name</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="w-full bg-surface-container p-4 rounded-xl border-transparent focus:border-primary focus:bg-white transition-all outline-none" placeholder="John Doe" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="label-caps text-on-surface-variant">Email Address</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required className="w-full bg-surface-container p-4 rounded-xl border-transparent focus:border-primary focus:bg-white transition-all outline-none" placeholder="john@example.com" />
                </div>
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="label-caps text-on-surface-variant">Subject</label>
                  <select value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full bg-surface-container p-4 rounded-xl border-transparent focus:border-primary focus:bg-white transition-all outline-none appearance-none">
                    <option>Medical Appointment</option>
                    <option>Admission Inquiry</option>
                    <option>General Support</option>
                    <option>Grievance/Feedback</option>
                  </select>
                </div>
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="label-caps text-on-surface-variant">Your Message</label>
                  <textarea rows={5} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} required className="w-full bg-surface-container p-4 rounded-xl border-transparent focus:border-primary focus:bg-white transition-all outline-none resize-none" placeholder="Type your message here..."></textarea>
                </div>
                <div className="md:col-span-2">
                  <button type="submit" disabled={submitStatus === 'loading'} className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-3 hover:opacity-90 transition-all disabled:opacity-50">
                    <Send className="h-5 w-5" />
                    {submitStatus === 'loading' ? 'Sending...' : 'Submit Message'}
                  </button>
                  {submitStatus === 'error' && <p className="text-red-500 mt-2 text-sm">Failed to send message. Please try again.</p>}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-24 bg-surface-container-low border-t border-outline-variant">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
           <div className="h-[400px] w-full bg-surface rounded-[3rem] border border-outline-variant flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]"></div>
             <div className="text-center z-10">
               <div className="w-16 h-16 bg-primary text-on-primary rounded-full flex items-center justify-center mx-auto mb-4">
                 <Landmark className="h-8 w-8" />
               </div>
               <h3 className="heading-h3 text-primary">Map View</h3>
               <p className="body-md text-on-surface-variant">Interactive location guide coming soon.</p>
             </div>
           </div>
        </div>
      </section>
    </div>
  );
}
