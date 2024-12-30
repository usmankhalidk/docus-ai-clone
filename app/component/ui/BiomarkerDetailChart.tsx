import { convertValue } from '@/app/utils/biomarkers';
import React, { useState } from 'react';
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  Scatter,
  ScatterChart
} from 'recharts';

interface RangeLevel {
  label: string;
  min: number;
  max?: number;
  color: string;
}

const BIOMARKER_STATIC_TEXTS: Record<keyof typeof BIOMARKER_CONFIGS, string> = {
  'Serum Total Cholesterol': 'Serum Total Cholesterol: Desirable (<200) Borderline High (200-239) High (≥240) mg/dL',
  'Serum HDL-Cholesterol': 'Serum HDL-Cholesterol: Low (<40) Normal (40-59) High (≥60) mg/dL',
  'Non-HDL Cholesterol': 'Non-HDL Cholesterol: Desirable (<129) Above Desirable (130 - 159) Borderline High (160 - 189) High (190-219) Very High (≥220) mg/dL',
  'Triglycerides': 'Triglycerides: Normal (<150) Borderline High (150 - 199) High (200-499) Very High (≥500) mmol/L',
  'Remnant cholesterol': 'Remnant cholesterol: Desirable (<200) Borderline High (200 - 240) High (>240) mg/dL',
  'HDL Particle Number': 'HDL Particle Number: Normal range: 1007.6 - 1034.4 nmol/L',
  'LDL Particle Number': 'LDL Particle Number: Normal range: 100 - 3340.8 nmol/L'
};


const BIOMARKER_RANGE_DETAILS: Record<string, RangeLevel[]> = {
  'Non-HDL Cholesterol': [
    { label: 'Desirable', min: 0, max: 129, color: '#38A169' },
    { label: 'Above Desirable', min: 130, max: 159, color: '#ECC94B' },
    { label: 'Borderline High', min: 160, max: 189, color: '#ED8936' },
    { label: 'High', min: 190, max: 219, color: '#E53E3E' },
    { label: 'Very High', min: 220, color: '#822727' }
  ],
  'Triglycerides': [
    { label: 'Normal', min: 0, max: 149, color: '#38A169' },
    { label: 'Borderline High', min: 150, max: 199, color: '#ECC94B' },
    { label: 'High', min: 200, max: 499, color: '#E53E3E' },
    { label: 'Very High', min: 500, color: '#822727' }
  ],
  'Remnant cholesterol': [
    { label: 'Low', min: 0, max: 84, color: '#4299E1' },
    { label: 'Normal', min: 85, max: 170, color: '#38A169' },
    { label: 'High', min: 171, color: '#E53E3E' }
  ],
  'HDL Particle Number': [
    { label: 'Low', min: 0, max: 721, color: '#E53E3E' },
    { label: 'Normal', min: 722, max: 1072, color: '#38A169' },
    { label: 'High', min: 1073, color: '#4299E1' }
  ],
  'LDL Particle Number': [
    { label: 'Normal', min: 0, max: 1549, color: '#38A169' },
    { label: 'High', min: 1550, color: '#E53E3E' }
  ],
  'Serum Total Cholesterol': [
    { label: 'Desirable', min: 0, max: 199, color: '#38A169' },
    { label: 'Borderline High', min: 200, max: 239, color: '#ECC94B' },
    { label: 'High', min: 240, color: '#E53E3E' }
  ],
  'Serum HDL-Cholesterol': [
    { label: 'Low', min: 0, max: 39, color: '#E53E3E' },
    { label: 'Normal', min: 40, max: 59, color: '#38A169' },
    { label: 'High', min: 60, color: '#4299E1' }
  ],
};
const BIOMARKER_CONFIGS: Record<keyof typeof BIOMARKER_RANGE_DETAILS, any> = {
  'Serum Total Cholesterol': {
    description: 'Total amount of cholesterol in blood',
    baseUnit: 'mg/dL',
    range: {
      min: 0,
      max: 300,
      steps: [0, 100, 200, 300],
      normalRange: { to: 200 }
    },
    categories: [
      { range: [0, 199], label: 'Desirable' },
      { range: [200, 239], label: 'Borderline High' },
      { range: [240, Infinity], label: 'High' }
    ]
  },
  'Serum HDL-Cholesterol': {
    description: 'High-density lipoprotein cholesterol levels',
    baseUnit: 'mg/dL',
    range: {
      min: 0,
      max: 100,
      steps: [0, 20, 40, 60, 100],
      normalRange: { from: 40, to: 60 }
    },
    categories: [
      { range: [0, 39], label: 'Low' },
      { range: [40, 59], label: 'Normal' },
      { range: [60, Infinity], label: 'High' }
    ]
  },
  'Non-HDL Cholesterol': {
    description: 'Measure of all types of cholesterol excluding HDL',
    baseUnit: 'mg/dL',
    range: { 
      min: 0, 
      max: 258, 
      steps: [0, 65, 130, 258], 
      normalRange: { to: 130 }
    },
    categories: [
      { range: [0, 129], label: 'Desirable' },
      { range: [130, 159], label: 'Above Desirable' },
      { range: [160, 189], label: 'Borderline High' },
      { range: [190, 219], label: 'High' },
      { range: [220, Infinity], label: 'Very High' }
    ]
  },
  'Triglycerides': {
    description: 'Type of fat found in blood',
    baseUnit: 'mg/dL',
    range: { 
      min: 0, 
      max: 168, 
      steps: [0, 45, 90, 168], 
      normalRange: { to: 150 }
    },
    categories: [
      { range: [0, 149], label: 'Normal' },
      { range: [150, 199], label: 'Borderline High' },
      { range: [200, 499], label: 'High' },
      { range: [500, Infinity], label: 'Very High' }
    ]
  },
  'Remnant cholesterol': {
    description: 'Cholesterol content of triglyceride-rich lipoproteins',
    baseUnit: 'mg/dL',
    range: { 
      min: 0, 
      max: 322, 
      steps: [0, 85, 170, 322], 
      normalRange: { from: 85, to: 170 }
    },
    categories: [
      { range: [0, 199], label: 'Desirable' },
      { range: [200, 240], label: 'Borderline High' },
      { range: [241, Infinity], label: 'High' }
    ]
  },
  'HDL Particle Number': {
    description: 'Number of HDL particles per unit volume',
    baseUnit: 'nmol/L',
    range: { 
      min: 372, 
      max: 1675, 
      steps: [372, 722, 1072, 1675], 
      normalRange: { from: 1007.6, to: 1034.4 }
    },
    categories: [
      { range: [1007.6, 1034.4], label: 'Normal' }
    ]
  },
  'LDL Particle Number': {
    description: 'Number of LDL particles per unit volume',
    baseUnit: 'nmol/L',
    range: { 
      min: 50, 
      max: 6013, 
      steps: [50, 1550, 3050, 6013], 
      normalRange: { from: 100, to: 3340.8 }
    },
    categories: [
      { range: [100, 3340.8], label: 'Normal' }
    ]
  }
};

const getValueStatus = (value: number, biomarkerName: string, unit: string): { status: string; color: string } => {
  const ranges = BIOMARKER_RANGE_DETAILS[biomarkerName];
  if (!ranges) return { status: 'Unknown', color: '#666666' };
  
  const convertedValue = convertValue(value, unit, BIOMARKER_CONFIGS[biomarkerName].baseUnit, biomarkerName);
  
  for (const range of ranges) {
    if (convertedValue >= range.min && (!range.max || convertedValue <= range.max)) {
      return { status: range.label, color: range.color };
    }
  }
  
  return { status: 'Unknown', color: '#666666' };
};

const formatRangeText = (ranges: RangeLevel[], unit: string, biomarkerName: string): string => {
  return ranges.map(range => {
    const min = convertValue(range.min, BIOMARKER_CONFIGS[biomarkerName].baseUnit, unit, biomarkerName);
    const max = range.max ? convertValue(range.max, BIOMARKER_CONFIGS[biomarkerName].baseUnit, unit, biomarkerName) : null;
    
    if (!max) {
      return `${range.label} (≥${min.toFixed(0)})`;
    } else if (range.min === 0) {
      return `${range.label} (<${max.toFixed(0)})`;
    } else {
      return `${range.label} (${min.toFixed(0)}-${max.toFixed(0)})`;
    }
  }).join(' | ');
};

interface DataPoint {
  date: string;
  value: number | null;
}

interface DetailedBiomarkerChartProps {
  biomarker: {
    name: keyof typeof BIOMARKER_CONFIGS;
    value: number;
    unit: string;
    date: string;
  };
}

const DetailedBiomarkerChart: React.FC<DetailedBiomarkerChartProps> = ({
  biomarker
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  const config = BIOMARKER_CONFIGS[biomarker.name];
  if (!config) return null;

  const { status, color } = getValueStatus(biomarker.value, biomarker.name, biomarker.unit);
  const ranges = BIOMARKER_RANGE_DETAILS[biomarker.name];
  
  const data: DataPoint[] = [
    { date: 'Mar 10, 2024', value: null },
    { date: 'Mar 15, 2024', value: null },
    { date: 'Mar 20, 2024', value: biomarker.value },
    { date: 'Mar 30, 2024', value: null }
  ];

  const pointData = data.filter(d => d.value !== null);
  const convertSteps = config.range.steps.map((item: number) => {
    let convertedValue = convertValue(item, BIOMARKER_CONFIGS[biomarker.name].baseUnit, biomarker?.unit, biomarker.name);
  
    // Round the value to the nearest multiple of 0.25
    convertedValue = Math.round(convertedValue * 4) / 4;
  
    return convertedValue;
  });
  const staticText = BIOMARKER_STATIC_TEXTS[biomarker.name] || '';
  

  return (
    <div 
      className="w-full h-64 min-w-0 relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{ top: 10, right: 50, left: 60, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis
            dataKey="date"
            type="category"
            allowDuplicatedCategory={false}
            domain={data.map(d => d.date)}
            tick={{ fill: '#363636', fontSize: '0.90em' }}
            tickLine={{ stroke: '#666' }}
            axisLine={{ stroke: '#666' }}
            label={{ value: 'Date', position: 'bottom', offset: -20, fill: '#808080' }}
          />
          <YAxis
            domain={[convertValue(config.range.min, BIOMARKER_CONFIGS[biomarker.name].baseUnit,biomarker?.unit, biomarker.name), convertValue(config.range.max, BIOMARKER_CONFIGS[biomarker.name].baseUnit,biomarker?.unit, biomarker.name)]}
            ticks={convertSteps}
            tick={{ fill: '#666' }}
            tickLine={{ stroke: '#666' }}
            axisLine={{ stroke: '#666' }}
            label={{ value: biomarker.unit, angle: -90, position: 'insideLeft', offset: 5, fill: '#808080' }}
          />
         <ReferenceLine
            x="Mar 20, 2024"
            stroke={color}
            strokeWidth={2}
          />
          <Scatter
            data={pointData}
            fill={color}
            name="Value"
            dataKey="value"
          >
            {pointData.map((entry, index) => (
              <circle key={index} cx={0} cy={0} r={6} fill={color} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
      
      {showTooltip && (
        <div className="absolute top-2 left-1/4 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <div className="mb-2 font-medium" style={{ color }}>
            {biomarker.value.toFixed(1)} {biomarker.unit}
          </div>
          <div className="text-gray-600">
            {biomarker.date}
          </div>
          <div className="text-sm mt-2" style={{ color }}>
            Status: {status}
          </div>
          <div className="text-xs mt-2 text-gray-600 max-w-sm">
            {staticText}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailedBiomarkerChart;