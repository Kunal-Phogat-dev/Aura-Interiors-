"use client";

import { motion } from "framer-motion";

export default function Materials() {
  return (
    <section id="studio" className="relative w-full bg-black py-32 md:py-48 px-6 md:px-12 lg:px-20 z-20 overflow-hidden border-t border-white/5">
      <div className="max-w-[100rem] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 md:mb-32 gap-10">
          <div className="flex flex-col">
            <motion.h3 
              initial={{ opacity: 0, letterSpacing: '0em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.2em' }}
              viewport={{ once: false }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-accent uppercase text-sm md:text-base font-semibold mb-6"
            >
              Materials & Quality
            </motion.h3>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight font-serif text-white leading-tight overflow-hidden">
              <motion.span 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                What You
              </motion.span>
              <motion.span 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-semibold italic text-zinc-600 block mt-2"
              >
                Feel
              </motion.span>
            </h2>
          </div>
            <motion.p 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="max-w-md text-sm md:text-base text-zinc-400 font-sans leading-relaxed text-left md:text-right"
            >
              We find the best natural materials from around the world. Every stone, wood, and fabric is picked so it looks great and lasts a long time in your home.
            </motion.p>
          </div>
  
          {/* Material Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { id: '01', title: 'Gold Marble', subtitle: 'Marble / Italy', img: '/images/material_marble.png' },
              { id: '02', title: 'Dark Wood', subtitle: 'Hardwood / Americas', img: '/images/material_wood.png' },
              { id: '03', title: 'Gold Metal', subtitle: 'Metal / Custom Finish', img: '/images/material_brass.png' },
              { id: '04', title: 'Soft Linen', subtitle: 'Textile / Belgium', img: '/images/material_linen.png' },
          ].map((material, index) => (
            <motion.div
              key={material.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group relative w-full aspect-[3/4] md:aspect-[2/3] lg:aspect-[3/4] overflow-hidden cursor-pointer bg-zinc-900 rounded-lg"
            >
              {/* Image */}
              <div className="absolute inset-0 w-full h-full transition-transform duration-1000 ease-[0.22,1,0.36,1] group-hover:scale-110">
                <img 
                  src={material.img} 
                  alt={material.title}
                  className="w-full h-full object-cover filter brightness-[0.6] contrast-125 group-hover:brightness-100 group-hover:contrast-100 transition-all duration-700"
                />
              </div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700" />
              
              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div className="text-accent font-serif italic text-lg opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                  {material.id}
                </div>
                <div className="flex flex-col translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <h4 className="text-white font-serif font-bold text-2xl tracking-wide mb-1">{material.title}</h4>
                  <p className="text-zinc-400 text-xs tracking-widest uppercase font-semibold">{material.subtitle}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
