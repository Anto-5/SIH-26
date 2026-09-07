import React, { useState } from 'react';
import { controls, riskFactors } from '../data/mockData';
import { ShieldCheck, Network, Zap } from 'lucide-react';

export default function SecurityControls() {
  const [selectedControl, setSelectedControl] = useState(controls[0]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <style>{`
        @keyframes softFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes softScaleIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-soft-fade {
          animation: softFadeIn 400ms ease-out forwards;
          opacity: 0;
        }
        .animate-soft-scale {
          animation: softScaleIn 500ms ease-out forwards;
          opacity: 0;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-soft-fade, .animate-soft-scale, .animate-fade-in-up {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
        <h1 className="text-2xl md:text-3xl font-bold text-light-text-primary mb-1 tracking-tight">Security Controls</h1>
        <p className="text-sm font-medium text-light-text-secondary uppercase tracking-widest">Evaluate controls by cost, effectiveness and risk reduction.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
          {controls.map((control, idx) => {
            const isSelected = selectedControl.id === control.id;
            const isHigh = control.riskReduction === 'Very High' || control.riskReduction === 'High';
            
            return (
              <button
                key={control.id}
                onClick={() => setSelectedControl(control)}
                className={`w-full text-left p-5 rounded-lg border transition-all duration-300 animate-fade-in-up ${
                  isSelected 
                    ? 'bg-control-bg border-control-accent shadow-sm ring-1 ring-control-accent/20' 
                    : 'bg-light-surface border-light-border hover:border-control-accent/40'
                }`}
                style={{ animationDelay: `${50 * idx + 100}ms`, animationFillMode: 'both' }}
              >
                <div className={`font-bold ${isSelected ? 'text-control-accent' : 'text-light-text-primary'}`}>{control.name}</div>
                <div className="flex justify-between items-center mt-3 text-sm">
                  <span className="font-semibold text-light-text-secondary">Cost: ₹{control.cost} Cr</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest ${
                    isHigh ? 'text-light-surface bg-control-accent' : 'text-light-saffron bg-yellow-50 border border-yellow-200'
                  }`}>
                    {control.riskReduction}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-2 animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
          {selectedControl && (
            <div key={selectedControl.id} className="bg-light-surface border border-light-border rounded-lg p-6 lg:p-8 shadow-sm animate-soft-fade">
              <div className="flex items-start gap-4 mb-8">
                <div className="p-3 rounded-lg bg-control-bg border border-control-border">
                  <ShieldCheck className="w-8 h-8 text-control-accent animate-soft-scale" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-light-text-primary">{selectedControl.name}</h2>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[11px] font-bold text-light-text-secondary uppercase tracking-widest">Portfolio Status:</span>
                    <span className="text-xs font-bold text-control-accent flex items-center gap-1.5 px-2 py-0.5 bg-green-50 rounded-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-control-accent"></div> SELECTED
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="p-4 bg-light-secondary rounded-lg border border-light-border animate-soft-fade" style={{ animationDelay: '100ms' }}>
                  <div className="text-[11px] font-bold text-light-text-secondary mb-1 uppercase tracking-widest">Implementation Cost</div>
                  <div className="text-xl font-bold text-light-text-primary">₹{selectedControl.cost} Cr</div>
                </div>
                <div className="p-4 bg-light-secondary rounded-lg border border-light-border animate-soft-fade" style={{ animationDelay: '200ms' }}>
                  <div className="text-[11px] font-bold text-light-text-secondary mb-1 uppercase tracking-widest">Effectiveness</div>
                  <div className="text-xl font-bold text-control-accent">{selectedControl.effectiveness}%</div>
                </div>
                <div className="p-4 bg-control-bg rounded-lg border border-control-border md:col-span-2 animate-soft-fade" style={{ animationDelay: '300ms' }}>
                  <div className="text-[11px] font-bold text-light-text-secondary mb-1 uppercase tracking-widest">Risk Reduction</div>
                  <div className="text-xl font-bold text-control-accent">{selectedControl.riskReduction}</div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="animate-soft-fade" style={{ animationDelay: '400ms' }}>
                  <h3 className="text-sm font-bold text-light-text-primary uppercase tracking-widest mb-4 border-b border-light-border pb-2">Mitigated Risk Factors</h3>
                  <div className="space-y-3">
                    {selectedControl.mitigatedRisks.map((riskId, idx) => {
                      const risk = riskFactors.find(r => r.id === riskId);
                      return risk ? (
                        <div key={risk.id} className="flex justify-between items-center bg-light-secondary p-4 rounded border border-light-border animate-soft-fade" style={{ animationDelay: `${450 + (idx * 50)}ms` }}>
                          <span className="font-bold text-light-text-primary">{risk.name}</span>
                          <span className="text-sm font-semibold text-light-text-secondary">Exposure: ₹{risk.exposure} Cr</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>

                {selectedControl.interactions && selectedControl.interactions.length > 0 && (
                  <div className="animate-soft-fade" style={{ animationDelay: '600ms' }}>
                    <h3 className="text-sm font-bold text-light-text-primary uppercase tracking-widest mb-4 border-b border-light-border pb-2 flex items-center gap-2">
                      <Network className="w-4 h-4 text-control-accent" /> Interaction Effects
                    </h3>
                    <div className="space-y-3">
                      {selectedControl.interactions.map(interactionId => {
                        const interactingControl = controls.find(c => c.id === interactionId);
                        return interactingControl ? (
                          <div key={interactingControl.id} className="flex items-start gap-3 bg-control-bg p-4 rounded border border-control-border animate-soft-fade" style={{ animationDelay: '650ms' }}>
                            <Zap className="w-5 h-5 text-control-accent mt-0.5 shrink-0 animate-soft-scale" style={{ animationDelay: '700ms' }} />
                            <div>
                              <div className="font-bold text-light-text-primary">Positive interaction with {interactingControl.name}</div>
                              <p className="text-sm text-light-text-body mt-1">Combined deployment yields greater risk reduction than the sum of their independent effects.</p>
                            </div>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
