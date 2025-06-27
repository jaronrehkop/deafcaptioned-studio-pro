
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Plus, FolderOpen, FileText } from 'lucide-react';

interface CaptionTrack {
  id: string;
  name: string;
  captions: Array<{
    id: string;
    text: string;
    startTime: string;
    endTime: string;
  }>;
}

export const CaptionSettings = () => {
  const [activeTrack, setActiveTrack] = useState<CaptionTrack | null>(null);
  const [trackName, setTrackName] = useState('');
  const [isCreatingTrack, setIsCreatingTrack] = useState(false);
  const [captionText, setCaptionText] = useState('');
  const [showSpeakerTags, setShowSpeakerTags] = useState(true);
  const [showEmotionalTones, setShowEmotionalTones] = useState(false);
  const [scriptText, setScriptText] = useState('');

  const handleCreateTrack = () => {
    if (trackName.trim()) {
      const newTrack: CaptionTrack = {
        id: Date.now().toString(),
        name: trackName.trim(),
        captions: []
      };
      setActiveTrack(newTrack);
      setTrackName('');
      setIsCreatingTrack(false);
    }
  };

  const handleAddCaption = () => {
    if (captionText.trim() && activeTrack) {
      const newCaption = {
        id: Date.now().toString(),
        text: captionText.trim(),
        startTime: '00:00:00',
        endTime: '00:00:03'
      };
      
      setActiveTrack({
        ...activeTrack,
        captions: [...activeTrack.captions, newCaption]
      });
      setCaptionText('');
    }
  };

  const handleOpenTrack = () => {
    // Mock opening a saved track for demonstration
    const mockTrack: CaptionTrack = {
      id: 'mock-track',
      name: 'English Captions',
      captions: [
        { id: '1', text: 'Welcome to our platform demonstration.', startTime: '00:00:05', endTime: '00:00:08' },
        { id: '2', text: 'This system provides professional captioning tools.', startTime: '00:00:08', endTime: '00:00:12' }
      ]
    };
    setActiveTrack(mockTrack);
  };

  const handleImportScript = () => {
    if (scriptText.trim() && activeTrack) {
      const lines = scriptText.split('\n').filter(line => line.trim());
      const newCaptions = lines.map((line, index) => ({
        id: `script-${Date.now()}-${index}`,
        text: line.trim(),
        startTime: `00:00:${String(index * 3).padStart(2, '0')}`,
        endTime: `00:00:${String((index + 1) * 3).padStart(2, '0')}`
      }));
      
      setActiveTrack({
        ...activeTrack,
        captions: [...activeTrack.captions, ...newCaptions]
      });
      setScriptText('');
    }
  };

  if (!activeTrack) {
    return (
      <div className="space-y-4">
        {/* Main Action Buttons */}
        <div className="space-y-3">
          <div>
            {!isCreatingTrack ? (
              <Button
                onClick={() => setIsCreatingTrack(true)}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg transition-all"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Caption Track
              </Button>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="track-name" className="text-white">Track Name</Label>
                <Input
                  id="track-name"
                  placeholder="e.g., English, ASL, Spanish"
                  value={trackName}
                  onChange={(e) => setTrackName(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                />
                <div className="flex space-x-2">
                  <Button onClick={handleCreateTrack} size="sm">Create</Button>
                  <Button 
                    onClick={() => {
                      setIsCreatingTrack(false);
                      setTrackName('');
                    }} 
                    variant="outline" 
                    size="sm"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>

          <Button
            onClick={handleOpenTrack}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg transition-all"
          >
            <FolderOpen className="h-4 w-4 mr-2" />
            Open Caption Track
          </Button>
        </div>

        {/* Quick Tips */}
        <div className="bg-slate-700/30 rounded-lg p-4 mt-6">
          <h4 className="text-white font-semibold mb-3 flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Caption Rules & Tips
          </h4>
          <div className="space-y-2 text-sm text-slate-300">
            <p>• Max 2 lines per caption</p>
            <p>• Max 42 characters per line</p>
            <p>• Avoid stacked speakers</p>
            <p>• Use speaker identification for clarity</p>
            <p>• Include sound descriptions for accessibility</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Track Header */}
      <div className="bg-slate-700/50 rounded-lg p-3">
        <h3 className="text-white font-semibold">{activeTrack.name}</h3>
        <p className="text-sm text-slate-400">{activeTrack.captions.length} captions</p>
      </div>

      {/* Caption Input */}
      <div className="space-y-2">
        <Label htmlFor="caption-input" className="text-white">Add New Caption</Label>
        <Textarea
          id="caption-input"
          placeholder="Enter caption text..."
          value={captionText}
          onChange={(e) => setCaptionText(e.target.value)}
          className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 min-h-[60px]"
        />
        <Button onClick={handleAddCaption} size="sm" className="w-full">
          Add Caption
        </Button>
      </div>

      {/* Import Script */}
      <div className="space-y-2">
        <Label htmlFor="script-import" className="text-white">Import Script (Optional)</Label>
        <Textarea
          id="script-import"
          placeholder="Paste your script here to split into captions..."
          value={scriptText}
          onChange={(e) => setScriptText(e.target.value)}
          className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 min-h-[60px]"
        />
        <Button onClick={handleImportScript} variant="outline" size="sm" className="w-full">
          Import & Split Script
        </Button>
      </div>

      {/* Toggle Features */}
      <div className="space-y-3">
        <h4 className="text-white font-semibold text-sm">Display Options</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="speaker-tags"
              checked={showSpeakerTags}
              onCheckedChange={setShowSpeakerTags}
            />
            <Label htmlFor="speaker-tags" className="text-slate-300 text-sm">
              Show speaker tags
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="emotional-tones"
              checked={showEmotionalTones}
              onCheckedChange={setShowEmotionalTones}
            />
            <Label htmlFor="emotional-tones" className="text-slate-300 text-sm">
              Show emotional tones
            </Label>
          </div>
        </div>
      </div>

      {/* Caption List */}
      {activeTrack.captions.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-white font-semibold text-sm">Caption List</h4>
          <div className="max-h-32 overflow-y-auto space-y-1">
            {activeTrack.captions.map((caption) => (
              <div key={caption.id} className="bg-slate-700/30 rounded p-2 text-sm">
                <div className="text-slate-400 text-xs mb-1">
                  {caption.startTime} - {caption.endTime}
                </div>
                <div className="text-white">{caption.text}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="pt-2 border-t border-slate-700">
        <Button
          onClick={() => setActiveTrack(null)}
          variant="outline"
          size="sm"
          className="w-full"
        >
          Close Track
        </Button>
      </div>
    </div>
  );
};
