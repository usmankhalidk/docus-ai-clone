// types.ts
export interface BiomarkerRange {
    min: number;
    max: number;
    steps: number[];
    unit: string;
    normalRange: {
      from?: number;
      to?: number;
    };
  }
  
  export interface UnitConversion {
    from: string;
    to: string;
    multiply: number;
  }
  
  export interface BiomarkerData {
    id: string;
    name: string;
    value: number;
    unit: string;
    date: string;
  }
  