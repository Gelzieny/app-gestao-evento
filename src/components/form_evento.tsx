import { useState } from "react";

import { uid } from "@/utils/uid";
import type { Evento } from "@/types/evento";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface FormEventoProps {
  evento?: Evento;
  onSave: (evento: Evento) => void;
  onCancel: () => void;
}

export function FormEvento({ evento, onSave, onCancel }: FormEventoProps) {
  const [titulo, setTitulo] = useState(evento?.titulo ?? "");
  const [descricao, setDescricao] = useState(evento?.descricao ?? "");
  const [dataInicio, setDataInicio] = useState(
    evento ? evento.dataInicio.slice(0, 16) : new Date().toISOString().slice(0, 16)
  );
  const [dataFim, setDataFim] = useState(
    evento ? evento.dataFim.slice(0, 16) : new Date(Date.now() + 2 * 3600 * 1000).toISOString().slice(0, 16)
  );
  const [local, setLocal] = useState(evento?.local ?? "");
  const [categoria, setCategoria] = useState<Evento["categoria"]>(evento?.categoria ?? "Outro");
  const [capacidade, setCapacidade] = useState(evento?.capacidade?.toString() ?? "");
  const [tags, setTags] = useState(evento?.tags.join(", ") ?? "");
  const [publicoAlvo, setPublicoAlvo] = useState(evento?.publicoAlvo ?? "");

  function salvar() {
    if (!titulo.trim()) return alert("Informe um título");
    if (!local.trim()) return alert("Informe o local");

    const iniISO = new Date(dataInicio).toISOString();
    const fimISO = new Date(dataFim).toISOString();

    if (new Date(iniISO) >= new Date(fimISO))
      return alert("Data/hora final deve ser após o início");

    const novoEvento: Evento = {
      id: evento?.id ?? uid(),
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      dataInicio: iniISO,
      dataFim: fimISO,
      local: local.trim(),
      categoria,
      capacidade: capacidade ? Number(capacidade) : undefined,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      publicoAlvo: publicoAlvo.trim() || undefined,
    };

    onSave(novoEvento);
  }

  return (
    <div className="grid gap-3">
      <div className="grid gap-1">
        <Label>Título</Label>
        <Input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Ex.: Festival de Inverno" />
      </div>

      <div className="grid gap-1">
        <Label>Descrição</Label>
        <textarea
          className="rounded-xl border p-2"
          rows={3}
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Detalhes do evento"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="grid gap-1">
          <Label>Início</Label>
          <Input type="datetime-local" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
        </div>
        <div className="grid gap-1">
          <Label>Fim</Label>
          <Input type="datetime-local" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="grid gap-1">
          <Label>Local</Label>
          <Input value={local} onChange={(e) => setLocal(e.target.value)} placeholder="Ex.: Teatro Municipal" />
        </div>
        <div className="grid gap-1">
          <Label>Categoria</Label>
          <select
            className="rounded-xl border p-2"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value as Evento["categoria"])}
          >
            {["Música", "Teatro", "Dança", "Exposição", "Oficina", "Outro"].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="grid gap-1">
          <Label>Capacidade</Label>
          <Input type="number" min={0} value={capacidade} onChange={(e) => setCapacidade(e.target.value)} placeholder="Opcional" />
        </div>
        <div className="grid gap-1 sm:col-span-2">
          <Label>Tags (separe por vírgulas)</Label>
          <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="gratuito, ao ar livre, família" />
        </div>
      </div>

      <div className="grid gap-1">
        <Label>Público-alvo (opcional)</Label>
        <Input value={publicoAlvo} onChange={(e) => setPublicoAlvo(e.target.value)} placeholder="Ex.: Estudantes da rede municipal" />
      </div>

      <div className="mt-2 flex justify-end gap-2">
        <Button variant="outline" className="rounded-2xl" onClick={onCancel}>Cancelar</Button>
        <Button className="rounded-2xl" onClick={salvar}>Salvar</Button>
      </div>
    </div>
  );
}
