import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TEAM_INFO } from '../data/team';
import { Activity, BarChart3, Database } from 'lucide-react';
import pramanyaLogo from '../assets/pramanya-scales.png';

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
    <div className="min-h-screen bg-light-surface text-light-text-primary flex flex-col md:flex-row font-sans">
      
      {/* Left Panel */}
      <div className="md:w-1/2 p-6 md:p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden bg-light-bg border-b md:border-b-0 md:border-r border-light-border">
        
        {/* Subtle analytical visual element */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-50 350 C 100 300, 200 380, 450 250" stroke="var(--color-light-saffron)" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
            <path d="M-50 300 C 150 200, 250 350, 450 150" stroke="var(--color-light-slate)" strokeWidth="1" opacity="0.3" />
            <path d="M-50 380 C 150 250, 250 400, 450 200" stroke="var(--color-light-green)" strokeWidth="1.5" opacity="0.5" />
            
            {/* Nodes */}
            <circle cx="120" cy="225" r="2.5" fill="var(--color-light-slate)" opacity="0.5" />
            <circle cx="280" cy="270" r="2.5" fill="var(--color-light-slate)" opacity="0.5" />
            
            <circle cx="170" cy="305" r="3" fill="var(--color-light-green)" opacity="0.7" />
            <circle cx="330" cy="285" r="3" fill="var(--color-light-green)" opacity="0.7" />
            
            <circle cx="140" cy="318" r="2" fill="var(--color-light-saffron)" opacity="0.8" />
            <circle cx="300" cy="310" r="2" fill="var(--color-light-saffron)" opacity="0.8" />
            
            {/* Grid lines */}
            <line x1="50" y1="0" x2="50" y2="400" stroke="var(--color-light-slate)" strokeOpacity="0.08" strokeWidth="1" />
            <line x1="150" y1="0" x2="150" y2="400" stroke="var(--color-light-slate)" strokeOpacity="0.08" strokeWidth="1" />
            <line x1="250" y1="0" x2="250" y2="400" stroke="var(--color-light-slate)" strokeOpacity="0.08" strokeWidth="1" />
            <line x1="350" y1="0" x2="350" y2="400" stroke="var(--color-light-slate)" strokeOpacity="0.08" strokeWidth="1" />
            
            <line x1="0" y1="100" x2="400" y2="100" stroke="var(--color-light-slate)" strokeOpacity="0.08" strokeWidth="1" />
            <line x1="0" y1="200" x2="400" y2="200" stroke="var(--color-light-slate)" strokeOpacity="0.08" strokeWidth="1" />
            <line x1="0" y1="300" x2="400" y2="300" stroke="var(--color-light-slate)" strokeOpacity="0.08" strokeWidth="1" />
          </svg>
        </div>
        
        <div className="relative z-10 max-w-lg mx-auto md:mx-0">
          <div className="flex items-center gap-4 mb-10 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
            <div className="flex items-center justify-center h-16 w-16 md:h-20 md:w-20 shrink-0">
              <img 
                src={pramanyaLogo} 
                alt="Pramanya Logo" 
                className="w-full h-full object-contain scale-[1.3]" 
              />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-light-text-primary">PRAMANYA</h1>
              <p className="text-xs md:text-sm font-bold text-light-text-secondary tracking-widest uppercase">Cyber Risk Intelligence</p>
            </div>
          </div>
          
          <div className="mb-10 md:mb-12 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-light-text-primary">
              Quantify exposure.<br />
              <span className="text-light-text-secondary">Optimize security investment.</span><br />
              <span className="text-light-slate">Reduce expected loss.</span>
            </h2>
          </div>
          
          <div className="space-y-6 md:space-y-8">
            <div className="flex items-start gap-4 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              <div className="mt-1 p-2 rounded-md bg-light-surface border border-light-border shadow-sm">
                <Activity className="w-4 h-4 md:w-5 md:h-5 text-light-slate" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-light-text-primary">Quantitative cyber-risk modeling</h3>
                <p className="text-light-text-body text-sm mt-1 leading-relaxed">Simulate exposure scenarios using Monte Carlo distributions rather than static heatmaps.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="mt-1 p-2 rounded-md bg-light-surface border border-light-border shadow-sm">
                <Database className="w-4 h-4 md:w-5 md:h-5 text-light-green" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-light-text-primary">Budget-constrained optimization</h3>
                <p className="text-light-text-body text-sm mt-1 leading-relaxed">Determine where the next rupee of cybersecurity budget should be invested.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 animate-fade-in-up" style={{ animationDelay: '250ms' }}>
              <div className="mt-1 p-2 rounded-md bg-light-surface border border-light-border shadow-sm">
                <BarChart3 className="w-4 h-4 md:w-5 md:h-5 text-light-saffron" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-light-text-primary">Explainable security recommendations</h3>
                <p className="text-light-text-body text-sm mt-1 leading-relaxed">Understand the interactions between security controls and why they are recommended.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Panel */}
      <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center bg-light-surface relative">
        <div className="max-w-md w-full mx-auto animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-light-text-primary mb-2">Welcome back</h2>
            <p className="text-light-text-secondary font-medium">Sign in to your risk intelligence workspace.</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[11px] font-bold text-light-text-secondary uppercase tracking-widest mb-2">Work Email</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-light-secondary border border-light-border rounded-lg px-4 py-3 text-light-text-primary focus:outline-none focus:border-light-saffron focus:ring-1 focus:ring-light-saffron focus:bg-light-surface transition-all font-medium"
                placeholder="admin@pramanya.demo"
                required
              />
            </div>
            
            <div>
              <label className="block text-[11px] font-bold text-light-text-secondary uppercase tracking-widest mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-light-secondary border border-light-border rounded-lg px-4 py-3 text-light-text-primary focus:outline-none focus:border-light-saffron focus:ring-1 focus:ring-light-saffron focus:bg-light-surface transition-all font-medium"
                placeholder="••••••••"
                required
              />
            </div>
            
            <button 
              type="submit"
              className="w-full bg-light-text-primary hover:bg-[#1C3555] text-white font-bold py-3.5 px-4 rounded-lg shadow-sm transition-all duration-200 mt-2"
            >
              Sign In
            </button>
            
            <div className="relative my-6 flex items-center">
              <div className="flex-grow border-t border-light-border"></div>
              <span className="flex-shrink-0 mx-4 text-light-text-secondary text-[11px] font-bold uppercase tracking-widest">OR</span>
              <div className="flex-grow border-t border-light-border"></div>
            </div>
            
            <button 
              type="button"
              onClick={handleDemo}
              className="w-full bg-light-saffron hover:bg-[#C98A1B] text-white font-bold py-3.5 px-4 rounded-lg transition-all duration-200 shadow-sm"
            >
              Enter Demo Workspace
            </button>
          </form>
          
          <div className="mt-10 md:mt-12 text-center text-[11px] font-bold uppercase tracking-widest text-light-text-secondary">
            <p className="mb-1.5">Demo Environment — SIH 2026</p>
            <p className="text-light-slate">{TEAM_INFO.teamId} • {TEAM_INFO.teamName}</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};
