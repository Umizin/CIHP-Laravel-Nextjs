"use client"; 

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Montserrat } from "next/font/google"; 

const montserrat = Montserrat({ subsets: ["latin"], weight: ["700"] });

export default function HomeNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuVariants = {
    hidden: { opacity: 0, y: -20, transition: { duration: 0.3 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hover: { scale: 1.02, color: "#683bab" },
    tap: { scale: 0.95 },
  };

  return (
    <header className="relative bg-black z-50">
      <nav className="flex flex-row justify-between p-4 shadow-md">
        
        <span 
          className="material-symbols-outlined cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
        >
          {isMenuOpen ? 'close' : 'menu'} 
        </span>

        <div className="flex flex-row gap-3 items-center">
          <ul className="flex flex-row gap-2 ">
            <li className="cursor-pointer hover:text-[#683bab]">Login</li>
            <span>/</span>
            <li className="cursor-pointer hover:text-[#683bab]">Cadastro</li>
          </ul>
          <span className="material-symbols-outlined cursor-pointer ">
            account_circle
          </span>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="dropdown-menu"
            className="absolute top-full left-0 w-full bg-black/60 backdrop-blur-md  shadow-2xl py-6 px-8" 
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <ul className="flex flex-col gap-6">
              <motion.li
                className={`cursor-pointer text-xl font-semibold text-white-700 ${montserrat.className}`}
                variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Sobre Nós
              </motion.li>

              <motion.li
                className={`cursor-pointer text-xl font-semibold text-white-700 ${montserrat.className}`}
                variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Vagas
              </motion.li>

              <motion.li
                className={`cursor-pointer text-xl font-semibold text-white-700 ${montserrat.className}`}
                variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Legislação
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}