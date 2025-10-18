export interface Evento {
  id: string;
  titulo: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  local: string;
  categoria: "Música" | "Teatro" | "Dança" | "Exposição" | "Oficina" | "Outro";
  capacidade?: number;
  tags: string[];
  publicoAlvo?: string;
}
