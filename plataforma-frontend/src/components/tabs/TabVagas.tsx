import { motion } from "framer-motion";
import VagaCard, { Vaga, cardVariants } from "../home/VagaCards"; 

const DADOS_VAGAS_MOCK: Vaga[] = [
  {
    imagemUrl: "https://ciclovivo.com.br/wp-content/uploads/2024/05/limpeza-praia-Ortobom-ciclovivo-1024x683.jpg",
    titulo: "Limpeza de praia",
    descricao: "Mutirão de limpeza na Praia de Itaipuaçu. Fornecemos luvas e sacos.",
    data: "20 de Dezembro, 2025 - 09:00",
    disponivelParaInscricao: true,
  },
  {
    imagemUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500&q=60",
    titulo: "Distribuição de Alimentos",
    descricao: "Ajude a separar e distribuir cestas básicas no centro comunitário.",
    data: "22 de Dezembro, 2025 - 14:00",
    disponivelParaInscricao: true,
  },
  {
    imagemUrl: "https://s2-g1.glbimg.com/ncImZg5EHdjsdVurLpIS34W6Oe0=/0x0:1280x960/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2018/y/q/jVuUSUR0SeStPdTxtPBg/acoes-sociais.png",
    titulo: "Reforma da Creche",
    descricao: "Pintura e pequenos reparos na creche local. Traga sua energia!",
    data: "18 de Dezembro, 2025 - 08:00",
    disponivelParaInscricao: false,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function TabVagas() {
  return (
    <>
      <div className="mb-12 relative">
        <input 
          type="text" 
          placeholder="Busque por vagas..." 
          className="w-full p-4 pl-12 rounded-lg shadow-inner bg-white border border-gray-300 placeholder:text-gray-600 text-gray-900" 
        />
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          search
        </span>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible" 
        viewport={{ once: true, amount: 0.1 }}
      >
        {DADOS_VAGAS_MOCK.map((vaga) => (
          <VagaCard 
            key={vaga.titulo}
            {...vaga}
          />
        ))}
      </motion.div>
    </>
  );
}