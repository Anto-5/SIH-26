import React, { useState, useEffect, useRef } from 'react';
import { controls, simulationResults } from '../data/mockData';
import { SlidersHorizontal, Calculator, TrendingDown, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function useAnimatedValue(targetValue: number, duration: number = 400) {
  const [value, setValue] = useState(targetValue);
  const startValueRef = useRef(targetValue);
  const startTimeRef = useRef<number | null>(null);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setValue(targetValue);
      return;
    }

    startValueRef.current = value;
    startTimeRef.current = null;

    const animate = (time: number) => {
      if (startTimeRef.current === null) startTimeRef.current = time;
      const elapsed = time - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOutCubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      setValue(startValueRef.current + (targetValue - startValueRef.current) * easeProgress);
      
      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current !== null) cancelAnimationFrame(requestRef.current);
    };
  }, [targetValue, duration]);

  return value;
}

export default function WhatIfAnalysis() {
  const navigate = useNavigate();
  const [budget, setBudget] = useState(5.0);
  const [selectedControls, setSelectedControls] = useState<string[]>(['sc-1', 'sc-2', 'sc-3']);
  
  const [isCalculating, setIsCalculating] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  // Sync real-time cost calculation
  const currentCost = selectedControls.reduce((sum, id) => {
    const c = controls.find(ctrl => ctrl.id === id);
    return sum + (c ? c.cost : 0);
  }, 0);

  const [targetResults, setTargetResults] = useState({
    expectedLoss: 10.0,
    reduction: 45.5,
  });

  // Debounced model calculation
  useEffect(() => {
    setIsCalculating(true);
    
    const timer = setTimeout(() => {
      let reductionMultiplier = 1.0;
      
      selectedControls.forEach(id => {
        const c = controls.find(ctrl => ctrl.id === id);
        if (c) {
          reductionMultiplier *= (1 - (c.effectiveness / 100) * 0.2); // Simplified reduction logic
        }
      });

      // Interaction logic
      if (selectedControls.includes('sc-1') && selectedControls.includes('sc-5')) {
        reductionMultiplier *= 0.92; // 8% bonus
      }
      if (selectedControls.includes('sc-2') && selectedControls.includes('sc-3')) {
        reductionMultiplier *= 0.90; // 10% bonus
      }

      const newExpectedLoss = simulationResults.baselineExpectedLoss * reductionMultiplier;
      const reductionPercent = ((simulationResults.baselineExpectedLoss - newExpectedLoss) / simulationResults.baselineExpectedLoss) * 100;

      setTargetResults({
        expectedLoss: newExpectedLoss,
        reduction: reductionPercent,
      });
      setIsCalculating(false);
    }, 350); // 350ms perceived calculation time

    return () => clearTimeout(timer);
  }, [selectedControls, budget]); // Included budget to fake "recalculation" feeling when slider moves, even though math doesn't change loss

  // Animated derivations
  const animExpectedLoss = useAnimatedValue(targetResults.expectedLoss, 400);
  const animReduction = useAnimatedValue(targetResults.reduction, 400);
  const animUtilization = useAnimatedValue(budget > 0 ? (currentCost / budget) * 100 : 0, 300);
  const animCurrentCost = useAnimatedValue(currentCost, 300);

  const toggleControl = (id: string) => {
    setSelectedControls(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleApply = () => {
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      navigate('/security-controls');
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-light-text-primary mb-1 tracking-tight">What-If Analysis</h1>
        <p className="text-sm font-medium text-light-text-secondary uppercase tracking-widest">Test how changes in budget and controls affect cyber-risk exposure.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Controls Panel */}
        <div className="lg:col-span-1 bg-scen-bg border border-scen-border rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6 border-b border-scen-border/50 pb-4">
            <SlidersHorizontal className="w-5 h-5 text-scen-accent" />
            <h2 className="text-lg font-bold text-light-text-primary">Scenario Parameters</h2>
          </div>
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-[11px] font-bold text-light-text-secondary uppercase tracking-widest">Hypothetical Budget</label>
              <span className="text-scen-accent font-bold px-2 py-0.5 bg-light-surface rounded border border-scen-border/50">₹{budget.toFixed(1)} Cr</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="10" 
              step="0.5" 
              value={budget} 
              onChange={(e) => setBudget(parseFloat(e.target.value))}
              className="w-full h-2 bg-light-surface rounded-lg appearance-none cursor-pointer border border-scen-border/50"
              style={{ accentColor: 'var(--color-scen-accent)' }}
            />
            <div className="flex justify-between text-xs font-semibold text-light-text-secondary mt-2">
              <span>₹1 Cr</span>
              <span>₹10 Cr</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4 border-t border-scen-border/50 pt-4">
              <label className="text-[11px] font-bold text-light-text-secondary uppercase tracking-widest">Active Controls</label>
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded transition-colors duration-300 ${currentCost > budget ? 'bg-red-50 text-light-crimson border border-red-100' : 'bg-light-surface text-scen-accent border border-scen-border/50'}`}>
                Cost: ₹{animCurrentCost.toFixed(1)} / ₹{budget.toFixed(1)}
              </span>
            </div>
            
            <div className="space-y-3">
              {controls.map(control => (
                <label key={control.id} className={`flex items-center justify-between p-3.5 rounded border cursor-pointer transition-all duration-300 shadow-sm ${
                  selectedControls.includes(control.id) 
                    ? 'bg-light-surface border-scen-accent ring-1 ring-scen-accent/20' 
                    : 'bg-light-surface border-light-border hover:border-scen-accent/40 opacity-70 hover:opacity-100'
                }`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      checked={selectedControls.includes(control.id)}
                      onChange={() => toggleControl(control.id)}
                      className="w-4 h-4 rounded border-light-border text-scen-accent focus:ring-scen-accent transition-transform duration-300"
                    />
                    <span className={`text-sm font-bold transition-colors duration-300 ${selectedControls.includes(control.id) ? 'text-scen-accent' : 'text-light-text-primary'}`}>{control.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-light-text-secondary">₹{control.cost} Cr</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-light-surface border border-light-border rounded-lg p-6 lg:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <Calculator className="w-6 h-6 text-scen-accent" />
              <h2 className="text-xl font-bold text-light-text-primary flex items-center gap-4">
                Scenario Projection
                {isCalculating && (
                  <span className="text-[10px] font-bold text-scen-accent uppercase tracking-widest flex items-center gap-1.5 bg-scen-accent/10 px-2 py-0.5 rounded border border-scen-accent/20 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-scen-accent animate-ping"></span>
                    Recalculating...
                  </span>
                )}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="p-5 bg-light-bg rounded border border-light-border">
                <div className="text-[11px] font-bold text-light-text-secondary mb-2 uppercase tracking-widest">Baseline Expected Loss</div>
                <div className="text-3xl font-bold text-light-text-primary">₹{simulationResults.baselineExpectedLoss.toFixed(1)} Cr</div>
              </div>
              <div className="p-5 bg-scen-bg rounded border border-scen-border/50 transition-colors duration-300 relative overflow-hidden">
                {isCalculating && <div className="absolute inset-0 bg-white/20 animate-pulse pointer-events-none"></div>}
                <div className="text-[11px] font-bold text-scen-accent mb-2 uppercase tracking-widest">Scenario Expected Loss</div>
                <div className="flex items-end gap-3">
                  <div className={`text-4xl font-bold text-scen-accent transition-opacity duration-300 ${isCalculating ? 'opacity-50' : 'opacity-100'}`}>
                    ₹{animExpectedLoss.toFixed(1)} Cr
                  </div>
                  {targetResults.reduction > 0 && (
                    <div className={`flex items-center text-light-green text-sm font-bold mb-1.5 bg-green-50 px-2 py-0.5 rounded border border-light-green/20 transition-opacity duration-300 ${isCalculating ? 'opacity-50' : 'opacity-100'}`}>
                      <TrendingDown className="w-4 h-4 mr-1" /> {animReduction.toFixed(1)}%
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={`rounded-lg p-5 transition-all duration-500 flex flex-col md:flex-row md:items-center justify-between border shadow-sm ${currentCost > budget ? 'bg-red-50 border-light-crimson/30' : 'bg-green-50 border-light-green/30'}`}>
              {currentCost > budget ? (
                <div className="flex items-start gap-4 animate-fade-in-up" style={{ animationDuration: '300ms' }}>
                  <div className="text-light-crimson font-black text-xl mt-0.5">!</div>
                  <div>
                    <div className="text-light-crimson font-bold text-sm uppercase tracking-widest">Budget Exceeded</div>
                    <div className="text-light-crimson/80 font-medium text-sm mt-1">
                      This scenario requires <span className="font-bold">₹{Math.max(0, currentCost - budget).toFixed(1)} Cr</span> more than the allocated budget.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between animate-fade-in-up gap-4" style={{ animationDuration: '300ms' }}>
                  <div>
                    <div className="text-light-green font-bold text-[11px] uppercase tracking-widest">Valid Scenario</div>
                    <div className="text-light-green/80 font-semibold text-sm mt-1">
                      Budget utilization: {animUtilization.toFixed(1)}%
                    </div>
                  </div>
                  <button 
                    onClick={handleApply}
                    disabled={isApplying}
                    className="relative overflow-hidden text-sm font-bold bg-light-green text-white px-5 py-2.5 rounded shadow-sm hover:bg-green-700 transition-colors uppercase tracking-wider w-full sm:w-auto min-w-[170px]"
                  >
                    <span className={`transition-opacity duration-300 ${isApplying ? 'opacity-0' : 'opacity-100'}`}>Apply Portfolio</span>
                    {isApplying && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      </div>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-scen-bg border border-scen-border rounded-lg p-6 flex items-center justify-between shadow-sm">
            <div>
              <h3 className="text-light-text-primary font-bold mb-1">Want to find the optimal allocation automatically?</h3>
              <p className="text-sm text-light-text-body font-medium">Our solver can maximize risk reduction for any given budget.</p>
            </div>
            <button onClick={() => navigate('/optimizer')} className="flex items-center gap-2 text-sm font-bold text-light-saffron hover:text-yellow-600 bg-light-surface px-4 py-2 rounded shadow-sm border border-scen-border/50">
              USE OPTIMIZER <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}
