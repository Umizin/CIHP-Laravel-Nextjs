"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Loader2, MapPin, Clock, ArrowLeft, ArrowRight, CaseUpper } from "lucide-react";
import Link from "next/link";

interface Vaga {
  id: number;
  titulo: string;
  descricao: string;
  imagem?: string;
  cidade?: string;
  bairro?: string;
  duracao?: string;
  ong?: {
    id: number;
    name: string;
  };
}

interface Inscricao {
  inscricao_id: number;
  inscricao_status: string;
  data_inscricao: string;
  vaga: Vaga;
}

export default function MinhasInscricoesPage() {
  const [inscricoes, setInscricoes] = useState<Inscricao[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const token = typeof window !== "undefined" ? sessionStorage.getItem("token") : null;

  useEffect(() => {
  if (!token) return;

  const fetchInscricoes = async () => {
    try {
      setLoading(true);

      const parsedToken =
        token.startsWith("{") || token.startsWith("[")
          ? JSON.parse(token)
          : { token };


      const response = await fetch(
        `http://localhost/api/inscricoes/minhas?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${parsedToken.token}`,
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();

      const inscricoes =
        data.data?.data || data.data || data; // compatível com vários formatos
      const lastPage =
        data.last_page || data.meta?.last_page || data.data?.last_page || 1;

      setInscricoes(inscricoes || []);
      setLastPage(lastPage);
    } catch (error) {
      console.error("Erro ao carregar inscrições:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchInscricoes();
}, [page, token]);


  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Minhas Inscrições
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin w-10 h-10 text-gray-500" />
          </div>
        ) : inscricoes.length === 0 ? (
          <div className="text-center text-gray-500 mt-16">
            Você ainda não se inscreveu em nenhuma vaga.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inscricoes.map((item) => (
              <div
                key={item.inscricao_id}
                className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-200"
              >
                <Link href={`/trabalhos/voluntarios/${item.vaga.id}`}>
                {item.vaga?.imagem && (
                
                  <img
                    src={`http://localhost/storage/${item.vaga.imagem}`}
                    alt={item.vaga.titulo}
                    className="w-full h-44 object-cover"
                  />
                )}
                </Link>
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    {item.vaga?.titulo}
                  </h2>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {item.vaga?.descricao}
                  </p>

                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {item.vaga?.bairro} - {item.vaga?.cidade}
                    </span>
                  </div>

                  {item.vaga?.duracao && (
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                      <Clock className="w-4 h-4" />
                      <span>{item.vaga.duracao}</span>
                    </div>
                  )}

                  <div className="text-xs text-gray-500 mb-2">
                    ONG:{" "}
                    <span className="font-medium text-gray-700">
                      {item.vaga?.ong?.name || "Não informada"}
                    </span>
                  </div>

                  <div
                    className={`text-sm font-semibold px-3 py-1 rounded-full inline-block ${
                      item.inscricao_status === "pendente"
                        ? "bg-yellow-100 text-yellow-700"
                        : item.inscricao_status === "confirmada"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {(item.vaga?.status || "pendente").toUpperCase()}

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAGINAÇÃO */}
        {inscricoes.length > 0 && (
          <div className="flex justify-center items-center gap-3 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full disabled:opacity-40"
            >
              <ArrowLeft className="w-4 h-4" />
              Anterior
            </button>

            <span className="text-gray-700 font-medium">
              Página {page} de {lastPage}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(p + 1, lastPage))}
              disabled={page === lastPage}
              className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full disabled:opacity-40"
            >
              Próxima
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
