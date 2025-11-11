// src/layouts/JobDetailLayout.tsx
"use client";

import { ReactNode } from "react";
import { Clock, MapPin } from "lucide-react";
import Image from "next/image";

interface JobDetailLayoutProps {
  children: ReactNode;
  titulo: string;
  descricao: string;
  descricaoDetalhada?: string; // <-- "FORMA" ADICIONADA AQUI (O '?' a torna opcional)
  imagem: string;
  status: string;
  duracao: string;
  localidade: string;
}

export default function JobDetailLayout({
  children,
  titulo,
  descricao,
  descricaoDetalhada, // <-- "FORMA" 2: ENSINE A NOVA ORDEM AO "SOLDADO"
  imagem,
  status,
  duracao,
  localidade,
}: JobDetailLayoutProps) {
  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow overflow-hidden">
      {/* Capa */}
      <div className="relative h-64 w-full">
        <Image src={imagem} alt={titulo} fill className="object-cover" />
      </div>

      {/* Header */}
      <div className="p-6 space-y-3 border-b">
        <h1 className="text-2xl font-bold text-gray-800">{titulo}</h1>
        <p className="text-gray-600">{descricao}</p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin className="text-purple-500" size={16} />
            <span>{localidade}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="text-purple-500" size={16} />
            <span>{duracao}</span>
          </div>
          <span
            className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${
              status === "Em andamento"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {status}
          </span>
        </div>
      </div>

      {/* Children (conteúdo específico da vaga) */}
      <div className="p-6">{children}</div>
    </div>
  );
}
