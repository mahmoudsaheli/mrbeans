import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Coffee, CheckCircle, Clock, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
// import { supabase } from '../lib/supabase'; // We will use this soon

const DUMMY_ORDERS = [
  {
    id: '1',
    customer_name: 'Sarah',
    table_number: '4',
    items: [
      { name: 'Vanilla Bean Latte', quantity: 1 },
      { name: 'Cortado', quantity: 2 }
    ],
    status: 'pending',
    created_at: new Date(Date.now() - 5000 * 60).toISOString(), // 5 mins ago
  },
  {
    id: '2',
    customer_name: 'Mike',
    table_number: 'Takeaway',
    items: [
      { name: 'V60 Pour Over', quantity: 1 },
    ],
    status: 'pending',
    created_at: new Date(Date.now() - 2000 * 60).toISOString(), // 2 mins ago
  }
];

function AdminDashboard() {
  const [orders, setOrders] = useState(DUMMY_ORDERS);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // In the future, this is where we will fetch live orders from Supabase
  /*
  useEffect(() => {
    fetchOrders();
    const subscription = supabase.channel('orders').on('postgres_changes', ... ).subscribe();
    return () => supabase.removeChannel(subscription);
  }, []);
  */

  const markAsCompleted = (id) => {
    setOrders(orders.filter(order => order.id !== id));
    // In future: supabase.from('orders').update({ status: 'completed' }).eq('id', id)
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12 font-sans relative overflow-x-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#ce9d4f] rounded-full blur-[250px] opacity-10 pointer-events-none"></div>

      <header className="flex items-center justify-between mb-12 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
            <Coffee className="w-6 h-6 text-[#ce9d4f]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold" style={{ fontFamily: "'Dancing Script', cursive" }}>Kitchen Dashboard</h1>
            <p className="text-sm text-gray-400">Live order stream</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full hidden md:flex">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm font-medium text-gray-300">Live</span>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-red-500/10 hover:text-red-400 border border-white/10 hover:border-red-500/30 text-gray-400 rounded-xl transition-all duration-300 text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </header>

      <main className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.length === 0 ? (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-gray-500 border border-dashed border-white/10 rounded-2xl bg-white/5">
            <CheckCircle className="w-12 h-12 mb-4 text-green-500/50" />
            <p className="text-xl">All caught up!</p>
            <p className="text-sm mt-2">Waiting for new orders...</p>
          </div>
        ) : (
          orders.map((order) => (
            <motion.div 
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#121212] border border-white/10 rounded-2xl p-6 flex flex-col shadow-xl"
            >
              <div className="flex justify-between items-start mb-4 pb-4 border-b border-white/5">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">
                    {order.customer_name}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="bg-[#ce9d4f]/20 text-[#ce9d4f] px-2 py-0.5 rounded text-xs font-bold uppercase">
                      Table / Note: {order.table_number || 'N/A'}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-3 mb-6">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <span className="bg-white/10 text-white w-6 h-6 rounded flex items-center justify-center font-medium text-xs">
                        {item.quantity}
                      </span>
                      <span className="text-gray-200">{item.name}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => markAsCompleted(order.id)}
                className="w-full py-3 bg-[#ce9d4f] hover:bg-white text-[#121212] font-bold rounded-xl transition-colors duration-300 shadow-[0_4px_14px_rgba(206,157,79,0.2)]"
              >
                Mark as Completed
              </button>
            </motion.div>
          ))
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
