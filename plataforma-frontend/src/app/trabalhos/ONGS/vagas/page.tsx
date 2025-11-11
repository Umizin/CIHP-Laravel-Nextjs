"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useRouter } from "next/navigation";
import { Loader2, Edit3, Trash2, MapPin, Users } from "lucide-react";

interface Vaga {
  id: number;
  titulo: string;
  descricao: string;
  imagem?: string;
  cidade: string;
  bairro?: string;
  vagas_disponiveis: number;
  status: string;
  data_publicacao?: string;
}

export default function VagasPublicadasPage() {
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // deixei fetchVagas fora do useEffect para poder chamá-la após exclusão
  const fetchVagas = async () => {
    setLoading(true);
    try {
      const raw = sessionStorage.getItem("token");
      if (!raw) throw new Error("Token não encontrado no sessionStorage");

      let token = "";
      try {
        token = JSON.parse(raw).token;
      } catch {
        token = raw;
      }

      const response = await fetch("http://localhost/api/ong/vagas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar vagas");
      }

      const data = await response.json();
      setVagas(data);
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar as vagas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVagas();
  }, []);

  // ======= handleDelete adaptado para usar confirmação por senha (igual ao código que você passou) =======
  const handleDelete = async (id: number) => {
    const senha = prompt("Para confirmar a exclusão, digite sua senha:");
    if (!senha) return;

    try {
      const raw = sessionStorage.getItem("token");
      if (!raw) throw new Error("Token não encontrado");

      let token = "";
      try {
        token = JSON.parse(raw).token;
      } catch {
        token = raw;
      }

      const response = await fetch(`http://localhost/api/vagas/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: senha,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || data.message || "Erro ao excluir vaga.");
        return;
      }

      alert("Vaga excluída com sucesso!");
      // recarrega a lista (comportamento igual ao seu exemplo)
      fetchVagas();
    } catch (err) {
      console.error(err);
      alert("Erro na exclusão da vaga.");
    }
  };
  // =========================================================================================================

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-96">
          <Loader2 className="animate-spin text-purple-600" size={32} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto mt-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Minhas vagas publicadas
        </h1>

        {vagas.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <p className="text-gray-600">Nenhuma vaga publicada até o momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vagas.map((vaga) => (
              <div
                key={vaga.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
              >
                {vaga.imagem ? (
                  <img
                    src={`http://localhost/storage/${vaga.imagem}`}
                    alt={vaga.titulo}
                    className="h-40 w-full object-cover"
                  />
                ) : (
                  <div className="h-40 bg-gray-200 flex items-center justify-center text-gray-500">
                    Sem imagem
                  </div>
                )}

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">{vaga.titulo}</h2>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{vaga.descricao}</p>

                    <div className="mt-3 flex items-center text-sm text-gray-500 gap-2">
                      <MapPin size={16} />
                      <span>
                        {vaga.bairro ? `${vaga.bairro}, ` : ""}
                        {vaga.cidade}
                      </span>
                    </div>

                    <div className="mt-1 flex items-center text-sm text-gray-500 gap-2">
                      <Users size={16} />
                      <span>{vaga.vagas_disponiveis} vagas</span>
                    </div>

                    <p className="mt-2 text-xs text-gray-400">
                      Publicada em:{" "}
                      {vaga.data_publicacao ? new Date(vaga.data_publicacao).toLocaleDateString() : "-"}
                    </p>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <button
                      onClick={() => router.push(`/trabalhos/ONGS/edit/${vaga.id}`)}
                      className="flex items-center gap-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition"
                    >
                      <Edit3 size={16} />
                      Editar
                    </button>

                    <button
                      onClick={() => handleDelete(vaga.id)}
                      className="flex items-center gap-1 px-3 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition"
                    >
                      <Trash2 size={16} />
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
