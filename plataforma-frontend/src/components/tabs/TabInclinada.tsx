import { motion } from "framer-motion";

interface TabInclinadaProps {
    titulo: string;
    subtitulo: string;
    estaAtivo: boolean;
    onClick: () => void;
}

export default function TabInclinada({ titulo, subtitulo, estaAtivo, onClick }: TabInclinadaProps) {
    return (
        <motion.div
            className={`text-white px-10 py-5 cursor-pointer
                  ${estaAtivo ? 'bg-gradient-to-b from-red-700 to-orange-500' : 'bg-gray-700 hover:bg-gray-600'}
                 `}
            onClick={onClick}
            
            style={{ skewX: -6 }} 
            
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
        >
            <div style={{ skewX: -12 }}> 
                <h3 className="text-xl font-bold uppercase">{titulo}</h3>
                <p className="text-sm">{subtitulo}</p>
            </div>
        </motion.div>
    );
}