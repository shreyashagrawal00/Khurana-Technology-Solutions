import { useState } from 'react';
import API from '../services/api';
import { motion } from 'framer-motion';

export default function AuthForm({ onAuth }: { onAuth: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const { data } = await API.post(endpoint, { email, password });
      if (isLogin) {
        localStorage.setItem('token', data.token);
        onAuth();
      } else {
        setIsLogin(true);
      }
    } catch (err) {
      alert('Authentication failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card w-full max-w-md rounded-2xl p-8"
      >
        <h2 className="mb-6 text-2xl font-bold">{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400">Email</label>
            <input 
              type="email" 
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 p-3 outline-none focus:border-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400">Password</label>
            <input 
              type="password" 
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 p-3 outline-none focus:border-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full rounded-lg bg-purple-600 p-3 font-semibold transition hover:bg-purple-500">
            {isLogin ? 'Sign In' : 'Sign Up'}
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
