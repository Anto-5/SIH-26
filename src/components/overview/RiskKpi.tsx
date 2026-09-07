import React from 'react';
import { TrendingDown } from 'lucide-react';
import { simulationResults } from '../../data/mockData';

export const RiskKpi: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {/* Expected Loss */}
      <div className="bg-brand-surface border border-brand-border rounded-lg p-5 shadow-sm">
        <div className="text-gray-400 text-xs font-semibold mb-1 uppercase tracking-wider">Expected Annual Loss</div>
        <div className="text-2xl font-bold text-white">₹{simulationResults.baselineExpectedLoss} Cr</div>
      </div>
      
      {/* 95th Percentile */}
      <div className="bg-brand-surface border border-brand-border rounded-lg p-5 shadow-sm">
        <div className="text-gray-400 text-xs font-semibold mb-1 uppercase tracking-wider">95th Percentile Loss</div>
        <div className="text-2xl font-bold text-brand-saffron">₹{simulationResults.baseline95thPercentile} Cr</div>
      </div>
      
      {/* Risk Exposure */}
      <div className="bg-brand-surface border border-brand-border rounded-lg p-5 shadow-sm">
        <div className="text-gray-400 text-xs font-semibold mb-1 uppercase tracking-wider">Current Risk Exposure</div>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-2.5 h-2.5 rounded-full bg-brand-crimson animate-pulse"></div>
          <div className="text-xl font-bold text-brand-crimson tracking-wide">HIGH</div>
        </div>
      </div>
      
      {/* Security Budget */}
      <div className="bg-brand-surface border border-brand-border rounded-lg p-5 shadow-sm">
        <div className="text-gray-400 text-xs font-semibold mb-1 uppercase tracking-wider">Security Budget</div>
        <div className="text-2xl font-bold text-white">₹{simulationResults.budget.toFixed(1)} Cr</div>
      </div>
      
      {/* Risk Reduction */}
      <div className="bg-brand-elevated border border-brand-border rounded-lg p-5 shadow-md relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-1 bg-brand-green"></div>
        <div className="text-gray-400 text-xs font-semibold mb-1 uppercase tracking-wider pl-1">Optimized Risk Reduction</div>
        <div className="flex items-center gap-2 pl-1">
          <TrendingDown className="w-5 h-5 text-brand-green" />
          <div className="text-2xl font-bold text-brand-green">{simulationResults.optimizedReduction}%</div>
        </div>
      </div>
    </div>
  );
};
