import React from 'react';
import { riskFactors } from '../../data/mockData';

export const TopRiskExposure: React.FC = () => {
  // Take top 3 risk factors sorted by exposure
  const topRisks = [...riskFactors].sort((a, b) => b.exposure - a.exposure).slice(0, 3);
  const maxExposure = topRisks[0]?.exposure || 1;

  return (
    <div className="bg-brand-surface border border-brand-border rounded-lg p-5 lg:p-6 shadow-sm h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-white mb-1 uppercase tracking-wide text-sm">Top Risk Exposure</h2>
        <div className="h-0.5 w-12 bg-brand-border mt-2"></div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center space-y-6">
        {topRisks.map((risk, idx) => {
          const isHigh = risk.severity === 'HIGH';
          const isMedium = risk.severity === 'MEDIUM';
          
          return (
            <div key={risk.id} className="relative">
              <div className="flex justify-between items-end mb-2">
                <div className="flex-1 pr-4">
                  <div className="text-[15px] font-semibold text-white truncate" title={risk.name}>{risk.name}</div>
                  <div className="text-xs text-gray-400 mt-1">Expected Loss: <span className="text-gray-200 font-medium">₹{risk.exposure} Cr</span></div>
                </div>
                <div className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shrink-0 ${
                  isHigh ? 'text-brand-crimson bg-brand-crimson/10 border border-brand-crimson/20' : 
                  isMedium ? 'text-brand-saffron bg-brand-saffron/10 border border-brand-saffron/20' : 
                  'text-brand-amber bg-brand-amber/10 border border-brand-amber/20'
                }`}>
                  {risk.severity}
                </div>
              </div>
              
              <div className="w-full bg-brand-bg rounded-sm h-2 overflow-hidden border border-brand-border">
                <div 
                  className={`h-full rounded-sm ${
                    isHigh ? 'bg-brand-crimson' : 
                    isMedium ? 'bg-brand-saffron' : 
                    'bg-brand-amber'
                  }`} 
                  style={{ width: `${(risk.exposure / maxExposure) * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
