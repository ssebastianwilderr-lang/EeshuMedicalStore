/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Review } from '../types';

const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Prashant Sharma',
    location: 'Ayodhya Bypass, Bhopal',
    rating: 5,
    date: '12 July 2026',
    text: 'Best medical store in Ayodhya Bypass. The owner Nitin Jain is very polite and helpful. Almost all medicines are always available in stock here.'
  },
  {
    id: 'rev-2',
    name: 'Abhishek Gupta',
    location: 'Ayodhya Nagar, Bhopal',
    rating: 5,
    date: '05 July 2026',
    text: 'Great experience. Quick service and very reliable. They also offer free home delivery in the local area, which is extremely helpful for senior citizens.'
  },
  {
    id: 'rev-3',
    name: 'Neha Jain',
    location: 'Bhawanidham, Bhopal',
    rating: 5,
    date: '28 June 2026',
    text: 'Excellent pharmacy! Genuine medicines, honest pricing, and the staff is highly professional. Highly recommended neighborhood chemist.'
  },
  {
    id: 'rev-4',
    name: 'Sunita Choudhary',
    location: 'Ayodhya Nagar, Bhopal',
    rating: 5,
    date: '18 June 2026',
    text: 'Always buy my monthly prescriptions from Eeshu Medicals. Very trustworthy store and prompt home delivery over WhatsApp.'
  },
  {
    id: 'rev-5',
    name: 'Rahul Dubey',
    location: 'Narela Shankri, Bhopal',
    rating: 5,
    date: '10 June 2026',
    text: 'Extremely helpful and polite behavior. They guide you nicely about medicine dosages. Best chemist shop in this locality.'
  }
];

export function ReviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % REVIEWS.length);
    }, 5000); // 5 seconds autoplay

    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % REVIEWS.length);
  };

  // Swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50; // minimum distance to trigger swipe

    if (diff > minSwipeDistance) {
      // Swiped left, show next
      handleNext();
    } else if (diff < -minSwipeDistance) {
      // Swiped right, show prev
      handlePrev();
    }

    // Reset touch coordinates
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="w-full relative" id="reviews-section">
      <div 
        className="max-w-xl mx-auto px-4 md:px-0"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Carousel Container */}
        <div 
          className="relative min-h-[380px] sm:min-h-[320px] flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="w-full"
            >
              {/* Prescription Pad Card with Professional Polish Accent and Tilt */}
              <div 
                id={`review-card-${REVIEWS[currentIndex].id}`}
                className="prescription-grid torn-edge border-t border-r border-b border-sage/55 border-l-8 border-l-marigold rounded-r-xl p-6 md:p-8 shadow-xl relative overflow-hidden flex flex-col justify-between transform -rotate-[0.5deg] hover:rotate-0 transition-transform duration-300"
              >
                {/* Lined Margin Design (Red/Teal prescription pad left margin line) */}
                <div className="absolute left-4 top-0 bottom-0 w-[1.5px] bg-amber-500/30 pointer-events-none" />
                
                {/* Card Watermark */}
                <div className="absolute right-4 bottom-4 text-teal-brand/3 font-serif text-[120px] select-none pointer-events-none font-bold leading-none">
                  Rx
                </div>

                {/* Prescription Pad Header */}
                <div className="pl-4 border-b border-sage/20 pb-4 mb-4 flex justify-between items-start">
                  <div>
                    <span className="font-mono text-[10px] tracking-widest text-teal-brand/60 uppercase block">
                      Prescription Pad Ref.
                    </span>
                    <h4 className="font-serif text-teal-brand font-semibold text-lg">
                      Eeshu Chemist Note
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-[10px] text-teal-brand/50 block">
                      DATE
                    </span>
                    <span className="font-mono text-xs font-semibold text-teal-brand/70">
                      {REVIEWS[currentIndex].date}
                    </span>
                  </div>
                </div>

                {/* Stars and Content */}
                <div className="pl-4 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 mb-3">
                      {[...Array(REVIEWS[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-4.5 h-4.5 fill-marigold stroke-marigold" />
                      ))}
                    </div>
                    
                    <div className="relative">
                      <Quote className="absolute -left-2 -top-2 w-8 h-8 text-teal-brand/5 rotate-180" />
                      <p className="font-sans text-teal-brand/90 text-sm sm:text-base leading-relaxed italic relative z-10 pl-2">
                        "{REVIEWS[currentIndex].text}"
                      </p>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="border-t border-sage/25 pt-4 mt-6 flex justify-between items-center">
                    <div>
                      <h5 className="font-serif text-teal-brand font-bold text-base">
                        {REVIEWS[currentIndex].name}
                      </h5>
                      <span className="font-sans text-teal-brand/60 text-xs font-medium block">
                        {REVIEWS[currentIndex].location}
                      </span>
                    </div>
                    <div className="bg-sage/40 rounded-full px-3 py-1 border border-sage/50">
                      <span className="font-mono text-[10px] font-bold text-teal-brand tracking-wider uppercase">
                        Verified Order
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Controls */}
        <div className="flex justify-between items-center mt-8">
          {/* Arrow navigation for Desktop */}
          <button
            onClick={handlePrev}
            id="review-prev-btn"
            className="w-10 h-10 rounded-full border border-teal-brand/10 bg-white shadow-sm flex items-center justify-center text-teal-brand hover:bg-sage/20 hover:border-teal-brand/30 active:scale-95 transition-all duration-200"
            aria-label="Previous Review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dot Navigation */}
          <div className="flex justify-center gap-2" id="review-dots">
            {REVIEWS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                id={`review-dot-${index}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'w-6 bg-teal-brand' 
                    : 'w-2.5 bg-sage/60 hover:bg-teal-brand/40'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            id="review-next-btn"
            className="w-10 h-10 rounded-full border border-teal-brand/10 bg-white shadow-sm flex items-center justify-center text-teal-brand hover:bg-sage/20 hover:border-teal-brand/30 active:scale-95 transition-all duration-200"
            aria-label="Next Review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
