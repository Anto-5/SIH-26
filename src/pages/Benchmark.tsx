import React from 'react';
import { simulationResults } from '../data/mockData';
import { BarChart2, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function Benchmark() {
  const comparisonData = [
    {
      metric: 'Expected Annual Loss',
      severityFirst: simulationResults.naiveSeverityExpectedLoss,
      optimized: simulationResults.optimizedExpectedLoss,
    },
    {
      metric: '95th Percentile Risk',
      severityFirst: 38.2, // Mock benchmark data
      optimized: 32.5,
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Benchmark Comparison</h1>
        <p className="text-gray-400">Compare optimized investment against conventional severity-first allocation.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Chart */}
        <div className="bg-brand-surface border border-brand-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Financial Risk Exposure (₹ Cr)</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-brand-border)" vertical={false} />
                <XAxis dataKey="metric" stroke="#9CA3AF" tick={{fill: '#9CA3AF'}} />
                <YAxis stroke="#9CA3AF" tickFormatter={(val) => `₹${val}`} tick={{fill: '#9CA3AF'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-brand-elevated)', borderColor: 'var(--color-brand-border)', color: '#fff' }}
                  formatter={(val: any) => [`₹${val} Cr`, '']}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="severityFirst" name="Naive Severity-First" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="optimized" name="PRAMANYA Optimized" fill="var(--color-brand-green)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-center">
            <span className="inline-block px-3 py-1 bg-brand-green/20 text-brand-green text-xs font-bold rounded-full border border-brand-green/30">
              Lower is better
            </span>
          </div>
        </div>

        {/* Explanations */}
        <div className="space-y-6">
          <div className="bg-brand-surface border border-brand-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <ShieldAlert className="w-6 h-6 text-brand-amber" />
              <h2 className="text-lg font-semibold text-white">Severity-First Approach</h2>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Conventional risk management ranks individual risks by severity (High/Medium/Low) and allocates budget to address the "Highest" risks until the budget runs out.
            </p>
            <ul className="text-sm text-gray-400 space-y-2 ml-4 list-disc">
              <li>Ignores the actual financial magnitude of the exposure.</li>
              <li>Ignores the varying cost-effectiveness of controls.</li>
              <li>Fails to account for control overlaps and interactions.</li>
            </ul>
            <div className="mt-4 p-3 bg-brand-elevated rounded border border-brand-border">
              <div className="text-xs text-gray-500 uppercase">Resulting Expected Loss</div>
              <div className="text-xl font-bold text-white">₹{simulationResults.naiveSeverityExpectedLoss} Cr</div>
            </div>
          </div>

          <div className="bg-brand-surface border border-brand-green/50 rounded-lg p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-brand-green"></div>
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-6 h-6 text-brand-green" />
              <h2 className="text-lg font-semibold text-white">PRAMANYA Optimization</h2>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Optimizes the portfolio across interconnected risks, calculating the exact combination of controls that maximizes financial risk reduction for a given budget constraint.
            </p>
            <ul className="text-sm text-gray-400 space-y-2 ml-4 list-disc">
              <li>Quantifies exposure in financial terms (₹).</li>
              <li>Accounts for control costs vs. their actual effectiveness.</li>
              <li>Models network interactions and conditional dependencies.</li>
            </ul>
            <div className="mt-4 p-3 bg-brand-elevated rounded border border-brand-border">
              <div className="text-xs text-gray-500 uppercase">Resulting Expected Loss</div>
              <div className="text-xl font-bold text-brand-green">₹{simulationResults.optimizedExpectedLoss} Cr</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
