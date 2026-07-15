/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ChevronRight, 
  ArrowRight, 
  Heart, 
  ExternalLink,
  ClipboardList
} from 'lucide-react';
import { BlisterPackDivider } from './components/BlisterPackDivider';
import { ReviewCarousel } from './components/ReviewCarousel';
import { OrderModal } from './components/OrderModal';
import { motion } from 'motion/react';

// Real-world store details
const STORE_DATA = {
  name: "Eeshu Medical Store",
  tagline: "Every Medicine Available With Free Home Delivery",
  address: "Shop No. 11, Indus Muskan Plaza, Ayodhya Bypass Rd, Bhawanidham Phase-1, Narela Shankri, Ayodhya Nagar, Bhopal, Madhya Pradesh 462041",
  phone: "+91 80856 75738",
  mobile: "+91 80856 75738",
  whatsapp: "+91 80856 75738",
  hoursWeekday: "Mon – Sat: 8:00 AM – 10:30 PM",
  hoursSunday: "Sunday: 9:00 AM – 9:00 PM",
  license: "MP-BPL-24-10543",
  owner: "Nitin Jain Kandya",
  estYear: "1994"
};

export default function App() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Opens WhatsApp with a generic inquiry message
  const handleWhatsAppContact = () => {
    const text = "Hello Eeshu Medical Store, I would like to inquire about medicines.";
    const url = `https://wa.me/${STORE_DATA.whatsapp.replace(/\+/g, '').replace(/\s/g, '')}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-mint-white font-sans text-teal-brand flex flex-col selection:bg-sage selection:text-teal-brand">

      {/* Main Container */}
      <main className="flex-grow">
        
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-16 md:py-24 px-4" id="hero-section">
          {/* Subtle medicine-strip outline background watermark */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 opacity-5 pointer-events-none select-none">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-teal-brand">
              <path d="M20,10 h60 a10,10 0 0 1 10,10 v60 a10,10 0 0 1 -10,10 h-60 a10,10 0 0 1 -10,-10 v-60 a10,10 0 0 1 10,-10 z M30,30 a10,10 0 1 0 20,0 a10,10 0 1 0 -20,0 M30,70 a10,10 0 1 0 20,0 a10,10 0 1 0 -20,0 M70,30 a10,10 0 1 0 20,0 a10,10 0 1 0 -20,0 M70,70 a10,10 0 1 0 20,0 a10,10 0 1 0 -20,0" />
            </svg>
          </div>

          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-12 relative z-10">
            {/* Left side: Store Details & Contact Buttons */}
            <div className="flex-1 w-full space-y-6 sm:space-y-8 text-left min-w-0">
              <div className="space-y-2 sm:space-y-4">
                <h1 className="font-serif italic text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-teal-brand leading-none">
                  {STORE_DATA.name}
                </h1>
                
                <p className="font-sans text-base sm:text-lg md:text-xl lg:text-2xl text-teal-brand/80 font-medium leading-relaxed">
                  {STORE_DATA.tagline}
                </p>
              </div>

              {/* Call and WhatsApp CTA Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-xl">
                {/* Call Now Card */}
                <a
                  href={`tel:${STORE_DATA.mobile.replace(/\s/g, '')}`}
                  id="contact-card-call"
                  className="bg-teal-brand text-white p-3.5 sm:p-5 rounded-2xl border border-teal-brand/20 shadow-md flex items-center justify-between group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
                >
                  <div className="space-y-0.5 sm:space-y-1 min-w-0">
                    <span className="font-mono text-[8px] sm:text-[9px] tracking-widest text-sage uppercase font-bold block truncate">
                      Tap to Dial
                    </span>
                    <h3 className="font-serif font-bold text-sm sm:text-lg md:text-xl truncate">
                      Call Now
                    </h3>
                    <p className="text-sage/90 text-[10px] sm:text-xs font-sans font-medium truncate">
                      {STORE_DATA.mobile}
                    </p>
                  </div>
                  <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/10 flex items-center justify-center border border-white/10 group-hover:bg-white/20 transition-colors shrink-0 ml-2">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                  </div>
                </a>

                {/* Chat on WhatsApp Card */}
                <a
                  href={`https://wa.me/${STORE_DATA.whatsapp.replace(/\+/g, '').replace(/\s/g, '')}?text=${encodeURIComponent("Hello Eeshu Medical Store, I would like to inquire about medicines.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-card-whatsapp"
                  className="bg-whatsapp text-white p-3.5 sm:p-5 rounded-2xl border border-emerald-600/30 shadow-md flex items-center justify-between group hover:shadow-lg transition-all duration-300 text-left transform hover:-translate-y-1 active:translate-y-0 w-full"
                >
                  <div className="space-y-0.5 sm:space-y-1 min-w-0">
                    <span className="font-mono text-[8px] sm:text-[9px] tracking-widest text-emerald-100 uppercase font-bold block truncate">
                      Instant Response
                    </span>
                    <h3 className="font-serif font-bold text-sm sm:text-lg md:text-xl truncate">
                      WhatsApp
                    </h3>
                    <p className="text-emerald-500-foreground text-[10px] sm:text-xs font-sans font-medium opacity-90 truncate">
                      Send Prescription
                    </p>
                  </div>
                  <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/15 flex items-center justify-center border border-white/10 group-hover:bg-white/25 transition-colors shrink-0 ml-2">
                    {/* Custom WhatsApp Icon SVG */}
                    <svg className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 fill-white" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 2.02 14.12 1 11.48 1 6.047 1 1.62 5.372 1.616 10.8c-.001 1.716.463 3.39 1.341 4.88l-.993 3.626 3.733-.966c1.479.802 2.923 1.194 4.36 1.194z" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>

            {/* Right side: Beautiful small medicine image */}
            <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-64 md:h-64 lg:w-80 lg:h-80 shrink-0 relative self-start md:self-auto mt-4 md:mt-0">
              <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border-2 sm:border-4 border-white bg-white group hover:scale-[1.02] transition-transform duration-500">
                <img
                  src="/src/assets/images/two_medicines_1784095960942.jpg"
                  alt="Medicines at Eeshu Medical Store"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-brand/10 to-transparent pointer-events-none" />
              </div>
              
              {/* Soft aesthetic background blobs */}
              <div className="absolute -bottom-2 -left-2 w-12 h-12 sm:w-24 sm:h-24 bg-marigold/10 rounded-full blur-xl -z-10" />
              <div className="absolute -top-2 -right-2 w-16 h-16 sm:w-32 sm:h-32 bg-sage/20 rounded-full blur-2xl -z-10" />
            </div>
          </div>
        </section>

        {/* Divider 1 */}
        <BlisterPackDivider />

        {/* FIND US SECTION */}
        <section className="px-4 py-8 max-w-6xl mx-auto space-y-10" id="find-us-section">
          <div className="text-center space-y-2">
            <span className="font-mono text-xs tracking-widest text-teal-brand/60 uppercase font-semibold block">
              Store Location
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-black text-teal-brand">
              Find Us
            </h2>
            <div className="w-12 h-1 bg-marigold mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Map Frame (Left Column) */}
            <div className="lg:col-span-7 bg-white p-3 rounded-3xl border border-sage/40 shadow-sm flex flex-col justify-between min-h-[350px] md:min-h-[420px]">
              <div className="w-full h-full min-h-[320px] rounded-2xl overflow-hidden border border-sage/20 relative">
                {/* Embed Real Ayodhya Nagar Bhopal Google Map */}
                <iframe
                  title="Eeshu Medical Store Location Map"
                  src="https://maps.google.com/maps?q=Indus%20Muskan%20Plaza%20Ayodhya%20Bypass%20Bhopal&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="flex justify-between items-center px-2 pt-2.5 text-xs text-teal-brand/60">
                <span className="font-mono">📍 Map Reference: Ayodhya Nagar, Bhopal</span>
                <a 
                  href="https://maps.app.goo.gl/dXXMQFU3Hpef4JhW9"
                  target="_blank" 
                  rel="noreferrer"
                  className="text-teal-brand font-bold hover:underline inline-flex items-center gap-1"
                >
                  Open in Google Maps <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Address & Hours Detail Frame (Right Column) */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-sage/40 shadow-sm p-6 md:p-8 flex flex-col justify-between space-y-6">
              
              {/* Store Address Block */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-sage/30 text-teal-brand flex items-center justify-center shrink-0">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <span className="font-mono text-[10px] tracking-wider uppercase font-bold text-teal-brand/60">
                    Physical Address
                  </span>
                </div>
                <div className="pl-10 space-y-1.5">
                  <p className="font-sans text-teal-brand/85 text-sm md:text-base leading-relaxed">
                    {STORE_DATA.address}
                  </p>
                </div>
              </div>

              {/* Store Owner Details */}
              <div className="bg-sage/10 rounded-2xl p-4 border border-sage/30 flex items-start gap-3 mt-auto">
                <div className="bg-marigold text-white rounded-xl p-2 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="font-mono text-[9px] tracking-wider text-teal-brand/50 uppercase block font-bold">
                    Store Owner & Proprietor
                  </span>
                  <h4 className="font-serif font-bold text-base text-teal-brand leading-none">
                    {STORE_DATA.owner}
                  </h4>

                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Divider 2 */}
        <BlisterPackDivider />

        {/* REVIEWS SECTION */}
        <section className="px-4 py-8 bg-gradient-to-b from-transparent to-sage/10" id="reviews-section">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <span className="font-mono text-xs tracking-widest text-teal-brand/60 uppercase font-semibold block">
                Local Patient Stories
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-black text-teal-brand">
                What Our Customers Say
              </h2>
              <div className="w-12 h-1 bg-marigold mx-auto rounded-full" />
            </div>

            <ReviewCarousel />
          </div>
        </section>

        {/* Divider 3 */}
        <BlisterPackDivider />

      </main>

      {/* FOOTER */}
      <footer className="bg-teal-brand text-white border-t border-sage/20 mt-12" id="footer">
        
        {/* Main Footer Block */}
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Column (8 Cols) */}
          <div className="md:col-span-8 space-y-4">
            <span className="font-serif text-2xl font-bold tracking-tight block">
              {STORE_DATA.name}
            </span>
            <p className="text-sage/80 text-sm max-w-lg leading-relaxed">
              We are Bhopal's favorite neighborhood chemist. Serving our local community with genuine medicines, trustworthy advice, and home delivery for over three decades.
            </p>
            {/* Heart signature */}
            <div className="flex items-center gap-1.5 text-xs text-sage/75 pt-1">
              <span>Made with care in Bhopal</span>
              <Heart className="w-3.5 h-3.5 text-marigold fill-marigold" />
            </div>
          </div>

          {/* Contact & Repeated CTA icons (4 Cols) */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-mono text-[10.5px] uppercase tracking-wider text-sage font-bold block">
              Contact Channels
            </span>
            
            <div className="space-y-2.5">
              
              {/* Phone Line Link */}
              <a 
                href={`tel:${STORE_DATA.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2.5 text-sm bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-2.5 transition-all text-sage hover:text-white"
                id="footer-phone-link"
              >
                <div className="w-7 h-7 rounded-lg bg-marigold/20 text-marigold flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[9px] font-mono text-sage/50 uppercase">Landline</span>
                  <span className="font-mono text-xs">{STORE_DATA.phone}</span>
                </div>
              </a>

              {/* Mobile / WhatsApp Link */}
              <a 
                href={`https://wa.me/${STORE_DATA.whatsapp.replace(/\+/g, '').replace(/\s/g, '')}?text=${encodeURIComponent("Hello Eeshu Medical Store, I would like to inquire about medicines.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-2.5 transition-all text-sage hover:text-white text-left w-full"
                id="footer-whatsapp-link"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 2.02 14.12 1 11.48 1 6.047 1 1.62 5.372 1.616 10.8c-.001 1.716.463 3.39 1.341 4.88l-.993 3.626 3.733-.966c1.479.802 2.923 1.194 4.36 1.194z" />
                  </svg>
                </div>
                <div>
                  <span className="block text-[9px] font-mono text-sage/50 uppercase">WhatsApp Chat</span>
                  <span className="font-mono text-xs">{STORE_DATA.whatsapp}</span>
                </div>
              </a>

            </div>
          </div>

        </div>

        {/* Absolute Bottom Copy */}
        <div className="bg-teal-brand-dark/50 border-t border-white/5 py-4 px-6 text-center text-xs text-sage/50 font-mono">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
            <span>© 2026 {STORE_DATA.name}. All Rights Reserved.</span>
            <span>Licensed under Drugs and Cosmetics Act, Govt of Madhya Pradesh.</span>
          </div>
        </div>

      </footer>

      {/* ORDER MEDICINES MODAL WIZARD */}
      <OrderModal 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)} 
        phone={STORE_DATA.mobile}
        whatsapp={STORE_DATA.whatsapp}
      />

    </div>
  );
}
