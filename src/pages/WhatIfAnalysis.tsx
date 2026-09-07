import React, { useState, useEffect } from 'react';
import { controls, simulationResults } from '../data/mockData';
import { SlidersHorizontal, Calculator, TrendingDown, ArrowRight } from 'lucide-react';

export default function WhatIfAnalysis() {
  const [budget, setBudget] = useState(5.0);
  const [selectedControls, setSelectedControls] = useState<string[]>(['sc-1', 'sc-2', 'sc-3']);
  
  const [scenarioResults, setScenarioResults] = useState({
    expectedLoss: 18.4,
    reduction: 0,
    cost: 0
  });

  // Simple deterministic simulation recalculation
  useEffect(() => {
    let totalCost = 0;
    let reductionMultiplier = 1.0;
    
    selectedControls.forEach(id => {
      const c = controls.find(ctrl => ctrl.id === id);
      if (c) {
        totalCost += c.cost;
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

    setScenarioResults({
      expectedLoss: Number(newExpectedLoss.toFixed(1)),
      reduction: Number(reductionPercent.toFixed(1)),
      cost: Number(totalCost.toFixed(1))
    });
  }, [selectedControls, budget]);

  const toggleControl = (id: string) => {
    setSelectedControls(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">What-If Analysis</h1>
        <p className="text-gray-400">Test how changes in budget and controls affect cyber-risk exposure.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Controls Panel */}
        <div className="lg:col-span-1 bg-brand-surface border border-brand-border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-6 border-b border-brand-border pb-4">
            <SlidersHorizontal className="w-5 h-5 text-brand-saffron" />
            <h2 className="text-lg font-semibold text-white">Scenario Parameters</h2>
          </div>
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-300">Hypothetical Budget</label>
              <span className="text-brand-saffron font-bold">₹{budget.toFixed(1)} Cr</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="10" 
              step="0.5" 
              value={budget} 
              onChange={(e) => setBudget(parseFloat(e.target.value))}
              className="w-full h-2 bg-brand-elevated rounded-lg appearance-none cursor-pointer accent-brand-saffron"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>₹1 Cr</span>
              <span>₹10 Cr</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-medium text-gray-300">Active Controls</label>
              <span className={`text-xs font-bold ${scenarioResults.cost > budget ? 'text-brand-crimson' : 'text-gray-400'}`}>
                Cost: ₹{scenarioResults.cost.toFixed(1)} / ₹{budget.toFixed(1)}
              </span>
            </div>
            
            <div className="space-y-2">
              {controls.map(control => (
                <label key={control.id} className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedControls.includes(control.id) 
                    ? 'bg-brand-elevated border-brand-saffron' 
                    : 'bg-brand-bg border-brand-border hover:border-gray-500'
                }`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      checked={selectedControls.includes(control.id)}
                      onChange={() => toggleControl(control.id)}
                      className="w-4 h-4 rounded border-gray-300 text-brand-saffron focus:ring-brand-saffron bg-transparent"
                    />
                    <span className="text-sm font-medium text-gray-200">{control.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">₹{control.cost} Cr</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-brand-surface border border-brand-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <Calculator className="w-5 h-5 text-brand-green" />
              <h2 className="text-lg font-semibold text-white">Scenario Projection</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <div className="text-sm text-gray-400 mb-2">Baseline Expected Loss</div>
                <div className="text-3xl font-medium text-white">₹{simulationResults.baselineExpectedLoss} Cr</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-2">Scenario Expected Loss</div>
                <div className="flex items-end gap-3">
                  <div className="text-4xl font-bold text-brand-green">₹{scenarioResults.expectedLoss} Cr</div>
                  {scenarioResults.reduction > 0 && (
                    <div className="flex items-center text-brand-green text-sm font-medium mb-1 bg-brand-green/10 px-2 py-1 rounded">
                      <TrendingDown className="w-4 h-4 mr-1" /> {scenarioResults.reduction}%
                    </div>
                  )}
                </div>
              </div>
            </div>

            {scenarioResults.cost > budget && (
              <div className="bg-brand-crimson/10 border border-brand-crimson/30 rounded-lg p-4 flex items-start gap-3">
                <div className="text-brand-crimson font-bold mt-0.5">!</div>
                <div>
                  <div className="text-brand-crimson font-medium text-sm">Budget Exceeded</div>
                  <div className="text-gray-300 text-sm mt-1">This scenario requires ₹{(scenarioResults.cost - budget).toFixed(1)} Cr more than the allocated budget.</div>
                </div>
              </div>
            )}
            
            {scenarioResults.cost <= budget && (
              <div className="bg-brand-green/10 border border-brand-green/30 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div className="text-brand-green font-medium text-sm">Valid Scenario</div>
                  <div className="text-gray-300 text-sm mt-1">Budget utilization: {((scenarioResults.cost / budget) * 100).toFixed(1)}%</div>
                </div>
                <button className="text-sm font-medium bg-brand-green text-white px-4 py-2 rounded shadow hover:bg-green-600 transition-colors">
                  Apply Portfolio
                </button>
              </div>
            )}
          </div>
          
          <div className="bg-brand-elevated border border-brand-border rounded-lg p-6 flex items-center justify-between">
            <div>
              <h3 className="text-white font-medium mb-1">Want to find the optimal allocation automatically?</h3>
              <p className="text-sm text-gray-400">Our solver can maximize risk reduction for any given budget.</p>
            </div>
            <a href="/investment-optimizer" className="flex items-center gap-2 text-sm font-bold text-brand-saffron hover:text-yellow-500">
              USE OPTIMIZER <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
        
      </div>
    </div>
  );
}
