/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, FileText, Send, Check, AlertCircle } from 'lucide-react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  phone: string;
  whatsapp: string;
}

export function OrderModal({ isOpen, onClose, phone, whatsapp }: OrderModalProps) {
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'call' | 'list'>('whatsapp');
  const [medicineList, setMedicineList] = useState('');
  const [prescriptionPhotoName, setPrescriptionPhotoName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  // Formats WhatsApp API URL with customized user text
  const getWhatsAppURL = (text: string) => {
    return `https://wa.me/${whatsapp.replace(/\+/g, '').replace(/\s/g, '')}?text=${encodeURIComponent(text)}`;
  };

  const handleSendList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medicineList.trim()) return;

    let message = `Hello Eeshu Medical Store,\n\nI want to place an order for medicines.`;
    if (customerName.trim()) message += `\nName: ${customerName}`;
    if (customerAddress.trim()) message += `\nAddress: ${customerAddress}`;
    message += `\n\n*Medicine List:*\n${medicineList}`;
    message += `\n\nPlease let me know the total price and expected delivery time. Thank you!`;

    window.open(getWhatsAppURL(message), '_blank');
  };

  const handleSendPrescriptionGuide = () => {
    let message = `Hello Eeshu Medical Store,\n\nI want to send a photo of my prescription to order medicines.`;
    if (customerName.trim()) message += `\nMy Name: ${customerName}`;
    message += `\n\nI am attaching the prescription image now...`;

    window.open(getWhatsAppURL(message), '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-teal-brand/70 backdrop-blur-sm"
            id="order-modal-backdrop"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative w-full max-w-lg bg-mint-white rounded-2xl shadow-xl border border-sage overflow-hidden z-10 flex flex-col max-h-[90vh]"
            id="order-modal-container"
          >
            {/* Header */}
            <div className="bg-teal-brand text-white p-5 relative">
              <span className="font-mono text-[10px] tracking-widest text-sage uppercase">
                Order Placement Assistant
              </span>
              <h3 className="font-serif text-xl md:text-2xl font-bold mt-1">
                How would you like to order?
              </h3>
              <p className="text-sage text-xs mt-1 font-medium font-sans">
                Get your medicines delivered right to your doorstep or kept ready for pickup.
              </p>
              
              <button
                onClick={onClose}
                id="close-modal-btn"
                className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/10 rounded-full p-1.5 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Selection Tabs */}
            <div className="grid grid-cols-3 border-b border-sage/30 bg-white" id="order-tabs">
              <button
                onClick={() => setActiveTab('whatsapp')}
                id="tab-whatsapp"
                className={`py-3.5 px-2 text-center border-b-2 font-serif text-xs md:text-sm font-semibold transition-all ${
                  activeTab === 'whatsapp'
                    ? 'border-marigold text-teal-brand bg-sage/10'
                    : 'border-transparent text-teal-brand/60 hover:text-teal-brand hover:bg-sage/5'
                }`}
              >
                1. Prescription Photo
              </button>
              <button
                onClick={() => setActiveTab('list')}
                id="tab-list"
                className={`py-3.5 px-2 text-center border-b-2 font-serif text-xs md:text-sm font-semibold transition-all ${
                  activeTab === 'list'
                    ? 'border-marigold text-teal-brand bg-sage/10'
                    : 'border-transparent text-teal-brand/60 hover:text-teal-brand hover:bg-sage/5'
                }`}
              >
                2. Type Medicine List
              </button>
              <button
                onClick={() => setActiveTab('call')}
                id="tab-call"
                className={`py-3.5 px-2 text-center border-b-2 font-serif text-xs md:text-sm font-semibold transition-all ${
                  activeTab === 'call'
                    ? 'border-marigold text-teal-brand bg-sage/10'
                    : 'border-transparent text-teal-brand/60 hover:text-teal-brand hover:bg-sage/5'
                }`}
              >
                3. Call Store
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="p-6 overflow-y-auto flex-grow font-sans text-teal-brand">
              
              {/* TAB 1: WhatsApp prescription upload */}
              {activeTab === 'whatsapp' && (
                <div className="space-y-4" id="order-content-whatsapp">
                  <div className="bg-sage/20 border border-sage p-4 rounded-xl flex items-start gap-3">
                    <FileText className="w-5 h-5 text-teal-brand mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-serif font-bold text-sm">Send Prescription Image</h4>
                      <p className="text-xs text-teal-brand/80 mt-1 leading-relaxed">
                        The easiest way is to take a clear photo of your doctor's slip and send it directly via WhatsApp. Our licensed pharmacist will review it and confirm details immediately.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-xs font-mono tracking-wide uppercase font-bold text-teal-brand/70 mb-1">
                        Your Name (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ramesh Kumar"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-white border border-sage/60 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-brand font-sans placeholder:text-teal-brand/30"
                      />
                    </div>

                    <button
                      onClick={handleSendPrescriptionGuide}
                      className="w-full bg-whatsapp text-white py-3 rounded-lg font-serif font-bold text-sm shadow hover:bg-whatsapp/90 transition-colors flex items-center justify-center gap-2 mt-4"
                    >
                      <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 2.02 14.12 1 11.48 1 6.047 1 1.62 5.372 1.616 10.8c-.001 1.716.463 3.39 1.341 4.88l-.993 3.626 3.733-.966c1.479.802 2.923 1.194 4.36 1.194z" />
                      </svg>
                      Open WhatsApp & Attach Photo
                    </button>
                    <span className="block text-center text-[10px] text-teal-brand/50 font-mono">
                      DELIVERY IN AYODHYA NAGAR & SURROUNDING AREAS WITHIN 2 HOURS
                    </span>
                  </div>
                </div>
              )}

              {/* TAB 2: Type Medicine List */}
              {activeTab === 'list' && (
                <form onSubmit={handleSendList} className="space-y-4" id="order-content-list">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-mono tracking-wide uppercase font-bold text-teal-brand/70 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Meera Joshi"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-white border border-sage/60 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-brand font-sans placeholder:text-teal-brand/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono tracking-wide uppercase font-bold text-teal-brand/70 mb-1">
                        Home Delivery Address
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. H.No 45, C-Block, Ayodhya Nagar"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        className="w-full bg-white border border-sage/60 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-brand font-sans placeholder:text-teal-brand/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono tracking-wide uppercase font-bold text-teal-brand/70 mb-1">
                        Type Medicines & Quantity
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="e.g.&#10;1. Crocin 650mg - 1 strip&#10;2. Volini Spray - 1 bottle&#10;3. Metformin 500mg - 2 strips"
                        value={medicineList}
                        onChange={(e) => setMedicineList(e.target.value)}
                        className="w-full bg-white border border-sage/60 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-brand font-sans placeholder:text-teal-brand/30 resize-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-brand to-teal-800 text-white py-3 rounded-lg font-serif font-bold text-sm shadow hover:opacity-95 transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    Send List to WhatsApp Chemist
                  </button>
                </form>
              )}

              {/* TAB 3: Direct Store Call */}
              {activeTab === 'call' && (
                <div className="space-y-5 text-center py-4" id="order-content-call">
                  <div className="w-16 h-16 bg-teal-brand/10 text-teal-brand rounded-full flex items-center justify-center mx-auto mb-2 border border-teal-brand/10">
                    <Phone className="w-8 h-8" />
                  </div>
                  
                  <div>
                    <h4 className="font-serif font-bold text-lg">Call Nitin Jain directly</h4>
                    <p className="text-sm text-teal-brand/80 max-w-sm mx-auto mt-2 leading-relaxed">
                      Prefer speaking over phone? Dial our shop number to dictate your requirements directly to our helpful staff. We verify each drug on call.
                    </p>
                  </div>

                  <div className="bg-sage/20 border border-sage/40 p-3 rounded-xl max-w-xs mx-auto">
                    <span className="font-mono text-[10px] uppercase tracking-wider block text-teal-brand/60">
                      Store Landline / Mobile
                    </span>
                    <span className="text-xl font-mono font-bold tracking-tight block text-teal-brand mt-0.5">
                      {phone}
                    </span>
                  </div>

                  <div className="pt-2">
                    <a
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="inline-flex items-center gap-2 bg-marigold hover:bg-amber-600 text-white font-serif font-bold px-8 py-3.5 rounded-xl shadow transition-all transform hover:scale-[1.02] active:scale-95"
                    >
                      <Phone className="w-4 h-4" />
                      Call Chemist Now
                    </a>
                  </div>

                  <div className="flex justify-center items-center gap-1.5 text-[11px] font-mono text-teal-brand/60">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Sunday Emergency: we deliver even when closed. Call mobile.</span>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Bar */}
            <div className="bg-white border-t border-sage/20 p-4 flex items-center justify-between text-xs text-teal-brand/60">
              <span className="font-mono">📍 Verified Ayodhya Nagar Chemist</span>
              <span className="font-sans">Fast & Trusted Home Delivery 🛵</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
