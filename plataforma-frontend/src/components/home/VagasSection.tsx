import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TabInclinada from "../tabs/TabInclinada";

import TabVagas from "../tabs/TabVagas";
import TabLegislacao from "../tabs/TabLegislacao";
import TabParceiros from "../tabs/TabParceiros";
import TabComunicados from "../tabs/TabComunicados";

const abaVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

export default function VagasSection() {
  const [abaAtiva, setAbaAtiva] = useState('vagas');

  return (
    <section className="py-20 bg-slate-100">
      <div className="container mx-auto px-4">
        
        <div className="flex  mb-11 gap-1">
          <TabInclinada 
            titulo="Vagas"
            subtitulo="Explore oportunidades"
            estaAtivo={abaAtiva === 'vagas'}
            onClick={() => setAbaAtiva('vagas')}
          />
          <TabInclinada 
            titulo="Legislação"
            subtitulo="Conheça seus direitos"
            estaAtivo={abaAtiva === 'legislacao'}
            onClick={() => setAbaAtiva('legislacao')}
          />
          <TabInclinada 
            titulo="Parceiros"
            subtitulo="Quem nos apoia"
            estaAtivo={abaAtiva === 'parceiros'}
            onClick={() => setAbaAtiva('parceiros')}
          />
          <TabInclinada 
            titulo="Comunicados"
            subtitulo="Pra você ficar por dentro"
            estaAtivo={abaAtiva === 'comunicados'}
            onClick={() => setAbaAtiva('comunicados')}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={abaAtiva} 
            variants={abaVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {abaAtiva === 'vagas' && <TabVagas />}
            {abaAtiva === 'legislacao' && <TabLegislacao />}
            {abaAtiva === 'parceiros' && <TabParceiros />}
            {abaAtiva === 'comunicados' && <TabComunicados />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}