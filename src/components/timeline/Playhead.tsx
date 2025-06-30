
import React from 'react';

interface PlayheadProps {
  currentTime: number;
  pixelsPerSecond: number;
  onMouseDown: (event: React.MouseEvent) => void;
}

export const Playhead = ({ currentTime, pixelsPerSecond, onMouseDown }: PlayheadProps) => {
  return (
    <div
      className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10 cursor-grab active:cursor-grabbing hover:w-1 transition-all"
      style={{ left: `${currentTime * pixelsPerSecond}px` }}
      onMouseDown={onMouseDown}
    >
      <div className="absolute -top-1 -left-1 w-3 h-3 bg-red-500 rotate-45 transform origin-center cursor-grab active:cursor-grabbing" />
    </div>
  );
};
