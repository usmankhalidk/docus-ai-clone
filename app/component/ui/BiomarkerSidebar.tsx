'use client';

import { Select, Drawer } from 'antd';
import { FaX, FaFlag } from 'react-icons/fa6';
import { useState } from 'react';

import { BiomarkerData, BiomarkerRange } from '@/app/types/biomarkers';
import { BIOMARKER_RANGES, convertValue, UNIT_CONVERSIONS } from '@/app/utils/biomarkers';
import DetailedBiomarkerChart from './BiomarkerDetailChart';

interface BiomarkerDashboardProps {
  open: boolean;
  onClose: () => void;
  biomarker: BiomarkerData | null;
}

export default function BiomarkerDashboard({ open, onClose, biomarker }: BiomarkerDashboardProps) {
  if (!biomarker) return null;

  const [selectedUnit, setSelectedUnit] = useState(biomarker.unit);

  const getUnitOptions = (biomarkerName: string) => {
    const conversions = UNIT_CONVERSIONS[biomarkerName];
    if (!conversions) return [];

    return Object.keys(conversions).map(unit => ({
      value: unit,
      label: unit
    }));
  };

  const handleUnitChange = (newUnit: string) => {
    setSelectedUnit(newUnit);
  };

  const convertedValue = convertValue(biomarker.value, biomarker.unit, selectedUnit, biomarker.name);
  const biomarkerKey = biomarker.name.toLowerCase().replace(/ /g, '-');
  const range = BIOMARKER_RANGES[biomarkerKey];
  const getStatus = (): { status: string; color: string } => {
    if (!range?.normalRange) return { status: 'N/A', color: 'gray' };

    const baseValue = convertValue(biomarker.value, biomarker.unit, range.unit, biomarker.name);
    const { normalRange } = range;

    if (normalRange.from && normalRange.to) {
      if (baseValue < normalRange.from) return { status: 'Low', color: '#F19A48' };
      if (baseValue > normalRange.to) return { status: 'High', color: '#E53E3E' };
      return { status: 'Normal', color: '#38A169' };
    } else if (normalRange.to) {
      if (baseValue > normalRange.to) return { status: 'High', color: '#E53E3E' };
      return { status: 'Normal', color: '#38A169' };
    }

    return { status: 'N/A', color: 'gray' };
  };

  const { status, color } = getStatus();

  return (
    <Drawer
      open={open}
      onClose={onClose}
      width={800}
      closable={false}
      className="p-0"
    >
      <div className="p-6">
        <button 
          onClick={onClose}
          className="absolute top-6 left-6 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FaX className="w-5 h-5" />
        </button>

        <h1 className="text-2xl font-semibold text-center mb-4">{biomarker.name}</h1>

        <p className="text-gray-600 mb-6">
          Serum {biomarker.name.toLowerCase()} is a measure of all the 'bad' types of cholesterol in the blood, excluding HDL. It is used to assess the risk of heart disease.
        </p>

        <div className="flex items-center justify-between mb-8">
          <button 
            className="flex items-center gap-2 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-100"
          >
            <FaFlag className="w-4 h-4" />
            Report Issue
          </button>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Unit</span>
            <Select
              value={selectedUnit}
              onChange={handleUnitChange}
              style={{ width: 120 }}
              options={getUnitOptions(biomarker.name)}
              className="w-32"
            />
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <h3 className="font-medium">Last result</h3>
          <div className="flex justify-between items-baseline">
            <span className="text-gray-600">{biomarker.date}</span>
            <span className="text-xl font-medium" style={{ color }}>
              {convertedValue.toFixed(1)} {selectedUnit}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-gray-600 text-sm">Status:</span>
              <span className="ml-2" style={{ color }}>{status}</span>
            </div>
            <div>
              <span className="text-gray-600 text-sm">Normal Range:</span>
              <span className="ml-2">
                {range?.normalRange ? (
                  range.normalRange.from 
                    ? `${range.normalRange.from}-${range.normalRange.to} ${range.unit}`
                    : `<${range.normalRange.to} ${range.unit}`
                ) : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <DetailedBiomarkerChart 
            biomarker={{
              ...biomarker,
              value: convertedValue,
              unit: selectedUnit
            }}
           
          />
        </div>

        <div className="flex justify-between items-center border-t pt-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">{biomarker.date}</span>
            <span className="font-medium" style={{ color }}>
              {convertedValue.toFixed(1)} {selectedUnit}
            </span>
          </div>
          <button className="text-orange-500">{'>'}</button>
        </div>
      </div>
    </Drawer>
  );
}