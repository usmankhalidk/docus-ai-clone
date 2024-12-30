import { BiomarkerRange } from "../types/biomarkers";

export const UNIT_CONVERSIONS: Record<string, Record<string, number>> = {
    'Non-HDL Cholesterol': {
      'mg/dL': 1,
      'mmol/L': 0.0259,
      'g/L': 0.01,
      'mg%': 1
    },
    'Triglycerides': {
      'mg/dL': 1,
      'mmol/L': 0.0113,
      'mcmol/L': 11.3,
      'g/L': 0.001,
      'mg/L': 1,
      'ng/mL': 1000,
      'mcg/mL': 1,
      'mg/100mL': 1,
      'mg%': 1
    },
    'Remnant cholesterol': {
      'mg/dL': 1,
      'mmol/L': 0.0259
    },
    'HDL Particle Number': {
      'nmol/L': 1,
      'mcmol/L': 0.001
    },
    'LDL Particle Number': {
      'nmol/L': 1
    },
    'Serum Total Cholesterol': {
        'mg/dL': 1,
        'mmol/L': 0.0259,
        'g/L': 0.01,
        'mg%': 1
      },
      'Serum HDL-Cholesterol': {
        'mg/dL': 1,
        'mmol/L': 0.0259,
        'g/L': 0.01,
        'mg%': 1
      }
  };
  
  export const BIOMARKER_RANGES: Record<string, BiomarkerRange> = {
    'non-hdl': { 
      min: 0, 
      max: 258, 
      steps: [0, 65, 130, 258], 
      unit: 'mg/dL',
      normalRange: { to: 130 }
    },
    'triglycerides': { 
      min: 0, 
      max: 168, 
      steps: [0, 45, 90, 168], 
      unit: 'mg/dL',
      normalRange: { to: 150 }
    },
    'remnant': { 
      min: 0, 
      max: 322, 
      steps: [0, 85, 170, 322], 
      unit: 'mg/dL',
      normalRange: { from: 85, to: 170 }
    },
    'hdl-particle': { 
      min: 372, 
      max: 1675, 
      steps: [372, 722, 1072, 1675], 
      unit: 'nmol/L',
      normalRange: { from: 722, to: 1072 }
    },
    'ldl-particle': { 
      min: 50, 
      max: 6013, 
      steps: [50, 1550, 3050, 6013], 
      unit: 'nmol/L',
      normalRange: { to: 1550 }
    },
    'serum-total-cholesterol': {
    min: 0,
    max: 300,
    steps: [0, 100, 200, 300],
    unit: 'mg/dL',
    normalRange: { to: 200 }
  },
  'serum-hdl-cholesterol': {
    min: 0,
    max: 100,
    steps: [0, 20, 40, 60, 100],
    unit: 'mg/dL',
    normalRange: { from: 40, to: 60 }
  },
  };
  
  export const convertValue = (value: number, fromUnit: string, toUnit: string, biomarkerName: string): number => {
    const conversions = UNIT_CONVERSIONS[biomarkerName];
    if (!conversions) return value;
  
    const fromFactor = conversions[fromUnit] || 1;
    const toFactor = conversions[toUnit] || 1;
    
    // Convert to base unit (mg/dL or nmol/L) then to target unit
    return (value / fromFactor) * toFactor;
  };
  