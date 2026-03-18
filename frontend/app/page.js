"use client"
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const squaresRef = useRef([]);

  useEffect(() => {
    // animate squares to corners on scroll
    squaresRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        scrollTrigger: {
          trigger: ".section-2",
          start: "top bottom",
          end: "top center",
          scrub: 1,
        },
        x: i % 2 === 0 ? -300 : 300,
        y: i % 2 === 0 ? -200 : 200,
        scale: 0.6,
        opacity: 0.4,
        ease: "none",
      });
    });
  }, []);

  const squares = [
    { color: "bg-blue-300", size: "w-40 h-40", top: "top-[480px]", left: "left-[100px]", rotate: "rotate-6", delay: 0 },
    { color: "bg-teal-200", size: "w-32 h-32", top: "top-[520px]", left: "left-[200px]", rotate: "-rotate-3", delay: 1 },
    { color: "bg-blue-200", size: "w-48 h-48", top: "top-[460px]", left: "left-[340px]", rotate: "rotate-2", delay: 2 },
    { color: "bg-indigo-200", size: "w-36 h-36", top: "top-[500px]", left: "left-[520px]", rotate: "-rotate-6", delay: 3 },
    { color: "bg-teal-300", size: "w-44 h-44", top: "top-[470px]", left: "left-[680px]", rotate: "rotate-4", delay: 4 },
    { color: "bg-blue-300", size: "w-28 h-28", top: "top-[510px]", left: "left-[840px]", rotate: "-rotate-2", delay: 5 },
    { color: "bg-indigo-300", size: "w-40 h-40", top: "top-[490px]", left: "left-[960px]", rotate: "rotate-8", delay: 6 },
    { color: "bg-teal-200", size: "w-36 h-36", top: "top-[460px]", left: "left-[50px]", rotate: "-rotate-4", delay: 7 },
    { color: "bg-blue-200", size: "w-32 h-32", top: "top-[530px]", left: "left-[1100px]", rotate: "rotate-3", delay: 8 },
  ];

  return (
    <main className="bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">

      {/* SECTION 1 - hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-start pt-32">

        <p className="absolute top-6 left-8 text-sm font-semibold text-gray-600">Socratic</p>

        {/* center white box */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl px-20 py-12 flex flex-col items-center gap-4 w-[700px] z-10">
          <h1 className="text-5xl font-bold text-center text-gray-900">Welcome to SOCRATIC</h1>
          <p className="text-xl text-gray-600 text-center">your AI powered Study Companion</p>
          <p className="text-base text-gray-400 text-center mt-2">Ask better questions. Get better results.</p>
          <button className="flex items-center gap-2 border border-gray-200 bg-white rounded-full px-6 py-2 text-sm text-gray-600 mt-2 cursor-pointer hover:bg-gray-50">
            <img src="https://www.google.com/favicon.ico" className="w-4 h-4" />
            Continue with Google
          </button>
        </div>

        {/* floating squares */}
        {squares.map((sq, i) => (
          <div
            key={i}
            ref={el => squaresRef.current[i] = el}
            className={`absolute ${sq.top} ${sq.left} ${sq.size} ${sq.rotate}`}
          >
            <div className={`w-full h-full ${sq.color} opacity-60 rounded-2xl`} />
            <div className="absolute inset-0 bg-white/50 rounded-2xl" />
          </div>
        ))}

      </section>

      {/* SECTION 2 - heatmap info */}
      <section className="section-2 relative min-h-screen flex items-center justify-center">

        {/* squares move to corners */}
        <div className="absolute top-10 right-10 flex flex-wrap gap-3 w-64">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`w-24 h-24 rounded-2xl opacity-50 ${i % 2 === 0 ? "bg-blue-300" : "bg-teal-200"}`}>
              <div className="w-full h-full bg-white/40 rounded-2xl" />
            </div>
          ))}
        </div>

        <div className="absolute bottom-10 left-10 flex flex-wrap gap-3 w-64">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`w-24 h-24 rounded-2xl opacity-50 ${i % 2 === 0 ? "bg-indigo-300" : "bg-teal-300"}`}>
              <div className="w-full h-full bg-white/40 rounded-2xl" />
            </div>
          ))}
        </div>

        {/* heatmap content */}
        <div className="flex flex-col items-center gap-8 z-10 max-w-2xl text-center px-8">
          <h2 className="text-4xl font-bold text-gray-900">Track Your Progress with Heatmaps</h2>
          <p className="text-lg text-gray-500">Our heatmaps show you exactly how much you've been studying each day. The darker the color, the more activity — so you can see your streaks, spot gaps, and stay consistent.</p>

          {/* demo heatmap */}
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex gap-2">
              {[1,0,3,5,2,0,2,4,5,5].slice(0,5).map((score, i) => (
                <div key={i} className={`w-10 h-10 rounded-md ${
                  score === 0 ? "bg-blue-100" :
                  score <= 2 ? "bg-blue-200" :
                  score <= 3 ? "bg-blue-300" :
                  score <= 4 ? "bg-blue-400" : "bg-blue-500"
                }`} />
              ))}
            </div>
            <div className="flex gap-2">
              {[1,0,3,5,2,0,2,4,5,5].slice(5).map((score, i) => (
                <div key={i} className={`w-10 h-10 rounded-md ${
                  score === 0 ? "bg-blue-100" :
                  score <= 2 ? "bg-blue-200" :
                  score <= 3 ? "bg-blue-300" :
                  score <= 4 ? "bg-blue-400" : "bg-blue-500"
                }`} />
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-400">Each square represents a day. Color intensity = study activity.</p>
        </div>

      </section>

    </main>
  );
}