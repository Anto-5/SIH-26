import React from 'react';
import { simulationResults } from '../../data/mockData';

export const RiskKpi: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0 bg-light-surface border border-light-border rounded-lg shadow-sm overflow-hidden">
      {/* Expected Loss */}
      <div className="p-5 border-b md:border-b-0 lg:border-r border-light-border flex flex-col justify-between">
        <div className="text-[11px] font-bold text-light-text-secondary mb-2 uppercase tracking-widest">Expected Annual Loss</div>
        <div>
          <div className="text-2xl font-bold text-light-text-primary mb-1">₹{simulationResults.baselineExpectedLoss} Cr</div>
          <div className="text-xs text-light-text-secondary font-medium">Modeled baseline</div>
        </div>
      </div>
      
      {/* 95th Percentile */}
      <div className="p-5 border-b md:border-b-0 lg:border-r border-light-border flex flex-col justify-between">
        <div className="text-[11px] font-bold text-light-text-secondary mb-2 uppercase tracking-widest">95th Percentile Loss</div>
        <div>
          <div className="text-2xl font-bold text-light-saffron mb-1">₹{simulationResults.baseline95thPercentile} Cr</div>
          <div className="text-xs text-light-text-secondary font-medium">Tail-risk threshold</div>
        </div>
      </div>
      
      {/* Risk Exposure */}
      <div className="p-5 border-b lg:border-b-0 lg:border-r border-light-border flex flex-col justify-between">
        <div className="text-[11px] font-bold text-light-text-secondary mb-2 uppercase tracking-widest">Current Risk Exposure</div>
        <div>
          <div className="text-2xl font-bold text-light-crimson tracking-wide mb-1">HIGH</div>
          <div className="text-xs text-light-text-secondary font-medium">Severity assessment</div>
        </div>
      </div>
      
      {/* Security Budget */}
      <div className="p-5 border-b md:border-b-0 lg:border-r border-light-border flex flex-col justify-between">
        <div className="text-[11px] font-bold text-light-text-secondary mb-2 uppercase tracking-widest">Security Budget</div>
        <div>
          <div className="text-2xl font-bold text-light-text-primary mb-1">₹{simulationResults.budget.toFixed(1)} Cr</div>
          <div className="text-xs text-light-text-secondary font-medium">Available allocation</div>
        </div>
      </div>
      
      {/* Risk Reduction */}
      <div className="p-5 bg-light-secondary flex flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-1 bg-light-green"></div>
        <div className="text-[11px] font-bold text-light-text-secondary mb-2 uppercase tracking-widest pl-1">Optimized Risk Reduction</div>
        <div className="pl-1">
          <div className="text-2xl font-bold text-light-green mb-1">{simulationResults.optimizedReduction}%</div>
          <div className="text-xs text-light-text-secondary font-medium">Projected improvement</div>
        </div>
      </div>
    </div>
  );
};
