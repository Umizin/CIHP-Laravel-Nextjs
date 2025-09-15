import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["300", "400", "500", "700"] });

export default function HomeBanner() {
  return (
    
    <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
      
      {/* Background com imagem */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://errejotanoticias.com.br/wp-content/uploads/2024/03/Entrada-de-Marica-1068x712.jpg')",
        }}
      >
        {/* Overlay escuro para contraste */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent" />
      </div>

      {/* Conteúdo do banner */}
      <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-16 lg:px-24 text-white">
        <h1 className={`${montserrat.className} text-5xl md:text-6xl lg:text-8xl font-extrabold drop-shadow-lg`}>
          CIHP
        </h1>

        <ul className={`${montserrat.className} mt-2 space-y-1 text-lg md:text-xl lg:text-1xl font-light`}>
          <li>Onde nasce o voluntariado</li>
          <li>E crescem novas oportunidades</li>
        </ul>

        <button className="w-40 h-12 bg-yellow-400 text-black font-semibold rounded-full shadow-lg hover:bg-yellow-500 transition">
          Quem somos ?
        </button>
      </div>
    </section>
  );
}

