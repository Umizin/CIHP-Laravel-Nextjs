import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ImagemAnimada from "../components/InfoQuemSomosImagensAnimacao";

const imagens = [
  "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  "https://images.unsplash.com/photo-1628717341663-0007b0ee2597?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171",
  "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  "https://images.unsplash.com/photo-1590874023110-f82d4c63b599?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  "https://images.unsplash.com/photo-1707504212217-f2ede27da954?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
];

export default function InfoQuemSomosSection() {
    // Aqui a gente cria uma ref para que o useScroll não pegue a página toda.
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })
    // Opacity dos itens
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
    const opacityImg1 = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const opacityImg2 = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]); // Fade in
    const opacityImg3 = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
    const opacityImg4 = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
    const opacityImg5 = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);

    const textOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  return (
    // aqui indicamos qual conteiner é a ref.
    <div ref={containerRef} className="h-[500vh] relative">
      <div className="sticky top-0 h-screen">
        <motion.div style={{ scale }} className="relative h-full w-full">
          <ImagemAnimada src={imagens[0]} opacity={opacityImg1} />
          <ImagemAnimada src={imagens[1]} opacity={opacityImg2} />
          <ImagemAnimada src={imagens[2]} opacity={opacityImg3} />
          <ImagemAnimada src={imagens[3]} opacity={opacityImg4} />
          <ImagemAnimada src={imagens[4]} opacity={opacityImg5} />
        </motion.div>

        <motion.div 
            className="absolute inset-0 flex items-center justify-center" 
            style={{ opacity: textOpacity }}
        >
            <p className="text-white text-4xl md:text-6xl text-center font-bold drop-shadow-lg">
                Venha fazer a diferença.
            </p>
        </motion.div>
      </div>
    </div>
  );
}