'use client';

import React from 'react';
import { STACK_TOOLS } from '@/data/portfolioData';

export default function StackMarquee() {
  // Duplicate array for seamless infinite marquee loop
  const marqueeItems = [...STACK_TOOLS, ...STACK_TOOLS, ...STACK_TOOLS];

  return (
    <section id="stack" className="py-16 w-full overflow-hidden border-y border-zinc-900 bg-zinc-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-6 flex items-center justify-between">
        <div data-build="pop" className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ff3b2f]" />
          <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
            TECHNICAL ARSENAL // RESUME VERIFIED
          </span>
        </div>
        <div data-build="pop" className="hidden sm:block font-mono text-[11px] text-zinc-500">
          HOVER TO PAUSE STREAM
        </div>
      </div>

      {/* Endless Marquee Moving Left to Right with Faded Edges */}
      <div
        data-build="pop"
        className="marquee-container relative w-full overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] cursor-grab active:cursor-grabbing"
      >
        <div className="animate-marquee-ltr flex items-center gap-4">
          {marqueeItems.map((tool, index) => (
            <div
              key={`${tool}-${index}`}
              className="flex items-center gap-2.5 px-4 py-2 rounded-md border border-zinc-800/90 bg-zinc-900/70 hover:border-[#ff3b2f]/50 hover:bg-zinc-800/80 transition-colors whitespace-nowrap group select-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-[#ff3b2f] transition-colors" />
              <span className="font-mono text-xs sm:text-sm text-zinc-300 group-hover:text-white font-medium">
                {tool}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
