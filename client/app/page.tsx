"use client";
import { Playlists } from "./components/Hero/Playlists";
import { Room } from "./components/Hero/Room";
import { Lyrics } from "./components/Hero/Lyrics";
import { useState } from "react";
import { Login } from "./components/common/login";
export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleLogin = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050209]">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/30 via-[#050209] to-[#050209]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] opacity-60 bg-[radial-gradient(ellipse_at_top,rgba(120,38,153,0.6),transparent_50%)]" />

      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(46, 32, 68, 1) 1px, transparent 1px), linear-gradient(to bottom, rgba(46, 32, 68, 1) 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
          maskImage:
            "radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 110%)",
        }}
      />

      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] opacity-70">
        <div className="absolute inset-0 blur-3xl bg-[#b366ff]/30" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 w-full">
        <div className="flex items-center justify-between gap-12">
          <div className="flex-1 max-w-xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-[#f2f2f2]">
                Listen <br /> Together,
              </span>
              <br />
              <span className="">Anywhere</span>
            </h1>

            <p className="text-lg text-[#8c8c8c] mb-4">
              Stream any song, generate AI playlists, and create shared
              listening rooms with friends across the globe.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="px-4 py-4 rounded-full bg-black-950/50 text-white  shadow-[0_0_15px_rgba(236,72,153,0.5)] hover:shadow-[0_0_25px_rgba(236,72,153,0.8)] transition-all duration-300 text-white rounded-full font-semibold hover:shadow-[0_0_40px_rgba(179,102,255,0.6)] transition-all">
                Start Listening
              </button>
              <button className="px-8 py-4 bg-[#0f0a1f]/80 backdrop-blur-sm border border-[#2e2044] text-white rounded-full font-semibold hover:border-[#b366ff]/50 transition-all">
                Create a Room
              </button>
            </div>
            <p className="text-sm  mb-4">
              Already Have an Accoun?{" "}
              <button
                onClick={handleLogin}
                className="text-[#b366ff] hover:text-[#c488ff] underline-offset-4 hover:underline font-medium transition-colors"
              >
                Login
              </button>
            </p>
            {isOpen && <Login />}
          </div>

          <div className="hidden lg:block relative w-[500px] h-[600px]">
            <div className="absolute top-8 right-12 transform rotate-2 z-20 hover:scale-105 transition-transform duration-300">
              <Lyrics />
            </div>

            <div className="absolute top-32 right-0 transform -rotate-3 z-30 hover:scale-105 transition-transform duration-300">
              <Room />
            </div>

            <div className="absolute top-64 right-24 transform rotate-1 z-10 hover:scale-105 transition-transform duration-300">
              <Playlists />
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(242, 242, 242, 1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {isOpen && <Login onClose={handleClose} />}
    </section>
  );
}
