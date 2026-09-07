import React, { useState, useEffect } from 'react';
import { Network, Zap, TrendingDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function ControlInteractions() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);

  const interactionData = [
    { pair: 'MFA + PAM', independent: 22, interaction: 30 },
    { pair: 'EDR + Network Seg.', independent: 25, interaction: 32 },
    { pair: 'Network Seg. + DLP', independent: 18, interaction: 24 }
  ];

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    
    if (mq.matches) {
      setChartData(interactionData);
    } else {
      // Initialize with zero values to establish axes without drawing bars
      setChartData(interactionData.map(d => ({ ...d, independent: 0, interaction: 0 })));
      
      const timer = setTimeout(() => {
        setChartData(interactionData);
      }, 400); // Start data animation shortly after container fades in
      
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
        <h1 className="text-2xl md:text-3xl font-bold text-light-text-primary mb-1 tracking-tight">Control Interactions</h1>
        <p className="text-sm font-medium text-light-text-secondary uppercase tracking-widest">Security controls do not operate independently.</p>
      </div>

      <div className="bg-int-bg border border-int-border rounded-lg p-6 shadow-sm animate-fade-in-up" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
        <div className="flex gap-4 items-start">
          <Network className="w-6 h-6 text-int-accent shrink-0 mt-1" />
          <div>
            <p className="text-light-text-primary font-bold mb-2">
              Combined controls can produce a greater reduction in loss than evaluating each control independently.
            </p>
            <p className="text-sm text-light-text-body leading-relaxed">
              PRAMANYA models the conditional dependencies between controls to optimize portfolio selection rather than simply ranking by individual ROI.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Interaction Chart */}
        <div className="bg-light-surface border border-light-border rounded-lg p-6 shadow-sm animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
          <h2 className="text-lg font-bold text-light-text-primary mb-6">Interaction Bonuses</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-light-border)" vertical={false} />
                <XAxis dataKey="pair" stroke="var(--color-light-text-secondary)" tick={{fill: 'var(--color-light-text-secondary)', fontSize: 12, fontWeight: 500}} />
                <YAxis stroke="var(--color-light-text-secondary)" tick={{fill: 'var(--color-light-text-secondary)', fontSize: 12, fontWeight: 500}} tickFormatter={(val) => `${val}%`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-light-surface)', borderColor: 'var(--color-light-border)', color: 'var(--color-light-text-primary)', borderRadius: '4px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}
                  itemStyle={{ color: 'var(--color-light-text-primary)', fontWeight: 600 }}
                  formatter={(val: any) => [`${val}%`, 'Risk Reduction']}
                  cursor={{fill: 'var(--color-light-bg)'}}
                />
                <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: 500, color: 'var(--color-light-text-secondary)' }} />
                <Bar 
                  dataKey="independent" 
                  name="Independent Effect" 
                  fill="var(--color-light-slate)" 
                  radius={[4, 4, 0, 0]} 
                  isAnimationActive={!prefersReducedMotion}
                  animationDuration={1000}
                  animationBegin={0}
                />
                <Bar 
                  dataKey="interaction" 
                  name="Interaction-Aware Effect" 
                  fill="var(--color-int-accent)" 
                  radius={[4, 4, 0, 0]} 
                  isAnimationActive={!prefersReducedMotion}
                  animationDuration={1000}
                  animationBegin={200}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-center text-light-text-secondary mt-6 font-medium uppercase tracking-widest">* Values represent simulated deterministic interaction models.</p>
        </div>

        {/* Matrix / Examples */}
        <div className="space-y-6">
          <div className="bg-light-surface border border-light-border rounded-lg p-6 shadow-sm h-full">
            <h2 className="text-lg font-bold text-light-text-primary mb-6 animate-fade-in-up" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>Key Synergies</h2>
            
            <div className="space-y-4">
              <div className="p-5 bg-int-bg rounded border border-int-border/50 animate-fade-in-up" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-int-accent" />
                  <span className="font-bold text-light-text-primary">MFA + PAM</span>
                </div>
                <p className="text-sm text-light-text-body mb-4 leading-relaxed">
                  MFA hardens initial access, while PAM restricts lateral movement if access is gained. Their combined effect on Credential Compromise is compounding.
                </p>
                <div className="flex items-center gap-6 text-sm bg-light-surface p-3 rounded border border-int-border/30">
                  <div className="text-light-text-secondary font-semibold">Independent: <span className="text-light-slate font-bold">22%</span></div>
                  <div className="text-int-accent font-bold flex items-center gap-1.5">
                    Combined: 30% <TrendingDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="p-5 bg-int-bg rounded border border-int-border/50 animate-fade-in-up" style={{ animationDelay: '500ms', animationFillMode: 'both' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-int-accent" />
                  <span className="font-bold text-light-text-primary">EDR + Network Segmentation</span>
                </div>
                <p className="text-sm text-light-text-body mb-4 leading-relaxed">
                  Segmentation isolates the attacker, giving EDR more time to detect and respond before critical assets are reached.
                </p>
                <div className="flex items-center gap-6 text-sm bg-light-surface p-3 rounded border border-int-border/30">
                  <div className="text-light-text-secondary font-semibold">Independent: <span className="text-light-slate font-bold">25%</span></div>
                  <div className="text-int-accent font-bold flex items-center gap-1.5">
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
