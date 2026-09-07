export const riskFactors = [
  {
    id: 'rf-1',
    name: 'Credential Compromise',
    likelihood: 'High',
    frequency: 3.8,
    lossMagnitude: 'High',
    exposure: 6.2, // ₹ Cr
    severity: 'HIGH',
    description: 'Unauthorized access to systems via stolen or brute-forced credentials.'
  },
  {
    id: 'rf-2',
    name: 'Lateral Movement',
    likelihood: 'Medium-High',
    frequency: 2.6,
    lossMagnitude: 'High',
    exposure: 4.8,
    severity: 'HIGH',
    description: 'Adversary progressing through the network after initial access.'
  },
  {
    id: 'rf-3',
    name: 'Data Loss / Exfiltration',
    likelihood: 'Medium',
    frequency: 1.9,
    lossMagnitude: 'Very High',
    exposure: 3.5,
    severity: 'MEDIUM',
    description: 'Unauthorized transfer of sensitive data to an external location.'
  },
  {
    id: 'rf-4',
    name: 'Privilege Escalation',
    likelihood: 'Medium',
    frequency: 2.2,
    lossMagnitude: 'High',
    exposure: 2.7,
    severity: 'MEDIUM',
    description: 'Attacker gaining higher-level permissions or root access.'
  },
  {
    id: 'rf-5',
    name: 'Ransomware Disruption',
    likelihood: 'Low',
    frequency: 0.9,
    lossMagnitude: 'High',
    exposure: 2.1,
    severity: 'HIGH',
    description: 'Malicious software encrypting files and demanding payment.'
  },
  {
    id: 'rf-6',
    name: 'Cloud Misconfiguration',
    likelihood: 'Medium',
    frequency: 2.4,
    lossMagnitude: 'Medium',
    exposure: 1.8,
    severity: 'MEDIUM',
    description: 'Exploitation of insecurely configured cloud storage or services.'
  },
  {
    id: 'rf-7',
    name: 'Insider Threat',
    likelihood: 'Low',
    frequency: 0.7,
    lossMagnitude: 'High',
    exposure: 1.2,
    severity: 'MEDIUM',
    description: 'Malicious or negligent actions by employees or contractors.'
  },
  {
    id: 'rf-8',
    name: 'Service Disruption',
    likelihood: 'Low-Medium',
    frequency: 1.5,
    lossMagnitude: 'Medium',
    exposure: 0.9,
    severity: 'LOW',
    description: 'Denial of service attacks impacting system availability.'
  }
];


export const controls = [
  {
    id: 'sc-1',
    name: 'MFA / Identity Hardening',
    cost: 0.8,
    effectiveness: 78,
    riskReduction: 'High',
    mitigatedRisks: ['rf-1', 'rf-2'],
    interactions: ['sc-5'] // interacts positively with PAM
  },
  {
    id: 'sc-2',
    name: 'EDR / Endpoint Detection',
    cost: 1.1,
    effectiveness: 72,
    riskReduction: 'High',
    mitigatedRisks: ['rf-2', 'rf-4', 'rf-5'],
    interactions: ['sc-3']
  },
  {
    id: 'sc-3',
    name: 'Network Segmentation',
    cost: 1.4,
    effectiveness: 81,
    riskReduction: 'Very High',
    mitigatedRisks: ['rf-2', 'rf-3', 'rf-4'],
    interactions: ['sc-2', 'sc-4']
  },
  {
    id: 'sc-4',
    name: 'Data Loss Prevention (DLP)',
    cost: 0.9,
    effectiveness: 65,
    riskReduction: 'Medium',
    mitigatedRisks: ['rf-3', 'rf-5'],
    interactions: ['sc-3']
  },
  {
    id: 'sc-5',
    name: 'Privileged Access Management (PAM)',
    cost: 0.7,
    effectiveness: 76,
    riskReduction: 'High',
    mitigatedRisks: ['rf-1', 'rf-2', 'rf-5'],
    interactions: ['sc-1']
  },
  {
    id: 'sc-6',
    name: 'Backup & Recovery',
    cost: 0.6,
    effectiveness: 69,
    riskReduction: 'Medium-High',
    mitigatedRisks: ['rf-4'],
    interactions: []
  }
];

export const simulationResults = {
  baselineExpectedLoss: 18.4,
  baseline95thPercentile: 46.7,
  budget: 5.0,
  optimizedExpectedLoss: 12.7,
  optimizedReduction: 31,
  naiveSeverityExpectedLoss: 15.8,
  naiveReduction: 14.1,
};
