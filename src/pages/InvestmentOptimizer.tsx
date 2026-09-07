import React, { useState, useEffect } from 'react';
import { controls, simulationResults } from '../data/mockData';
import { ShieldCheck, TrendingDown, Info, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
function useCountUp(endValue: number, duration: number = 800, delay: number = 0, isPercent: boolean = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setValue(endValue);
      return;
    }

    let startTime: number;
    let animationFrame: number;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setValue(endValue * easeProgress);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick);
      } else {
        setValue(endValue);
      }
    };

    timeout = setTimeout(() => {
      animationFrame = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationFrame);
    };
  }, [endValue, duration, delay]);

  return isPercent ? Math.round(value) : Number(value.toFixed(1));
}

export default function InvestmentOptimizer() {
  const [budgetUsed] = useState(4.8);
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
  }, []);

  // Animated KPI values
  const animatedBudget = useCountUp(simulationResults.budget, 800, 100);
  const animatedBudgetUsed = useCountUp(budgetUsed, 800, 100);
  const animatedLoss = useCountUp(simulationResults.optimizedExpectedLoss, 800, 100);
  const animatedReduction = useCountUp(simulationResults.optimizedReduction, 800, 100, true);
  
  const improvement = ((simulationResults.naiveSeverityExpectedLoss - simulationResults.optimizedExpectedLoss) / simulationResults.naiveSeverityExpectedLoss * 100);
  const animatedImprovement = useCountUp(improvement, 800, 900); // Delayed reveal
  
  // Sorted controls for portfolio display
  const portfolioControls = [...controls].sort((a, b) => b.cost - a.cost);

  const comparisonData = [
    {
      name: 'Severity-First',
      expectedLoss: simulationResults.naiveSeverityExpectedLoss,
      reduction: simulationResults.naiveReduction,
      color: 'var(--color-light-slate)' // Baseline Neutral
    },
    {
      name: 'Optimized Portfolio',
      expectedLoss: simulationResults.optimizedExpectedLoss,
      reduction: simulationResults.optimizedReduction,
      color: 'var(--color-light-green)' // Green
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
        <h1 className="text-2xl md:text-3xl font-bold text-light-text-primary mb-1 tracking-tight">Security Investment Optimizer</h1>
        <p className="text-sm font-medium text-light-text-secondary uppercase tracking-widest">Find the security portfolio that minimizes expected loss within a fixed budget.</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-light-surface border border-light-border rounded-lg shadow-sm overflow-hidden animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <div className="p-5 border-b md:border-b-0 lg:border-r border-light-border">
          <div className="text-[11px] font-bold text-light-text-secondary mb-1 uppercase tracking-widest">Budget Available</div>
          <div className="text-2xl font-bold text-light-text-primary">₹{animatedBudget.toFixed(1)} Cr</div>
        </div>
        <div className="p-5 border-b md:border-b-0 lg:border-r border-light-border">
          <div className="text-[11px] font-bold text-light-text-secondary mb-1 uppercase tracking-widest">Budget Used</div>
          <div className="text-2xl font-bold text-opt-accent">₹{animatedBudgetUsed.toFixed(1)} Cr</div>
        </div>
        <div className="p-5 border-b lg:border-b-0 lg:border-r border-light-border bg-green-50/50">
          <div className="text-[11px] font-bold text-light-green mb-1 uppercase tracking-widest">Expected Loss</div>
          <div className="text-2xl font-bold text-light-green">₹{animatedLoss.toFixed(1)} Cr</div>
        </div>
        <div className="p-5 bg-green-50 relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-1 bg-light-green"></div>
          <div className="text-[11px] font-bold text-light-green mb-1 uppercase tracking-widest pl-1">Risk Reduction</div>
          <div className="flex items-center gap-2 pl-1">
            <TrendingDown className="w-5 h-5 text-light-green" />
            <div className="text-2xl font-bold text-light-green">{animatedReduction}%</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        
        {/* Left Column: Portfolio Allocation */}
        <div className="bg-opt-bg border border-opt-border rounded-lg flex flex-col shadow-sm animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
          <div className="p-6 border-b border-opt-border/50">
            <h2 className="text-lg font-bold text-light-text-primary">Recommended Allocation</h2>
            <p className="text-sm text-light-text-body mt-1">Controls selected to maximize risk reduction given budget constraints.</p>
          </div>
          
          <div className="p-6 flex-1 flex flex-col justify-center">
            <div className="space-y-6">
              {portfolioControls.slice(0, 5).map((control, idx) => (
                <div key={control.id} className="relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-light-text-primary text-[15px]">{control.name}</span>
                    <span className="text-sm font-semibold text-opt-accent bg-light-surface px-2 py-0.5 rounded border border-opt-border/50">₹{control.cost} Cr</span>
                  </div>
                  <div className="w-full bg-light-surface rounded-sm h-1.5 overflow-hidden border border-opt-border/50">
                    <div 
                      className="h-full bg-opt-accent"
                      style={{ 
                        width: mounted ? `${(control.cost / 2.0) * 100}%` : '0%',
                        transition: prefersReducedMotion ? 'none' : `width 800ms cubic-bezier(0.16, 1, 0.3, 1) ${300 + (idx * 150)}ms`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Optimization Result */}
        <div className="bg-light-surface border border-light-border rounded-lg flex flex-col shadow-sm animate-fade-in-up" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
          <div className="p-6 border-b border-light-border">
            <h2 className="text-lg font-bold text-light-text-primary">Optimization Result</h2>
            <p className="text-sm text-light-text-secondary mt-1">Comparison against conventional severity-based prioritization.</p>
          </div>
          
          <div className="p-6 flex-1 flex flex-col">
            <div className="h-64 w-full flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} layout="vertical" margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-light-border)" horizontal={true} vertical={false} />
                  <XAxis type="number" stroke="var(--color-light-text-secondary)" tickFormatter={(val) => `₹${val}Cr`} tick={{fill: 'var(--color-light-text-secondary)', fontSize: 12, fontWeight: 500}} />
                  <YAxis dataKey="name" type="category" stroke="var(--color-light-text-secondary)" width={120} tick={{fill: 'var(--color-light-text-primary)', fontSize: 12, fontWeight: 600}} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'var(--color-light-surface)', borderColor: 'var(--color-light-border)', color: 'var(--color-light-text-primary)', borderRadius: '4px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}
                    itemStyle={{ color: 'var(--color-light-text-primary)', fontWeight: 600 }}
                    formatter={(val: any) => [`₹${val} Cr`, 'Expected Loss']}
                    cursor={{fill: 'var(--color-light-bg)'}}
                  />
                  <Bar 
                    dataKey="expectedLoss" 
                    radius={[0, 4, 4, 0]} 
                    barSize={32}
                    isAnimationActive={!prefersReducedMotion}
                    animationDuration={1000}
                    animationBegin={500}
                  >
                    {
                      comparisonData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))
                    }
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 flex items-center justify-between p-5 bg-green-50 rounded border border-light-green/20 animate-fade-in-up" style={{ animationDelay: '900ms', animationFillMode: 'both' }}>
              <div>
                <div className="text-[11px] font-bold text-light-green uppercase tracking-widest mb-1">Improvement vs Severity-First</div>
                <div className="text-2xl font-black text-light-green">
                  {animatedImprovement.toFixed(1)}% Better
                </div>
              </div>
              <ShieldCheck className="w-10 h-10 text-light-green opacity-90" />
            </div>
          </div>
        </div>
        
      </div>

      {/* Why this allocation */}
      <div className="bg-light-surface border border-light-border rounded-lg p-6 shadow-sm mt-8 animate-fade-in-up" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
        <div className="flex items-center gap-3 mb-6">
          <Info className="w-6 h-6 text-opt-accent" />
          <h2 className="text-xl font-bold text-light-text-primary">Why this allocation?</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-opt-bg rounded border border-opt-border/50 animate-fade-in-up" style={{ animationDelay: '500ms', animationFillMode: 'both' }}>
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-opt-accent mt-1.5 shrink-0"></div>
              <p className="text-sm text-light-text-body leading-relaxed">
                <span className="font-bold text-light-text-primary block mb-1">Network Segmentation has high cross-risk impact.</span> It simultaneously reduces exposure across Lateral Movement, Data Exfiltration, and Ransomware scenarios.
              </p>
            </div>
          </div>
          
          <div className="p-5 bg-opt-bg rounded border border-opt-border/50 animate-fade-in-up" style={{ animationDelay: '500ms', animationFillMode: 'both' }}>
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-opt-accent mt-1.5 shrink-0"></div>
              <p className="text-sm text-light-text-body leading-relaxed">
                <span className="font-bold text-light-text-primary block mb-1">MFA directly addresses the highest exposure.</span> Credential compromise is the single largest risk factor (₹6.2 Cr), making MFA highly efficient per rupee.
              </p>
            </div>
          </div>
          
          <div className="p-5 bg-opt-bg rounded border border-opt-border/50 animate-fade-in-up" style={{ animationDelay: '600ms', animationFillMode: 'both' }}>
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-opt-accent mt-1.5 shrink-0"></div>
              <p className="text-sm text-light-text-body leading-relaxed">
                <span className="font-bold text-light-text-primary block mb-1">Combined controls produce interaction benefits.</span> Selecting both MFA and PAM yields an extra 8% reduction due to compounded identity hardening.
              </p>
            </div>
          </div>
          
          <div className="p-5 bg-opt-bg rounded border border-opt-border/50 animate-fade-in-up" style={{ animationDelay: '600ms', animationFillMode: 'both' }}>
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-opt-accent mt-1.5 shrink-0"></div>
              <p className="text-sm text-light-text-body leading-relaxed">
                <span className="font-bold text-light-text-primary block mb-1">DLP over Backup for data exfiltration.</span> While both address data risks, DLP provides preventative value for exfiltration which Backup cannot mitigate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
