import { useState, useMemo } from 'react';
import API from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Check, X, ShieldCheck } from 'lucide-react';

export default function AuthForm({ onAuth }: { onAuth: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const passwordRequirements = useMemo(() => [
    { label: 'At least 9 characters', test: (pwd: string) => pwd.length > 8 },
    { label: 'One uppercase letter', test: (pwd: string) => /[A-Z]/.test(pwd) },
    { label: 'One special character', test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>_{}]/.test(pwd) },
  ], []);

  const isPasswordStrong = !isLogin ? passwordRequirements.every(req => req.test(password)) : true;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin && !isPasswordStrong) {
      alert('Please meet all password requirements before signing up.');
      return;
    }

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const payload = isLogin ? { email, password } : { email, password, fullName };
      const { data } = await API.post(endpoint, payload);
      
      // Auto-login (now works for both login and registration)
      if (data.token) {
        localStorage.setItem('token', data.token);
        onAuth();
      } else if (!isLogin) {
        // Fallback for registration if token missing (unlikely with recent backend fix)
        setIsLogin(true);
        alert('Registration successful! Please log in.');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.response?.data?.message || 'Authentication failed';
      alert(errorMessage);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-[#0a0a0a] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="glass-card w-full max-w-md rounded-3xl p-10 border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-black tracking-tight text-white mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-gray-500 text-sm font-medium">{isLogin ? 'Enter your credentials to access your portal' : 'Join our professional network today'}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm text-gray-400">Full Name</label>
              <input 
                type="text" 
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 p-3 outline-none focus:border-purple-500"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm text-gray-400">Email</label>
            <input 
              type="email" 
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 p-3 outline-none focus:border-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 font-medium">Password</label>
            <div className="relative mt-1 group">
              <input 
                type={showPassword ? 'text' : 'password'} 
                className="w-full rounded-xl border border-white/10 bg-white/5 p-4 pr-12 outline-none transition-all focus:border-purple-500 focus:bg-white/10 focus:ring-2 focus:ring-purple-500/20"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            <AnimatePresence>
              {!isLogin && password.length > 0 && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 space-y-2 overflow-hidden"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-2">
                    <ShieldCheck size={14} className="text-purple-400" />
                    Security Score
                  </p>
                  {passwordRequirements.map((req, i) => {
                    const isValid = req.test(password);
                    return (
                      <motion.div 
                        key={i}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className={`flex h-5 w-5 items-center justify-center rounded-full transition-colors ${isValid ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-gray-600'}`}>
                          {isValid ? <Check size={12} strokeWidth={3} /> : <X size={12} strokeWidth={3} />}
                        </div>
                        <span className={`text-sm transition-colors ${isValid ? 'text-gray-200' : 'text-gray-500'}`}>
                          {req.label}
                        </span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button 
            type="submit"
            disabled={!isLogin && !isPasswordStrong}
            className={`w-full rounded-xl p-4 font-bold tracking-tight transition-all duration-300 ${(!isLogin && !isPasswordStrong) ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-900/40 hover:scale-[1.02] hover:shadow-purple-900/60 active:scale-[0.98]'}`}
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-purple-400 hover:underline">
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
