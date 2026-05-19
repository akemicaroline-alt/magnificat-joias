import { Hero } from "@/components/sections/Hero";
import { Sobre } from "@/components/sections/Sobre";
import { Magnificat } from "@/components/sections/Magnificat";
import { Colecoes } from "@/components/sections/Colecoes";
import { Diferenciais } from "@/components/sections/Diferenciais";
import { Contato } from "@/components/sections/Contato";

export default function Home() {
  return (
    <>
      <Hero />
      <Sobre />
      <Magnificat />
      <Colecoes />
      <Diferenciais />
      <Contato />
    </>
  );
}
