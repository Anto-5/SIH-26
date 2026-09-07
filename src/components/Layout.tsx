import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { 
  ShieldAlert, 
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
    <div className="h-screen bg-brand-bg text-gray-100 flex font-sans overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-brand-surface border-r border-brand-border flex flex-col transition-transform duration-300 md:relative md:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-brand-border shrink-0">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-brand-saffron" />
            <div>
              <div className="font-bold text-white leading-tight">PRAMANYA</div>
              <div className="text-[10px] font-semibold text-brand-saffron uppercase tracking-wider">Cyber Risk Intelligence</div>
            </div>
          </div>
          <button 
            className="md:hidden text-gray-400 hover:text-white"
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
                    ? 'bg-brand-elevated text-brand-saffron border border-brand-border' 
                    : 'text-gray-400 hover:text-white hover:bg-brand-elevated'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
        
        <div className="p-4 border-t border-brand-border shrink-0">
          <div className="bg-brand-elevated rounded-lg p-3 border border-brand-border">
            <div className="text-xs text-gray-500 mb-1">{TEAM_INFO.teamName}</div>
            <div className="text-sm font-bold text-white">{TEAM_INFO.teamId}</div>
            <div className="text-xs text-brand-saffron mt-2">Pramanya Industries</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 bg-brand-surface border-b border-brand-border flex items-center justify-between px-4 md:px-6 shrink-0">
          <div className="flex items-center gap-3 md:gap-6">
            <button 
              className="md:hidden text-gray-400 hover:text-white p-1"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden md:flex flex-col">
              <span className="text-xs text-gray-500">Assessment Period</span>
              <span className="text-sm font-medium text-white">Q3 2026</span>
            </div>
            <div className="hidden md:block h-8 w-px bg-brand-border"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></div>
              <span className="text-xs md:text-sm text-gray-300">Live Simulation</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <button className="text-gray-400 hover:text-white p-2 hidden sm:block">
              <Bell className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-white p-2 hidden sm:block">
              <Settings className="w-5 h-5" />
            </button>
            <div className="h-8 w-8 rounded-full bg-brand-elevated border border-brand-border flex items-center justify-center sm:ml-2">
              <User className="w-4 h-4 text-gray-300" />
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8 bg-brand-bg">
          <Outlet />
        </div>
        
      </main>
      
    </div>
  );
};
