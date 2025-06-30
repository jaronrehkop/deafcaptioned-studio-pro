
import React from 'react';
import { Caption } from './types';

interface CaptionBlockProps {
  caption: Caption;
  pixelsPerSecond: number;
  onMouseDown: (captionId: string, event: React.MouseEvent, type: 'move' | 'resize-start' | 'resize-end') => void;
}

export const CaptionBlock = ({ caption, pixelsPerSecond, onMouseDown }: CaptionBlockProps) => {
  return (
    <div
      className="absolute top-2 h-12 bg-blue-500/80 border border-blue-400 rounded cursor-move flex items-center px-2 hover:bg-blue-500/90 transition-colors group"
      style={{
        left: `${caption.startTime * pixelsPerSecond}px`,
        width: `${(caption.endTime - caption.startTime) * pixelsPerSecond}px`,
        minWidth: '60px'
      }}
      onMouseDown={(e) => onMouseDown(caption.id, e, 'move')}
    >
      {/* Display-only text - no editing */}
      <span className="text-white text-xs truncate font-medium flex-1 pointer-events-none select-none">
        {caption.text}
      </span>
      
      {/* Resize handles - always visible on hover */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-2 bg-blue-300/70 cursor-ew-resize opacity-0 group-hover:opacity-100 transition-opacity rounded-l hover:bg-blue-300" 
        onMouseDown={(e) => onMouseDown(caption.id, e, 'resize-start')}
        title="Drag to adjust start time"
      />
      <div 
        className="absolute right-0 top-0 bottom-0 w-2 bg-blue-300/70 cursor-ew-resize opacity-0 group-hover:opacity-100 transition-opacity rounded-r hover:bg-blue-300" 
        onMouseDown={(e) => onMouseDown(caption.id, e, 'resize-end')}
        title="Drag to adjust end time"
      />
    </div>
  );
};
