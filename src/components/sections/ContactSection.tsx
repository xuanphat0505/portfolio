import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';

// Component ContactSection hiển thị form liên hệ sử dụng EmailJS để nhận tin nhắn trực tiếp.

const ContactSection: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const form = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;
    
    setIsSubmitting(true);
    setHasError(false);
    // TODO: Replace these placeholders with your actual EmailJS credentials
    emailjs.sendForm(
      SERVICE_ID, 
      TEMPLATE_ID, 
      form.current, 
      PUBLIC_KEY
    )
    .then(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      form.current?.reset();
    }, (error) => {
      setIsSubmitting(false);
      setHasError(true);
      console.error(error);
    });
  };

  return (
    <section id="contact" className="w-full py-32 md:py-48 bg-surface-container-low relative overflow-hidden transition-colors duration-700">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column (40%): Static Info */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 border border-primary/20 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-[9px] tracking-[0.2em] text-primary uppercase">System Ready</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tighter uppercase leading-none">
                INITIALIZE_<br />
                <span className="text-primary italic">HANDSHAKE</span>
              </h2>
            </div>

            <div className="space-y-8">
              <div className="space-y-2">
                <p className="font-mono text-[10px] text-[#555] tracking-widest uppercase">// Point of Contact</p>
                <a href="mailto:phattran052004@gmail.com" className="block text-2xl font-bold hover:text-primary transition-colors">
                  phattran052004@gmail.com
                </a>
              </div>

              <div className="space-y-2">
                <p className="font-mono text-[10px] text-[#555] tracking-widest uppercase">// Technical Coordinates</p>
                <p className="text-on-surface-variant font-mono text-sm leading-relaxed">
                  10.7626° N, 106.6602° E <br />
                  Ho Chi Minh City, Vietnam
                </p>
              </div>

              <div className="pt-8 flex gap-6">
                <a href="https://github.com/xuanphat0505" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] tracking-[0.3em] text-[#555] hover:text-primary transition-colors">GITHUB</a>
                <a href="https://www.linkedin.com/in/phat-tran-10872831a" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] tracking-[0.3em] text-[#555] hover:text-primary transition-colors">LINKEDIN</a>
                <a href="https://www.facebook.com/phat.tran.306106" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] tracking-[0.3em] text-[#555] hover:text-primary transition-colors">FACEBOOK</a>
              </div>
            </div>

          </div>

          {/* Right Column (60%): Handshake Form */}
          <div className="lg:col-span-7 bg-surface p-8 md:p-12 border border-outline-variant/10 relative">
            
            {/* Form decorative corner */}
            <div className="absolute top-0 right-0 w-16 h-px bg-primary/40" />
            <div className="absolute top-0 right-0 w-px h-16 bg-primary/40" />

            {!isSuccess ? (
              <form ref={form} onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="relative group">
                    <label className="block font-mono text-[10px] text-[#555] uppercase tracking-widest mb-2 group-focus-within:text-primary transition-colors">
                      [Full_Name]
                    </label>
                    <input 
                      type="text" 
                      name="user_name"
                      required
                      placeholder="ENTER_NAME"
                      className="w-full bg-transparent border-b border-outline-variant/15 py-3 outline-none focus:border-primary transition-all font-mono text-sm placeholder:text-on-surface-variant/40"
                    />
                  </div>
                  <div className="relative group">
                    <label className="block font-mono text-[10px] text-[#555] uppercase tracking-widest mb-2 group-focus-within:text-primary transition-colors">
                      [Email_Address]
                    </label>
                    <input 
                      type="email" 
                      name="user_email"
                      required
                      placeholder="MAIL_ENDPOINT"
                      className="w-full bg-transparent border-b border-outline-variant/15 py-3 outline-none focus:border-primary transition-all font-mono text-sm placeholder:text-on-surface-variant/40"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <label className="block font-mono text-[10px] text-[#555] uppercase tracking-widest mb-2 group-focus-within:text-primary transition-colors">
                    [Structural_Query]
                  </label>
                  <textarea 
                    rows={4}
                    name="message"
                    required
                    placeholder="DESCRIBE_PROJECT_SCOPE..."
                    className="w-full bg-transparent border-b border-outline-variant/15 py-3 outline-none focus:border-primary transition-all font-mono text-sm placeholder:text-on-surface-variant/40 resize-none"
                  />
                </div>

                <div className="flex flex-col items-start gap-4">
                  <Button 
                    type="submit"
                    variant="solid" 
                    disabled={isSubmitting}
                    className={`h-16 px-12 text-sm bg-brand-cyan border hover:bg-white text-black ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        SYNCING_DATA...
                      </span>
                    ) : (
                      'SEND_HANDSHAKE_REQUEST'
                    )}
                  </Button>
                  {hasError && (
                    <span role="alert" className="font-mono text-[10px] text-red-500 tracking-wider">
                      [ERROR] Failed to send the message. Please try again or email me directly.
                    </span>
                  )}
                  {isSubmitting && (
                    <span className="font-mono text-[9px] text-primary tracking-widest transition-opacity animate-pulse">
                      // PROCESS: [=========={`>`}.......] 60%
                    </span>
                  )}
                </div>
              </form>
            ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-20 text-center space-y-6"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto border border-primary/20">
                    <span className="text-primary text-xl">✓</span>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold uppercase tracking-tight">Handshake_Successful</h3>
                    <p className="font-mono text-[11px] text-on-surface-variant leading-relaxed max-w-sm mx-auto">
                      [LOG] YOUR DATA HAS BEEN INTEGRATED. <br />
                      I WILL RESPOND TO YOUR ARCHITECTURAL QUERY WITHIN 24 HOURS.
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="font-mono text-[10px] text-primary hover:underline underline-offset-4 tracking-widest pt-8"
                  >
                    [SEND_ANOTHER_HANDSHAKE]
                  </button>
                </motion.div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
