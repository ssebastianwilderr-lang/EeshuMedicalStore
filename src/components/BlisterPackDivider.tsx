/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export function BlisterPackDivider() {
  return (
    <div className="w-full px-6 md:px-12 py-6 flex items-center justify-center gap-3 select-none overflow-hidden relative">
      <div className="flex-1 h-[1px] bg-sage" />
      <div className="flex gap-2.5 sm:gap-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="w-4 h-4 rounded-full bg-sage shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] relative flex items-center justify-center hover:scale-110 transition-transform duration-300"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {/* Glossy sheen for the blister pack pill dome */}
            <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white/60 rounded-full" />
          </div>
        ))}
      </div>
      <div className="flex-1 h-[1px] bg-sage" />
    </div>
  );
}
