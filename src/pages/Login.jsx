import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ArrowLeft, Coffee, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate slight network delay
    setTimeout(() => {
      const success = login(password);
      if (success) {
        navigate('/admin');
      } else {
        setError('Incorrect password. Please try again.');
        setIsLoading(false);
        setPassword('');
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col justify-center items-center relative overflow-hidden font-sans">
      
      {/* Background Decor */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url('${import.meta.env.BASE_URL}bg-coffee.jpg')`, pointerEvents: 'none', filter: 'blur(20px)' }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ce9d4f] rounded-full blur-[250px] opacity-20 pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-md px-6">
        
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#ce9d4f] transition-colors mb-8 font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to Café
        </Link>

        {/* Login Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
        >
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-[#ce9d4f]" />
            </div>
            <h1 className="text-3xl text-white font-bold" style={{ fontFamily: "'Dancing Script', cursive" }}>Staff Login</h1>
            <p className="text-gray-400 text-sm mt-2">Enter the master passcode to view live orders.</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <p>{error}</p>
              </motion.div>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-gray-500" />
              </div>
              <input 
                type="password" 
                required
                placeholder="Password (type 'admin')" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-[#ce9d4f]/50 text-white placeholder-gray-500 transition-colors"
              />
            </div>

            <button 
              type="submit"
              disabled={!password.trim() || isLoading}
              className={`w-full py-4 font-bold rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 ${
                !password.trim() || isLoading 
                  ? 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/10' 
                  : 'bg-[#ce9d4f] text-[#121212] hover:bg-white shadow-[0_0_20px_rgba(206,157,79,0.3)]'
              }`}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Access Dashboard'
              )}
            </button>
          </form>

        </motion.div>
      </div>

    </div>
  );
}

export default Login;
