"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero({ 
  circleProgress, 
  expandProgress, 
  tintProgress, 
  exitFadeProgress 
}: { 
  circleProgress: number; 
  expandProgress: number; 
  tintProgress: number; 
  exitFadeProgress: number; 
}) {
  const columns = [
    { id: 0, baseVh: 35 },
    { id: 1, baseVh: 50 },
    { id: 2, baseVh: 65 },
    { id: 3, baseVh: 80 },
    { id: 4, baseVh: 65 },
    { id: 5, baseVh: 50 },
    { id: 6, baseVh: 35 },
  ];

  const renderLetterByLetter = (text: string, delayOffset: number, isActive: boolean) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className={`inline-block transition-all ease-out ${
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ 
          transitionDelay: isActive ? `${delayOffset + index * 40}ms` : '0ms',
          transitionDuration: isActive ? '700ms' : '150ms'
        }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section className="relative h-[750vh]">
      {/* Background Image for Performance (LCP) */}
      <div 
        className="absolute inset-0 pointer-events-none -z-10"
        style={{ opacity: expandProgress }}
      >
        <Image 
          src="/hero-interior.png" 
          alt="Bespoke Luxury Interiors" 
          priority 
          fill 
          className="object-cover" 
        />
      </div>
      <div className="sticky top-0 h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
        
      {/* Intro Phase: "AURA" Text Mask */}
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20"
        style={{
          opacity: Math.max(0, 1 - circleProgress * 1.5),
          transform: `scale(${1 + circleProgress * 3})`,
        }}
      >
        <motion.span 
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-7xl md:text-9xl font-medium tracking-tight font-serif"
          style={{
            backgroundImage: "url('/hero-interior.png')",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: "center",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          AURA
        </motion.span>
      </div>

      {/* Phase 2: Expanding Arched Columns */}
      <div 
        className="w-full h-full flex items-center justify-center absolute inset-0"
        style={{
          // Fade in the columns as AURA fades out
          opacity: Math.min(1, circleProgress * 1.5),
        }}
      >
        <div 
          className="flex flex-row items-center justify-center mx-auto"
          style={{
            gap: `${(1 - expandProgress) * 0.5}rem`,
            paddingTop: `${(1 - expandProgress) * 1}rem`,
            paddingBottom: `${(1 - expandProgress) * 1}rem`,
            width: '100%',
          }}
        >
          {columns.map((col) => {
            const currentHeight = col.baseVh + (100 - col.baseVh) * expandProgress;
            const currentRadius = (1 - expandProgress) * 2;
            const borderOpacity = (1 - expandProgress) * 0.2;

            return (
              <div
                key={col.id}
                className="relative bg-cover bg-center flex-1"
                style={{
                  height: `${currentHeight}vh`,
                  borderRadius: `${currentRadius}rem`,
                  backgroundImage: "url('/hero-interior.png')",
                  backgroundAttachment: "fixed",
                }}
              >
                {/* Border fades out smoothly */}
                <div 
                  className="absolute inset-0 pointer-events-none" 
                  style={{
                    border: `${(1 - expandProgress) * 1}px solid rgba(255,255,255,${borderOpacity})`,
                    borderRadius: `${currentRadius}rem`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Cinematic Base Overlay for Text Legibility */}
      <div 
        className={`absolute inset-0 bg-[#0A0A0A]/40 pointer-events-none z-20 transition-opacity duration-700 ${
          expandProgress === 1 ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Phase 3: Dark Edge Blending (Vignette) Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-20"
        style={{ 
          opacity: tintProgress,
          background: 'radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,1) 55%, rgba(0,0,0,1) 100%)'
        }}
      />

      {/* Hero Text */}
      <div 
        className={`absolute inset-0 flex flex-col justify-end pointer-events-none z-30 pb-24 md:pb-32`}
      >
        <div className="w-full px-6 md:px-12 lg:px-20 flex flex-col items-center md:items-start text-center md:text-left pointer-events-auto">
          <h1 className="text-3xl sm:text-4xl md:text-[53px] lg:text-[65px] font-medium tracking-tight font-serif text-white drop-shadow-2xl leading-tight">
            {renderLetterByLetter("Bespoke Luxury ", 0, expandProgress === 1)}
            <span className="font-medium italic text-accent drop-shadow-xl">
              {renderLetterByLetter("Interiors.", 480, expandProgress === 1)}
            </span>
          </h1>
          <p className="mt-4 md:mt-6 text-sm md:text-[19px] font-medium font-sans tracking-tight text-zinc-300 drop-shadow-lg max-w-2xl">
            {renderLetterByLetter("Elevating Pune's finest residences through uncompromising craftsmanship and curated design.", 1000, expandProgress === 1)}
          </p>
          <div className={`transition-all duration-1000 ${expandProgress === 1 ? "opacity-100 translate-y-0 delay-[2000ms]" : "opacity-0 translate-y-8 delay-0 pointer-events-none"}`}>
            <a href="#contact" className="inline-block mt-8 px-8 py-4 bg-[#C9A84C] text-[#111111] font-semibold text-sm tracking-wide uppercase hover:bg-white transition-colors duration-300">
              Book Your Private Consultation
            </a>
          </div>
        </div>
      </div>

        {/* Helper scroll indicator that fades out rapidly */}
        <div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 uppercase tracking-widest text-[10px] z-40"
          style={{ opacity: 1 - circleProgress * 3 }}
        >
          Scroll
          <span className="w-[1px] h-6 bg-zinc-800 relative overflow-hidden">
            <span className="absolute top-0 left-0 w-full h-1/2 bg-white animate-[bounce_2s_infinite]" />
          </span>
        </div>

        {/* Phase 4: Exit Transition Fade */}
        <div 
          className="absolute inset-0 bg-black pointer-events-none z-50"
          style={{ opacity: exitFadeProgress }}
        />
      </div>
    </section>
  );
}
