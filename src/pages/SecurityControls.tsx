import React, { useState } from 'react';
import { controls, riskFactors } from '../data/mockData';
import { ShieldCheck, Network, Zap } from 'lucide-react';

export default function SecurityControls() {
  const [selectedControl, setSelectedControl] = useState(controls[0]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Security Controls</h1>
        <p className="text-gray-400">Evaluate controls by cost, effectiveness and risk reduction.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-3">
          {controls.map(control => (
            <button
              key={control.id}
              onClick={() => setSelectedControl(control)}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                selectedControl.id === control.id 
                  ? 'bg-brand-elevated border-brand-saffron shadow-[0_0_10px_rgba(230,162,60,0.1)]' 
                  : 'bg-brand-surface border-brand-border hover:border-gray-600'
              }`}
            >
              <div className="font-medium text-white">{control.name}</div>
              <div className="flex justify-between items-center mt-2 text-sm">
                <span className="text-gray-400">Cost: ₹{control.cost} Cr</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  control.riskReduction === 'Very High' ? 'bg-brand-green/20 text-brand-green border border-brand-green/30' :
                  control.riskReduction === 'High' ? 'bg-brand-saffron/20 text-brand-saffron border border-brand-saffron/30' :
                  'bg-brand-amber/20 text-brand-amber border border-brand-amber/30'
                }`}>
                  {control.riskReduction}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-2">
          {selectedControl && (
            <div className="bg-brand-surface border border-brand-border rounded-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-brand-elevated border border-brand-border">
                  <ShieldCheck className="w-8 h-8 text-brand-saffron" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedControl.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Portfolio Status:</span>
                    <span className="text-sm font-bold text-brand-green flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-brand-green"></div> Selected
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="p-4 bg-brand-bg rounded-lg border border-brand-border">
                  <div className="text-xs text-gray-500 mb-1">Implementation Cost</div>
                  <div className="text-xl font-bold text-white">₹{selectedControl.cost} Cr</div>
                </div>
                <div className="p-4 bg-brand-bg rounded-lg border border-brand-border">
                  <div className="text-xs text-gray-500 mb-1">Effectiveness</div>
                  <div className="text-xl font-bold text-white">{selectedControl.effectiveness}%</div>
                </div>
                <div className="p-4 bg-brand-bg rounded-lg border border-brand-border md:col-span-2">
                  <div className="text-xs text-gray-500 mb-1">Risk Reduction</div>
                  <div className="text-xl font-bold text-brand-saffron">{selectedControl.riskReduction}</div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-md font-semibold text-white mb-4 border-b border-brand-border pb-2">Mitigated Risk Factors</h3>
                  <div className="space-y-3">
                    {selectedControl.mitigatedRisks.map(riskId => {
                      const risk = riskFactors.find(r => r.id === riskId);
                      return risk ? (
                        <div key={risk.id} className="flex justify-between items-center bg-brand-elevated p-3 rounded-lg border border-brand-border">
                          <span className="font-medium text-gray-200">{risk.name}</span>
                          <span className="text-sm text-gray-400">Exposure: ₹{risk.exposure} Cr</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>

                {selectedControl.interactions && selectedControl.interactions.length > 0 && (
                  <div>
                    <h3 className="text-md font-semibold text-white mb-4 border-b border-brand-border pb-2 flex items-center gap-2">
                      <Network className="w-4 h-4 text-brand-saffron" /> Interaction Effects
                    </h3>
                    <div className="space-y-3">
                      {selectedControl.interactions.map(interactionId => {
                        const interactingControl = controls.find(c => c.id === interactionId);
                        return interactingControl ? (
                          <div key={interactingControl.id} className="flex items-start gap-3 bg-brand-bg p-4 rounded-lg border border-brand-border">
                            <Zap className="w-5 h-5 text-brand-amber mt-0.5 shrink-0" />
                            <div>
                              <div className="font-medium text-gray-200">Positive interaction with {interactingControl.name}</div>
                              <p className="text-sm text-gray-400 mt-1">Combined deployment yields greater risk reduction than the sum of their independent effects.</p>
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
