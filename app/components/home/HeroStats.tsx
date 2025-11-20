"use client";

import React from "react";

export default function HeroStats({ stat1Ref, stat2Ref, stat3Ref, statsRef }: any) {
  return (
    <div ref={statsRef} className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mt-8">
        
        <div className="stat-card text-center p-6">
          <div ref={stat1Ref} className="text-3xl font-bold text-white">0+</div>
          <p className="text-white/70 text-sm">Projects Completed</p>
        </div>

        <div className="stat-card text-center p-6">
          <div ref={stat2Ref} className="text-3xl font-bold text-white">0/7</div>
          <p className="text-white/70 text-sm">Support</p>
        </div>

        <div className="stat-card text-center p-6">
          <div ref={stat3Ref} className="text-3xl font-bold text-white">0%</div>
          <p className="text-white/70 text-sm">Client Satisfaction</p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-white/60 mb-3 uppercase text-sm">
          Trusted by innovative companies worldwide
        </p>
        <div className="flex flex-wrap gap-6 justify-center opacity-60">
          <span className="text-white/50">Startups</span>
          <span className="text-white/50">Agencies</span>
          <span className="text-white/50">Enterprises</span>
          <span className="text-white/50">Creators</span>
        </div>
      </div>
    </div>
  );
}
