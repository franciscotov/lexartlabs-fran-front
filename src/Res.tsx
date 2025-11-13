import React, { useState, useRef, useEffect, useCallback } from 'react';
// import { ChevronUp, Play, Pause, Download, Type, Sparkles, Heart, Square, Circle } from 'lucide-react';

interface Frame {
  id: string;
  imageData: ImageData | null;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  type: 'confetti' | 'heart';
}

interface TextOverlay {
  text: string;
  x: number;
  y: number;
  font: string;
  color: string;
}

enum ToolEnum { 
    pen = 'pen',
    eraser = 'eraser',
    fill = 'fill',
    text = 'text',
    particle = 'particle'
}

type Tool = ToolEnum.pen | ToolEnum.eraser | ToolEnum.fill | ToolEnum.text | ToolEnum.particle;

const CANVAS_SIZE = 500;
const PIXEL_SIZE = 3;
const RETRO_FONTS = ['monospace', 'courier', 'impact'];
const COLORS = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', 
  '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#FFC0CB', '#A52A2A'
];


export default function PixelArtGreetingCard() {
    window.addEventListener('resize', resizeCanvas);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [frames, setFrames] = useState<Frame[]>([{ id: '1', imageData: null }]);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(100);
  const [showControls, setShowControls] = useState(false);
  const [tool, setTool] = useState<Tool>(ToolEnum.pen);
  const [textOverlays, setTextOverlays] = useState<TextOverlay[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [onionSkin, setOnionSkin] = useState(true);
  const [isDrawing, setIsDrawing] = useState(false);
  const [particleType, setParticleType] = useState<'confetti' | 'heart'>('confetti');
  const animationRef = useRef<number>();

    function resizeCanvas() {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        }
    }

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (canvas) {
        canvas.style.border = '2px solid #6A89A7';
        canvas.style.imageRendering = 'pixelated';
        canvas.style.imageRendering = '-moz-crisp-edges';
        canvas.style.imageRendering = 'crisp-edges';
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }, []);

  // Animation loop
  useEffect(() => {
    if (isPlaying && frames.length > 1) {
      const animate = () => {
        setCurrentFrameIndex((prev) => (prev + 1) % frames.length);
      };
      
      const interval = setInterval(animate, 500 - playbackSpeed);
      return () => clearInterval(interval);
    }
  }, [isPlaying, frames.length, playbackSpeed]);

  // Particle physics
  useEffect(() => {
    if (particles.length === 0) return;

    const updateParticles = () => {
      setParticles(prev => prev
        .map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.5,
          life: p.life - 0.02
        }))
        .filter(p => p.life > 0 && p.y < CANVAS_SIZE)
      );
    };

    const interval = setInterval(updateParticles, 16);
    return () => clearInterval(interval);
  }, [particles.length]);

  // Draw frame with onion skinning
  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw onion skin
    if (onionSkin && frames.length > 1) {
      ctx.globalAlpha = 0.3;
      
      // Previous frame
      if (currentFrameIndex > 0 && frames[currentFrameIndex - 1].imageData) {
        ctx.putImageData(frames[currentFrameIndex - 1].imageData as any, 0, 0);
      }
      
      // Next frame
      if (currentFrameIndex < frames.length - 1 && frames[currentFrameIndex + 1].imageData) {
        ctx.putImageData(frames[currentFrameIndex + 1].imageData as any, 0, 0);
      }
      
      ctx.globalAlpha = 1;
    }

    // Draw current frame
    if (frames[currentFrameIndex]?.imageData) {
      ctx.putImageData(frames[currentFrameIndex].imageData as ImageData, 0, 0);
    }

    // Draw particles
    particles.forEach(particle => {
      ctx.save();
      ctx.globalAlpha = particle.life;
      
      if (particle.type === 'heart') {
        ctx.fillStyle = particle.color;
        ctx.font = '12px serif';
        ctx.fillText('❤️', particle.x, particle.y);
      } else {
        ctx.fillStyle = particle.color;
        ctx.fillRect(particle.x, particle.y, 4, 4);
      }
      
      ctx.restore();
    });

    // Draw text overlays
    textOverlays.forEach(overlay => {
      ctx.fillStyle = overlay.color;
      ctx.font = `16px ${overlay.font}`;
      ctx.fillText(overlay.text, overlay.x, overlay.y);
    });
  }, [frames, currentFrameIndex, onionSkin, particles, textOverlays]);

  useEffect(() => {
    drawFrame();
  }, [drawFrame]);

  // Save current frame
  const saveFrame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    const newFrames = [...frames];
    newFrames[currentFrameIndex] = { ...newFrames[currentFrameIndex], imageData };
    setFrames(newFrames);
  };

  // Drawing functions
  const getPixelCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const x = Math.floor((clientX - rect.left) / (rect.width / CANVAS_SIZE));
    const y = Math.floor((clientY - rect.top) / (rect.height / CANVAS_SIZE));
    
    return { x, y };
  };

  const drawPixel = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (tool === ToolEnum.pen) {
      ctx.fillStyle = selectedColor;
      ctx.fillRect(x, y, 1, 1);
    } else if (tool === ToolEnum.eraser) {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(x, y, 1, 1);
    } else if (tool === ToolEnum.particle) {
      const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'];
      for (let i = 0; i < 10; i++) {
        setParticles(prev => [...prev, {
          x,
          y,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4 - 2,
          life: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          type: particleType
        }]);
      }
    }
    
    saveFrame();
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const coords = getPixelCoords(e);
    if (coords) drawPixel(coords.x, coords.y);
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const coords = getPixelCoords(e);
    if (coords) drawPixel(coords.x, coords.y);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  // Frame management
  const addFrame = () => {
    const newFrame: Frame = { id: Date.now().toString(), imageData: null };
    setFrames([...frames, newFrame]);
    setCurrentFrameIndex(frames.length);
  };

  const deleteFrame = (index: number) => {
    if (frames.length === 1) return;
    const newFrames = frames.filter((_, i) => i !== index);
    setFrames(newFrames);
    setCurrentFrameIndex(Math.min(currentFrameIndex, newFrames.length - 1));
  };

  // Export as GIF (placeholder)
  const exportGIF = () => {
    // alert('GIF export would be implemented here with a library like gif.js');
    // In a real implementation, you would use gif.js or similar library
    // download frames as a GIF file.
    const image = new Image().src = frames[currentFrameIndex]?.imageData?.data ?
      URL.createObjectURL(new Blob([frames[currentFrameIndex]?.imageData?.data!], { type: 'image/gif' })) : '';
    const link = document.createElement('a');
    link.download = 'pixel-art-card.gif';
    link.href = image;
    link.click();

    // const canvas = canvasRef.current;
    // if (!canvas) return;
    // const link = document.createElement('a');
    // link.download = 'pixel-art-card.gif';
    // link.href = canvas.toDataURL('image/gif');
    // link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4">
        <script type="text/javascript" src="GIFEncoder.js"></script>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
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

        .container-color-pallette {
          margin-top: 10px;
        }

        .button-color-pallette {
          height: 20px;
          width: 20px;
        }
      `}</style>

      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4 text-purple-800 floating">
          Pixel Art Cards ✨
        </h1>

        {/* Canvas Area */}
        <div className="bg-white rounded-2xl shadow-xl p-4 mb-4">
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            className="pixel-canvas w-full border-4 border-purple-300 rounded-lg cursor-crosshair"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
          />

          <div className='expandable-controls'>
            {/* Quick Tools */}
            <div className="flex justify-around mt-4">
                <button
                onClick={() => setTool(ToolEnum.pen)}
                className={`p-3 rounded-lg ${tool === ToolEnum.pen ? 'bg-purple-500 text-white' : 'bg-gray-100'}`}
                >
                    Square
                </button>
                <button
                onClick={() => setTool(ToolEnum.eraser)}
                className={`p-3 rounded-lg ${tool === ToolEnum.eraser ? 'bg-purple-500 text-white' : 'bg-gray-100'}`}
                >
                    Circle
                </button>
                <button
                onClick={() => setTool(ToolEnum.text)}
                className={`p-3 rounded-lg ${tool === ToolEnum.text ? 'bg-purple-500 text-white' : 'bg-gray-100'}`}
                >
                    Type
                </button>
                <button
                onClick={() => setTool(ToolEnum.particle)}
                className={`p-3 rounded-lg ${tool === ToolEnum.particle ? 'bg-purple-500 text-white' : 'bg-gray-100'}`}
                >
                    Sparkles
                </button>
            </div>

            {/* Color Palette */}
            <div className="grid grid-cols-6 gap-2 mt-4 container-color-pallette ">
                {COLORS.map(color => (
                <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`h-40 button-color-pallette rounded-lg border-2 ${selectedColor === color ? 'border-purple-500' : 'border-gray-300'}`}
                    style={{ backgroundColor: color }}
                />
                ))}
            </div>
          </div>
        </div>

        {/* Frame Timeline */}
        <div className="bg-white rounded-2xl shadow-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-purple-800">Frames</h3>
            <button
              onClick={addFrame}
              className="text-purple-600 hover:text-purple-800"
            >
              Add Frame
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {frames.map((frame, index) => (
              <div
                key={frame.id}
                onClick={() => setCurrentFrameIndex(index)}
                className={`flex-shrink-0 w-16 h-16 border-2 rounded cursor-pointer ${
                  index === currentFrameIndex ? 'border-purple-500' : 'border-gray-300'
                }`}
              >
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Playback Controls */}
        <div className="bg-white rounded-2xl shadow-xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-purple-500 text-white p-3 rounded-full hover:bg-purple-600"
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Speed:</label>
              <input
                type="range"
                min="50"
                max="500"
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                className="w-24"
              />
            </div>
            <button
              onClick={exportGIF}
              className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600"
            >
                Download
            </button>
          </div>
        </div>

        <div
          className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl p-4 slide-panel ${
            showControls ? 'transform translate-y-0' : 'transform translate-y-full'
          }`}
        >
          <button
            onClick={() => setShowControls(!showControls)}
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-2 shadow-lg"
          >
            Up
            {/* <ChevronUp className={`transform ${showControls ? 'rotate-180' : ''}`} /> */}
          </button>
          
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={onionSkin}
                  onChange={(e) => setOnionSkin(e.target.checked)}
                />
                Onion Skinning
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Particle Type</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setParticleType('confetti')}
                  className={`px-4 py-2 rounded ${particleType === 'confetti' ? 'bg-purple-500 text-white' : 'bg-gray-100'}`}
                >
                  Confetti
                </button>
                <button
                  onClick={() => setParticleType('heart')}
                  className={`px-4 py-2 rounded ${particleType === 'heart' ? 'bg-purple-500 text-white' : 'bg-gray-100'}`}
                >
                  Hearts
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}