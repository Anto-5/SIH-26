import React from 'react';
import { Database, FileCheck2 } from 'lucide-react';

export default function DataAssumptions() {
  const dataProvenance = [
    {
      input: 'Threat Frequency',
      value: '0.42 / year',
      source: 'Simulation',
      status: 'SYNTHETIC',
      statusColor: 'text-brand-saffron bg-brand-saffron/10 border-brand-saffron/30'
    },
    {
      input: 'Loss Magnitude',
      value: '₹2.4 Cr (Avg)',
      source: 'Scenario Model',
      status: 'ASSUMED',
      statusColor: 'text-gray-300 bg-gray-800 border-gray-600'
    },
    {
      input: 'Control Effectiveness',
      value: '65% - 81%',
      source: 'Control Model',
      status: 'ASSUMED',
      statusColor: 'text-gray-300 bg-gray-800 border-gray-600'
    },
    {
      input: 'Vulnerability Data',
      value: 'NVD Feed',
      source: 'External Dataset',
      status: 'REAL',
      statusColor: 'text-brand-green bg-brand-green/10 border-brand-green/30'
    },
    {
      input: 'Control Costs',
      value: 'Market Estimates',
      source: 'Industry Benchmark',
      status: 'ASSUMED',
      statusColor: 'text-gray-300 bg-gray-800 border-gray-600'
    },
    {
      input: 'Interaction Network',
      value: 'Deterministic Graph',
      source: 'Simulation',
      status: 'SYNTHETIC',
      statusColor: 'text-brand-saffron bg-brand-saffron/10 border-brand-saffron/30'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Data & Assumptions</h1>
        <p className="text-gray-400">Trace every decision back to its underlying assumptions.</p>
      </div>

      <div className="bg-brand-surface border border-brand-border rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Database className="w-5 h-5 text-brand-saffron" />
          <h2 className="text-lg font-semibold text-white">Data Provenance</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="text-xs text-gray-400 uppercase bg-brand-elevated border-b border-brand-border">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium">Input / Parameter</th>
                <th scope="col" className="px-6 py-4 font-medium">Value Range</th>
                <th scope="col" className="px-6 py-4 font-medium">Source</th>
                <th scope="col" className="px-6 py-4 font-medium">Data Status</th>
              </tr>
            </thead>
            <tbody>
              {dataProvenance.map((item, index) => (
                <tr key={index} className="border-b border-brand-border bg-brand-surface hover:bg-brand-bg transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{item.input}</td>
                  <td className="px-6 py-4">{item.value}</td>
                  <td className="px-6 py-4">{item.source}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded border ${item.statusColor}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-brand-elevated border border-brand-border rounded-lg p-6 flex items-start gap-4">
        <FileCheck2 className="w-6 h-6 text-brand-green shrink-0 mt-1" />
        <div>
          <h3 className="text-white font-medium mb-2">Transparency Statement</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            PRAMANYA is designed to be a transparent decision-support tool. Because empirical cybersecurity loss data is highly classified and rarely shared publicly, this prototype utilizes deterministic synthetic simulations and assumed parameters to demonstrate the mathematical optimization engine. Never imply synthetic or assumed data represents measured historical truth. When deployed in an enterprise environment, these parameters would be calibrated against internal incident history and threat intelligence feeds.
          </p>
        </div>
      </div>
    </div>
  );
}
