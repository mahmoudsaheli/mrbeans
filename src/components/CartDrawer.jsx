import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, Coffee, User, MapPin, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
// import { supabase } from '../lib/supabase';

export function CartDrawer() {
  const { cartItems, isCartOpen, closeCart, updateQuantity, removeFromCart, clearCart } = useCart();
  
  const [customerName, setCustomerName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!customerName.trim()) return;

    setIsSubmitting(true);
    
    // In the future: Insert actual order into Supabase
    /*
    const { error } = await supabase.from('orders').insert({
      customer_name: customerName,
      table_number: tableNumber,
      items: cartItems,
      status: 'pending'
    });
    */
    
    // Simulate network delay for now
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      clearCart();
      
      // Reset form and close drawer after showing success message
      setTimeout(() => {
        setIsSuccess(false);
        closeCart();
        setCustomerName('');
        setTableNumber('');
      }, 3000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-[120] w-full md:w-[450px] bg-[#1a1a1a] shadow-2xl border-l border-white/10 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold text-[#ce9d4f] tracking-wide" style={{ fontFamily: "'Dancing Script', cursive" }}>
                My Order
              </h2>
              <button 
                onClick={closeCart}
                className="p-2 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Success State */}
            {isSuccess ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <CheckCircle className="w-20 h-20 text-green-500 mb-6 mx-auto" />
                  <h3 className="text-2xl font-bold text-white mb-2">Order Sent!</h3>
                  <p className="text-gray-400">Your coffee is being prepared.</p>
                </motion.div>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 scrollbar-thin scrollbar-thumb-white/10">
                  {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 opacity-70">
                      <div className="w-20 h-20 mb-6 rounded-full bg-white/5 flex items-center justify-center">
                        <Coffee className="w-8 h-8 text-[#ce9d4f]/50" />
                      </div>
                      <p className="text-lg">Your order is empty.</p>
                      <p className="text-sm mt-2">Add some items from the menu!</p>
                    </div>
                  ) : (
                    cartItems.map((item) => (
                      <div key={item.name} className="flex flex-col gap-3 bg-white/5 rounded-xl p-4 border border-white/5 group hover:border-[#ce9d4f]/30 transition-colors">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-white font-bold">{item.name}</h4>
                            <p className="text-sm text-gray-400 mt-1 line-clamp-1">{item.description}</p>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.name)}
                            className="text-gray-500 hover:text-red-400 transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/10">
                          <div className="flex items-center gap-3 bg-black/40 rounded-full px-1 py-1">
                            <button 
                              onClick={() => updateQuantity(item.name, item.quantity - 1)}
                              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-4 text-center text-white font-medium">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.name, item.quantity + 1)}
                              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer Checkout Form */}
                {cartItems.length > 0 && (
                  <div className="p-6 bg-black/40 border-t border-white/10">
                    <form onSubmit={handleSubmitOrder} className="flex flex-col gap-4">
                      
                      <div className="flex flex-col gap-3">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="w-4 h-4 text-gray-500" />
                          </div>
                          <input 
                            type="text" 
                            required
                            placeholder="Your Name (Required)" 
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#ce9d4f]/50 text-white placeholder-gray-500 transition-colors"
                          />
                        </div>

                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="w-4 h-4 text-gray-500" />
                          </div>
                          <input 
                            type="text"
                            placeholder="Table Number (Optional)" 
                            value={tableNumber}
                            onChange={(e) => setTableNumber(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#ce9d4f]/50 text-white placeholder-gray-500 transition-colors"
                          />
                        </div>
                      </div>

                      <button 
                        type="submit"
                        disabled={!customerName.trim() || isSubmitting}
                        className={`w-full py-4 font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${
                          !customerName.trim() || isSubmitting 
                            ? 'bg-white/10 text-gray-500 cursor-not-allowed' 
                            : 'bg-[#ce9d4f] text-[#121212] hover:bg-white shadow-[0_0_20px_rgba(206,157,79,0.2)]'
                        }`}
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <>
                            <Coffee className="w-5 h-5" />
                            Send Order to Kitchen
                          </>
                        )}
                      </button>
                      <p className="text-center text-xs text-gray-500 mt-1">
                        Pay in store when you receive your order.
                      </p>

                    </form>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
