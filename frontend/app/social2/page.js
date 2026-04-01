'use client';
import { useState } from 'react';
import Navbar from '../components/Navbar';



// ── TOPBAR PLACEHOLDER ──
function Topbar() {
  return (
    <div className="bg-white rounded-xl p-3 mb-6">
      <div className="flex items-center justify-between">
        
        {/* Study Sessions */}
        <div className="flex-1 text-center">
          <div className="text-3xl font-bold text-teal-600">5</div>
          <div className="text-sm text-gray-400 font-medium">Study sessions</div>
        </div>

        {/* Vertical Divider */}
        <div className="w-px h-12 bg-gray-100"></div>

        {/* Top Streak */}
        <div className="flex-1 text-center">
          <div className="text-3xl font-bold text-blue-300">31</div>
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
function UpcomingSessions() {
  const sessions = [
    { subject: 'Discrete Math', teacher: 'Sara, Jane', date: 'Feb 22', time: '4:00–5:00 PM', color: 'bg-teal-500' },
    { subject: 'Calculus II', teacher: 'Sara, Jane', date: 'Feb 24', time: '4:00–5:00 PM', color: 'bg-teal-500' },
    { subject: 'Physics I', teacher: 'Meghan', date: 'Feb 26', time: '2:00–3:00 PM', color: 'bg-blue-400' },
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Upcoming Sessions</h2>
        <button className="text-teal-600 text-sm font-semibold">+ Schedule new</button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {sessions.map((s, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border-l-4 border-teal-500 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${s.color}`}></div>
                <h3 className="font-bold text-gray-800">{s.subject}</h3>
              </div>
              <p className="text-xs text-gray-400 mt-1">with {s.teacher}</p>
            </div>
            <div className="text-right">
              <span className="text-teal-600 font-bold text-xs bg-teal-50 px-2 py-1 rounded">{s.date}</span>
              <p className="text-[10px] text-gray-400 mt-2">{s.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



// ── SHARED CLASSES ──

{/*}
function SharedClasses() {
  const classes = [
    { name: 'Discrete Math', students: [{ n: 'Meghan Jes', c: 'bg-purple-400' }, { n: 'Juanita Cormier', c: 'bg-red-400' }] },
    { name: 'Calculus II', students: [{ n: 'Sara Kim', c: 'bg-blue-400' }] },
    { name: 'Physics I', students: [{ n: 'Sara Kim', c: 'bg-blue-400' }] },
    { name: 'CS I', students: [{ n: 'Meghan Jes', c: 'bg-purple-400' }] },
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Shared Classes</h2>
        <button className="text-teal-600 text-sm">See all</button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {classes.map((cls, i) => (
          <div key={i} className="bg-white p-4 rounded-xl  border-gray-50 h-32">
            <h3 className="font-bold text-sm text-gray-800 mb-3">{cls.name}</h3>
            {cls.students.map((st, j) => (
              <div key={j} className="flex items-center gap-2 mb-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] text-white font-bold ${st.c}`}>
                  {st.n.split(' ').map(x => x[0]).join('')}
                </div>
                <span className="text-xs text-gray-600">{st.n}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
    */}

// ── LEADERBOARD ──

function Leaderboard() {
  const leaders = [
    { rank: 1, name: 'Juanita Cormier', score: 31, color: 'bg-gray-200' },
    { rank: 2, name: 'Meghan Jes', score: 24, color: 'bg-gray-200' },
    { rank: 3, name: 'Sara Kim', score: 19, color: 'bg-gray-200' },
    { rank: 4, name: 'Marsha Fisher', score: 17, color: 'bg-gray-200' },
  ];

  return (
    <div className="bg-white rounded-xl  border border-gray-50 overflow-hidden">
      <div className="flex border-b border-gray-100">
        <button className="px-6 py-3 text-teal-600 border-b-2 border-teal-600 font-bold text-sm">Leaderboard</button>
        <button className="px-6 py-3 text-gray-400 font-medium text-sm">All Friends</button>
      </div>
      <div className="p-2">
        {leaders.map((person, i) => (
          <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-gray-400 w-4">{person.rank}</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs text-white font-bold ${person.color}`}>
                {person.name.split(' ').map(x => x[0]).join('')}
              </div>
              <span className="text-sm font-semibold text-gray-700">{person.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold text-gray-700">{person.score}</span>
              <span className="text-gray-500"></span>
            </div>
          </div>
        ))}
        <div className="flex justify-center py-2 text-gray-200">...</div>
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100 mt-2">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-blue-500 w-4">6</span>
            <div className="w-8 h-8 rounded-full bg-blue-300 flex items-center justify-center text-xs text-white font-bold">Y</div>
            <span className="text-sm font-bold text-gray-700">You <span className="text-blue-400 font-normal ml-2">you</span></span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold text-gray-700">5</span>
            <span className="text-orange-500"></span>
          </div>
        </div>
      </div>
    </div>
  );
}


// ── RIGHT PANEL ──
function RightPanel() {
  return (
    <div className="w-80 flex flex-col gap-6">
      <div className="bg-white rounded-xl p-5  border-gray-50">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Quick Rebook</h3>
        {[
          { title: 'Discrete Math w/ Sara', sub: 'Mon 4-5 PM • 6x this month' },
          { title: 'Calculus II w/ Jane', sub: 'Wed 4-5 PM • 4x this month' },
          { title: 'CS Study Group', sub: 'Fri 2-4 PM • 3x this month' }
        ].map((item, i) => (
          <div key={i} className="flex justify-between items-center mb-4 last:mb-0 border-b border-gray-50 pb-4 last:border-0 last:pb-0">
            <div>
              <p className="text-sm font-bold text-gray-800">{item.title}</p>
              <p className="text-[10px] text-gray-400">{item.sub}</p>
            </div>
            <button className="text-[10px] font-bold text-teal-500 border border-teal-500 px-3 py-1 rounded-lg hover:bg-teal-50">Rebook</button>
          </div>
        ))}
        <button className="w-full bg-blue-500 text-white py-3 rounded-xl font-bold text-sm mt-4 shadow-blue-100 flex items-center justify-center gap-2">
          <span className="text-lg">+</span> Schedule Meeting
        </button>
      </div>

      <div className="bg-white rounded-xl p-5  border border-gray-50">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Friend Requests</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-white font-bold">BS</div>
            <div>
              <p className="text-xs font-bold text-gray-800">Bryan Smith</p>
              <p className="text-[10px] text-gray-400">bryansmith21@gma...</p>
            </div>
          </div>
          <button className="bg-blue-500 text-white text-[10px] font-bold px-4 py-2 rounded-lg">Accept</button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5  border border-gray-50">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Friends' Achievements</h3>
        {[
          { name: 'Bryan', ach: '7 Day Streak', sub: 'Logged in 7 days in a row', icon: '', color: 'text-yellow-500' },
          { name: 'Sarah', ach: '7 Day Streak', sub: 'Logged in 7 days in a row', icon: '', color: 'text-yellow-500' },
          { name: 'John', ach: '14 Day Streak', sub: 'Logged in 14 days in a row', icon: '', color: 'text-yellow-600' }
        ].map((a, i) => (
          <div key={i} className="flex gap-3 mb-4 last:mb-0 items-start bg-gray-50/50 p-2 rounded-lg">
            <div className={`w-8 h-8 rounded border border-gray-200 flex items-center justify-center bg-white ${a.color}`}>{a.icon}</div>
            <div>
              <p className="text-[10px] font-bold text-teal-600">{a.name}</p>
              <p className="text-[11px] font-bold text-gray-800">{a.ach}</p>
              <p className="text-[9px] text-gray-400">{a.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SOCIAL PAGE ──
export default function SocialPage() {
  return (
    <main className="flex min-h-screen bg-[#F8FAFC]">
      <Navbar/>
      <div className="w-[100px] flex-shrink-0"></div>
      
      <div className="flex-1 p-8 flex gap-8">
        {/* Main Content Area */}
        <div className="flex-1 max-w-4xl">
          <Topbar />
          <UpcomingSessions />
          
          <Leaderboard />
        </div>

        {/* Right Sidebar */}
        <RightPanel />
      </div>
    </main>
  );
}