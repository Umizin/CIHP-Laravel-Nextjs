import { Montserrat } from "next/font/google"; 

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "600"] });

export default function Footer() {
  return (
    <footer className={`bg-slate-900 text-gray-300 ${montserrat.className}`}>
      <div className="container mx-auto px-4 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          <div className="flex flex-col gap-6">
            <h3 className="text-3xl font-bold text-white mb-4">Fale conosco</h3>
            
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-yellow-400">
                location_on
              </span>
              <p>Av. Central, 1234 – Maricá, RJ – Brasil</p>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-yellow-400">
                mail
              </span>
              <a href="mailto:contato@canihelp.com" className="hover:text-yellow-400 transition-colors">
                contato@canihelp.com
              </a>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-yellow-400">
                call
              </span>
              <p>2629-5085</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <input 
              type="email" 
              placeholder="Seu melhor e-mail"
              className="w-full p-4 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder:text-gray-500"
            />
            <textarea 
              placeholder="Sua mensagem..."
              rows={4}
              className="w-full p-4 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder:text-gray-500"
            />
            <button className="w-full p-4 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors">
              Enviar Mensagem
            </button>
          </div>

        </div>
      </div>

      <div className="border-t border-slate-700">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© 2025 - CAN I HELP - Todos os direitos reservados</p>
          
          <a href="#" className="flex items-center gap-2 hover:text-yellow-400 transition-colors mt-4 md:mt-0">
            <span className="material-symbols-outlined">gavel</span>
            Política de Privacidade
          </a>
        </div>
      </div>
    </footer>
  );
}