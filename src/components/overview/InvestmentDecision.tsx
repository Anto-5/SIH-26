import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { simulationResults } from '../../data/mockData';

export const InvestmentDecision: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-brand-surface border border-brand-border rounded-lg shadow-sm overflow-hidden flex flex-col">
      <div className="px-6 py-5 border-b border-brand-border bg-brand-elevated/50">
        <h2 className="text-xl font-bold text-white tracking-tight">Investment Decision</h2>
      </div>
      
      <div className="flex flex-col lg:flex-row p-6 lg:p-8 gap-8 items-center justify-between">
        
        {/* Current State */}
        <div className="flex-1 text-center lg:text-left w-full lg:w-auto">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Current State</div>
          <div className="bg-brand-bg border border-brand-border rounded-lg p-5 inline-block w-full max-w-xs mx-auto lg:mx-0 shadow-inner">
            <div className="text-sm text-gray-400 mb-1">Expected Loss</div>
            <div className="text-3xl font-bold text-white">₹{simulationResults.baselineExpectedLoss} Cr</div>
          </div>
        </div>

        {/* Arrow & Budget */}
        <div className="flex flex-col items-center justify-center relative px-4 w-full lg:w-auto shrink-0">
          <div className="hidden lg:block w-full h-px bg-brand-border absolute top-1/2 left-0 -z-10"></div>
          
          <div className="flex flex-col items-center justify-center mb-4 lg:mb-0 lg:absolute lg:top-[-60px] lg:left-1/2 lg:-translate-x-1/2">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Available Security Budget</div>
            <div className="bg-brand-elevated border border-brand-border px-4 py-2 rounded-full text-brand-saffron font-bold shadow-sm whitespace-nowrap">
              ₹{simulationResults.budget.toFixed(1)} Cr
            </div>
          </div>
          
          <div className="bg-brand-surface p-2 rounded-full border border-brand-border text-gray-500 z-10 hidden lg:flex">
            <ArrowRight className="w-5 h-5" />
          </div>
          <div className="bg-brand-surface p-2 rounded-full border border-brand-border text-gray-500 z-10 flex lg:hidden my-2">
            <ArrowDown className="w-5 h-5" />
          </div>
        </div>

        {/* Optimized State */}
        <div className="flex-1 text-center lg:text-right w-full lg:w-auto">
          <div className="text-xs font-semibold text-brand-green uppercase tracking-widest mb-4">Pramanya Recommendation</div>
          <div className="bg-[#0f241d] border border-brand-green/30 rounded-lg p-5 inline-block w-full max-w-xs mx-auto lg:mx-0 lg:ml-auto shadow-inner">
            <div className="text-sm text-brand-green/80 mb-1">Expected Loss After Optimization</div>
            <div className="text-3xl font-bold text-brand-green flex items-center justify-center lg:justify-end gap-3">
              ₹{simulationResults.optimizedExpectedLoss} Cr
            </div>
          </div>
        </div>
        
        {/* Reduction & CTA */}
        <div className="flex-1 flex flex-col items-center lg:items-end w-full lg:w-auto pl-0 lg:pl-6 border-t lg:border-t-0 lg:border-l border-brand-border pt-6 lg:pt-0 mt-2 lg:mt-0">
          <div className="text-center lg:text-right mb-6">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Risk Reduction</div>
            <div className="text-4xl font-black text-brand-green">{simulationResults.optimizedReduction}%</div>
          </div>
          <button 
            onClick={() => navigate('/optimizer')}
            className="w-full sm:w-auto group flex items-center justify-center gap-2 bg-brand-saffron hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-[0_0_15px_rgba(230,162,60,0.15)] hover:shadow-[0_0_20px_rgba(230,162,60,0.3)] whitespace-nowrap"
          >
            VIEW OPTIMIZED PORTFOLIO
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
      </div>
    </div>
  );
};
