import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const menuItems = [
  {
    category: "Classics",
    items: [
      { name: "Espresso", description: "Rich, full-bodied shot of our signature roast" },
      { name: "Americano", description: "Espresso smoothed out with hot water" },
      { name: "Macchiato", description: "Espresso marked with a dollop of foam" },
      { name: "Cortado", description: "Equal parts espresso and steamed milk" },
    ]
  },
  {
    category: "Artisan",
    items: [
      { name: "Flat White", description: "Velvety microfoam poured over double espresso" },
      { name: "Cappuccino", description: "Classic ratio of espresso, steamed milk, and foam" },
      { name: "Vanilla Bean Latte", description: "Smooth latte with real Madagascar vanilla" },
      { name: "Mocha", description: "Espresso, steamed milk, and rich dark chocolate" },
    ]
  },
  {
    category: "Cold & Crafted",
    items: [
      { name: "Cold Brew", description: "Slow-steeped for 24 hours, extra smooth" },
      { name: "Nitro Cold Brew", description: "Infused with nitrogen for a creamy texture" },
      { name: "Iced Caramel Macchiato", description: "Layered espresso, milk, and house caramel" },
      { name: "V60 Pour Over", description: "Single-origin beans, precision brewed" },
    ]
  }
];

export function MenuSection() {
  const { addToCart } = useCart();

  return (
    <section id="menu" className="relative w-full bg-[#121212] py-24 md:py-32 px-6 md:px-12 z-20 border-t border-white/5">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#ce9d4f] rounded-full blur-[200px] opacity-10 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#ce9d4f] to-[#e8c383]"
            style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}
          >
            Our Menu
          </motion.h2>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {menuItems.map((menuGroup, groupIndex) => (
            <motion.div 
              key={menuGroup.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: groupIndex * 0.2 }}
              className="bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl p-8 shadow-xl"
            >
              <h4 
                className="text-4xl text-white mb-8 border-b border-white/10 pb-4"
                style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}
              >
                {menuGroup.category}
              </h4>
              
              <div className="flex flex-col gap-6">
                {menuGroup.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex} 
                    onClick={() => addToCart(item)}
                    className="group cursor-pointer p-4 -mx-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-[#ce9d4f]/30 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h5 className="text-lg font-bold text-gray-100 group-hover:text-[#ce9d4f] transition-colors duration-300">
                          {item.name}
                        </h5>
                        <p className="text-gray-400 text-sm italic mt-1">{item.description}</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#ce9d4f] flex items-center justify-center transition-colors duration-300 flex-shrink-0 mt-1">
                        <Plus className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
