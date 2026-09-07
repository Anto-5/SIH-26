import React from 'react';
import { Network, Zap, TrendingDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function ControlInteractions() {
  const interactionData = [
    {
      pair: 'MFA + PAM',
      independent: 22,
      interaction: 30,
    },
    {
      pair: 'EDR + Network Seg.',
      independent: 25,
      interaction: 32,
    },
    {
      pair: 'Network Seg. + DLP',
      independent: 18,
      interaction: 24,
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Control Interactions</h1>
        <p className="text-gray-400">Security controls do not operate independently.</p>
      </div>

      <div className="bg-brand-elevated border border-brand-border rounded-lg p-5">
        <div className="flex gap-4 items-start">
          <Network className="w-6 h-6 text-brand-saffron shrink-0" />
          <div>
            <p className="text-gray-300 font-medium">
              Combined controls can produce a greater reduction in loss than evaluating each control independently.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              PRAMANYA models the conditional dependencies between controls to optimize portfolio selection rather than simply ranking by individual ROI.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Interaction Chart */}
        <div className="bg-brand-surface border border-brand-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Interaction Bonuses</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={interactionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-brand-border)" vertical={false} />
                <XAxis dataKey="pair" stroke="#9CA3AF" tick={{fill: '#9CA3AF', fontSize: 12}} />
                <YAxis stroke="#9CA3AF" tick={{fill: '#9CA3AF', fontSize: 12}} tickFormatter={(val) => `${val}%`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-brand-elevated)', borderColor: 'var(--color-brand-border)', color: '#fff' }}
                  formatter={(val: any) => [`${val}%`, 'Risk Reduction']}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="independent" name="Independent Effect" fill="#1E3A8A" radius={[4, 4, 0, 0]} />
                <Bar dataKey="interaction" name="Interaction-Aware Effect" fill="var(--color-brand-saffron)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-center text-gray-500 mt-4">* Values represent simulated deterministic interaction models.</p>
        </div>

        {/* Matrix / Examples */}
        <div className="space-y-6">
          <div className="bg-brand-surface border border-brand-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Key Synergies</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-brand-bg rounded-lg border border-brand-border">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-brand-amber" />
                  <span className="font-bold text-white">MFA + PAM</span>
                </div>
                <p className="text-sm text-gray-400 mb-3">
                  MFA hardens initial access, while PAM restricts lateral movement if access is gained. Their combined effect on Credential Compromise is compounding.
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="text-gray-500">Independent: <span className="text-white font-medium">22%</span></div>
                  <div className="text-brand-saffron font-bold flex items-center gap-1">
                    Combined: 30% <TrendingDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-brand-bg rounded-lg border border-brand-border">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-brand-amber" />
                  <span className="font-bold text-white">EDR + Network Segmentation</span>
                </div>
                <p className="text-sm text-gray-400 mb-3">
                  Segmentation isolates the attacker, giving EDR more time to detect and respond before critical assets are reached.
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="text-gray-500">Independent: <span className="text-white font-medium">25%</span></div>
                  <div className="text-brand-saffron font-bold flex items-center gap-1">
                    Combined: 32% <TrendingDown className="w-4 h-4" />
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
