import { motion, AnimatePresence } from "framer-motion";
import { CalendarIcon, MapPin, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";

interface Evento {
  id: string;
  titulo: string;
  dataInicio: string;
  dataFim: string;
  local: string;
  categoria: string;
}

interface AgendaProps {
  eventos: Evento[];
}

export function Agenda({ eventos }: AgendaProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <CalendarIcon className="w-5 h-5 text-primary" /> Agenda de Eventos
      </h2>

      <AnimatePresence>
        {eventos.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-muted-foreground"
          >
            Nenhum evento programado.
          </motion.p>
        ) : (
          eventos.map((evento) => (
            <motion.div
              key={evento.id}
              className="flex items-start justify-between border rounded-xl p-3 shadow-sm hover:shadow-md transition"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <div>
                <h3 className="font-medium">{evento.titulo}</h3>
                <p className="text-sm text-slate-600 flex items-center gap-1 mt-1">
                  <Clock className="w-4 h-4 text-primary" />
                  {new Date(evento.dataInicio).toLocaleDateString()} →{" "}
                  {new Date(evento.dataFim).toLocaleDateString()}
                </p>
                <p className="text-sm text-slate-600 flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-primary" /> {evento.local}
                </p>
              </div>

              <Badge variant="secondary" className="rounded-xl h-fit">
                {evento.categoria}
              </Badge>
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </section>
  );
}
