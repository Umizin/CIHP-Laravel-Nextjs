"use client";
import Image from "next/image";
import CartaoDeMissao from "@/components/CartaodeMissao";
import HomeBanner from "@/components/HomeBanner";
import HomeNavbar from "@/components/HomeNavbar";
import { useScroll } from "motion/react";

export default function Home() {
  const { scrollYProgress } = useScroll();
  return (
    <>
      <HomeNavbar/>
      <HomeBanner/>
    </>
  );
}
