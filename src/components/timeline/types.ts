
export interface Caption {
  id: string;
  text: string;
  startTime: number;
  endTime: number;
}

export interface TimelineProps {
  duration: number;
  currentTime: number;
  onTimeChange: (time: number) => void;
  captions: Caption[];
  onCaptionUpdate: (caption: Caption) => void;
  trackName?: string;
}

export interface TooltipState {
  show: boolean;
  duration?: number;
  time?: number;
  x: number;
}
