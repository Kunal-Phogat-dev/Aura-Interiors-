"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Portfolio({
  scrollY,
  windowHeight,
  cardScrollProgress,
  visionCardsOpacity,
  portfolioOpacity,
}: {
  scrollY: number;
  windowHeight: number;
  visionCardsOpacity: number;
  portfolioOpacity: number;
}) {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard(prev => (prev + 1) % 4);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const scrollVh = windowHeight > 0 ? scrollY / windowHeight : 0;

  const portfolioProjects = [
    { id: '01', title: 'The Modern Loft', desc: 'A perfect mix of concrete and warm fabrics, making city living feel comfortable and high-end.', img: '/images/living_room.png' },
    { id: '02', title: 'Peaceful Bedroom', desc: 'A cozy bedroom design with soft beds and warm lighting for perfect rest.', img: '/images/bedroom.png' },
    { id: '03', title: 'Modern Kitchen', desc: 'Dark marble and gold details in a kitchen made for looking great and cooking easily.', img: '/images/kitchen.png' },
    { id: '04', title: 'Relaxing Bathroom', desc: 'Making your daily routine feel special with nice lighting and natural stone.', img: '/images/bathroom.png' }
  ];

  return (
    <section className="relative h-[600vh] bg-black z-10">
      <div id="design" className="absolute top-[50vh] left-0 w-full h-1 pointer-events-none" />
      <div id="portfolio" className="absolute top-[300vh] left-0 w-full h-1 pointer-events-none" />
      
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-center px-6 md:px-12 lg:px-20 overflow-hidden">
        
        {/* Glassmorphism Cards Isolated Track */}
        <motion.div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{ opacity: visionCardsOpacity }}
        >
          {[
            { id: 1, title: 'Beautiful Living', desc: 'Mixing natural materials and clean design to create a space that feels calm and beautiful.', img: '/images/living_room.png' },
            { id: 2, title: 'Peaceful Bedroom', desc: 'A simple bedroom design focusing on soft beds, warm lighting, and a relaxing feel.', img: '/images/bedroom.png' },
            { id: 3, title: 'Modern Kitchen', desc: 'Dark marble and gold details in a kitchen made for looking great and cooking easily.', img: '/images/kitchen.png' },
            { id: 4, title: 'Relaxing Bathroom', desc: 'Making your daily routine feel special with nice lighting and natural stone.', img: '/images/bathroom.png' }
          ].map((card, idx) => {
            const isActive = idx === activeCard;
            const scale = isActive ? 1 : 0.8;
            const opacity = isActive ? 1 : 0;

            return (
              <div 
                key={card.id}
                className="absolute top-1/2 -translate-y-1/2 left-[5vw] md:left-[10vw] lg:left-[15vw] w-[300px] md:w-[400px] lg:w-[450px] h-[450px] md:h-[600px] rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex flex-col overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] origin-center transition-all duration-[1000ms] ease-in-out"
                style={{
                  transform: `scale(${scale})`,
                  opacity: opacity,
                  pointerEvents: isActive ? 'auto' : 'none',
                  zIndex: isActive ? 30 : 10
                }}
              >
                {/* Generated Image */}
                <div className="flex-1 w-full relative overflow-hidden group">
                  <img 
                    src={card.img} 
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-50" />
                </div>
                
                {/* Details Text Area */}
                <div className="p-8 md:p-10 bg-black/80 backdrop-blur-md border-t border-white/5 z-10 shrink-0">
                  <h4 className="text-white font-serif font-bold text-2xl mb-3">{card.title}</h4>
                  <p className="text-zinc-400 text-sm font-sans leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Portfolio Peeling Stack */}
        <div 
          className="absolute inset-0 z-10 flex items-center justify-start px-6 md:px-12 lg:px-20 pointer-events-none"
          style={{ opacity: portfolioOpacity }}
        >
          <div className="relative w-[300px] md:w-[450px] lg:w-[500px] h-[400px] md:h-[600px] -mt-32 lg:-mt-16">
            {portfolioProjects.map((project, index) => {
              const startPeel = 10.0 + index;
              // The final card should not peel away so that it smoothly transitions into the next section
              const peelProgress = index === portfolioProjects.length - 1 ? 0 : Math.min(1, Math.max(0, scrollVh - startPeel));
              const yTranslate = peelProgress * 150; // vh down
              const rotation = peelProgress * 10; // slight spin
              
              return (
                <div 
                  key={project.id}
                  className="absolute inset-0 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10"
                  style={{
                    transform: `translateY(${yTranslate}vh) rotate(${rotation}deg)`,
                    zIndex: 10 - index
                  }}
                >
                  <img src={project.img} alt={project.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right-aligned Typography Overlays */}
        <div className="absolute bottom-12 md:bottom-24 lg:bottom-32 right-6 md:right-12 lg:right-20 flex flex-col items-end text-right z-20 pointer-events-none w-[calc(100vw-3rem)] md:w-[600px] h-auto md:h-[200px]">
          
          {/* Design Text */}
          <motion.div 
            className="absolute bottom-0 right-0 flex flex-col items-end w-full"
            style={{ opacity: visionCardsOpacity }}
          >
            <motion.h2 
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.03 } }
              }}
              initial="hidden"
              animate={scrollY >= windowHeight * 7.4 ? "visible" : "hidden"}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-[50px] font-bold tracking-tight font-serif text-white leading-tight mb-6"
            >
              {"We don't just design rooms.".split("").map((char, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              <br />
              {"We create feelings.".split("").map((char, index) => (
                <motion.span
                  key={index}
                  className="inline-block font-semibold italic text-accent mt-2"
                  variants={{ hidden: { opacity: 0, filter: "blur(10px)" }, visible: { opacity: 1, filter: "blur(0px)" } }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: scrollY >= windowHeight * 7.4 ? 1 : 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="max-w-xl text-sm md:text-base text-zinc-400 font-sans leading-relaxed"
            >
              Every detail is carefully placed to match how you live. Our spaces aren't just beautiful—they feel like home.
            </motion.p>
          </motion.div>

      {/* Dynamic Portfolio Text */}
      {portfolioProjects.map((project, index) => {
        // Sharp, seamless crossfade logic
        const fadeInStart = index === 0 ? 9.0 : 9.9 + index;
        const fadeInEnd = index === 0 ? 9.0 : 10.1 + index;
        // The final text should not fade out, let it scroll away cleanly with the section
        const fadeOutStart = index === portfolioProjects.length - 1 ? 999 : 10.9 + index;
        const fadeOutEnd = index === portfolioProjects.length - 1 ? 999 : 11.1 + index;

        let textOpacity = 1;
        if (scrollVh < fadeInStart) {
          textOpacity = 0;
        } else if (scrollVh < fadeInEnd) {
          textOpacity = (scrollVh - fadeInStart) / (fadeInEnd - fadeInStart);
        } else if (scrollVh > fadeOutEnd) {
          textOpacity = 0;
        } else if (scrollVh > fadeOutStart) {
          textOpacity = 1 - (scrollVh - fadeOutStart) / (fadeOutEnd - fadeOutStart);
        }

        const isVisible = textOpacity > 0;

        return (
          <div 
            key={project.id}
            className="absolute bottom-0 right-0 flex flex-col items-end w-full"
            style={{ 
              opacity: textOpacity * portfolioOpacity,
              pointerEvents: isVisible ? 'auto' : 'none',
              display: isVisible ? 'flex' : 'none'
            }}
          >
            <h3 className="text-accent uppercase tracking-[0.2em] text-sm md:text-base font-semibold mb-6">Project {project.id}</h3>
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-[50px] font-bold tracking-tight font-serif text-white leading-tight mb-6 drop-shadow-lg">
              {project.title}<br/>
              <span className="font-semibold italic text-zinc-400 block text-lg md:text-xl lg:text-2xl mt-4 max-w-xl text-right leading-relaxed font-sans normal-case drop-shadow-md">{project.desc}</span>
            </h2>
          </div>
        );
      })}

    </div>
      </div>
    </section>
  );
}
