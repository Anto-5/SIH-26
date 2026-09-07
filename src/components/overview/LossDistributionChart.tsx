import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { simulationResults } from '../../data/mockData';

export const LossDistributionChart: React.FC = () => {
  // Generate a realistic-looking log-normal distribution curve for the demo
  const distributionData = useMemo(() => {
    const data = [];
    for (let i = 0; i <= 60; i += 1) {
      const loss = i; // Loss in Cr
      // Approximation of a log-normal shape peaking around 12-15
      const mu = Math.log(18); // center around expected loss somewhat
      const sigma = 0.6;
      let prob = 0;
      
      if (loss > 0) {
        const coef = 1 / (loss * sigma * Math.sqrt(2 * Math.PI));
        const exponent = -Math.pow(Math.log(loss) - mu, 2) / (2 * Math.pow(sigma, 2));
        prob = coef * Math.exp(exponent) * 100; 
      }
      
      data.push({ loss, probability: Number(prob.toFixed(2)) });
    }
    return data;
  }, []);

  return (
    <div className="bg-brand-surface border border-brand-border rounded-lg p-5 lg:p-6 shadow-sm h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-white mb-1">Simulated Annual Loss Distribution</h2>
        <p className="text-sm text-gray-400">Illustrative distribution from simulated annual-loss scenarios.</p>
      </div>
      
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={distributionData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
            <defs>
              <linearGradient id="colorProb" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-brand-saffron)" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="var(--color-brand-bg)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-brand-border)" vertical={false} opacity={0.5} />
            <XAxis 
              dataKey="loss" 
              stroke="#6B7280" 
              tickFormatter={(val) => `₹${val}Cr`} 
              tick={{fill: '#9CA3AF', fontSize: 12}}
              tickMargin={10}
              minTickGap={20}
            />
            <YAxis 
              stroke="#6B7280" 
              tick={{fill: '#9CA3AF', fontSize: 12}}
              tickMargin={10}
              label={{ value: 'Probability / Frequency', angle: -90, position: 'insideLeft', fill: '#6B7280', fontSize: 12, offset: 10 }}
            />
            <RechartsTooltip 
              contentStyle={{ backgroundColor: 'var(--color-brand-elevated)', borderColor: 'var(--color-brand-border)', color: '#fff', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              itemStyle={{ color: 'var(--color-brand-saffron)' }}
              labelStyle={{ color: '#9CA3AF', marginBottom: '0.25rem' }}
              labelFormatter={(val) => `Annual Loss: ₹${val} Cr`}
              formatter={(val: any) => [`${val}%`, 'Probability']}
            />
            
            <ReferenceLine 
              x={simulationResults.baselineExpectedLoss} 
              stroke="#60A5FA" 
              strokeDasharray="4 4" 
              label={{ position: 'top', value: 'Expected Loss', fill: '#60A5FA', fontSize: 11, fontWeight: 600 }} 
            />
            
            <ReferenceLine 
              x={simulationResults.baseline95thPercentile} 
              stroke="var(--color-brand-crimson)" 
              strokeDasharray="4 4" 
              label={{ position: 'top', value: '95th Percentile', fill: 'var(--color-brand-crimson)', fontSize: 11, fontWeight: 600 }} 
            />
            
            <Area 
              type="monotone" 
              dataKey="probability" 
              stroke="var(--color-brand-saffron)" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorProb)" 
              activeDot={{ r: 6, fill: 'var(--color-brand-saffron)', stroke: 'var(--color-brand-bg)', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
