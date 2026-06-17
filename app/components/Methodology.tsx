"use client";

import { motion } from "framer-motion";

export default function Methodology() {
  return (
    <section id="about" className="relative w-full bg-[#050505] py-32 md:py-48 px-6 md:px-12 lg:px-20 z-20 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-20 md:mb-32">
          <motion.h3 
            initial={{ opacity: 0, letterSpacing: '0em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.2em' }}
            viewport={{ once: false }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-accent uppercase text-sm md:text-base font-semibold mb-6"
          >
            How We Work
          </motion.h3>
          
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight font-serif text-white leading-[1.1] overflow-hidden flex flex-col items-center">
            <motion.span 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              Making It
            </motion.span>
            <motion.span 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-semibold italic text-zinc-600 block mt-2"
            >
              Perfect
            </motion.span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 lg:gap-16 relative">
          {/* Animated top border line */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent hidden md:block origin-left"
          />

          {[
            { num: '01', title: 'Planning & Ideas', desc: 'We start by learning how you live and what you like, turning your ideas into a clear plan.' },
            { num: '02', title: 'Choosing & Designing', desc: 'Carefully picking the right materials, custom furniture, and good lighting to build a space that feels personal and high-quality.' },
            { num: '03', title: 'Building & Finishing', desc: 'Smooth teamwork and careful building, making sure every detail is perfectly placed.' }
          ].map((step, index) => (
            <motion.div 
              key={step.num}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1, 
                  transition: { staggerChildren: 0.2, delayChildren: index * 0.2 } 
                }
              }}
              className="flex flex-col group relative md:pt-12"
            >
              <motion.div 
                variants={{ hidden: { opacity: 0, scale: 0.8, y: 20 }, visible: { opacity: 1, scale: 1, y: 0 } }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-6xl md:text-[5rem] lg:text-[6rem] font-serif text-white/5 group-hover:text-white/10 group-hover:-translate-y-2 transition-all duration-700 mb-6 font-bold"
              >
                {step.num}
              </motion.div>
              
              <motion.h4 
                variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-white text-xl md:text-2xl font-bold font-serif mb-4 flex items-center gap-4"
              >
                <span className="w-0 h-[2px] bg-accent group-hover:w-8 transition-all duration-500 ease-out" />
                {step.title}
              </motion.h4>
              
              <motion.p 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors duration-500"
              >
                {step.desc}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
