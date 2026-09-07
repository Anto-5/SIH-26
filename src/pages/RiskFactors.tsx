import React from 'react';
import { riskFactors } from '../data/mockData';
import { AlertTriangle, Info } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function RiskFactors() {
  const chartData = riskFactors.map(rf => ({
    name: rf.name,
    exposure: rf.exposure,
    color: rf.severity === 'HIGH' ? 'var(--color-brand-crimson)' : 
           rf.severity === 'MEDIUM' ? 'var(--color-brand-amber)' : 'var(--color-brand-saffron)'
  })).sort((a, b) => b.exposure - a.exposure);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Risk Factors</h1>
        <p className="text-gray-400">Understand what drives expected cyber loss.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {riskFactors.map(risk => (
            <div key={risk.id} className="bg-brand-surface border border-brand-border rounded-lg p-5 hover:border-brand-saffron/50 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-white">{risk.name}</h3>
                <span className="text-lg font-bold text-white">₹{risk.exposure} Cr</span>
              </div>
              <p className="text-sm text-gray-400 mb-4">{risk.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-500 mb-1 text-xs uppercase tracking-wider">Likelihood</div>
                  <div className="font-medium text-gray-300">{risk.likelihood}</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1 text-xs uppercase tracking-wider">Loss Magnitude</div>
                  <div className="font-medium text-gray-300">{risk.lossMagnitude}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-brand-surface border border-brand-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Risk Contribution to Expected Loss</h2>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 50, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-brand-border)" horizontal={true} vertical={false} />
                  <XAxis type="number" stroke="#9CA3AF" tickFormatter={(val) => `₹${val}Cr`} />
                  <YAxis dataKey="name" type="category" stroke="#9CA3AF" width={100} tick={{fill: '#F3F4F6', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--color-brand-elevated)', borderColor: 'var(--color-brand-border)', color: '#fff' }}
                    formatter={(val: any) => [`₹${val} Cr`, 'Exposure']}
                  />
                  <Bar dataKey="exposure" radius={[0, 4, 4, 0]} barSize={24}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-brand-elevated border border-brand-border rounded-lg p-5">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-brand-saffron shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">How is this calculated?</h4>
                <div className="font-mono text-sm text-brand-saffron bg-brand-bg p-3 rounded border border-brand-border mb-3 inline-block">
                  Expected Loss ≈ Loss Event Frequency (LEF) × Loss Magnitude (LM)
                </div>
                <p className="text-sm text-gray-400">
                  Loss Event Frequency represents the probable number of times the risk will occur in a year. Loss Magnitude represents the probable financial impact of a single occurrence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
