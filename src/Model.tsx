import React, { useState, useRef, useEffect } from 'react';
// import { Button } from '@/components/ui/button';

const canvasSize = 356;
const frameCount = 10;

export default function PixelArtCardApp() {
  const [frames, setFrames] = useState(() => Array(frameCount).fill(null).map(() => createBlankImageData()));
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(500);
  const [onionSkinning, setOnionSkinning] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawColor = '#FF0080';
  const [isDrawing, setIsDrawing] = useState(false);

//   add a border box to canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
        canvas.style.border = '2px solid #6A89A7';
        canvas.style.imageRendering = 'pixelated';
        canvas.style.imageRendering = '-moz-crisp-edges';
        canvas.style.imageRendering = 'crisp-edges';
        }
    }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasSize, canvasSize);
    if (onionSkinning && currentFrame > 0) {
      const prev = frames[currentFrame - 1];
      ctx.putImageData(prev, 0, 0);
      ctx.globalAlpha = 0.3;
    }
    ctx.putImageData(frames[currentFrame], 0, 0);
    ctx.globalAlpha = 1;
  }, [frames, currentFrame, onionSkinning]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frameCount);
    }, playbackSpeed);
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  const handleDraw = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * canvasSize);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * canvasSize);

    const imageData = frames[currentFrame];
    const idx = (y * canvasSize + x) * 4;
    const [r, g, b] = hexToRgb(drawColor);
    imageData.data[idx] = r;
    imageData.data[idx + 1] = g;
    imageData.data[idx + 2] = b;
    imageData.data[idx + 3] = 255;

    const newFrames = [...frames];
    newFrames[currentFrame] = imageData;
    setFrames(newFrames);
  };

  return (
    <div className="w-screen h-screen bg-gray-900 text-white flex flex-col items-center p-4">
        <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .container {
          display: flex;
          background: rgba(0, 0, 0, 0.8);
        }
        
        .floating {
          animation: float 3s ease-in-out infinite;
        }

        .slide-panel {
          transition: transform 0.3s ease-out;
        }

        .pixel-canvas {
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
        }
      `}</style>
      <h1 className="text-2xl font-bold mb-2 font-mono">Pixel Art Greeting Card</h1>
      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        className="border border-white mb-4 cursor-crosshair"
        onMouseDown={() => setIsDrawing(true)}
        onMouseUp={() => setIsDrawing(false)}
        onMouseMove={(e) => isDrawing && handleDraw(e)}
      />

      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 rounded-t-2xl shadow-lg flex flex-col items-center">
        <div className="mb-2">
          <button onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? 'Pause' : 'Play'}</button>
          <button onClick={() => setCurrentFrame((currentFrame - 1 + frameCount) % frameCount)} className="ml-2">Prev</button>
          <button onClick={() => setCurrentFrame((currentFrame + 1) % frameCount)} className="ml-2">Next</button>
        </div>
        <div className="flex items-center">
          <label className="mr-2">Speed (ms)</label>
          <input
            type="range"
            min="100"
            max="1000"
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(parseInt(e.target.value))}
          />
          <label className="ml-4">Onion Skin</label>
          <input
            type="checkbox"
            checked={onionSkinning}
            onChange={(e) => setOnionSkinning(e.target.checked)}
            className="ml-2"
          />
        </div>
      </div>
    </div>
  );
}

function createBlankImageData(): ImageData {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  return ctx.createImageData(canvasSize, canvasSize);
}

function hexToRgb(hex: string): [number, number, number] {
  const bigint = parseInt(hex.replace('#', ''), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}
