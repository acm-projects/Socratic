"use client";
import { useEffect, useRef, useState } from "react";
 
export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef({});
 
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
 
  useEffect(() => {
    const observers = {};
    Object.entries(sectionRefs.current).forEach(([key, el]) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setVisibleSections(prev => ({ ...prev, [key]: true }));
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      observers[key] = obs;
    });
    return () => Object.values(observers).forEach(o => o.disconnect());
  }, []);
 
  const setRef = (key) => (el) => { sectionRefs.current[key] = el; };
 
  const heatmapData = [
    [0,1,2,3,2,1,0,2,3,4,3,2,1,2],
    [1,2,3,4,3,2,3,4,5,4,3,2,3,4],
    [2,3,4,5,4,3,4,5,4,3,4,5,4,3],
    [1,2,3,2,3,4,3,2,3,4,3,2,1,2],
    [0,1,2,1,2,3,2,1,2,3,2,1,0,1],
  ];
 
  const features = [
    {
      id: "chat",
      tag: "AI CHAT",
      title: "Your smartest study partner, always on.",
      desc: "Ask anything. Get Socratic-style responses that guide you to think deeper, not just copy answers. The more you engage, the better your understanding — and your score.",
      visual: (
        <div className="flex flex-col gap-3 w-full max-w-sm">
          {[
            { role: "user", text: "What is a tautology?" },
            { role: "ai", text: "Great question! Instead of telling you directly — what do you think a statement that's always true, regardless of variables, might be called?" },
            { role: "user", text: "Something that's always true no matter what?" },
            { role: "ai", text: "Exactly. That's a tautology. Can you think of an example in logic?" },
          ].map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`px-4 py-2.5 rounded-2xl text-sm max-w-[80%] ${
                msg.role === "user"
                  ? "bg-[#3d6b5e] text-white rounded-br-sm"
                  : "bg-white text-gray-700 rounded-bl-sm shadow-sm border border-gray-100"
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div className="flex justify-end mt-1">
            <div className="flex gap-1">
              {[1,2,3,4,5].map(d => (
                <div key={d} className={`w-2.5 h-2.5 rounded-full ${d <= 4 ? "bg-emerald-400" : "bg-gray-200"}`} />
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: "quiz",
      tag: "QUIZZES",
      title: "Test yourself. Track what sticks.",
      desc: "Auto-generated quizzes from your topics. Choose difficulty, retake missed questions, and watch your mastery grow with every attempt.",
      visual: (
        <div className="flex flex-col gap-3 w-full max-w-sm">
          {[
            { topic: "Trees", score: 92, color: "bg-emerald-100 text-emerald-700" },
            { topic: "Graphs", score: 98, color: "bg-emerald-100 text-emerald-700" },
            { topic: "Set Theory", score: 64, color: "bg-amber-100 text-amber-700" },
            { topic: "Counting", score: 78, color: "bg-teal-100 text-teal-700" },
          ].map((q, i) => (
            <div key={i} className="flex items-center justify-between bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100">
              <div>
                <p className="text-sm font-semibold text-gray-800">{q.topic}</p>
                <p className="text-xs text-gray-400">Feb 2025</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${q.color}`}>{q.score}%</span>
                <button className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-500 hover:bg-gray-50">Retake</button>
                <button className="text-xs bg-[#3d6b5e] text-white rounded-lg px-3 py-1.5">Review</button>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: "heatmap",
      tag: "STUDY TRACKING",
      title: "See your effort, day by day.",
      desc: "Every session logged. Every streak celebrated. The heatmap shows exactly when you grind — so you can spot gaps, maintain momentum, and build real habits.",
      visual: (
        <div className="flex flex-col gap-2">
          <div className="flex gap-6 text-xs text-gray-400 mb-1 ml-1">
            {["Jan","Feb","Mar","Apr","May","Jun"].map(m => <span key={m}>{m}</span>)}
          </div>
          {heatmapData.map((row, ri) => (
            <div key={ri} className="flex gap-1.5">
              {row.map((val, ci) => (
                <div key={ci} className={`w-8 h-8 rounded-md transition-all ${
                  val === 0 ? "bg-gray-100" :
                  val === 1 ? "bg-teal-100" :
                  val === 2 ? "bg-teal-200" :
                  val === 3 ? "bg-teal-300" :
                  val === 4 ? "bg-teal-500" : "bg-teal-700"
                }`} />
              ))}
            </div>
          ))}
          <div className="flex items-center gap-2 mt-2 ml-1">
            <span className="text-xs text-gray-400">Less</span>
            {[0,1,2,3,4,5].map(v => (
              <div key={v} className={`w-4 h-4 rounded-sm ${
                v === 0 ? "bg-gray-100" : v === 1 ? "bg-teal-100" : v === 2 ? "bg-teal-200" :
                v === 3 ? "bg-teal-300" : v === 4 ? "bg-teal-500" : "bg-teal-700"
              }`} />
            ))}
            <span className="text-xs text-gray-400">More</span>
          </div>
        </div>
      )
    },
    {
      id: "social",
      tag: "COLLABORATE",
      title: "Study with friends. Actually.",
      desc: "Schedule sessions, share classes, and see who's grinding. Real-time collaboration meets friendly competition — because learning together beats learning alone.",
      visual: (
        <div className="flex flex-col gap-3 w-full max-w-sm">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-xs font-semibold text-gray-500 mb-3">UPCOMING SESSIONS</p>
            {[
              { course: "Discrete Math", time: "4:00–5:00 PM", date: "Feb 22", people: "Sara, Jane" },
              { course: "Calculus II", time: "4:00–5:00 PM", date: "Feb 24", people: "Sara, Jane" },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-semibold text-gray-800">{s.course}</p>
                  <p className="text-xs text-gray-400">{s.people} · {s.time}</p>
                </div>
                <span className="text-xs bg-blue-50 text-blue-600 font-semibold px-3 py-1 rounded-full">{s.date}</span>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-xs font-semibold text-gray-500 mb-3">FRIENDS LEADERBOARD</p>
            {[
              { name: "Juanita C.", pts: 31, rank: 1 },
              { name: "Meghan J.", pts: 24, rank: 2 },
              { name: "Sara K.", pts: 19, rank: 3 },
            ].map((f, i) => (
              <div key={i} className="flex items-center justify-between py-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 w-4">{f.rank}</span>
                  <div className="w-6 h-6 rounded-full bg-teal-100" />
                  <span className="text-sm text-gray-700">{f.name}</span>
                </div>
                <span className="text-xs font-bold text-teal-600">🔥 {f.pts}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
  ];
 
  return (
    <div className="bg-[#f4f7f4] min-h-screen font-sans overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,600;0,700;1,300;1,600&family=DM+Sans:wght@300;400;500&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        .fade-up { opacity: 0; transform: translateY(40px); transition: opacity 0.8s ease, transform 0.8s ease; }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
        .fade-up-delay-1 { transition-delay: 0.15s; }
        .fade-up-delay-2 { transition-delay: 0.3s; }
        .fade-up-delay-3 { transition-delay: 0.45s; }
        .dot-grid { background-image: radial-gradient(circle, #6ba898 1.5px, transparent 1px); background-size: 28px 28px; }
      `}</style>
 
      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 40 ? "bg-white/90 backdrop-blur-md shadow-sm" : ""}`}>
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
          <span className="font-display text-xl font-600 text-[#2d5a4a]">Socratic</span>
          <div className="flex items-center gap-8">
            <a href="#features" className="font-body text-sm text-gray-500 hover:text-[#2d5a4a] transition-colors">Features</a>
            <a href="#how" className="font-body text-sm text-gray-500 hover:text-[#2d5a4a] transition-colors">How it works</a>
            <button className="font-body text-sm bg-[#2d5a4a] text-white px-5 py-2 rounded-full hover:bg-[#3d6b5e] transition-colors">
              Get started
            </button>
          </div>
        </div>
      </nav>
 
      {/* HERO */}
<section className="relative min-h-screen flex items-center justify-center pt-20 dot-grid">
  {/* floating heatmap squares */}
  <div className="absolute top-32 right-12 opacity-30 flex flex-col gap-2">
    {[[3,4,5,4],[2,3,4,5],[1,2,3,4]].map((row, ri) => (
      <div key={ri} className="flex gap-2">
        {row.map((v, ci) => (
          <div key={ci} className={`w-8 h-8 rounded-md ${v<=2?"bg-teal-200":v<=3?"bg-teal-400":"bg-teal-600"}`} />
        ))}
      </div>
    ))}
  </div>
  <div className="absolute bottom-32 left-12 opacity-20 flex flex-col gap-2">
    {[[2,3,2],[3,4,3],[4,5,4]].map((row, ri) => (
      <div key={ri} className="flex gap-2">
        {row.map((v, ci) => (
          <div key={ci} className={`w-6 h-6 rounded-md ${v<=2?"bg-teal-200":v<=3?"bg-teal-400":"bg-teal-600"}`} />
        ))}
      </div>
    ))}
  </div>

  <div className="relative z-10 text-center max-w-4xl mx-auto px-8">
    <div className="inline-block bg-teal-50 border border-teal-200 text-teal-700 text-xs font-body font-500 px-4 py-1.5 rounded-full mb-8 tracking-wide">
      YOUR ALL-IN-ONE STUDY SPACE
    </div>
    <h1 className="font-display text-7xl font-600 text-[#1a3a2e] leading-tight mb-6">
      Study smarter.<br />
      <span className="italic text-[#3d6b5e]">Think deeper.</span>
    </h1>
    <p className="font-body text-xl text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
      Socratic combines AI chat, adaptive quizzes, progress tracking, and social learning into one seamless space.
    </p>
    <div className="flex items-center justify-center gap-4">
      <button className="font-body bg-[#2d5a4a] text-white px-8 py-3.5 rounded-full text-base hover:bg-[#3d6b5e] transition-all hover:scale-105 shadow-lg shadow-teal-900/20">
        Start for free
      </button>
      <button className="font-body border border-gray-300 text-gray-600 px-8 py-3.5 rounded-full text-base hover:bg-white transition-all">
        See how it works
      </button>
    </div>

    <div className="flex items-center justify-center gap-2 mt-12">
      <span className="font-body text-xs text-gray-400">Question depth score</span>
      <div className="flex gap-1.5">
        {[1,2,3,4,5].map(d => (
          <div key={d} className={`w-3 h-3 rounded-full transition-all ${d <= 4 ? "bg-emerald-400" : "bg-gray-200"}`} />
        ))}
      </div>
      <span className="font-body text-xs text-emerald-500 font-500">4/5</span>
    </div>
  </div>
</section>
 
      {/* FEATURES */}
      <section id="features" className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-20">
            <p className="font-body text-xs text-teal-600 tracking-widest mb-3">EVERYTHING YOU NEED</p>
            <h2 className="font-display text-5xl font-600 text-[#1a3a2e]">Four tools. One place.</h2>
          </div>
 
          <div className="flex flex-col gap-32">
            {features.map((f, i) => (
              <div
                key={f.id}
                ref={setRef(f.id)}
                className={`fade-up ${visibleSections[f.id] ? "visible" : ""} flex items-center gap-20 ${i % 2 === 1 ? "flex-row-reverse" : ""}`}
              >
                {/* text */}
                <div className="flex-1">
                  <span className="font-body text-xs text-teal-500 tracking-widest font-500">{f.tag}</span>
                  <h3 className="font-display text-4xl font-600 text-[#1a3a2e] mt-3 mb-5 leading-snug">{f.title}</h3>
                  <p className="font-body text-gray-500 leading-relaxed text-lg">{f.desc}</p>
                </div>
 
                {/* visual */}
                <div className="flex-1 flex justify-center">
                  <div className="bg-[#f4f7f4] rounded-3xl p-8 w-full max-w-md shadow-inner">
                    {f.visual}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* HOW IT WORKS */}
      <section id="how" className="py-32 bg-[#f4f7f4] dot-grid">
        <div className="absolute inset-0 bg-[#f4f7f4]/70" />
        <div className="relative max-w-5xl mx-auto px-8">
          <div className="text-center mb-20">
            <p className="font-body text-xs text-teal-600 tracking-widest mb-3">THE PROCESS</p>
            <h2 className="font-display text-5xl font-600 text-[#1a3a2e]">How Socratic works</h2>
          </div>
 
          <div className="grid grid-cols-3 gap-8">
            {[
              { num: "01", title: "Add your courses", desc: "Upload your syllabus and set up your topics. Socratic learns your curriculum." },
              { num: "02", title: "Chat, quiz, repeat", desc: "Use AI chat to explore concepts, take adaptive quizzes, and save key responses for review." },
              { num: "03", title: "Track & collaborate", desc: "Watch your heatmap fill in. Schedule sessions with friends. Compete on the leaderboard." },
            ].map((step, i) => (
              <div
                key={i}
                ref={setRef(`step${i}`)}
                className={`fade-up fade-up-delay-${i+1} ${visibleSections[`step${i}`] ? "visible" : ""} bg-white rounded-3xl p-8 shadow-sm border border-gray-100`}
              >
                <span className="font-display text-5xl font-300 text-teal-200">{step.num}</span>
                <h4 className="font-display text-xl font-600 text-[#1a3a2e] mt-4 mb-3">{step.title}</h4>
                <p className="font-body text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* CTA */}
      <section className="py-32 bg-[#2d5a4a] relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-10" />
        <div className="relative max-w-3xl mx-auto px-8 text-center">
          <h2 className="font-display text-6xl font-600 text-white mb-6 leading-tight">
            Ready to study<br /><span className="italic text-teal-300">like you mean it?</span>
          </h2>
          <p className="font-body text-teal-100 text-lg mb-10 leading-relaxed">
            Join thousands of students using Socratic to ace their classes, build real understanding, and actually enjoy studying.
          </p>
          <button className="font-body bg-white text-[#2d5a4a] px-10 py-4 rounded-full text-base font-500 hover:bg-teal-50 transition-all hover:scale-105 shadow-xl">
            Get started for free →
          </button>
        </div>
      </section>
 
      {/* FOOTER */}
      <footer className="bg-[#1a3a2e] py-10">
        <div className="max-w-6xl mx-auto px-8 flex items-center justify-between">
          <span className="font-display text-lg text-teal-300">Socratic</span>
          <p className="font-body text-xs text-teal-700">© 2026 Socratic. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
