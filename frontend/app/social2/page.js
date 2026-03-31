'use client';
import { useState } from 'react';
import Navbar from '../components/Navbar';



// ── TOPBAR PLACEHOLDER ──
function Topbar() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex items-center justify-between">
        
        {/* Study Sessions */}
        <div className="flex-1 text-center">
          <div className="text-3xl font-bold text-teal-600">5</div>
          <div className="text-sm text-gray-400 font-medium">Study sessions this week</div>
        </div>

        {/* Vertical Divider */}
        <div className="w-px h-12 bg-gray-100"></div>

        {/* Top Streak */}
        <div className="flex-1 text-center">
          <div className="text-3xl font-bold text-orange-500">31</div>
          <div className="text-sm text-gray-400 font-medium">Top streak (Juanita)</div>
        </div>

        {/* Vertical Divider */}
        <div className="w-px h-12 bg-gray-100"></div>

        {/* Friends */}
        <div className="flex-1 text-center">
          <div className="text-3xl font-bold text-blue-500">6</div>
          <div className="text-sm text-gray-400 font-medium">Friends</div>
        </div>

        {/* Vertical Divider */}
        <div className="w-px h-12 bg-gray-100"></div>

        {/* Pending Requests */}
        <div className="flex-1 text-center">
          <div className="text-3xl font-bold text-purple-500">2</div>
          <div className="text-sm text-gray-400 font-medium">Pending requests</div>
        </div>

      </div>
    </div>
  );
}
 
// ── UPCOMING SESSIONS ──


// ── SHARED CLASSES ──
      

// ── LEADERBOARD ──


// ── RIGHT PANEL ──


// ── SOCIAL PAGE ──
export default function SocialPage() {
  return (
    <main className="flex-col gap-6 p-6 min-h-screen bg-gray-100">
    <Navbar/>
    <div className="ml-[130px]">

      <Topbar />
          </div>

    </main>
  );
}