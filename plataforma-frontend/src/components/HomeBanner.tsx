import { Montserrat } from "next/font/google";
import { MotionValue, motion, useTransform } from "framer-motion";
import InfoCardsSection from "./InfoCardsSection";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["300", "400", "500", "700"] });

interface HomeBannerProps {
  scrollYProgress: MotionValue<number>;
}

export default function HomeBanner({ scrollYProgress }: HomeBannerProps) {
  // CORREÇÃO: Ajustei o zoom para um valor mais sutil (120%) para evitar o efeito "ridículo".
  // Você pode ajustar o 1.2 para o valor que desejar.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    // A estrutura do container sticky permanece a mesma.
    <div className="h-[400vh]">
      <motion.section
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ scale }}
      >
        {/* A TÉCNICA CORRETA: a tag <video> nativa com a classe object-cover */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src="https://www.youtube.com/embed/RJ8QsOMgHuw?autoplay=1&mute=1&loop=1&playlist=RJ8QsOMgHuw&controls=0&showinfo=0&autohide=1" // Caminho para o vídeo na sua pasta /public
          autoPlay
          loop
          muted
          playsInline // Atributo importante para autoplay em browsers mobile
        />

        {/* Seu conteúdo de overlay e texto permanece o mesmo */}
        <div className="relative z-10 flex flex-col justify-center h-full text-white bg-black/30 px-6 md:px-16 lg:px-24">
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
        </div>
      </motion.section>
    </div>
  );
}