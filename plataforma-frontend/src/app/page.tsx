"use client";
import HomeBanner from "@/components/HomeBanner";
import HomeNavbar from "@/components/HomeNavbar";
import { useScroll } from "framer-motion";
import InfoQuemSomos from "../components/InfoQuemSomos"

export default function Home() {
  const { scrollYProgress } = useScroll();
  return (
    <>
      <HomeNavbar/>
      <HomeBanner scrollYProgress={scrollYProgress}/>
      <InfoQuemSomos/>
      <div className="h-[200vh] bg-gray-900 p-8">
        <h2 className="text-white text-4xl font-bold text-center pt-20">
          Seção de Conteúdo Futuro
        </h2>
        <p className="text-gray-400 mt-4 text-center">
          Este espaço será preenchido com os cartões de missão e outras seções da sua landing page.
        </p>
      </div>
    </>
  );
}
