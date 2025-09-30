import { MotionValue, motion, useTransform } from "framer-motion";

interface InfoCardsSectionProps {
    scrollYProgress: MotionValue<number>;
}

export default function InfoCardsSection({ scrollYProgress }: InfoCardsSectionProps) {
    const opacity = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
    const y = useTransform(scrollYProgress, [0.25, 0.45], [100, 0]);

    return (
        <motion.div
            className="flex flex-row gap-8 w-full px-40"
            style={{ opacity, y }}
        >
            {/* CARD 1: Visão */}
            <motion.div
                className="flex-1 p-8 bg-gray-500 rounded-lg shadow-2xl"
            >
                <h3 className="text-2xl font-bold">Visão</h3>
                <p className="text-white mt-2">
                    Ser a principal ponte entre a vontade de ajudar e a necessidade de ser ajudado em nossa comunidade.
                </p>
            </motion.div>

            {/* CARD 2: Missão */}
            <motion.div
                className="flex-1 p-8 bg-gray-500 rounded-lg shadow-2xl"
            >
                <h3 className="text-2xl font-bold">Missão</h3>
                <p className="text-white mt-2">
                    Conectar, capacitar e mobilizar voluntários e organizações, criando um ecossistema de impacto social positivo e duradouro.
                </p>
            </motion.div>

            {/* CARD 3: Valores */}
            <motion.div
                className="flex-1 p-8 bg-gray-500 rounded-lg shadow-2xl"
            >
                <h3 className="text-2xl font-bold">Valores</h3>
                <p className="text-white mt-2">
                    Empatia, Colaboração, Transparência e Inovação.
                </p>
            </motion.div>

        </motion.div>
    );
}