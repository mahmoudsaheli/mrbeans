import React from 'react';
import { motion } from 'framer-motion';

const menuItems = [
  {
    category: "Classics",
    items: [
      { name: "Espresso", description: "Rich, full-bodied shot of our signature roast", price: "$3.50" },
      { name: "Americano", description: "Espresso smoothed out with hot water", price: "$4.00" },
      { name: "Macchiato", description: "Espresso marked with a dollop of foam", price: "$4.25" },
      { name: "Cortado", description: "Equal parts espresso and steamed milk", price: "$4.50" },
    ]
  },
  {
    category: "Artisan",
    items: [
      { name: "Flat White", description: "Velvety microfoam poured over double espresso", price: "$5.00" },
      { name: "Cappuccino", description: "Classic ratio of espresso, steamed milk, and foam", price: "$5.00" },
      { name: "Vanilla Bean Latte", description: "Smooth latte with real Madagascar vanilla", price: "$6.25" },
      { name: "Mocha", description: "Espresso, steamed milk, and rich dark chocolate", price: "$6.50" },
    ]
  },
  {
    category: "Cold & Crafted",
    items: [
      { name: "Cold Brew", description: "Slow-steeped for 24 hours, extra smooth", price: "$5.50" },
      { name: "Nitro Cold Brew", description: "Infused with nitrogen for a creamy texture", price: "$6.50" },
      { name: "Iced Caramel Macchiato", description: "Layered espresso, milk, and house caramel", price: "$6.75" },
      { name: "V60 Pour Over", description: "Single-origin beans, precision brewed", price: "$7.00" },
    ]
  }
];

export function MenuSection() {
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
              className="bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl p-8 hover:border-[#ce9d4f]/30 transition-colors duration-500 shadow-xl"
            >
              <h4 
                className="text-4xl text-white mb-8 border-b border-white/10 pb-4"
                style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}
              >
                {menuGroup.category}
              </h4>
              
              <div className="flex flex-col gap-6">
                {menuGroup.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="group cursor-pointer">
                    <div className="flex justify-between items-end mb-1">
                      <h5 className="text-lg font-bold text-gray-100 group-hover:text-[#ce9d4f] transition-colors duration-300">
                        {item.name}
                      </h5>
                      <div className="flex-grow mx-4 border-b border-dashed border-gray-600/50 mb-1.5 relative top-[-4px]"></div>
                      <span className="text-[#ce9d4f] font-bold text-lg">{item.price}</span>
                    </div>
                    <p className="text-gray-400 text-sm italic">{item.description}</p>
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
