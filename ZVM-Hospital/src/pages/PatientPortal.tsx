import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Lock, ArrowRight, LogOut, Calendar, Clock, 
  User, Phone, CheckCircle, RefreshCw, Building2, AlertCircle, Heart,
  Edit2, Trash2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface Patient {
  email: string;
  name: string;
  phone: string;
}

interface Appointment {
  id: number;
  department: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  created_at: string;
}

interface Enquiry {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

export default function PatientPortal() {
  const navigate = useNavigate();
  
  // Auth states
  const [patient, setPatient] = useState<Patient | null>(null);
  const [email, setEmail] = useState('');
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  
  // UI and logic states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(false);
  
  // New States for Edit and Delete
  const [activeTab, setActiveTab] = useState<'appointments' | 'enquiries'>('appointments');
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [isLoadingEnquiries, setIsLoadingEnquiries] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [editingEnquiry, setEditingEnquiry] = useState<Enquiry | null>(null);
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);
  
  // Refs for OTP input auto-focus
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Load patient session from localStorage on mount
  useEffect(() => {
    document.title = "Patient Portal & Dashboard | ZVM Hospital";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Access the ZVM Hospital Patient Portal. Register, request OTP, view your appointment statuses, and manage your clinical profile securely.");
    }
    const savedPatient = localStorage.getItem('zvm_patient');
    if (savedPatient) {
      try {
        const parsed = JSON.parse(savedPatient);
        setPatient(parsed);
      } catch (e) {
        localStorage.removeItem('zvm_patient');
      }
    }
  }, []);

  // Fetch appointments and enquiries when patient is logged in
  useEffect(() => {
    if (patient) {
      fetchAppointments(patient.email, patient.phone);
      fetchEnquiries(patient.email, patient.phone);
    }
  }, [patient]);

  // Handle countdown timer for OTP resend
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (otpSent && timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const fetchAppointments = async (patientEmail: string, patientPhone?: string) => {
    setIsLoadingAppointments(true);
    try {
      const queryParam = patientEmail 
        ? `email=${encodeURIComponent(patientEmail)}` 
        : `phone=${encodeURIComponent(patientPhone || '')}`;
      const response = await fetch(`https://zvm-hospital.onrender.com/api/patient/appointments/?${queryParam}`);
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      } else {
        console.error('Failed to fetch appointments');
      }
    } catch (err) {
      console.error('Error fetching appointments:', err);
    } finally {
      setIsLoadingAppointments(false);
    }
  };

  const fetchEnquiries = async (patientEmail: string, patientPhone?: string) => {
    setIsLoadingEnquiries(true);
    try {
      const queryParam = patientEmail 
        ? `email=${encodeURIComponent(patientEmail)}` 
        : `phone=${encodeURIComponent(patientPhone || '')}`;
      const response = await fetch(`http://localhost:8000/api/patient/enquiries/?${queryParam}`);
      if (response.ok) {
        const data = await response.json();
        setEnquiries(data);
      } else {
        console.error('Failed to fetch enquiries');
      }
    } catch (err) {
      console.error('Error fetching enquiries:', err);
    } finally {
      setIsLoadingEnquiries(false);
    }
  };

  const handleDeleteAppointment = async (id: number) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
    try {
      const response = await fetch(`http://localhost:8000/api/appointments/${id}/`, {
        method: 'DELETE',
      });
      if (response.ok) {
        if (patient) fetchAppointments(patient.email);
        alert('Appointment cancelled successfully.');
      } else {
        alert('Failed to cancel appointment.');
      }
    } catch (err) {
      alert('Failed to delete appointment due to a connection error.');
    }
  };

  const handleUpdateAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAppointment) return;
    setIsSubmittingEdit(true);
    try {
      const response = await fetch(`http://localhost:8000/api/appointments/${editingAppointment.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingAppointment),
      });
      if (response.ok) {
        if (patient) fetchAppointments(patient.email);
        setEditingAppointment(null);
        alert('Appointment details updated successfully.');
      } else {
        const errData = await response.json();
        alert(errData.error || 'Failed to update appointment.');
      }
    } catch (err) {
      alert('Connection error. Failed to update appointment.');
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  const handleDeleteEnquiry = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      const response = await fetch(`http://localhost:8000/api/enquiries/${id}/`, {
        method: 'DELETE',
      });
      if (response.ok) {
        if (patient) fetchEnquiries(patient.email);
        alert('Enquiry deleted successfully.');
      } else {
        alert('Failed to delete enquiry.');
      }
    } catch (err) {
      alert('Failed to delete enquiry due to a connection error.');
    }
  };

  const handleUpdateEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEnquiry) return;
    setIsSubmittingEdit(true);
    try {
      const response = await fetch(`http://localhost:8000/api/enquiries/${editingEnquiry.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingEnquiry),
      });
      if (response.ok) {
        if (patient) fetchEnquiries(patient.email);
        setEditingEnquiry(null);
        alert('Enquiry updated successfully.');
      } else {
        const errData = await response.json();
        alert(errData.error || 'Failed to update enquiry.');
      }
    } catch (err) {
      alert('Connection error. Failed to update enquiry.');
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loginMethod === 'email' && !email) return;
    if (loginMethod === 'phone' && !phone) return;
    
    setIsLoading(true);
    setError('');
    setSuccessMsg('');
    
    try {
      const payload = loginMethod === 'email' ? { email } : { phone };
      const response = await fetch('http://localhost:8000/api/send-otp/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setOtpSent(true);
        setTimer(60);
        setCanResend(false);
        setSuccessMsg(loginMethod === 'email' ? 'Verification code sent to your email.' : 'Verification code sent to your mobile number.');
        // Set focus to the first OTP input
        setTimeout(() => inputRefs[0].current?.focus(), 100);
      } else {
        setError(data.error || 'Failed to send OTP. Please try again.');
      }
    } catch (err) {
      setError('Connection to backend failed. Please ensure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;
    setIsLoading(true);
    setError('');
    
    try {
      const payload = loginMethod === 'email' ? { email } : { phone };
      const response = await fetch('http://localhost:8000/api/send-otp/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      if (response.ok) {
        setTimer(60);
        setCanResend(false);
        setOtpValues(['', '', '', '', '', '']);
        setSuccessMsg(loginMethod === 'email' ? 'New verification code sent to your email.' : 'New verification code sent to your mobile number.');
        setTimeout(() => inputRefs[0].current?.focus(), 100);
      } else {
        setError(data.error || 'Failed to resend OTP.');
      }
    } catch (err) {
      setError('Connection to backend failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newValues = [...otpValues];
    newValues[index] = value.substring(value.length - 1); // keep only last character
    setOtpValues(newValues);

    // Auto-focus next input if value was entered
    if (value && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Backspace: clear current and focus previous
    if (e.key === 'Backspace') {
      if (!otpValues[index] && index > 0) {
        const newValues = [...otpValues];
        newValues[index - 1] = '';
        setOtpValues(newValues);
        inputRefs[index - 1].current?.focus();
      } else {
        const newValues = [...otpValues];
        newValues[index] = '';
        setOtpValues(newValues);
      }
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otpValues.join('');
    if (otpCode.length < 6) {
      setError('Please enter the full 6-digit code.');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      const payload = loginMethod === 'email' 
        ? { email, otp: otpCode } 
        : { phone, otp: otpCode };
        
      const response = await fetch('http://localhost:8000/api/verify-otp/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('zvm_patient', JSON.stringify(data.patient));
        setPatient(data.patient);
        setSuccessMsg('Successfully logged in!');
      } else {
        setError(data.error || 'Invalid OTP code.');
      }
    } catch (err) {
      setError('Verification failed. Backend server connection error.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('zvm_patient');
    setPatient(null);
    setEmail('');
    setPhone('');
    setLoginMethod('email');
    setOtpSent(false);
    setOtpValues(['', '', '', '', '', '']);
    setSuccessMsg('');
    setError('');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 min-h-[80vh] flex flex-col justify-center">
      <AnimatePresence mode="wait">
        {!patient ? (
          /* ================= LOGIN FLOW ================= */
          <motion.div
            key="login-flow"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-xl mx-auto"
          >
            <div className="text-center mb-10">
              <h1 className="text-5xl font-black text-primary tracking-tighter italic mb-4">Patient Portal.</h1>
              <p className="text-lg text-on-surface-variant font-bold">
                {!otpSent 
                  ? 'Access your medical history, check appointments, and consult our masters.'
                  : `We have dispatched a one-time passcode to your ${loginMethod === 'email' ? 'email' : 'mobile number'}. Enter it below.`
                }
              </p>
            </div>

            <div className="bg-white border border-outline-variant p-8 sm:p-12 rounded-[40px] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
              
              {!otpSent && (
                <div className="flex bg-surface-container p-1 rounded-[16px] border border-outline-variant max-w-sm mx-auto mb-8">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMethod('email');
                      setError('');
                      setSuccessMsg('');
                    }}
                    className={`flex-1 py-2.5 rounded-[12px] font-black text-xs uppercase tracking-widest transition-all hover:cursor-pointer ${loginMethod === 'email' ? 'bg-primary text-white shadow-sm' : 'text-slate-500 hover:text-primary'}`}
                  >
                    Email Login
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMethod('phone');
                      setError('');
                      setSuccessMsg('');
                    }}
                    className={`flex-1 py-2.5 rounded-[12px] font-black text-xs uppercase tracking-widest transition-all hover:cursor-pointer ${loginMethod === 'phone' ? 'bg-primary text-white shadow-sm' : 'text-slate-500 hover:text-primary'}`}
                  >
                    SMS Login
                  </button>
                </div>
              )}

              {/* Error Alert */}
              {error && (
                <div className="mb-6 p-5 bg-error-container text-on-error-container rounded-2xl flex items-start gap-3 border border-red-200">
                  <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
                  <div className="text-sm font-bold">{error}</div>
                </div>
              )}

              {/* Success Alert */}
              {successMsg && (
                <div className="mb-6 p-5 bg-tertiary/10 text-primary rounded-2xl flex items-start gap-3 border border-tertiary/20">
                  <CheckCircle className="h-5 w-5 mt-0.5 shrink-0 text-tertiary" />
                  <div className="text-sm font-bold">{successMsg}</div>
                </div>
              )}

              {!otpSent ? (
                /* STEP 1: Enter Email / Phone */
                <form onSubmit={handleSendOtp} className="flex flex-col gap-6">
                  {loginMethod === 'email' ? (
                    <div className="flex flex-col gap-3">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input 
                          type="email" 
                          required
                          placeholder="yourname@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-16 pr-6 py-5 bg-surface-container rounded-[24px] border-none font-bold text-lg outline-none focus:ring-4 focus:ring-primary/20 transition-all shadow-inner"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500">Mobile Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input 
                          type="tel" 
                          required
                          placeholder="+919876543210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-16 pr-6 py-5 bg-surface-container rounded-[24px] border-none font-bold text-lg outline-none focus:ring-4 focus:ring-primary/20 transition-all shadow-inner"
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-4 bg-primary text-white py-5 rounded-[24px] font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 hover:-translate-y-1 transition-all disabled:opacity-50 hover:cursor-pointer"
                  >
                    {isLoading ? 'Sending Passcode...' : 'Get Verification Code'}
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </form>
              ) : (
                /* STEP 2: Enter OTP Code */
                <form onSubmit={handleVerifyOtp} className="flex flex-col gap-8">
                  <div className="flex flex-col gap-4 text-center">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500">Enter 6-Digit Code</label>
                    
                    {/* OTP Split Box Inputs */}
                    <div className="flex justify-center gap-3 sm:gap-4 my-2">
                      {otpValues.map((val, idx) => (
                        <input
                          key={idx}
                          ref={inputRefs[idx]}
                          type="text"
                          maxLength={1}
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={val}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                          className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-black text-primary bg-surface-container border-2 border-transparent rounded-2xl focus:border-primary focus:bg-white outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <button
                      type="submit"
                      disabled={isLoading || otpValues.join('').length < 6}
                      className="w-full bg-primary text-white py-5 rounded-[24px] font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 hover:-translate-y-1 transition-all disabled:opacity-50"
                    >
                      {isLoading ? 'Verifying...' : 'Verify & Log In'}
                      <CheckCircle className="h-5 w-5" />
                    </button>

                    <div className="flex items-center justify-between mt-2 px-2 text-sm font-bold">
                      <button 
                        type="button"
                        onClick={() => {
                          setOtpSent(false);
                          setOtpValues(['', '', '', '', '', '']);
                          setError('');
                          setSuccessMsg('');
                        }}
                        className="text-slate-400 hover:text-primary transition-colors"
                      >
                        Change Email
                      </button>

                      {canResend ? (
                        <button
                          type="button"
                          onClick={handleResendOtp}
                          className="text-secondary hover:underline inline-flex items-center gap-1.5 transition-all"
                        >
                          <RefreshCw className="h-4 w-4" /> Resend Code
                        </button>
                      ) : (
                        <span className="text-slate-400">
                          Resend code in <span className="text-primary font-black">{timer}s</span>
                        </span>
                      )}
                    </div>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        ) : (
          /* ================= PATIENT DASHBOARD ================= */
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-12"
          >
            {/* Dashboard Header Banner */}
            <div className="relative bg-primary rounded-[40px] p-8 md:p-16 text-white shadow-2xl overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_30%_50%,#fff_0%,transparent_65%)]"></div>
              
              <div className="space-y-4 relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                  <span className="text-xs font-black uppercase tracking-widest">Active Patient Profile</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none">
                  Hello, <span className="text-secondary-container italic">{patient.name}!</span>
                </h1>
                <p className="text-white/80 font-bold text-lg max-w-xl leading-relaxed">
                  Welcome back to your secure dashboard. View your appointment history and coordinate care.
                </p>
              </div>

              <div className="flex gap-4 relative z-10 shrink-0 self-start md:self-center">
                <Link
                  to="/appointment"
                  className="bg-white text-primary px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:-translate-y-0.5 transition-transform"
                >
                  Book New Slot
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-colors flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </div>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* LEFT COLUMN: Profile Details */}
              <div className="lg:col-span-4 space-y-8">
                <div className="bg-white border border-outline-variant p-8 rounded-[32px] shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl -mr-12 -mt-12"></div>
                  
                  <h3 className="text-2xl font-black text-primary mb-6 tracking-tight flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm">👤</div>
                    My Credentials
                  </h3>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Name</span>
                        <span className="font-black text-slate-700">{patient.name}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-secondary shadow-sm">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Verified Email</span>
                        <span className="font-black text-slate-700 select-all">{patient.email}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-tertiary shadow-sm">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Mobile Contact</span>
                        <span className="font-black text-slate-700">{patient.phone || 'Not Provided'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-black uppercase tracking-widest text-slate-400">
                    <span>ZVM Patient Portal</span>
                    <span className="text-tertiary flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-tertiary animate-pulse"></span> Secured
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Booked Appointments & Enquiries */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 px-2">
                  <div className="flex bg-surface-container p-1.5 rounded-[20px] border border-outline-variant">
                    <button
                      onClick={() => setActiveTab('appointments')}
                      className={`px-6 py-2.5 rounded-[16px] font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'appointments' ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:text-primary'}`}
                    >
                      Appointments
                    </button>
                    <button
                      onClick={() => setActiveTab('enquiries')}
                      className={`px-6 py-2.5 rounded-[16px] font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'enquiries' ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:text-primary'}`}
                    >
                      Enquiries
                    </button>
                  </div>
                  
                  <span className="label-caps bg-surface-container-high px-4 py-2 rounded-full text-slate-500 font-bold border border-outline-variant shadow-sm self-start sm:self-auto text-xs">
                    {activeTab === 'appointments' ? `${appointments.length} Consultations` : `${enquiries.length} Messages`}
                  </span>
                </div>

                {activeTab === 'appointments' ? (
                  isLoadingAppointments ? (
                    /* Loading State */
                    <div className="bg-white border border-outline-variant rounded-[32px] p-20 flex flex-col items-center justify-center text-center gap-4 shadow-md">
                      <RefreshCw className="h-10 w-10 text-primary animate-spin" />
                      <p className="font-bold text-slate-500">Retrieving patient schedules from the database...</p>
                    </div>
                  ) : appointments.length > 0 ? (
                    /* Appointments Card List */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {appointments.map((apt) => (
                        <motion.div
                          key={apt.id}
                          whileHover={{ y: -3 }}
                          className="bg-white border border-outline-variant p-6 rounded-[32px] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                        >
                          <div className="space-y-4">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <div className="flex items-center gap-2">
                                <div className="inline-flex items-center gap-2 bg-primary-container text-primary px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider">
                                  <Building2 className="h-3 w-3" /> {apt.department}
                                </div>
                                <span className={`px-3 py-1 rounded-full font-black text-[10px] uppercase tracking-wider border ${
                                  apt.status === 'Approved'
                                    ? 'bg-green-50 text-green-700 border-green-200'
                                    : apt.status === 'Rejected'
                                    ? 'bg-red-50 text-red-600 border-red-200'
                                    : 'bg-yellow-50 text-yellow-600 border-yellow-200 animate-pulse'
                                }`}>
                                  {apt.status || 'Pending'}
                                </span>
                              </div>
                              <span className="text-xs font-bold text-slate-400">#{apt.id}</span>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center gap-2.5 font-black text-lg text-slate-800">
                                <Calendar className="h-4.5 w-4.5 text-secondary" />
                                <span>{new Date(apt.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                              </div>
                              
                              <div className="flex items-center gap-2.5 font-bold text-slate-500">
                                <Clock className="h-4.5 w-4.5 text-tertiary" />
                                <span>{apt.time}</span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Patient Name</span>
                              <span className="font-black text-sm text-slate-700">{apt.name}</span>
                            </div>
                            <div className="flex gap-1.5 items-center">
                              <button
                                onClick={() => setEditingAppointment(apt)}
                                className="w-8.5 h-8.5 rounded-xl bg-secondary/15 hover:bg-secondary/25 text-secondary border border-secondary/10 flex items-center justify-center transition-colors hover:cursor-pointer"
                                title="Edit Appointment"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteAppointment(apt.id)}
                                className="w-8.5 h-8.5 rounded-xl bg-error-container/20 hover:bg-error-container/40 text-error flex items-center justify-center transition-colors hover:cursor-pointer"
                                title="Cancel Appointment"
                              >
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    /* Empty State */
                    <div className="bg-white border border-outline-variant rounded-[32px] p-16 text-center flex flex-col items-center justify-center gap-6 shadow-md">
                      <div className="w-20 h-20 bg-secondary/10 rounded-[28px] flex items-center justify-center text-4xl shadow-inner">
                        🌿
                      </div>
                      <div className="space-y-2 max-w-sm">
                        <h4 className="text-2xl font-black text-primary tracking-tight">No Active Sessions</h4>
                        <p className="text-slate-400 font-bold text-sm leading-relaxed">
                          You have not scheduled any clinical appointments using this verified email address yet.
                        </p>
                      </div>
                      <Link
                        to="/appointment"
                        className="bg-primary text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg flex items-center gap-2 hover:-translate-y-0.5 transition-transform"
                      >
                        Book First Appointment <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  )
                ) : (
                  /* ENQUIRIES TAB */
                  isLoadingEnquiries ? (
                    /* Loading State */
                    <div className="bg-white border border-outline-variant rounded-[32px] p-20 flex flex-col items-center justify-center text-center gap-4 shadow-md">
                      <RefreshCw className="h-10 w-10 text-primary animate-spin" />
                      <p className="font-bold text-slate-500">Retrieving patient inquiries from the database...</p>
                    </div>
                  ) : enquiries.length > 0 ? (
                    /* Enquiries Card List */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {enquiries.map((enq) => (
                        <motion.div
                          key={enq.id}
                          whileHover={{ y: -3 }}
                          className="bg-white border border-outline-variant p-6 rounded-[32px] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                        >
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="inline-flex items-center gap-2 bg-secondary/15 text-secondary px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider">
                                ✉️ {enq.subject}
                              </div>
                              <span className="text-xs font-bold text-slate-400">#{enq.id}</span>
                            </div>

                            <div className="space-y-2 col-span-2">
                              <p className="text-sm font-bold text-slate-600 leading-relaxed line-clamp-4">
                                "{enq.message}"
                              </p>
                            </div>
                          </div>

                          <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Submitted On</span>
                              <span className="font-bold text-xs text-slate-500">
                                {new Date(enq.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                            </div>
                            <div className="flex gap-1.5 items-center">
                              <button
                                onClick={() => setEditingEnquiry(enq)}
                                className="w-8.5 h-8.5 rounded-xl bg-secondary/15 hover:bg-secondary/25 text-secondary border border-secondary/10 flex items-center justify-center transition-colors hover:cursor-pointer"
                                title="Edit Message"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteEnquiry(enq.id)}
                                className="w-8.5 h-8.5 rounded-xl bg-error-container/20 hover:bg-error-container/40 text-error flex items-center justify-center transition-colors hover:cursor-pointer"
                                title="Delete Enquiry"
                              >
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    /* Empty State */
                    <div className="bg-white border border-outline-variant rounded-[32px] p-16 text-center flex flex-col items-center justify-center gap-6 shadow-md">
                      <div className="w-20 h-20 bg-secondary/10 rounded-[28px] flex items-center justify-center text-4xl shadow-inner">
                        💬
                      </div>
                      <div className="space-y-2 max-w-sm">
                        <h4 className="text-2xl font-black text-primary tracking-tight">No Sent Enquiries</h4>
                        <p className="text-slate-400 font-bold text-sm leading-relaxed">
                          You have not submitted any questions or messages via our contact form yet.
                        </p>
                      </div>
                      <Link
                        to="/contact"
                        className="bg-primary text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg flex items-center gap-2 hover:-translate-y-0.5 transition-transform"
                      >
                        Submit an Enquiry <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  )
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Appointment Edit Modal */}
      <AnimatePresence>
        {editingAppointment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[40px] border border-outline-variant p-8 w-full max-w-lg shadow-2xl relative overflow-hidden"
            >
              <h3 className="text-3xl font-black text-primary mb-6 tracking-tight flex items-center gap-2">
                <span>✏️ Edit Appointment</span>
              </h3>
              
              <form onSubmit={handleUpdateAppointment} className="space-y-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Patient Name</label>
                  <input
                    type="text"
                    required
                    value={editingAppointment.name}
                    onChange={e => setEditingAppointment({...editingAppointment, name: e.target.value})}
                    className="w-full px-5 py-4 bg-surface-container rounded-2xl border-none font-bold text-base outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-inner"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={editingAppointment.phone}
                    onChange={e => setEditingAppointment({...editingAppointment, phone: e.target.value})}
                    className="w-full px-5 py-4 bg-surface-container rounded-2xl border-none font-bold text-base outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-inner"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Department Unit</label>
                  <select
                    value={editingAppointment.department}
                    onChange={e => setEditingAppointment({...editingAppointment, department: e.target.value})}
                    className="w-full px-5 py-4 bg-surface-container rounded-2xl border-none font-bold text-base outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-inner"
                  >
                    {['Moalajat', 'Jarahat', 'Niswan', 'Atfal', 'Jild', 'Others'].map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Target Date</label>
                    <input
                      type="date"
                      required
                      value={editingAppointment.date}
                      onChange={e => setEditingAppointment({...editingAppointment, date: e.target.value})}
                      className="w-full px-5 py-4 bg-surface-container rounded-2xl border-none font-bold text-base outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-inner"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Available Slot</label>
                    <select
                      value={editingAppointment.time}
                      onChange={e => setEditingAppointment({...editingAppointment, time: e.target.value})}
                      className="w-full px-5 py-4 bg-surface-container rounded-2xl border-none font-bold text-base outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-inner"
                    >
                      {['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM'].map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditingAppointment(null)}
                    className="flex-1 bg-surface-container hover:bg-surface-container-high py-4 rounded-[20px] font-black text-xs uppercase tracking-widest text-slate-500 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingEdit}
                    className="flex-1 bg-primary hover:bg-primary/95 text-white py-4 rounded-[20px] font-black text-xs uppercase tracking-widest shadow-lg transition-colors disabled:opacity-50"
                  >
                    {isSubmittingEdit ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Enquiry Edit Modal */}
      <AnimatePresence>
        {editingEnquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[40px] border border-outline-variant p-8 w-full max-w-lg shadow-2xl relative overflow-hidden"
            >
              <h3 className="text-3xl font-black text-primary mb-6 tracking-tight flex items-center gap-2">
                <span>✏️ Edit Enquiry</span>
              </h3>
              
              <form onSubmit={handleUpdateEnquiry} className="space-y-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Subject</label>
                  <select
                    value={editingEnquiry.subject}
                    onChange={e => setEditingEnquiry({...editingEnquiry, subject: e.target.value})}
                    className="w-full px-5 py-4 bg-surface-container rounded-2xl border-none font-bold text-base outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-inner"
                  >
                    <option>Medical Appointment</option>
                    <option>Admission Inquiry</option>
                    <option>General Support</option>
                    <option>Grievance/Feedback</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Your Message</label>
                  <textarea
                    rows={5}
                    required
                    value={editingEnquiry.message}
                    onChange={e => setEditingEnquiry({...editingEnquiry, message: e.target.value})}
                    className="w-full px-5 py-4 bg-surface-container rounded-2xl border-none font-bold text-base outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-inner resize-none"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditingEnquiry(null)}
                    className="flex-1 bg-surface-container hover:bg-surface-container-high py-4 rounded-[20px] font-black text-xs uppercase tracking-widest text-slate-500 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingEdit}
                    className="flex-1 bg-primary hover:bg-primary/95 text-white py-4 rounded-[20px] font-black text-xs uppercase tracking-widest shadow-lg transition-colors disabled:opacity-50"
                  >
                    {isSubmittingEdit ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
