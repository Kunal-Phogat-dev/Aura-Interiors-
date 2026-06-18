"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import Methodology from "./components/Methodology";
import Materials from "./components/Materials";
import Contact from "./components/Contact";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  // Global scroll calculation
  const scrollVh = windowHeight > 0 ? scrollY / windowHeight : 0;
  const portfolioOpacity = Math.min(1, Math.max(0, (scrollVh - 14.5) / 0.5));
  const visionCardsOpacity = Math.min(1, Math.max(0, 1 - (scrollVh - 14.5) / 0.5));

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    setWindowHeight(window.innerHeight);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Phase 1: Wait for a bit (deadzone of 30vh), then circle expands over 120vh
  const circleProgress = Math.min(1, Math.max(0, (scrollY - windowHeight * 0.3) / (windowHeight * 1.2)));
  
  // Phase 2: After circle is fully expanded (at 1.5vh), arched panels expand over 200vh (ends at 3.5vh)
  const expandProgress = Math.min(1, Math.max(0, (scrollY - windowHeight * 1.5) / (windowHeight * 2.0)));

  // Phase 3: Pause to admire the image AND let the text fully animate (3.5vh to 6.5vh), then gradually add a dark tint over 100vh
  const tintProgress = Math.min(1, Math.max(0, (scrollY - windowHeight * 6.5) / (windowHeight * 1.0)));

  // Phase 4: Final fade to solid black for a seamless exit into the next section (7.0vh to 7.5vh)
  const exitFadeProgress = Math.min(1, Math.max(0, (scrollY - windowHeight * 7.0) / (windowHeight * 0.5)));

  // Phase 5: Horizontal scroll for Vision section glassmorphism cards (7.5vh to 14.5vh)
  const cardScrollProgress = Math.min(1, Math.max(0, (scrollY - windowHeight * 7.5) / (windowHeight * 7.0)));

  return (
    <div className="bg-black text-zinc-100 font-sans min-h-[100dvh]">
      <Navbar expandProgress={expandProgress} />
      
      <Hero 
        circleProgress={circleProgress} 
        expandProgress={expandProgress} 
        tintProgress={tintProgress} 
        exitFadeProgress={exitFadeProgress} 
      />

      <Portfolio 
        scrollY={scrollY}
        windowHeight={windowHeight}
        cardScrollProgress={cardScrollProgress}
        visionCardsOpacity={visionCardsOpacity}
        portfolioOpacity={portfolioOpacity}
      />

      <Methodology />
      <Materials />
      <Contact />
    </div>
  );
}
