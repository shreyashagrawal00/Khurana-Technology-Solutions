import { useState, useEffect } from 'react';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsAuthenticated(true);
  }, []);

  if (!isAuthenticated) {
    return <AuthForm onAuth={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen">
      <nav className="glass sticky top-0 z-50 px-8 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight text-purple-400">InternTracker AI</h1>
          <button 
            onClick={() => { localStorage.removeItem('token'); setIsAuthenticated(false); }}
            className="text-sm text-gray-400 hover:text-white"
          >
            Logout
          </button>
        </div>
      </nav>
      <main className="mx-auto max-w-7xl p-8">
        <Dashboard />
      </main>
    </div>
  );
}
