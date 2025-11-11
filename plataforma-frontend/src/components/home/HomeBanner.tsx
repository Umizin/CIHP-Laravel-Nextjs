import { Montserrat } from "next/font/google";
import { MotionValue, motion, useTransform } from "framer-motion";
import InfoCardsSection from "./InfoCardsSection";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["300", "400", "500", "700"] });

interface HomeBannerProps {
  scrollYProgress: MotionValue<number>;
}

export default function HomeBanner({ scrollYProgress }: HomeBannerProps) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.30, 0.45], [1,1, 0]);
  return (
    <div className="h-[400vh]">
      <motion.section
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ scale }}
      >
        {}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src="videos/videohome.webm"
          autoPlay
          loop
          muted
          playsInline
        />

        <motion.div className="relative z-10 flex flex-col justify-center h-full text-white bg-black/30 px-6 md:px-16 lg:px-24"
          style={{ opacity:textOpacity }}>
          <h1 className={`${montserrat.className} text-5xl md:text-6xl lg:text-8xl font-extrabold drop-shadow-lg`}>
            CIHP
          </h1>
          <ul className={`${montserrat.className} mt-2 space-y-1 text-lg md:text-xl font-light`}>
            <li>Onde nasce o voluntariado</li>
            <li>E crescem novas oportunidades</li>
          </ul>
          <button className="mt-6 w-40 h-12 bg-yellow-400 text-black font-semibold rounded-full shadow-lg hover:bg-yellow-500 transition">
            Quem somos?
          </button>
          <InfoCardsSection scrollYProgress={scrollYProgress}/>
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
            style={{ opacity: textOpacity }} 
            animate={{ y: [0, 10, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              repeatType: "loop" 
            }}
          >
            <p className={`text-sm ${montserrat.className}`}>Role para uma experiência</p>
            <span className="material-symbols-outlined">
              arrow_downward
            </span>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
}