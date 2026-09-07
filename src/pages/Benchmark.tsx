import React, { useState, useEffect, useRef } from 'react';
import { simulationResults } from '../data/mockData';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

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

export default function Benchmark() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);

  const originalData = [
    {
      metric: 'Expected Annual Loss',
      severityFirst: simulationResults.naiveSeverityExpectedLoss,
      optimized: simulationResults.optimizedExpectedLoss,
    },
    {
      metric: '95th Percentile Risk',
      severityFirst: 38.2,
      optimized: 32.5,
    }
  ];

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);

    if (mq.matches) {
      setChartData(originalData);
    } else {
      setChartData(originalData.map(d => ({ ...d, severityFirst: 0, optimized: 0 })));
      const timer = setTimeout(() => {
        setChartData(originalData);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, []);

  const animSeverity = useAnimatedValue(simulationResults.naiveSeverityExpectedLoss, 800);
  const animOptimized = useAnimatedValue(simulationResults.optimizedExpectedLoss, 800);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
        <h1 className="text-2xl md:text-3xl font-bold text-light-text-primary mb-1 tracking-tight">Benchmark Comparison</h1>
        <p className="text-sm font-medium text-light-text-secondary uppercase tracking-widest">Compare optimized investment against conventional severity-first allocation.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Chart */}
        <div className="bg-light-surface border border-light-border rounded-lg p-6 lg:p-8 shadow-sm animate-fade-in-up" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
          <h2 className="text-lg font-bold text-light-text-primary mb-6">Financial Risk Exposure (₹ Cr)</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-light-border)" vertical={false} />
                <XAxis dataKey="metric" stroke="var(--color-light-text-secondary)" tick={{fill: 'var(--color-light-text-secondary)', fontSize: 12, fontWeight: 500}} />
                <YAxis stroke="var(--color-light-text-secondary)" tickFormatter={(val) => `₹${val}`} tick={{fill: 'var(--color-light-text-secondary)', fontSize: 12, fontWeight: 500}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-light-surface)', borderColor: 'var(--color-light-border)', color: 'var(--color-light-text-primary)', borderRadius: '4px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}
                  itemStyle={{ color: 'var(--color-light-text-primary)', fontWeight: 600 }}
                  formatter={(val: any) => [`₹${val} Cr`, '']}
                  cursor={{fill: 'var(--color-light-bg)'}}
                />
                <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: 500, color: 'var(--color-light-text-secondary)' }} />
                <Bar 
                  dataKey="severityFirst" 
                  name="Naive Severity-First" 
                  fill="var(--color-light-slate)" 
                  radius={[4, 4, 0, 0]} 
                  isAnimationActive={!prefersReducedMotion}
                  animationDuration={1000}
                  animationBegin={0}
                />
                <Bar 
                  dataKey="optimized" 
                  name="PRAMANYA Optimized" 
                  fill="var(--color-light-green)" 
                  radius={[4, 4, 0, 0]} 
                  isAnimationActive={!prefersReducedMotion}
                  animationDuration={1000}
                  animationBegin={150}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 text-center">
            <span className="inline-block px-3 py-1 bg-green-50 text-light-green text-[10px] font-bold rounded-sm border border-light-green/20 uppercase tracking-widest">
              Lower is better
            </span>
          </div>
        </div>

        {/* Explanations */}
        <div className="space-y-6">
          <div className="bg-bench-bg border border-bench-border rounded-lg p-6 shadow-sm animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
            <div className="flex items-center gap-3 mb-4">
              <ShieldAlert className="w-6 h-6 text-bench-accent" />
              <h2 className="text-lg font-bold text-light-text-primary">Severity-First Approach</h2>
            </div>
            <p className="text-sm text-light-text-body leading-relaxed mb-4">
              Conventional risk management ranks individual risks by severity (High/Medium/Low) and allocates budget to address the "Highest" risks until the budget runs out.
            </p>
            <ul className="text-sm text-light-text-secondary space-y-2 ml-4 list-disc marker:text-bench-accent font-medium mb-6">
              <li>Ignores the actual financial magnitude of the exposure.</li>
              <li>Ignores the varying cost-effectiveness of controls.</li>
              <li>Fails to account for control overlaps and interactions.</li>
            </ul>
            <div className="p-4 bg-light-surface rounded border border-bench-border/50">
              <div className="text-[11px] font-bold text-light-text-secondary uppercase tracking-widest mb-1">Resulting Expected Loss</div>
              <div className="text-2xl font-bold text-light-slate">₹{animSeverity.toFixed(1)} Cr</div>
            </div>
          </div>

          <div className="bg-green-50 border border-light-green/30 rounded-lg p-6 relative overflow-hidden shadow-sm animate-fade-in-up" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
            <div className="absolute top-0 left-0 w-1.5 h-full bg-light-green"></div>
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-6 h-6 text-light-green" />
              <h2 className="text-lg font-bold text-light-green">PRAMANYA Optimization</h2>
            </div>
            <p className="text-sm text-light-text-body leading-relaxed mb-4 font-medium">
              Optimizes the portfolio across interconnected risks, calculating the exact combination of controls that maximizes financial risk reduction for a given budget constraint.
            </p>
            <ul className="text-sm text-light-text-secondary space-y-2 ml-4 list-disc marker:text-light-green font-medium mb-6">
              <li>Quantifies exposure in financial terms (₹).</li>
              <li>Accounts for control costs vs. their actual effectiveness.</li>
              <li>Models network interactions and conditional dependencies.</li>
            </ul>
            <div className="p-4 bg-light-surface rounded border border-light-green/20">
              <div className="text-[11px] font-bold text-light-green uppercase tracking-widest mb-1">Resulting Expected Loss</div>
              <div className="text-2xl font-bold text-light-green">₹{animOptimized.toFixed(1)} Cr</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
