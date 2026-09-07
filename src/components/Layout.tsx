import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  ShieldCheck, 
  TrendingUp, 
  Network, 
  SlidersHorizontal, 
  BarChart2, 
  Database,
  Bell,
  Settings,
  User,
  Menu,
  X
} from 'lucide-react';
import { TEAM_INFO } from '../data/team';
import pramanyaLogo from '../assets/pramanya-scales.png';

export const Layout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/overview', label: 'Overview', icon: <LayoutDashboard className="w-5 h-5" /> },
    { path: '/risk-factors', label: 'Risk Factors', icon: <AlertTriangle className="w-5 h-5" /> },
    { path: '/security-controls', label: 'Security Controls', icon: <ShieldCheck className="w-5 h-5" /> },
    { path: '/optimizer', label: 'Investment Optimizer', icon: <TrendingUp className="w-5 h-5" /> },
    { path: '/control-interactions', label: 'Control Interactions', icon: <Network className="w-5 h-5" /> },
    { path: '/what-if-analysis', label: 'What-If Analysis', icon: <SlidersHorizontal className="w-5 h-5" /> },
    { path: '/benchmark', label: 'Benchmark', icon: <BarChart2 className="w-5 h-5" /> },
    { path: '/data-assumptions', label: 'Data & Assumptions', icon: <Database className="w-5 h-5" /> },
  ];

  return (
    <div className="h-screen bg-light-bg text-light-text-primary flex font-sans overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-light-text-primary/20 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-light-surface border-r border-light-border flex flex-col transition-transform duration-300 md:relative md:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-light-border shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 shrink-0">
              <img 
                src={pramanyaLogo} 
                alt="Pramanya Logo" 
                className="w-full h-full object-contain scale-[1.3]" 
              />
            </div>
            <div>
              <div className="font-bold text-light-text-primary leading-tight">PRAMANYA</div>
              <div className="text-[10px] font-bold text-light-text-secondary uppercase tracking-widest">Cyber Risk</div>
            </div>
          </div>
          <button 
            className="md:hidden text-light-text-secondary hover:text-light-text-primary"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-light-saffron/10 text-light-saffron' 
                    : 'text-light-text-secondary hover:bg-light-secondary hover:text-light-text-primary'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
        
        <div className="p-4 border-t border-light-border shrink-0">
          <div className="bg-light-secondary rounded-lg p-3">
            <div className="text-xs text-light-text-secondary mb-1">{TEAM_INFO.teamName}</div>
            <div className="text-sm font-bold text-light-text-primary">{TEAM_INFO.teamId}</div>
            <div className="text-xs text-light-saffron font-medium mt-1">Pramanya Industries</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 bg-light-surface border-b border-light-border flex items-center justify-between px-4 md:px-6 shrink-0 z-10">
          <div className="flex items-center gap-3 md:gap-6">
            <button 
              className="md:hidden text-light-text-secondary hover:text-light-text-primary p-1"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden md:flex flex-col">
              <span className="text-xs text-light-text-secondary font-medium uppercase tracking-wider">Assessment Period</span>
              <span className="text-sm font-semibold text-light-text-primary">Q3 2026</span>
            </div>
            <div className="hidden md:block h-6 w-px bg-light-border"></div>
            <div className="flex items-center gap-2 bg-light-secondary px-3 py-1.5 rounded-md border border-light-border">
              <div className="w-2 h-2 rounded-full bg-light-green animate-pulse"></div>
              <span className="text-xs font-semibold text-light-text-primary">Live Simulation</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <button className="text-light-text-secondary hover:text-light-text-primary p-2 hidden sm:block">
              <Bell className="w-5 h-5" />
            </button>
            <button className="text-light-text-secondary hover:text-light-text-primary p-2 hidden sm:block">
              <Settings className="w-5 h-5" />
            </button>
            <div className="h-8 w-8 rounded-full bg-light-secondary border border-light-border flex items-center justify-center sm:ml-2">
              <User className="w-4 h-4 text-light-text-secondary" />
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8 bg-light-bg">
          <Outlet />
        </div>
        
      </main>
      
    </div>
  );
};
