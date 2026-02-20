import { useState } from 'react';

export default function VibeUI() {
  // 1. Define the state for the slider and the colors
  const [blur, setBlur] = useState(16);
  const [accent, setAccent] = useState('indigo');

  // 2. Define the theme colors used in the map function
  const themes: any = {
    indigo: 'bg-indigo-500 shadow-indigo-500/40',
    cyan: 'bg-cyan-400 shadow-cyan-400/40',
    rose: 'bg-rose-500 shadow-rose-500/40'
  };

  return (
    <div className="space-y-6">
      {/* THE PREVIEW BOX */}
      <div 
        className="h-28 rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden transition-all duration-200"
        style={{ 
          backdropFilter: `blur(${blur}px)`, 
          WebkitBackdropFilter: `blur(${blur}px)`,
          backgroundColor: `rgba(255, 255, 255, ${blur / 1000 + 0.02})` 
        }}
      >
        {/* Animated background shapes to make the blur visible */}
        <div className={`absolute h-16 w-16 rounded-full blur-xl opacity-50 animate-pulse ${themes[accent]}`} 
             style={{ left: '20%' }}></div>
        <div className={`absolute h-10 w-10 rounded-full blur-lg opacity-30 animate-bounce ${themes[accent]}`} 
             style={{ right: '20%' }}></div>
        
        <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.2em] text-white">
          Intensity: {blur}px
        </span>
      </div>

      {/* THE CONTROLS */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Accent</label>
          <div className="flex gap-2">
            {Object.keys(themes).map((t) => (
              <button 
                key={t} 
                onClick={() => setAccent(t)} 
                className={`h-6 w-6 rounded-lg border-2 transition-all ${accent === t ? 'border-white scale-110' : 'border-transparent'} ${themes[t].split(' ')[0]}`}
              />
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right block">Glass Blur</label>
          <input 
            type="range" min="0" max="40" value={blur} 
            onChange={(e) => setBlur(parseInt(e.target.value))} 
            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500" 
          />
        </div>
      </div>
    </div>
  );
}