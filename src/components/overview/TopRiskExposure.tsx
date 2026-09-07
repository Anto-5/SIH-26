import React from 'react';
import { riskFactors } from '../../data/mockData';

export const TopRiskExposure: React.FC = () => {
  const topRisks = [...riskFactors].sort((a, b) => b.exposure - a.exposure).slice(0, 3);
  const maxExposure = topRisks[0]?.exposure || 1;

  return (
    <div className="bg-light-surface border border-light-border rounded-lg p-6 lg:p-8 shadow-sm h-full flex flex-col">
      <div className="mb-8 border-b border-light-border pb-4">
        <h2 className="text-xl font-bold text-light-text-primary mb-1">Top Risk Exposure</h2>
        <p className="text-sm font-medium text-light-text-secondary">Expected loss drivers by threat category.</p>
      </div>
      
      <div className="flex-1 flex flex-col justify-center space-y-8">
        {topRisks.map((risk, idx) => {
          const isHigh = risk.severity === 'HIGH';
          
          return (
            <div key={risk.id} className="relative group">
              <div className="flex items-start gap-4 mb-3">
                <div className="text-sm font-bold text-light-text-secondary pt-0.5">
                  0{idx + 1}
                </div>
                <div className="flex-1">
                  <div className="text-base font-bold text-light-text-primary mb-0.5">{risk.name}</div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-light-text-primary">₹{risk.exposure} Cr</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest ${
                      isHigh ? 'text-light-crimson bg-red-50' : 'text-light-saffron bg-yellow-50'
                    }`}>
                      {risk.severity}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="w-full bg-light-secondary h-1.5 ml-8 overflow-hidden">
                <div 
                  className={`h-full ${isHigh ? 'bg-light-crimson' : 'bg-light-saffron'}`} 
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
