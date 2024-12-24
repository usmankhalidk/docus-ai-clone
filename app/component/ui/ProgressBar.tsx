import React from "react";

interface ProgressBarProps {
  value: number; // Current progress value
  max?: number; // Maximum value, defaults to 100
}

const CircularProgressBar: React.FC<ProgressBarProps> = ({ value, max = 100 }) => {
  // Calculate stroke dasharray and dashoffset based on progress
  const radius = 20; // Smaller radius of the circle
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const strokeDasharray = circumference; // Full length of the circle's stroke
  const strokeDashoffset = circumference - (value / max) * circumference; // Offset for the current progress

  // Determine stroke color based on value for progress
  let progressColor = 'stroke-gray-400'; // Default color is gray for 0% progress
  if (value > 0) {
    progressColor = value < 50 ? 'stroke-red-500' : 'stroke-teal-500'; // Red if less than 50%, teal otherwise
  }

  // Determine background color based on value for background circle
  let backgroundColor = 'rgba(169, 169, 169, 0.2)'; // Default gray for 0% progress
  if (value > 0) {
    backgroundColor = value < 50 ? 'rgba(255, 99, 71, 0.2)' : 'rgba(0, 128, 128, 0.2)'; // Light red for <50%, teal for >=50%
  }

  return (
    <div className="relative flex items-center justify-center w-16 h-16"> {/* Smaller container size */}
      {/* Background Circle (Dynamically colored based on progress) */}
      <svg className="absolute" width="100%" height="100%" viewBox="0 0 60 60"> {/* Adjusted SVG size */}
        <circle
          cx="30"
          cy="30"
          r={radius}
          stroke={backgroundColor} // Dynamically set the background color based on progress
          strokeWidth="6" // Adjusted stroke width for smaller circle
          fill="none"
          strokeLinecap="round" // Rounded edges
        />
      </svg>

      {/* Progress Circle */}
      <svg width="100%" height="100%" viewBox="0 0 60 60" className="transform rotate-180">
        <circle
          cx="30"
          cy="30"
          r={radius}
          stroke="currentColor"
          strokeWidth="6" // Adjusted stroke width for smaller circle
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className={progressColor} // Dynamically set the color based on the value
          strokeLinecap="round" // Rounded edges
        />
      </svg>

      {/* Center Text */}
      <div className="absolute text-xs text-black"> {/* Smaller text size */}
        {Math.round((value / max) * 100)}%
      </div>
    </div>
  );
};

export default CircularProgressBar;
