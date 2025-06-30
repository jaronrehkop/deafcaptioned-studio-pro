
import React from 'react';

interface SnapLinesProps {
  duration: number;
  pixelsPerSecond: number;
}

export const SnapLines = ({ duration, pixelsPerSecond }: SnapLinesProps) => {
  // Generate time markers at 1-second intervals
  const timeMarkers = [];
  for (let i = 0; i <= Math.ceil(duration); i++) {
    timeMarkers.push(i);
  }

  return (
    <>
      {timeMarkers.map((time) => (
        <div
          key={`snap-${time}`}
          className="absolute top-6 bottom-0 w-px bg-slate-600/30"
          style={{ left: `${time * pixelsPerSecond}px` }}
        />
      ))}
    </>
  );
};
