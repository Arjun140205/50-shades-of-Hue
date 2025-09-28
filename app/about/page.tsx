"use client";

import { WebGLShader } from "@/components/ui/web-gl-shader";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
        </svg>
      ),
      title: "Instant Palette Generation",
      description: "Extract beautiful color palettes from any image in seconds",
      delay: 0,
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
        </svg>
      ),
      title: "Real-world Inspiration",
      description: "Use your camera to capture colors from the world around you",
      delay: 100,
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Smart Color Analysis",
      description: "Get accurate color names and detailed information for each shade",
      delay: 200,
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
        </svg>
      ),
      title: "Design Suggestions",
      description: "Curated palettes for web, presentations, and interior design",
      delay: 300,
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      title: "Modern Experience",
      description: "Fast, responsive, and user-friendly interface",
      delay: 400,
    },
  ];

  return (
    <div className="w-full flex-1 relative min-h-screen">
      {/* WebGL Background */}
      <div className="fixed inset-0 -top-40 sm:-top-60">
        <WebGLShader />
      </div>

      {/* Content */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 z-10">
        <div className="w-full max-w-5xl mx-auto px-6 flex flex-col items-center">
          {/* Header */}
          <div className="text-center mb-16 transform transition-all duration-700 ease-out delay-100"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            }}>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/50 mb-6">
              About 50 Shades of Hue
            </h1>
            <p className="text-xl md:text-2xl text-neutral-300 max-w-3xl font-medium mx-auto">
              Your creative color companion, designed to make color palette generation effortless and premium.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.7s ease-out ${feature.delay}ms`,
                }}
              >
                <div className="relative z-10 h-full p-8 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/5 group-hover:-translate-y-1">
                  <div className="inline-block mb-4 text-blue-400/80 transform transition-all duration-300 group-hover:scale-110 group-hover:text-blue-400">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-400">
                    {feature.description}
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div
            className="mt-20 text-center transform transition-all duration-700 ease-out delay-500"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <div className="inline-block px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
              <p className="text-neutral-400 text-sm">
                Built with{' '}
                <span className="text-blue-400">Next.js</span>,{' '}
                <span className="text-teal-400">Tailwind CSS</span>, and a{' '}
                <span className="text-purple-400">passion for color</span> by{' '}
                <a 
                  href="https://github.com/Arjun140205" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  Arjunbir Singh
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
