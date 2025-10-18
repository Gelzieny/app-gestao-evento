import { Input } from "@/components/ui/input";
import { Filter, Search, Tag } from "lucide-react";
import { motion } from "framer-motion";

interface BarraFiltroProps {
  query: string;
  setQuery: (value: string) => void;
  categoria: string;
  setCategoria: (value: string) => void;
  tagFiltro: string;
  setTagFiltro: (value: string) => void;
  tags: string[];
}

export function BarraFiltro({
  query,
  setQuery,
  categoria,
  setCategoria,
  tagFiltro,
  setTagFiltro,
  tags
}: BarraFiltroProps) {
  return (
    <motion.div
      className="grid gap-3 sm:grid-cols-3 bg-background border rounded-2xl shadow-sm p-3"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Campo de busca */}
      <div className="flex items-center gap-2 rounded-2xl border bg-white px-3 py-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          className="border-0 shadow-none"
          placeholder="Buscar por título, local ou tag…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Filtro por categoria */}
      <div className="flex items-center gap-2 rounded-2xl border bg-white px-3 py-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <select
          className="w-full bg-transparent outline-none"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="todas">Todas categorias</option>
          {["Música", "Teatro", "Dança", "Exposição", "Oficina", "Outro"].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Filtro por tags */}
      <div className="flex items-center gap-2 rounded-2xl border bg-white px-3 py-2">
        <Tag className="h-4 w-4 text-muted-foreground" />
        <select
          className="w-full bg-transparent outline-none"
          value={tagFiltro}
          onChange={(e) => setTagFiltro(e.target.value)}
        >
          <option value="">Todas as tags</option>
          {tags.map((t) => (
            <option key={t} value={t}>#{t}</option>
          ))}
        </select>
      </div>
    </motion.div>
  );
}
