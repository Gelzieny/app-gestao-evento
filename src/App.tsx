"use client"

import { Plus, Edit, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";

import type { Evento } from "./types/evento";
import { formatDateRange } from "./utils/list";
import { Button } from "./components/ui/button";
import { seedEventos } from "./data/seed_eventos";
import { FormEvento } from "./components/form_evento";
import { BarraFiltro } from "./components/barra_filtro";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Agenda } from "./components/agenda";
import { Painel } from "./components/painel";

const STORAGE_KEY = "prototipo-eventos-santa-helena";

export default function App() {
  const [eventos, setEventos] = useState<Evento[]>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try { return JSON.parse(raw) as Evento[]; } catch { /* ignore */ }
    }
    return seedEventos;
  });
  const [query, setQuery] = useState("");
  const [categoria, setCategoria] = useState<string>("todas");
  const [tagFiltro, setTagFiltro] = useState<string>("");
  const [modalAberto, setModalAberto] = useState(false);
  const [edicao, setEdicao] = useState<Evento | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(eventos));
  }, [eventos]);

  const todasTags = useMemo(() => {
    const t = new Set<string>();
    eventos.forEach(e => e.tags.forEach(tg => t.add(tg)));
    return Array.from(t).sort();
  }, [eventos]);

  const filtrados = useMemo(() => {
    return eventos
      .filter(e => (categoria === "todas" ? true : e.categoria === categoria))
      .filter(e => (tagFiltro ? e.tags.includes(tagFiltro) : true))
      .filter(e => {
        const q = query.trim().toLowerCase();
        if (!q) return true;
        return (
          e.titulo.toLowerCase().includes(q) ||
          e.descricao.toLowerCase().includes(q) ||
          e.local.toLowerCase().includes(q) ||
          e.tags.join(" ").toLowerCase().includes(q)
        );
      })
      .sort((a, b) => new Date(a.dataInicio).getTime() - new Date(b.dataInicio).getTime());
  }, [eventos, categoria, tagFiltro, query]);

  function upsertEvento(e: Evento) {
    setEventos(prev => {
      const idx = prev.findIndex(x => x.id === e.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = e; return copy;
      }
      return [...prev, e];
    });
  }

  function removerEvento(id: string) {
    setEventos(prev => prev.filter(e => e.id !== id));
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Gestão de Eventos Culturais • Rio Verde/GO</h1>
            <p className="text-slate-600">Protótipo navegável para a Secretaria Municipal de Cultura.</p>
          </div>
          <Dialog open={modalAberto} onOpenChange={setModalAberto}>
            <DialogTrigger asChild>
              <Button className="rounded-2xl shadow">Novo evento</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{edicao ? "Editar evento" : "Criar novo evento"}</DialogTitle>
              </DialogHeader>
              <FormEvento evento={edicao ?? undefined} onCancel={() => { setModalAberto(false); setEdicao(null); }} 
                  onSave={(ev) => { upsertEvento(ev); setModalAberto(false); setEdicao(null); }} />
              <DialogFooter>
                <p className="text-xs text-slate-500">Os dados ficam apenas no seu navegador (localStorage).</p>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </header>

        <Tabs defaultValue="lista" className="space-y-5">
          <TabsList className="grid w-full grid-cols-3 rounded-2xl">
            <TabsTrigger value="lista">Eventos</TabsTrigger>
            <TabsTrigger value="agenda">Agenda</TabsTrigger>
            <TabsTrigger value="painel">Painel</TabsTrigger>
          </TabsList>

          <TabsContent value="lista" className="space-y-4">
            <BarraFiltro query={query} setQuery={setQuery} categoria={categoria} setCategoria={setCategoria} tagFiltro={tagFiltro} setTagFiltro={setTagFiltro} tags={todasTags} />
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {filtrados.map((e) => (
                  <motion.div key={e.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
                    <Card className="rounded-2xl shadow hover:shadow-md transition">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center justify-between text-lg">
                          <span>{e.titulo}</span>
                          <span className="flex gap-2">
                            <Button variant="ghost" size="icon" onClick={() => { setEdicao(e); setModalAberto(true); }}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => removerEvento(e.id)}><Trash2 className="h-4 w-4" /></Button>
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-slate-700 line-clamp-3">{e.descricao}</p>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <span>{formatDateRange(e.dataInicio, e.dataFim)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <span>{e.local}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-2">
                          <Badge className="rounded-xl" variant="secondary">{e.categoria}</Badge>
                          {e.capacidade && <Badge className="rounded-xl" variant="outline">cap. {e.capacidade}</Badge>}
                          {e.tags.map(t => (<Badge key={t} className="rounded-xl" variant="outline">#{t}</Badge>))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </section>
          </TabsContent>

          <TabsContent value="agenda"><Agenda eventos={filtrados} /></TabsContent>
          <TabsContent value="painel"><Painel eventos={eventos} /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}