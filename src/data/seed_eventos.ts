import type { Evento } from "../types/evento";
import { uid } from "../utils/uid";

export const seedEventos: Evento[] = [
  {
    id: uid(),
    titulo: "Mostra de Bandas Locais",
    descricao: "Apresentação de artistas independentes de Rio Verde.",
    dataInicio: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
    dataFim: new Date(Date.now() + 24 * 3600 * 1000 + 2 * 3600 * 1000).toISOString(),
    local: "Praça Central",
    categoria: "Música",
    capacidade: 500,
    tags: ["gratuito", "ao ar livre"],
    publicoAlvo: "Comunidade em geral",
  },
  {
    id: uid(),
    titulo: "Oficina de Teatro para Iniciantes",
    descricao: "Introdução a técnicas de expressão corporal e improviso.",
    dataInicio: new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString(),
    dataFim: new Date(Date.now() + 3 * 24 * 3600 * 1000 + 3 * 3600 * 1000).toISOString(),
    local: "Teatro Municipal",
    categoria: "Oficina",
    capacidade: 20,
    tags: ["inscrição", "formação"],
    publicoAlvo: "Jovens e adultos",
  },
  {
    id: uid(),
    titulo: "Exposição: Memórias de Rio Verde",
    descricao: "Acervo fotográfico e objetos históricos da cidade.",
    dataInicio: new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString(),
    dataFim: new Date(Date.now() + 12 * 24 * 3600 * 1000).toISOString(),
    local: "Galeria Municipal",
    categoria: "Exposição",
    capacidade: 200,
    tags: ["cultura", "história"],
    publicoAlvo: "Escolas e visitantes",
  },
];