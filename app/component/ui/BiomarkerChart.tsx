import React from 'react';

interface BiomarkerChartProps {
  type: 'non-hdl' | 'triglycerides' | 'remnant' | 'hdl-particle' | 'ldl-particle';
  value: number;
}

interface Range {
  min: number;
  max: number;
  steps: number[];
  unit: string;
  normalRange?: {
    from?: number;
    to?: number;
  };
}

export default function BiomarkerChart({ type, value }: BiomarkerChartProps) {
  const chartWidth = 160;
  const chartHeight = 60;
  const gridColor = '#ccc';
  const backgroundColor = '#eee';

  const ranges: Record<string, Range> = {
    'non-hdl': { 
      min: 0, 
      max: 258, 
      steps: [0, 65, 130, 258], 
      unit: 'mg/dL',
      normalRange: { to: 130 }  // Less than 130 is normal
    },
    'triglycerides': { 
      min: 0, 
      max: 168, 
      steps: [0, 45, 90, 168], 
      unit: 'mg/dL',
      normalRange: { to: 150 }  // Less than 150 is normal
    },
    'remnant': { 
      min: 0, 
      max: 322, 
      steps: [0, 85, 170, 322], 
      unit: 'mg/dL',
      normalRange: { from: 85, to: 170 }  // Between 85-170 is normal
    },
    'hdl-particle': { 
      min: 372, 
      max: 1675, 
      steps: [372, 722, 1072, 1675], 
      unit: 'nmol/L',
      normalRange: { from: 722, to: 1072 }  // Between 722-1072 is normal
    },
    'ldl-particle': { 
      min: 50, 
      max: 6013, 
      steps: [50, 1550, 3050, 6013], 
      unit: 'nmol/L',
      normalRange: { to: 1550 }  // Less than 1550 is normal
    }
  };

  // Calculate Y position based on value and range
  const calculatePosition = (val: number) => {
    const range = ranges[type];
    const percentage = (val - range.min) / (range.max - range.min);
    const invertedPercentage = 1 - percentage;
    const usableHeight = chartHeight - 20;
    return 10 + (usableHeight * invertedPercentage);
  };

  const dotY = calculatePosition(value);
  const range = ranges[type];
  
  // Calculate normal range line positions
  const normalRangeLines = [];
  if (range.normalRange) {
    if (range.normalRange.to !== undefined) {
      normalRangeLines.push({
        y: calculatePosition(range.normalRange.to),
        label: `<${range.normalRange.to}`
      });
    }
    if (range.normalRange.from !== undefined) {
      normalRangeLines.push({
        y: calculatePosition(range.normalRange.from),
        label: `>${range.normalRange.from}`
      });
    }
  }

  return (
    <div className="recharts-responsive-container" style={{ width: chartWidth, height: chartHeight, minWidth: 0 }}>
      <div 
        className="recharts-wrapper" 
        style={{ 
          position: 'relative', 
          cursor: 'default', 
          width: '100%', 
          height: '100%',
          maxHeight: chartHeight,
          maxWidth: chartWidth 
        }}
      >
        <svg
          className="recharts-surface"
          width={chartWidth}
          height={chartHeight}
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          style={{ width: '100%', height: '100%' }}
        >
          <defs>
            <clipPath id="biomarker-clip">
              <rect x="0" y="0" height={chartHeight} width={chartWidth} />
            </clipPath>
          </defs>
          
          {/* Grid Background */}
          <g className="recharts-cartesian-grid">
            <rect 
              x="0" 
              y="0" 
              width={chartWidth} 
              height={chartHeight} 
              stroke="none" 
              fill={backgroundColor} 
              className="recharts-cartesian-grid-bg" 
            />
            
            {/* Normal Range Lines */}
            <g className="recharts-cartesian-grid-horizontal">
              {normalRangeLines.map((line, index) => (
                <line
                  key={`normal-range-${index}`}
                  strokeDasharray="5 3"
                  fill="none"
                  stroke="#A9A9A9"
                  strokeWidth="1"
                  x1="0"
                  y1={line.y}
                  x2={chartWidth}
                  y2={line.y}
                />
              ))}
            </g>
            
            {/* Vertical Grid Lines */}
            <g className="recharts-cartesian-grid-vertical">
              {[0, chartWidth].map((x, index) => (
                <line
                  key={`v-${index}`}
                  strokeDasharray="3 3"
                  fill="none"
                  stroke={gridColor}
                  strokeWidth="1.5"
                  x1={x}
                  y1="0"
                  x2={x}
                  y2={chartHeight}
                />
              ))}
            </g>
          </g>
          
          {/* Center Reference Line */}
          <g className="recharts-layer recharts-reference-line">
            <line
              x1={chartWidth/2}
              y1={chartHeight}
              x2={chartWidth/2}
              y2="0"
              stroke="#22c55e"
              strokeWidth="1"
              fill="none"
              fillOpacity="1"
            />
          </g>
          
          {/* Green Fill Area - from bottom to dot */}
          <g className="recharts-layer recharts-reference-area">
            <path
              d={`M 0,${dotY} h ${chartWidth} v ${chartHeight - dotY} h -${chartWidth} Z`}
              fill="#22c55e"
              fillOpacity="0.2"
              stroke="none"
            />
          </g>
          
          {/* Dot */}
          <g className="recharts-layer recharts-line">
            <g className="recharts-layer"></g>
            <g className="recharts-layer recharts-line-dots">
              <circle
                cx={chartWidth/2}
                cy={dotY}
                r="3"
                fill="#22c55e"
                strokeWidth="1"
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}