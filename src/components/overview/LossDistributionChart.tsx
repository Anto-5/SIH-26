import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { simulationResults } from '../../data/mockData';

export const LossDistributionChart: React.FC = () => {
  // Generate a realistic-looking log-normal distribution curve for the demo
  const distributionData = useMemo(() => {
    const data = [];
    for (let i = 0; i <= 60; i += 1) {
      const loss = i; // Loss in Cr
      const mu = Math.log(18); 
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
    <div className="bg-light-surface border border-light-border rounded-lg p-6 lg:p-8 shadow-sm h-full flex flex-col">
      <div className="mb-8 border-b border-light-border pb-4">
        <h2 className="text-xl font-bold text-light-text-primary mb-1">Simulated Annual Loss Distribution</h2>
        <p className="text-sm font-medium text-light-text-secondary">Illustrative distribution from simulated annual-loss scenarios.</p>
      </div>
      
      <div className="flex-1 w-full min-h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={distributionData} margin={{ top: 25, right: 30, left: 10, bottom: 20 }}>
            <defs>
              <linearGradient id="colorProbLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-light-saffron)" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="var(--color-light-surface)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-light-border)" vertical={false} opacity={0.6} />
            <XAxis 
              dataKey="loss" 
              stroke="var(--color-light-text-secondary)" 
              tickFormatter={(val) => `₹${val}Cr`} 
              tick={{fill: 'var(--color-light-text-secondary)', fontSize: 12, fontWeight: 500}}
              tickMargin={12}
              axisLine={{ stroke: 'var(--color-light-border)' }}
            />
            <YAxis 
              stroke="var(--color-light-text-secondary)" 
              tick={{fill: 'var(--color-light-text-secondary)', fontSize: 12, fontWeight: 500}}
              tickMargin={12}
              axisLine={{ stroke: 'var(--color-light-border)' }}
              label={{ value: 'Probability / Frequency', angle: -90, position: 'insideLeft', fill: 'var(--color-light-text-secondary)', fontSize: 12, fontWeight: 600, offset: 0 }}
            />
            <RechartsTooltip 
              contentStyle={{ backgroundColor: 'var(--color-light-surface)', borderColor: 'var(--color-light-border)', color: 'var(--color-light-text-primary)', borderRadius: '4px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)' }}
              itemStyle={{ color: 'var(--color-light-text-primary)', fontWeight: 600 }}
              labelStyle={{ color: 'var(--color-light-text-secondary)', marginBottom: '4px', fontSize: '12px', fontWeight: 500 }}
              labelFormatter={(val) => `Annual Loss: ₹${val} Cr`}
              formatter={(val: any) => [`${val}%`, 'Probability']}
              cursor={{ stroke: 'var(--color-light-border)', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            
            <ReferenceLine 
              x={simulationResults.baselineExpectedLoss} 
              stroke="var(--color-light-text-primary)" 
              strokeDasharray="4 4" 
              strokeWidth={1.5}
              label={{ position: 'top', value: 'Expected Loss: ₹18.4 Cr', fill: 'var(--color-light-text-primary)', fontSize: 11, fontWeight: 700, offset: 10 }} 
            />
            
            <ReferenceLine 
              x={simulationResults.baseline95thPercentile} 
              stroke="var(--color-light-crimson)" 
              strokeDasharray="4 4"
              strokeWidth={1.5}
              label={{ position: 'top', value: '95th Percentile: ₹46.7 Cr', fill: 'var(--color-light-crimson)', fontSize: 11, fontWeight: 700, offset: 10 }} 
            />
            
            <Area 
              type="monotone" 
              dataKey="probability" 
              stroke="var(--color-light-saffron)" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorProbLight)" 
              activeDot={{ r: 5, fill: 'var(--color-light-surface)', stroke: 'var(--color-light-saffron)', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
