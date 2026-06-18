"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Contact() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      full_name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      budget: formData.get("budget"),
      requirement: formData.get("service") === "Other" ? formData.get("other_service") : formData.get("service"),
    };

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (response.status === 409) {
        setIsDuplicate(true);
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Failed to submit, status:", response.status, errorData);
        alert(errorData.error || "Failed to submit form. Please ensure all fields are filled.");
      }
    } catch (error) {
      console.error("Failed to submit", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative w-full bg-black px-6 md:px-12 lg:px-20 pt-32 md:pt-48 pb-12 z-20 border-t border-white/5 overflow-hidden">
      <div className="max-w-[100rem] mx-auto flex flex-col lg:flex-row gap-20 lg:gap-32 mb-32">
        
        {/* Left Column: Typography & Info */}
        <div className="flex-1 flex flex-col justify-between items-center md:items-start text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-accent uppercase tracking-[0.2em] text-sm md:text-base font-semibold mb-6">Contact Us</h3>
            <h2 className="text-4xl sm:text-6xl md:text-[6rem] lg:text-[7rem] font-black tracking-tight font-serif text-white leading-tight mb-8 break-words">
              Let's Build<br/>
              <span className="italic text-zinc-600">Your Dream Home.</span>
            </h2>
            <p className="text-zinc-400 font-sans max-w-md text-sm md:text-base leading-relaxed">
              Whether you want to rebuild your whole house or just need new furniture, we are ready to help.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-20 flex flex-col gap-6 text-zinc-500 font-sans text-sm items-center md:items-start"
          >
            <div>
              <strong className="text-white uppercase tracking-widest text-xs block mb-2">Studio</strong>
              Pune<br/>Maharashtra, India
            </div>
            <div>
              <strong className="text-white uppercase tracking-widest text-xs block mb-2">Contact</strong>
              gaminglesso@gmail.com<br/>+91 98765 43210
            </div>
          </motion.div>
        </div>

        {/* Right Column: Animated Form or Success Message */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 w-full max-w-2xl mt-12 lg:mt-0 bg-zinc-800/30 backdrop-blur-3xl border border-white/5 rounded-[2rem] p-8 md:p-12 lg:p-16 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          {isSubmitted || isDuplicate ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center h-full text-center py-10"
            >
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-8 ${isDuplicate ? 'bg-red-500/20 text-red-500' : 'bg-accent/20 text-accent'}`}>
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  {isDuplicate ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  )}
                </svg>
              </div>
              <h3 className="text-3xl font-serif font-bold text-white mb-6">
                {isDuplicate ? 'Already Received' : 'Message Sent'}
              </h3>
              <p className="text-zinc-400 font-sans text-lg leading-relaxed mb-6">
                {isDuplicate 
                  ? "We already have a consultation request from this phone number. We will be in touch shortly!" 
                  : "Thank you for reaching out. Our team will contact you within 2 hours."}
              </p>
              <p className="text-zinc-600 font-sans text-sm">
                Redirecting to home...
              </p>
            </motion.div>
          ) : (
            <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
              {[
                { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Jane Doe' },
                { id: 'email', label: 'Email Address', type: 'email', placeholder: 'jane@example.com' },
                { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+1 (555) 000-0000' },
                { id: 'service', label: 'What do you need?', type: 'select', options: ['Full Home Design', 'Custom Furniture', 'Home Lighting', 'Decorating & Art', 'Other'] },
                ...(selectedService === 'Other' ? [{ id: 'other_service', label: 'Specify Other Service', type: 'text', placeholder: 'Type your custom service here...' }] : []),
                { id: 'budget', label: 'Project Budget', type: 'text', placeholder: '$100k - $500k' }
              ].map((field, idx) => (
                <motion.div 
                  key={field.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative group flex-1"
                >
                  <label className="text-zinc-400 text-xs tracking-widest uppercase mb-2 block group-focus-within:text-accent transition-colors duration-300">
                    {field.label}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      required
                      name={field.id}
                      className="w-full bg-transparent border-b border-white/20 pb-4 pt-2 text-white font-serif text-xl md:text-2xl outline-none focus:border-accent transition-colors duration-500 appearance-none cursor-pointer"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                    >
                      <option value="" disabled className="text-zinc-800 bg-black">Select a Service...</option>
                      {field.options?.map(opt => (
                        <option key={opt} value={opt} className="text-white bg-zinc-900">{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input 
                      required
                      name={field.id}
                      type={field.type} 
                      placeholder={field.placeholder}
                      className="w-full bg-transparent border-b border-white/20 pb-4 pt-2 text-white font-serif text-xl md:text-2xl outline-none placeholder:text-zinc-700 focus:border-accent transition-colors duration-500"
                    />
                  )}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8"
              >
                <button disabled={isSubmitting} type="submit" className="w-full py-6 bg-white text-black font-semibold tracking-[0.2em] uppercase text-sm hover:text-white transition-colors duration-500 rounded-none relative overflow-hidden group disabled:opacity-50">
                  <span className="relative z-10 transition-colors duration-500">{isSubmitting ? "Submitting..." : "Submit Form"}</span>
                  <div className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
              </motion.div>
            </form>
          )}
        </motion.div>
      </div>

      {/* Footer Bar */}
      <div className="max-w-[100rem] mx-auto w-full flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 gap-6">

        <div className="text-zinc-500 text-xs tracking-widest uppercase text-center md:text-left">
          © 2026 Aura Interiors. All Rights Reserved.
        </div>
        <div className="flex gap-8">
          {['Instagram', 'Pinterest', 'LinkedIn'].map(social => (
            <a key={social} href="#" className="text-zinc-500 text-xs tracking-widest uppercase hover:text-accent transition-colors">
              {social}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
