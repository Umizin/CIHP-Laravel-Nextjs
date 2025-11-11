// src/components/VagaCard.tsx
import { motion } from "framer-motion";

// O "Blueprint" do Minério (Props que você definiu)
export interface Vaga {
  imagemUrl: string;
  titulo: string;
  descricao: string;
  data: string;
  disponivelParaInscricao: boolean;
}

// A "Forma" de animação do "Soldado"
export const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function VagaCard({ 
  imagemUrl, 
  titulo, 
  descricao, 
  data, 
  disponivelParaInscricao 
}: Vaga) {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
      variants={cardVariants}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
    >
      {/* Imagem */}
      <img src={imagemUrl} alt={titulo} className="w-full h-48 object-cover" />
      
      {/* Conteúdo */}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{titulo}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{descricao}</p>
        
        <span className="text-sm text-gray-500 mb-4">{data}</span>
        
        <button 
          className={`w-full font-semibold py-2 rounded-lg transition-colors
            ${disponivelParaInscricao 
              ? 'bg-yellow-400 text-black hover:bg-yellow-500' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
          disabled={!disponivelParaInscricao}
        >
          {disponivelParaInscricao ? 'Inscreva-se' : 'Encerrado'}
        </button>
      </div>
    </motion.div>
  );
}