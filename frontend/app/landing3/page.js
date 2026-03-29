"use client";
import { useEffect, useRef, useState } from "react";
import { signIn } from "next-auth/react";

export default function HeroPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans overflow-x-hidden" style={{ background: "#f0f4f8" }}>
      <style>{`

        .dot-grid {
          background-color: #f0f4f8;
          background-image: radial-gradient(circle, #a8bfd4 1px, transparent 1px);
          background-size: 28px 28px;
        }

        .hero-card {
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.9);
        }

        .glow-blue {
          box-shadow: 0 0 60px rgba(59, 130, 200, 0.15);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        .float { animation: float 4s ease-in-out infinite; }
        .float-slow { animation: floatSlow 6s ease-in-out infinite; }
        .float-delay { animation: float 4s ease-in-out infinite 1.5s; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up-1 { animation: fadeUp 0.7s ease forwards 0.1s; opacity: 0; }
        .fade-up-2 { animation: fadeUp 0.7s ease forwards 0.25s; opacity: 0; }
        .fade-up-3 { animation: fadeUp 0.7s ease forwards 0.4s; opacity: 0; }
        .fade-up-4 { animation: fadeUp 0.7s ease forwards 0.55s; opacity: 0; }
        .fade-up-5 { animation: fadeUp 0.7s ease forwards 0.7s; opacity: 0; }
      `}</style>

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
        }}
      >
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
          <span className="font-display text-xl font-semibold" style={{ color: "#1e40af" }}>Socratic</span>
          <div className="flex items-center gap-8">
            <a href="#features" className="font-body text-sm transition-colors" style={{ color: "#6b83a8" }}>Features</a>
            <a href="#how" className="font-body text-sm transition-colors" style={{ color: "#6b83a8" }}>How it works</a>
            <button
              onClick={() => signIn('google', { callbackUrl: '/signup' })}
              className="font-body text-sm px-5 py-2 rounded-full transition-all hover:scale-105"
              style={{ background: "#2563eb", color: "white" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" style={{ display: "inline", marginRight: 8, verticalAlign: "middle" }}><path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#fff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#ffffff99" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#ffffff99" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 dot-grid">

        {/* Soft blue blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute" style={{
            top: "8%", left: "5%", width: 420, height: 420,
            background: "radial-gradient(circle, rgba(59,130,200,0.12) 0%, transparent 70%)",
            borderRadius: "50%"
          }} />
          <div className="absolute" style={{
            bottom: "10%", right: "8%", width: 500, height: 500,
            background: "radial-gradient(circle, rgba(20,184,166,0.1) 0%, transparent 70%)",
            borderRadius: "50%"
          }} />
          <div className="absolute" style={{
            top: "40%", right: "20%", width: 300, height: 300,
            background: "radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%)",
            borderRadius: "50%"
          }} />
        </div>

        {/* Teal floating heatmap squares - top right background */}
        <div className="absolute top-32 right-12 opacity-30 flex flex-col gap-2" style={{ zIndex: 1 }}>
          {[[3,4,5,4],[2,3,4,5],[1,2,3,4]].map((row, ri) => (
            <div key={ri} className="flex gap-2">
              {row.map((v, ci) => (
                <div key={ci} className="w-8 h-8 rounded-md" style={{
                  background: v <= 2 ? "#99f6e4" : v <= 3 ? "#2dd4bf" : "#0d9488"
                }} />
              ))}
            </div>
          ))}
        </div>
        {/* Teal floating heatmap squares - bottom left background */}
        <div className="absolute bottom-32 left-12 opacity-20 flex flex-col gap-2" style={{ zIndex: 1 }}>
          {[[2,3,2],[3,4,3],[4,5,4]].map((row, ri) => (
            <div key={ri} className="flex gap-2">
              {row.map((v, ci) => (
                <div key={ci} className="w-6 h-6 rounded-md" style={{
                  background: v <= 2 ? "#99f6e4" : v <= 3 ? "#2dd4bf" : "#0d9488"
                }} />
              ))}
            </div>
          ))}
        </div>



        {/* Main content */}
        <div className="relative z-10 text-center max-w-3xl mx-auto px-8">
          <div
            className="fade-up-1 inline-block text-xs font-body font-semibold px-4 py-1.5 rounded-full mb-8 tracking-wider"
            style={{ background: "#ccfbf1", color: "#0d9488", border: "1px solid #99f6e4" }}
          >
            YOUR ALL-IN-ONE STUDY SPACE
          </div>

          <h1 className="fade-up-2 font-display text-5xl font-semibold leading-tight mb-6" style={{ color: "#1e40af" }}>
            Ask Better Questions.<br />
            <span className="italic" style={{ color: "#2563eb" }}>Get Better Results.</span>
          </h1>

          <p className="fade-up-3 font-body text-xl leading-relaxed max-w-xl mx-auto mb-10" style={{ color: "#6b83a8" }}>
            Socratic combines AI chat, adaptive quizzes, progress tracking, and social learning into one seamless space.
          </p>

          <div className="fade-up-4 flex items-center justify-center gap-4 mb-12">
            <button
              onClick={() => signIn('google', { callbackUrl: '/signup' })}
              className="font-body px-8 py-3.5 rounded-full text-base transition-all hover:scale-105"
              style={{
                background: "#D3E4FD",
                color: "black",
                boxShadow: "0 8px 24px rgba(37,99,235,0.3)"
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" style={{ display: "inline", marginRight: 8, verticalAlign: "middle" }}><path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#fff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#ffffff99" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#ffffff99" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>
            <button
              className="font-body px-8 py-3.5 rounded-full text-base transition-all hover:scale-105"
              style={{
                background: "rgba(255,255,255,0.7)",
                color: "#1e3a5f",
                border: "1px solid rgba(37,99,168,0.25)",
                backdropFilter: "blur(8px)"
              }}
            >
              See how it works
            </button>
          </div>


        </div>
      </section>
    </div>
  );
}