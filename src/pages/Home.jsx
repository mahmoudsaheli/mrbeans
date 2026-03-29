import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Menu, MapPin, Clock, X, Instagram } from 'lucide-react';
import { CoffeeScene } from '../components/CoffeeScene';
import { MenuSection } from '../components/MenuSection';
import { LocationSection } from '../components/LocationSection';
import { CartDrawer } from '../components/CartDrawer';
import { useCart } from '../context/CartContext';

function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleCart, totalItems } = useCart();

  return (
    <div className="min-h-screen text-white font-sans overflow-x-hidden relative">
      {/* Background Image & Overlay */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-70"
        style={{ backgroundImage: `url('${import.meta.env.BASE_URL}bg-coffee.jpg')`, pointerEvents: 'none' }}
      />
      <div className="fixed inset-0 z-0 bg-black/60 bg-gradient-to-t from-[#121212] via-black/40 to-black/80 pointer-events-none" />

      {/* Navbar - Globally Fixed */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 py-4 md:py-5 md:px-12 transition-all duration-300 ${isMobileMenuOpen ? 'bg-transparent border-b-transparent shadow-none' : 'backdrop-blur-md bg-[#121212]/80 border-b border-white/5 shadow-xl'}`}>
          <div className="flex items-center gap-3">
            <img src={`${import.meta.env.BASE_URL}nav-logo.jpg`} alt="Mr. Beans Logo" className="w-auto h-12 md:h-14 rounded-full object-cover" />
            <div className="flex flex-col items-center justify-center pt-1">
              <span 
                className="text-3xl md:text-4xl text-[#ce9d4f] leading-none"
                style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}
              >
                Mr. Beans
              </span>
              <span className="text-[10px] md:text-xs font-medium tracking-[0.35em] uppercase text-[#ce9d4f] mt-1 -mr-[0.35em]">
                Cafe
              </span>
            </div>
          </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          <a href="#" className="hover:text-[#ce9d4f] transition-colors">OUR STORY</a>
          <a href="#menu" className="hover:text-[#ce9d4f] transition-colors">MENU</a>
          <a href="#location" className="hover:text-[#ce9d4f] transition-colors">LOCATIONS</a>
          
          <div className="flex items-center gap-6 border-l border-white/20 pl-8 ml-2">
            <a href="https://www.instagram.com/mr.beanscafembc/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#ce9d4f] transition-colors duration-300">
              <Instagram className="w-5 h-5" />
            </a>
            <button onClick={toggleCart} className="px-6 py-2.5 bg-[#ce9d4f] text-[#121212] font-bold rounded-full hover:bg-white transition-colors duration-300 whitespace-nowrap">
              MY ORDER {totalItems > 0 && `(${totalItems})`}
            </button>
          </div>
        </div>

        <button 
          className="md:hidden text-white hover:text-[#ce9d4f] transition-colors relative z-[110]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-[#121212]/95 backdrop-blur-3xl flex flex-col items-center justify-start gap-8 text-2xl font-medium tracking-widest pt-32 pb-12 overflow-y-auto"
          >
            <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#ce9d4f] transition-colors">OUR STORY</a>
            <a href="#menu" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#ce9d4f] transition-colors">MENU</a>
            <a href="#location" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#ce9d4f] transition-colors">LOCATIONS</a>
            <button onClick={() => { setIsMobileMenuOpen(false); toggleCart(); }} className="px-8 py-4 mt-6 bg-[#ce9d4f] text-[#121212] font-bold rounded-full hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(206,157,79,0.3)] whitespace-nowrap">
              MY ORDER {totalItems > 0 && `(${totalItems})`}
            </button>
            <div className="mt-8 pt-8 border-t border-white/10 w-full max-w-[150px] flex justify-center">
              <a href="https://www.instagram.com/mr.beanscafembc/" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-[#ce9d4f]/10 border border-[#ce9d4f]/30 flex items-center justify-center text-[#ce9d4f]">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Hero Section */}
        <main className="pt-24 min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-12 pb-12">
        
        {/* Text Content */}
        <div className="w-full md:w-1/2 pt-12 md:pt-0 z-10 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 
              className="text-6xl md:text-8xl lg:text-9xl leading-tight mb-6"
              style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}
            >
              Brewed to <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ce9d4f] to-[#e8c383]">Perfection</span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gray-400 text-lg md:text-xl max-w-md mb-10 leading-relaxed"
          >
            Experience the rich, bold flavors of coffee.<br />
            Crafted with passion by Mr. Beans.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-5"
          >
            <a href="#menu" className="px-8 py-4 bg-[#ce9d4f] text-[#121212] font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(206,157,79,0.4)] text-center">
              View Menu
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-16 lg:gap-24 text-sm text-gray-500 font-medium tracking-wide"
          >
            <a href="https://maps.app.goo.gl/2cqX5q79EyCKD2ey6" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[#ce9d4f] transition-colors group">
              <div className="w-8 h-8 rounded-full bg-[#ce9d4f]/10 flex items-center justify-center group-hover:bg-[#ce9d4f]/20 transition-colors">
                <MapPin className="w-4 h-4 text-[#ce9d4f]" />
              </div>
              Mr. Beans Cafe, Lebanon
            </a>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#ce9d4f]/10 flex items-center justify-center">
                <Clock className="w-4 h-4 text-[#ce9d4f]" />
              </div>
              Open 8AM - 1AM
            </div>
          </motion.div>
        </div>

        {/* 3D Scene */}
        <div className="w-full md:w-1/2 h-[60vh] md:h-screen relative -mt-10 md:mt-0 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="w-full h-full absolute inset-0"
          >
            <CoffeeScene />
          </motion.div>
          {/* Decorative Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#ce9d4f] rounded-full blur-[150px] opacity-20 pointer-events-none"></div>
        </div>

      </main>
      </div>

      {/* Menu Section */}
      <MenuSection />
      
      {/* Location Section */}
      <LocationSection />
      
      {/* Cart Drawer */}
      <CartDrawer />
      
      {/* Footer */}
      <footer className="relative z-30 w-full bg-[#0a0a0a] pt-16 pb-8 px-6 md:px-12 border-t border-white/5 flex flex-col items-center justify-center">
        
        {/* Footer Brand Logo */}
        <div className="flex flex-col items-center gap-5 mb-10">
          <img src={`${import.meta.env.BASE_URL}nav-logo.jpg`} alt="Mr. Beans Logo" className="w-20 h-20 rounded-full object-cover border border-[#ce9d4f]/20 shadow-lg" />
          <div className="flex flex-col items-center justify-center">
            <span 
              className="text-3xl text-[#ce9d4f] leading-none"
              style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}
            >
              Mr. Beans
            </span>
            <span className="text-[10px] font-medium tracking-[0.35em] uppercase text-[#ce9d4f] mt-1 -mr-[0.35em]">
              Cafe
            </span>
          </div>
        </div>

        <div className="w-full max-w-lg h-px bg-gradient-to-r from-transparent via-[#ce9d4f]/20 to-transparent mb-8"></div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl text-gray-400 text-base md:text-lg tracking-wide gap-6 text-center">
          
          <div className="w-full md:w-auto md:flex-1 flex flex-col items-center md:items-start gap-1">
            <p>&copy; {new Date().getFullYear()} Mr. Beans Cafe. All rights reserved.</p>
            <Link to="/admin" className="text-sm hover:text-[#ce9d4f] transition-colors opacity-70">Kitchen Dashboard</Link>
          </div>

          <div className="w-full md:w-auto md:flex-1 flex justify-center">
            <a 
              href="https://www.instagram.com/mr.beanscafembc/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-[#ce9d4f]/10 border border-[#ce9d4f]/30 flex items-center justify-center hover:bg-[#ce9d4f] group transition-colors duration-300"
            >
              <Instagram className="w-5 h-5 text-[#ce9d4f] group-hover:text-[#121212] transition-colors duration-300" />
            </a>
          </div>

          <div className="w-full md:w-auto md:flex-1 flex justify-center md:justify-end">
            <p>
              Website by <a href="https://msolution0.netlify.app/" target="_blank" rel="noopener noreferrer" className="font-bold text-xl md:text-2xl text-blue-500 hover:text-blue-400 transition-colors underline-offset-4 hover:underline">M Solution</a>
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}

export default Home;
