/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DashboardLayout from "@/layouts/DashboardLayout";
import JobDetailLayout from "@/layouts/JobDetailLayout";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

interface Vaga {
  id: number;
  titulo: string;
  descricao: string;
  descricao_detalhada?: string;
  imagem?: string;
  status?: string;
  duracao?: string;
  cidade?: string;
  bairro?: string;
  vagas_disponiveis?: number;
  ong?: {
    id: number;
    name: string;
  };
}

export default function JobDetailPage() {
  const { id } = useParams();
  const [vaga, setVaga] = useState<Vaga | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [processando, setProcessando] = useState(false);
  const [inscrito, setInscrito] = useState(false);
  const [mensagem, setMensagem] = useState<string | null>(null);

  // 🔹 Busca a vaga e verifica se o usuário está inscrito
  useEffect(() => {
    const carregarVaga = async () => {
      try {
        const res = await fetch(`http://localhost/api/vagas/${id}`);
        if (!res.ok) throw new Error("Erro ao buscar vaga.");
        const data = await res.json();
        setVaga(data);
      } catch (error: any) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    };

    const verificarInscricao = async () => {
      try {
        const tokenRaw = sessionStorage.getItem("token");
        if (!tokenRaw) return;

        const token = tokenRaw.startsWith("{")
          ? JSON.parse(tokenRaw).token
          : tokenRaw;

        const res = await fetch(`http://localhost/api/inscricoes/minhas`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          const inscritoNaVaga = data.data?.some(
            (i: any) => i.vaga.id === Number(id)
          );
          setInscrito(inscritoNaVaga);
        }
      } catch (e) {
        console.error("Erro ao verificar inscrição:", e);
      }
    };

    if (id) {
      carregarVaga();
      verificarInscricao();
    }
  }, [id]);

  // 🔹 Função: inscrever-se na vaga
  const inscreverNaVaga = async () => {
    try {
      setProcessando(true);
      setMensagem(null);

      const raw = sessionStorage.getItem("token");
      if (!raw) throw new Error("Token não encontrado");

      const token = raw.startsWith("{") ? JSON.parse(raw).token : raw;

      const res = await fetch(`http://localhost/api/inscricoes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ vaga_id: id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao se inscrever.");

      setInscrito(true);
      setMensagem("Inscrição realizada com sucesso!");
    } catch (error: any) {
      setMensagem(error.message);
    } finally {
      setProcessando(false);
    }
  };

  // 🔹 Função: cancelar inscrição
  const cancelarInscricao = async () => {
    try {
      setProcessando(true);
      setMensagem(null);

      const raw = sessionStorage.getItem("token");
      if (!raw) throw new Error("Token não encontrado");

      const token = raw.startsWith("{") ? JSON.parse(raw).token : raw;

      const res = await fetch(
        `http://localhost/api/inscricoes/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao cancelar inscrição.");

      setInscrito(false);
      setMensagem("Inscrição cancelada com sucesso!");
    } catch (error: any) {
      setMensagem(error.message);
    } finally {
      setProcessando(false);
    }
  };

  // 🔹 Estado: carregando
  if (carregando) {
    return (
      <DashboardLayout>
        <div className="text-center text-gray-600 mt-20 animate-pulse">
          Carregando vaga...
        </div>
      </DashboardLayout>
    );
  }

  // 🔹 Estado: erro
  if (erro || !vaga) {
    return (
      <DashboardLayout>
        <div className="text-center text-gray-600 mt-20">
          {erro || "Vaga não encontrada."}
        </div>
      </DashboardLayout>
    );
  }

  const imagemUrl = vaga.imagem
    ? `http://localhost/storage/${vaga.imagem}`
    : "https://via.placeholder.com/800x400?text=Imagem+da+Vaga";

  return (
    <DashboardLayout>
      <JobDetailLayout
        titulo={vaga.titulo}
        descricao={vaga.descricao}
        descricaoDetalhada={vaga.descricao_detalhada}
        imagem={imagemUrl}
        status={vaga.status || "Em andamento"}
        duracao={vaga.duracao || "Não informada"}
        localidade={`${vaga.cidade || ""} - ${vaga.bairro || ""}`}
        vagas={vaga.vagas_disponiveis || 0}
        inscritos={0}
        premiado={false}
      >
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>{vaga.descricao_detalhada}</p>

          <div className="flex gap-6 text-sm">
            <div>
              <strong>Vagas disponíveis:</strong> {vaga.vagas_disponiveis || 0}
            </div>
            <div>
              <strong>Responsável:</strong> {vaga.ong?.name || "ONG não identificada"}
            </div>
          </div>

          {/* 🔹 Botão dinâmico */}
          <div className="mt-6">
            {!inscrito ? (
              <button
                onClick={inscreverNaVaga}
                disabled={processando}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition disabled:opacity-60"
              >
                {processando ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Inscrevendo...
                  </>
                ) : (
                  "Inscrever-se na vaga"
                )}
              </button>
            ) : (
              <button
                onClick={cancelarInscricao}
                disabled={processando}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition disabled:opacity-60"
              >
                {processando ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Cancelando...
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5" />
                    Cancelar inscrição
                  </>
                )}
              </button>
            )}

            {mensagem && (
              <p
                className={`mt-3 text-sm ${
                  mensagem.includes("sucesso")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {mensagem}
              </p>
            )}
          </div>
        </div>
      </JobDetailLayout>
    </DashboardLayout>
  );
}
