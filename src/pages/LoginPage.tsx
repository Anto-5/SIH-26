import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TEAM_INFO } from '../data/team';
import { ShieldAlert, Activity, BarChart3, Database } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@pramanya.demo' && password === 'pramanya2026') {
      navigate('/overview');
    } else {
      // In a real app, handle error
      alert('Invalid credentials. Use demo credentials or "Enter Demo Workspace"');
    }
  };

  const handleDemo = () => {
    navigate('/overview');
  };

  return (
    <div className="min-h-screen bg-brand-bg text-gray-100 flex flex-col md:flex-row font-sans">
      
      {/* Left Panel */}
      <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center relative overflow-hidden bg-brand-surface border-r border-brand-border">
        {/* Subtle background abstract shapes */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-saffron blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-green blur-[120px]"></div>
          
          {/* Subtle analytical visual element */}
          <svg className="absolute bottom-0 left-0 w-full h-1/2 opacity-30" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 90 L50 60 L90 75 L130 30 L170 45 L190 20" stroke="var(--color-brand-saffron)" strokeWidth="1" strokeDasharray="3 3" />
            <path d="M10 90 L50 45 L90 65 L130 15 L170 35 L190 10" stroke="var(--color-brand-green)" strokeWidth="1.5" />
            <circle cx="50" cy="45" r="1.5" fill="var(--color-brand-green)" />
            <circle cx="90" cy="65" r="1.5" fill="var(--color-brand-green)" />
            <circle cx="130" cy="15" r="1.5" fill="var(--color-brand-green)" />
            <circle cx="170" cy="35" r="1.5" fill="var(--color-brand-green)" />
            <circle cx="190" cy="10" r="1.5" fill="var(--color-brand-green)" />
            
            <circle cx="50" cy="60" r="1" fill="var(--color-brand-saffron)" />
            <circle cx="90" cy="75" r="1" fill="var(--color-brand-saffron)" />
            <circle cx="130" cy="30" r="1" fill="var(--color-brand-saffron)" />
            <circle cx="170" cy="45" r="1" fill="var(--color-brand-saffron)" />
            
            <line x1="10" y1="10" x2="10" y2="90" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="0.5" />
            <line x1="10" y1="90" x2="190" y2="90" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="0.5" />
          </svg>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-lg bg-brand-elevated flex items-center justify-center border border-brand-border shadow-lg">
              <ShieldAlert className="w-6 h-6 text-brand-saffron" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">PRAMANYA</h1>
              <p className="text-sm font-medium text-brand-saffron tracking-wider uppercase">Cyber Risk Intelligence</p>
            </div>
          </div>
          
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-white">
              Quantify exposure.<br />
              <span className="text-gray-400">Optimize security investment.</span><br />
              <span className="text-gray-500">Reduce expected loss.</span>
            </h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="mt-1 p-2 rounded-md bg-brand-elevated border border-brand-border">
                <Activity className="w-5 h-5 text-brand-saffron" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Quantitative cyber-risk modeling</h3>
                <p className="text-gray-400 text-sm mt-1">Simulate exposure scenarios using Monte Carlo distributions rather than static heatmaps.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="mt-1 p-2 rounded-md bg-brand-elevated border border-brand-border">
                <Database className="w-5 h-5 text-brand-green" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Budget-constrained optimization</h3>
                <p className="text-gray-400 text-sm mt-1">Determine where the next rupee of cybersecurity budget should be invested.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="mt-1 p-2 rounded-md bg-brand-elevated border border-brand-border">
                <BarChart3 className="w-5 h-5 text-brand-amber" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Explainable security recommendations</h3>
                <p className="text-gray-400 text-sm mt-1">Understand the interactions between security controls and why they are recommended.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Panel */}
      <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center bg-brand-bg relative">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome back</h2>
            <p className="text-gray-400">Sign in to your risk intelligence workspace.</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Work Email</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-brand-elevated border border-brand-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-saffron focus:ring-1 focus:ring-brand-saffron transition-colors"
                placeholder="admin@pramanya.demo"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-brand-elevated border border-brand-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-saffron focus:ring-1 focus:ring-brand-saffron transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
            
            <button 
              type="submit"
              className="w-full bg-brand-surface border border-brand-border hover:border-brand-saffron hover:bg-brand-elevated text-white font-medium py-3 px-4 rounded-lg transition-all duration-200"
            >
              Sign In
            </button>
            
            <div className="relative my-6 flex items-center">
              <div className="flex-grow border-t border-brand-border"></div>
              <span className="flex-shrink-0 mx-4 text-gray-500 text-sm">OR</span>
              <div className="flex-grow border-t border-brand-border"></div>
            </div>
            
            <button 
              type="button"
              onClick={handleDemo}
              className="w-full bg-brand-saffron hover:bg-yellow-600 text-gray-900 font-bold py-3 px-4 rounded-lg transition-all duration-200 shadow-[0_0_15px_rgba(230,162,60,0.3)] hover:shadow-[0_0_25px_rgba(230,162,60,0.5)]"
            >
              Enter Demo Workspace
            </button>
          </form>
          
          <div className="mt-8 text-center text-sm text-gray-500">
            <p className="mb-2">Demo Environment — SIH 2026</p>
            <p className="font-medium text-gray-400">{TEAM_INFO.teamId} • {TEAM_INFO.teamName}</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};
