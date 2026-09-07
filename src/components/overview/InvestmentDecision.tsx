import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { simulationResults } from '../../data/mockData';

export const InvestmentDecision: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-light-surface border border-light-border rounded-lg shadow-sm overflow-hidden flex flex-col">
      <div className="px-6 py-5 lg:px-8 lg:py-6 border-b border-light-border bg-light-secondary/50">
        <h2 className="text-xl font-bold text-light-text-primary">Investment Decision</h2>
      </div>
      
      <div className="flex flex-col lg:flex-row p-6 lg:p-8 gap-8 items-center justify-between">
        
        {/* Current State */}
        <div className="flex-1 text-center lg:text-left w-full lg:w-auto">
          <div className="text-[11px] font-bold text-light-text-secondary uppercase tracking-widest mb-4">Current State</div>
          <div className="bg-light-surface border border-light-border rounded p-6 inline-block w-full max-w-sm mx-auto lg:mx-0 shadow-sm">
            <div className="text-sm font-semibold text-light-text-secondary mb-1">Expected Annual Loss</div>
            <div className="text-3xl font-bold text-light-text-primary">₹{simulationResults.baselineExpectedLoss} Cr</div>
          </div>
        </div>

        {/* Arrow & Budget */}
        <div className="flex flex-col items-center justify-center relative px-4 w-full lg:w-auto shrink-0">
          <div className="hidden lg:block w-full h-px bg-light-border absolute top-1/2 left-0 -z-10"></div>
          
          <div className="flex flex-col items-center justify-center mb-6 lg:mb-0 lg:absolute lg:top-[-45px] lg:left-1/2 lg:-translate-x-1/2">
            <div className="bg-light-surface border border-light-border px-4 py-2 text-center rounded-full shadow-sm whitespace-nowrap">
              <span className="text-sm font-bold text-light-text-primary">₹{simulationResults.budget.toFixed(1)} Cr</span>
              <span className="text-xs font-semibold text-light-text-secondary ml-1.5 uppercase tracking-wider">Security Investment</span>
            </div>
          </div>
          
          <div className="bg-light-surface p-2 rounded-full border border-light-border text-light-text-secondary z-10 hidden lg:flex shadow-sm">
            <ArrowRight className="w-4 h-4" />
          </div>
          <div className="bg-light-surface p-2 rounded-full border border-light-border text-light-text-secondary z-10 flex lg:hidden my-2 shadow-sm">
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>

        {/* Optimized State */}
        <div className="flex-1 text-center lg:text-right w-full lg:w-auto">
          <div className="text-[11px] font-bold text-light-green uppercase tracking-widest mb-4">Pramanya Optimized Outcome</div>
          <div className="bg-green-50 border border-light-green/30 rounded p-6 inline-block w-full max-w-sm mx-auto lg:mx-0 lg:ml-auto shadow-sm">
            <div className="text-sm font-semibold text-light-green mb-1">Expected Annual Loss</div>
            <div className="text-3xl font-bold text-light-green flex items-center justify-center lg:justify-end gap-3">
              ₹{simulationResults.optimizedExpectedLoss} Cr
            </div>
          </div>
        </div>
        
        {/* Reduction & CTA */}
        <div className="flex-1 flex flex-col items-center lg:items-end w-full lg:w-auto pl-0 lg:pl-8 border-t lg:border-t-0 lg:border-l border-light-border pt-8 lg:pt-0 mt-4 lg:mt-0">
          <div className="text-center lg:text-right mb-6">
            <div className="text-4xl font-black text-light-green mb-1">{simulationResults.optimizedReduction}%</div>
            <div className="text-xs font-bold text-light-text-secondary uppercase tracking-widest">Reduction</div>
          </div>
          <button 
            onClick={() => navigate('/optimizer')}
            className="w-full sm:w-auto group flex items-center justify-center gap-2 bg-light-saffron hover:bg-yellow-500 text-white font-bold py-3.5 px-6 rounded transition-colors whitespace-nowrap"
          >
            VIEW OPTIMIZED PORTFOLIO
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
      </div>
    </div>
  );
};
