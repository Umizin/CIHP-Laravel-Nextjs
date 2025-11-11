import { MotionValue, motion, useTransform } from "framer-motion";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["300", "400", "500", "700"] });

interface InfoCardsSectionProps {
    scrollYProgress: MotionValue<number>;
}

export default function InfoCardsSection({ scrollYProgress }: InfoCardsSectionProps) {
    const opacity = useTransform(scrollYProgress, [0.15, 0.35,0.40, 0.45], [0, 1,1, 0]);
    const y = useTransform(scrollYProgress, [0.25, 0.45], [100, 0]);

    return (
        <motion.div
            className="flex flex-row gap-8 w-full px-40"
            style={{ opacity, y }}
        >
            <motion.div
                className="flex-1 p-8 bg-black/60 backdrop-blur-md rounded-lg shadow-2xl"
                whileTap={{ scale: 0.8}}
                whileHover={{ scale: 1.2 }}
            >
                <h3 className={`text-2xl font-bold text-400 ${montserrat.className}`}>Visão</h3>
                <p className={`text-white mt-2 ${montserrat.className}`}>
                    Ser a principal ponte entre a vontade de ajudar e a necessidade de ser ajudado em nossa comunidade.
                </p>
            </motion.div>

            <motion.div
                className="flex-1 p-8 bg-black/60 backdrop-blur-md rounded-lg shadow-2xl"
                whileTap={{ scale: 0.8}}
                whileHover={{ scale: 1.2 }}
            >
                <h3 className={`text-2xl font-bold text-400 ${montserrat.className}`}>Missão</h3>
                <p className={`text-white mt-2 ${montserrat.className}`}>
                    Conectar, capacitar e mobilizar voluntários e organizações, criando um ecossistema de impacto social positivo e duradouro.
                </p>
            </motion.div>

            <motion.div
                className="flex-1 p-8 bg-black/60 backdrop-blur-md rounded-lg shadow-2xl"
                whileTap={{ scale: 0.8}}
                whileHover={{ scale: 1.2 }}
            >
                <h3 className={`text-2xl font-bold text-400 ${montserrat.className}`}>Valores</h3>
                <p className={`text-white mt-2 ${montserrat.className}`}>
                    Empatia, Colaboração, Transparência e Inovação.
                </p>
            </motion.div>

        </motion.div>
    );
}