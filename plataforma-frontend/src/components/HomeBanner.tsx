import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["300", "400", "500", "700"] });

export default function HomeBanner() {
  return (
    <section className="relative w-full h-[500px] lg:h-[600px] overflow-hidden">
      {/* Vídeo de Fundo */}
      <iframe
        className="absolute z-0 top-1/2 left-1/2 w-[177.77vh] min-w-[100vw] h-[56.25vw] min-h-[100vh] -translate-x-1/2 -translate-y-1/2"
        src="https://www.youtube.com/embed/RJ8QsOMgHuw?autoplay=1&mute=1&loop=1&playlist=RJ8QsOMgHuw&controls=0&showinfo=0&autohide=1"
        frameBorder="0"
        allow="autoplay; encrypted-media"
      ></iframe>

      {/* Overlay e Conteúdo */}
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
      </div>
    </section>
  );
}

