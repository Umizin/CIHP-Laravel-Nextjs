"use client";
import HomeBanner from "@/components/home/HomeBanner";
import HomeNavbar from "@/components/home/HomeNavbar";
import { useScroll } from "framer-motion";
import InfoQuemSomos from "../components/home/InfoQuemSomos";
import VagasSection from "../components/home/VagasSection";
import Footer from "../app/footer";

export default function Home() {
  const { scrollYProgress } = useScroll();
  return (
    <>
      <HomeNavbar/>
      <HomeBanner scrollYProgress={scrollYProgress}/>
      <InfoQuemSomos/>
      <VagasSection />
      <Footer />
    </>
  );
}
