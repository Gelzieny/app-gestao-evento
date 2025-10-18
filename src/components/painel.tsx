import { useState, useMemo } from "react";
import { Edit, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { BarraFiltro } from "./barra_filtro";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


interface Evento {
  id: string;
  titulo: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  local: string;
  categoria: string;
  capacidade?: number;
  tags: string[];
}

interface PainelProps {
  eventos: Evento[];
}

export function Painel({ eventos }: PainelProps) {
  const [query, setQuery] = useState("");
  const [categoria, setCategoria] = useState("todas");
  const [tagFiltro, setTagFiltro] = useState(""); // ✅ alterado de string[] para string
  const [modalAberto, setModalAberto] = useState(false);
  const [edicao, setEdicao] = useState<Evento | null>(null);

  const todasTags = Array.from(new Set(eventos.flatMap((e) => e.tags)));

  const filtrados = useMemo(() => {
    return eventos.filter((e) => {
      const byQuery =
        e.titulo.toLowerCase().includes(query.toLowerCase()) ||
        e.descricao.toLowerCase().includes(query.toLowerCase());
      const byCategoria = categoria === "todas" || e.categoria === categoria;
      const byTag = !tagFiltro || e.tags.includes(tagFiltro);
      return byQuery && byCategoria && byTag;
    });
  }, [eventos, query, categoria, tagFiltro]);

  const removerEvento = (id: string) => {
    console.log("Remover evento", id);
  };

  const formatDateRange = (ini: string, fim: string) => {
    const i = new Date(ini).toLocaleDateString("pt-BR");
    const f = new Date(fim).toLocaleDateString("pt-BR");
    return ini === fim ? i : `${i} - ${f}`;
  };

  return (
    <div className="space-y-4">
      <BarraFiltro
        query={query}
        setQuery={setQuery}
        categoria={categoria}
        setCategoria={setCategoria}
        tagFiltro={tagFiltro} // ✅ agora é string
        setTagFiltro={setTagFiltro}
        tags={todasTags}
      />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filtrados.map((e) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="rounded-2xl shadow hover:shadow-md transition">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between text-lg">
                    <span>{e.titulo}</span>
                    <span className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEdicao(e);
                          setModalAberto(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removerEvento(e.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-slate-700 line-clamp-3">
                    {e.descricao}
                  </p>
                  <div className="text-sm text-slate-600">
                    {formatDateRange(e.dataInicio, e.dataFim)}
                  </div>
                  <div className="text-sm text-slate-600">{e.local}</div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Badge className="rounded-xl" variant="secondary">
                      {e.categoria}
                    </Badge>
                    {e.capacidade && (
                      <Badge className="rounded-xl" variant="outline">
                        cap. {e.capacidade}
                      </Badge>
                    )}
                    {e.tags.map((t) => (
                      <Badge key={t} className="rounded-xl" variant="outline">
                        #{t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>
    </div>
  );
}
