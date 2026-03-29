import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, Phone } from 'lucide-react';

export function LocationSection() {
  return (
    <section id="location" className="relative w-full bg-[#121212] py-24 md:py-32 px-6 md:px-12 z-20 border-t border-white/5 overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#ce9d4f] rounded-full blur-[250px] opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 
            className="text-[#ce9d4f] text-4xl md:text-5xl mb-4"
            style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}
          >
            Find Us
          </h2>
          <h3 
            className="text-5xl md:text-6xl lg:text-7xl tracking-wide"
            style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}
          >
            Visit <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ce9d4f] to-[#e8c383]">Mr. Beans</span>
          </h3>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-5xl bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative"
        >
          {/* Left side: Information */}
          <div className="w-full md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            
            <div className="mb-12 flex flex-col gap-8">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-full bg-[#ce9d4f]/10 border border-[#ce9d4f]/30 flex items-center justify-center shrink-0">
                  <MapPin className="text-[#ce9d4f] w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-white mb-2 tracking-wide">Our Location</h4>
                  <p className="text-gray-400 leading-relaxed text-lg mb-4">
                    Mr. Beans Cafe<br/>
                    Rashayya, Lebanon
                  </p>
                  <a 
                    href="https://maps.app.goo.gl/2cqX5q79EyCKD2ey6" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-[#ce9d4f] text-[#121212] font-bold text-base rounded-full hover:scale-105 hover:shadow-[0_0_20px_rgba(206,157,79,0.4)] transition-all duration-300 w-full sm:w-64"
                  >
                    <Navigation className="w-4 h-4 fill-current" />
                    Get Directions
                  </a>
                </div>
              </div>

              {/* Call Us */}
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-full bg-[#ce9d4f]/10 border border-[#ce9d4f]/30 flex items-center justify-center shrink-0">
                  <Phone className="text-[#ce9d4f] w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-white mb-2 tracking-wide">Call Us</h4>
                  <a 
                    href="tel:+96176700375" 
                    className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-[#ce9d4f] text-[#121212] font-bold text-base rounded-full hover:scale-105 hover:shadow-[0_0_20px_rgba(206,157,79,0.4)] transition-all duration-300 w-full sm:w-64 mt-2"
                  >
                    <Phone className="w-4 h-4 fill-current" />
                    +961 76 700 375
                  </a>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-full bg-[#ce9d4f]/10 border border-[#ce9d4f]/30 flex items-center justify-center shrink-0">
                  <Clock className="text-[#ce9d4f] w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2 tracking-wide">Opening Hours</h4>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    Mon - Sun:<br/>
                    8:00 AM - 1:00 AM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side: Maps Visual Placeholder */}
          <div className="w-full md:w-1/2 min-h-[300px] md:h-auto relative border-t md:border-t-0 md:border-l border-white/5 overflow-hidden group flex items-center justify-center">
              {/* Background Photo */}
              <div 
                className="absolute inset-0 z-[0] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" 
                style={{ backgroundImage: `url('${import.meta.env.BASE_URL}cafe-location.jpg')` }} 
              />
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
