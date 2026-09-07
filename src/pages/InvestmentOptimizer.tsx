import React, { useState } from 'react';
import { controls, simulationResults } from '../data/mockData';
import { ShieldCheck, TrendingDown, Info, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';

export default function InvestmentOptimizer() {
  const [budgetUsed] = useState(4.8);
  
  // Sorted controls for portfolio display
  const portfolioControls = [...controls].sort((a, b) => b.cost - a.cost);

  const comparisonData = [
    {
      name: 'Naive Severity-First',
      expectedLoss: simulationResults.naiveSeverityExpectedLoss,
      reduction: simulationResults.naiveReduction,
      color: '#F59E0B' // Amber
    },
    {
      name: 'Optimized Portfolio',
      expectedLoss: simulationResults.optimizedExpectedLoss,
      reduction: simulationResults.optimizedReduction,
      color: '#247A5A' // Green
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Security Investment Optimizer</h1>
        <p className="text-gray-400">Find the security portfolio that minimizes expected loss within a fixed budget.</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-brand-surface border border-brand-border rounded-lg p-5">
          <div className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Budget Available</div>
          <div className="text-2xl font-medium text-white">₹{simulationResults.budget.toFixed(1)} Cr</div>
        </div>
        <div className="bg-brand-surface border border-brand-border rounded-lg p-5">
          <div className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Budget Used</div>
          <div className="text-2xl font-medium text-white">₹{budgetUsed.toFixed(1)} Cr</div>
        </div>
        <div className="bg-brand-surface border border-brand-border rounded-lg p-5">
          <div className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Expected Loss</div>
          <div className="text-2xl font-bold text-brand-green">₹{simulationResults.optimizedExpectedLoss} Cr</div>
        </div>
        <div className="bg-brand-surface border border-brand-border rounded-lg p-5">
          <div className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Risk Reduction</div>
          <div className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-brand-green" />
            <div className="text-2xl font-bold text-brand-green">{simulationResults.optimizedReduction}%</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Portfolio Allocation */}
        <div className="bg-brand-surface border border-brand-border rounded-lg flex flex-col">
          <div className="p-6 border-b border-brand-border">
            <h2 className="text-lg font-semibold text-white">Recommended Allocation</h2>
            <p className="text-sm text-gray-400 mt-1">Controls selected to maximize risk reduction given budget constraints.</p>
          </div>
          
          <div className="p-6 flex-1 flex flex-col justify-center">
            <div className="space-y-4">
              {portfolioControls.slice(0, 5).map((control) => (
                <div key={control.id} className="relative">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-200">{control.name}</span>
                    <span className="text-gray-400">₹{control.cost} Cr</span>
                  </div>
                  <div className="w-full bg-brand-bg rounded-full h-2.5 overflow-hidden border border-brand-border">
                    <div 
                      className="h-full bg-brand-saffron"
                      style={{ width: `${(control.cost / 2.0) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Optimization Result */}
        <div className="bg-brand-surface border border-brand-border rounded-lg flex flex-col">
          <div className="p-6 border-b border-brand-border">
            <h2 className="text-lg font-semibold text-white">Optimization Result</h2>
            <p className="text-sm text-gray-400 mt-1">Comparison against conventional prioritization.</p>
          </div>
          
          <div className="p-6 flex-1">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-brand-border)" horizontal={true} vertical={false} />
                  <XAxis type="number" stroke="#9CA3AF" tickFormatter={(val) => `₹${val}Cr`} />
                  <YAxis dataKey="name" type="category" stroke="#9CA3AF" width={120} tick={{fill: '#F3F4F6'}} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'var(--color-brand-elevated)', borderColor: 'var(--color-brand-border)', color: '#fff' }}
                    formatter={(val: any) => [`₹${val} Cr`, 'Expected Loss']}
                  />
                  <Bar dataKey="expectedLoss" radius={[0, 4, 4, 0]} barSize={40}>
                    {
                      comparisonData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))
                    }
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 flex items-center justify-between p-4 bg-brand-elevated rounded-lg border border-brand-border">
              <div>
                <div className="text-sm text-gray-400">Improvement vs Naive</div>
                <div className="text-xl font-bold text-brand-green">
                  {((simulationResults.naiveSeverityExpectedLoss - simulationResults.optimizedExpectedLoss) / simulationResults.naiveSeverityExpectedLoss * 100).toFixed(1)}% Better
                </div>
              </div>
              <ShieldCheck className="w-8 h-8 text-brand-green opacity-80" />
            </div>
          </div>
        </div>
        
      </div>

      {/* Why this allocation */}
      <div className="bg-brand-surface border border-brand-border rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-5 h-5 text-brand-saffron" />
          <h2 className="text-lg font-semibold text-white">Why this allocation?</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-brand-bg rounded-lg border border-brand-border/50">
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-saffron mt-2 shrink-0"></div>
              <p className="text-sm text-gray-300">
                <span className="font-semibold text-white">Network Segmentation has high cross-risk impact.</span> It simultaneously reduces exposure across Lateral Movement, Data Exfiltration, and Ransomware scenarios.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-brand-bg rounded-lg border border-brand-border/50">
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-saffron mt-2 shrink-0"></div>
              <p className="text-sm text-gray-300">
                <span className="font-semibold text-white">MFA directly addresses the highest exposure.</span> Credential compromise is the single largest risk factor (₹6.2 Cr), making MFA highly efficient per rupee.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-brand-bg rounded-lg border border-brand-border/50">
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-saffron mt-2 shrink-0"></div>
              <p className="text-sm text-gray-300">
                <span className="font-semibold text-white">Combined controls produce interaction benefits.</span> Selecting both MFA and PAM yields an extra 8% reduction due to compounded identity hardening.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-brand-bg rounded-lg border border-brand-border/50">
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-saffron mt-2 shrink-0"></div>
              <p className="text-sm text-gray-300">
                <span className="font-semibold text-white">DLP over Backup for data exfiltration.</span> While both address data risks, DLP provides preventative value for exfiltration which Backup cannot mitigate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
