import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ImagemAnimada from "./InfoQuemSomosImagensAnimacao";

const imagens = [
  "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  "https://images.unsplash.com/photo-1628717341663-0007b0ee2597?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171",
  "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  "https://images.unsplash.com/photo-1590874023110-f82d4c63b599?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  "https://images.unsplash.com/photo-1668473529238-76050aa331ab?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735",
];

export default function InfoQuemSomosSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })
    const scale = useTransform(scrollYProgress, [0,0.2, 1], [1.05,1, 0.2]);
    const opacityImg1 = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const opacityImg2 = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);
    const opacityImg3 = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
    const opacityImg4 = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);
    const opacityImg5 = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);

    const opacityVontade = useTransform(scrollYProgress, [0.65, 0.8], [0, 1]);
    const opacitySeta = useTransform(scrollYProgress, [0.75, 0.9], [0, 1]);
    const opacityOportunidade = useTransform(scrollYProgress, [0.8, 0.85], [0, 1]);
return (
    <div ref={containerRef} className="h-[700vh] relative bg-white">
      <div className="sticky top-0 h-screen">
        
        <motion.div style={{ scale }} className="relative h-full w-full">
          <ImagemAnimada src={imagens[0]} opacity={opacityImg1} />
          <ImagemAnimada src={imagens[1]} opacity={opacityImg2} />
          <ImagemAnimada src={imagens[2]} opacity={opacityImg3} />
          <ImagemAnimada src={imagens[3]} opacity={opacityImg4} />
          <ImagemAnimada src={imagens[4]} opacity={opacityImg5} />
        </motion.div>

        <div 
            className="absolute inset-0 flex items-start justify-center z-20 pt-24" 
        >
            <div className="flex flex-col md:flex-row items-center justify-cente p-">
              

              <motion.img 
                  src="/imagens/vontade.png" 
                  alt="Onde a vontade"
                  className="w-auto h-12 md:h-70"
                  style={{ opacity: opacityVontade }}
              />
              
              <motion.img 
                  src="/imagens/seta.png" 
                  alt="seta"
                  className="w-auto h-8 md:h-70" 
                  style={{ opacity: opacitySeta }}
              />
              
              <motion.img 
                  src="/imagens/oportunidade.png"
                  alt="encontra a oportunidade"
                  className="w-auto h-12 md:h-70" 
                  style={{ opacity: opacityOportunidade }}
              />

            </div>
        </div>
      </div>
    </div>
  );
}