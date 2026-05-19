import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import {
  CollectionCard,
  type CollectionItem,
} from "@/components/CollectionCard";

export const COLECOES: CollectionItem[] = [
  {
    id: "tercos",
    roman: "I",
    title: "Terços",
    description: "Devoção em cada conta. Prata 950 com cruz cravejada.",
    gradient: "bg-[linear-gradient(155deg,_#1d1813_0%,_#3a2d1f_55%,_#c8a96e_140%)]",
    ornament: "rosary",
  },
  {
    id: "cruzes",
    roman: "II",
    title: "Cruzes & Crucifixos",
    description: "Símbolos de fé em ouro 18k e prata.",
    gradient: "bg-[linear-gradient(165deg,_#14110e_0%,_#4a1e1e_55%,_#8a7448_140%)]",
    ornament: "cross",
  },
  {
    id: "medalhas",
    roman: "III",
    title: "Medalhas de Nossa Senhora",
    description: "Proteção materna em peças clássicas.",
    gradient: "bg-[linear-gradient(145deg,_#1d1813_0%,_#2b2840_50%,_#c8a96e_140%)]",
    ornament: "medal",
  },
  {
    id: "aliancas",
    roman: "IV",
    title: "Alianças de Compromisso",
    description: "Para união abençoada.",
    gradient: "bg-[linear-gradient(175deg,_#14110e_0%,_#3b2f24_55%,_#e8d5a3_140%)]",
    ornament: "ring",
  },
  {
    id: "anjos",
    roman: "V",
    title: "Anjos da Guarda",
    description: "Pingentes delicados de proteção.",
    gradient: "bg-[linear-gradient(155deg,_#1d1813_0%,_#23304a_55%,_#c8a96e_140%)]",
    ornament: "angel",
  },
  {
    id: "encomenda",
    roman: "VI",
    title: "Sob Encomenda",
    description: "Sua peça única, criada com você.",
    gradient: "bg-[linear-gradient(165deg,_#14110e_0%,_#3a1f2d_50%,_#8a7448_140%)]",
    ornament: "custom",
  },
];

export function Colecoes() {
  return (
    <section
      id="colecoes"
      aria-labelledby="colecoes-title"
      className="relative py-32 md:py-40"
    >
      <Container>
        <SectionHeader
          roman="II"
          eyebrow="Coleções"
          title="Para cada momento de fé"
          description="Seis linhas autorais reunindo o que há de mais delicado em joalheria sacra contemporânea. Cada peça é produzida sob encomenda, com acabamento manual e embalagem premium."
        />

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {COLECOES.map((item, i) => (
            <CollectionCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
