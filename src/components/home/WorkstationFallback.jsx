import React from 'react';

const WorkstationFallback = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 select-none">
      <div className="relative w-full max-w-sm aspect-[4/3] rounded-2xl bg-dark-900/90 border border-neon-cyan/30 p-4 shadow-neon-cyan flex flex-col justify-between overflow-hidden">
        {/* Ambient Top Light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 bg-neon-cyan/20 blur-2xl pointer-events-none"></div>

        {/* Status Line */}
        <div className="flex items-center justify-between text-[11px] font-mono text-neon-cyan pb-2 border-b border-slate-800">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            WORKSTATION ACTIVE
          </span>
          <span className="text-neon-pink">[3D ENGINE 2.0]</span>
        </div>

        {/* Central Graphic: 3D Developer Illustration */}
        <div className="flex-1 flex flex-col items-center justify-center my-3 relative">
          <div className="relative z-10 w-24 h-24 rounded-2xl border-2 border-neon-pink/70 p-1 shadow-neon-pink bg-dark-950 overflow-hidden group">
            <img
              src="/images/profile/profile.png"
              alt="Subhankar Giri Avatar"
              className="w-full h-full object-cover rounded-xl"
              onError={(e) => {
                e.target.src = "/images/profile.jpg";
              }}
            />
          </div>

          {/* Dual Monitor Graphic Below */}
          <div className="mt-3 w-44 h-16 rounded-lg bg-dark-950 border border-neon-cyan/50 p-2 flex flex-col justify-between shadow-sm">
            <div className="font-mono text-[9px] text-neon-cyan truncate">
              $ python model.py --train
            </div>
            <div className="w-full h-1.5 rounded-full bg-dark-800 overflow-hidden">
              <div className="h-full w-4/5 bg-gradient-to-r from-neon-pink to-neon-cyan animate-pulse"></div>
            </div>
            <div className="font-mono text-[8px] text-slate-400 flex justify-between">
              <span>ACCURACY: 98.4%</span>
              <span className="text-emerald-400">READY</span>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="font-mono text-[10px] text-center text-slate-500 pt-2 border-t border-slate-800">
          Subhankar Giri · Digital Workspace
        </div>
      </div>
    </div>
  );
};

export default WorkstationFallback;
