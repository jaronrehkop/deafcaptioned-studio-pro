
import React, { useState, useRef } from 'react';
import { Button } from './ui/button';
import { VideoIcon, Upload, Play, Pause } from 'lucide-react';

interface VideoPlayerProps {
  onVideoLoad?: (duration: number) => void;
  onTimeUpdate?: (currentTime: number) => void;
  currentTime?: number;
}

export const VideoPlayer = ({ onVideoLoad, onTimeUpdate, currentTime }: VideoPlayerProps) => {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
    }
  };

  const handleVideoLoaded = () => {
    if (videoRef.current) {
      const videoDuration = videoRef.current.duration;
      setDuration(videoDuration);
      onVideoLoad?.(videoDuration);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && onTimeUpdate) {
      onTimeUpdate(videoRef.current.currentTime);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Sync video with external currentTime updates
  React.useEffect(() => {
    if (videoRef.current && currentTime !== undefined) {
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  return (
    <div className="relative">
      {!videoSrc ? (
        <div className="bg-black rounded-lg aspect-video flex flex-col items-center justify-center space-y-4">
          <VideoIcon className="h-16 w-16 text-white opacity-50" />
          <div className="text-center text-white">
            <p className="text-lg font-semibold mb-2">Upload Video</p>
            <p className="text-sm opacity-70 mb-4">Select a video file to start captioning</p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Upload className="h-4 w-4 mr-2" />
              Choose Video File
            </Button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      ) : (
        <div className="relative bg-black rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            src={videoSrc}
            className="w-full aspect-video"
            onLoadedMetadata={handleVideoLoaded}
            onTimeUpdate={handleTimeUpdate}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
          
          {/* Video Controls Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center space-x-4">
            <Button
              onClick={togglePlayPause}
              size="sm"
              className="bg-black/50 hover:bg-black/70 text-white border-white/20"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            
            <div className="flex-1 text-white text-sm">
              <span className="opacity-70">
                {Math.floor(videoRef.current?.currentTime || 0)}s / {Math.floor(duration)}s
              </span>
            </div>
            
            <Button
              onClick={() => fileInputRef.current?.click()}
              size="sm"
              variant="outline"
              className="bg-black/50 hover:bg-black/70 text-white border-white/20"
            >
              <Upload className="h-4 w-4 mr-1" />
              Change Video
            </Button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};
