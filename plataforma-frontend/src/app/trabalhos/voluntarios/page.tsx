"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  Leaf,
  Users,
  HeartHandshake,
  Recycle,
  Globe,
  MapPin,
  Clock,
  Search,
  Trophy,
  Trash2,
} from "lucide-react";

const categorias = [
  { nome: "Todos", icone: Globe },
  { nome: "Meio ambiente", icone: Leaf },
  { nome: "Comunidade", icone: Users },
  { nome: "Saúde", icone: HeartHandshake },
  { nome: "Reciclagem", icone: Recycle },
];

export default function TrabalhosPage() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const [abaAtiva, setAbaAtiva] = useState<"Todos" | "Em andamento" | "Concluído">("Todos");
  const [busca, setBusca] = useState("");
  const [trabalhos, setTrabalhos] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [ultimaPagina, setUltimaPagina] = useState(1);

  // 🔹 Buscar vagas
  const carregarVagas = async (page = 1) => {
    setCarregando(true);
    try {
      const url = new URL("http://localhost/api/vagas");
      if (busca) url.searchParams.append("search", busca);
      if (categoriaAtiva !== "Todos") url.searchParams.append("categoria", categoriaAtiva);
      if (abaAtiva !== "Todos") url.searchParams.append("status", abaAtiva);
      url.searchParams.append("page", page.toString());

      const res = await fetch(url.toString());
      const data = await res.json();

      setTrabalhos(data.data);
      setPagina(data.current_page);
      setUltimaPagina(data.last_page);
    } catch (err) {
      console.error("Erro ao buscar vagas:", err);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarVagas(1);
  }, [categoriaAtiva, abaAtiva, busca]);

  const handleCategoriaClick = (categoria: string) => {
    setCategoriaAtiva(categoria);
  };

  // 🗑️ Função de exclusão com confirmação de senha
  const handleDelete = async (id: number) => {
    const senha = prompt("Para confirmar a exclusão, digite sua senha:");
    if (!senha) return;

    const tokenData = sessionStorage.getItem("token");
    if (!tokenData) {
      alert("Você precisa estar logado para deletar uma vaga.");
      return;
    }

    const { token } = JSON.parse(tokenData);

    try {
      const res = await fetch(`http://localhost/api/vagas/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: senha }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Erro ao excluir vaga.");
        return;
      }

      alert("Vaga excluída com sucesso!");
      carregarVagas();
    } catch (error) {
      console.error(error);
      alert("Erro na exclusão da vaga.");
    }
  };

  const renderSkeleton = () => (
    <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-gray-300 rounded-xl h-60" />
      ))}
    </div>
  );

  return (
    <DashboardLayout>
      <div className="w-full min-h-screen bg-[#E9E6F0] text-gray-800 px-8 py-10">
        {/* 🔹 CATEGORIAS */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {categorias.map(({ nome, icone: Icon }) => (
            <button
              key={nome}
              onClick={() => handleCategoriaClick(nome)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all
                ${
                  categoriaAtiva === nome
                    ? "bg-purple-600 text-white border-purple-600 shadow-md"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-purple-50"
                }`}
            >
              <Icon size={18} />
              {nome}
            </button>
          ))}
        </div>

        {/* 🔹 Abas + Pesquisa */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-8 border-b border-gray-300 pb-2">
          <div className="flex items-center gap-8 text-sm font-medium relative">
            {["Todos", "Em andamento", "Concluído"].map((aba) => (
              <button
                key={aba}
                onClick={() => setAbaAtiva(aba as any)}
                className={`pb-2 transition-all ${
                  abaAtiva === aba
                    ? "text-purple-700 border-b-2 border-purple-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {aba}
              </button>
            ))}
          </div>

          <div className="relative max-w-md w-full">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Buscar vaga..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* 🔹 Lista de trabalhos */}
        {carregando ? (
          renderSkeleton()
        ) : trabalhos.length === 0 ? (
          <p className="text-gray-500">Nenhuma vaga encontrada.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trabalhos.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <Link href={`/trabalhos/voluntarios/${t.id}`}>
                  <img
                    src={`http://localhost/storage/${t.imagem}`}
                    alt={t.titulo}
                    className="h-44 w-full object-cover"
                  />
                </Link>

                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    {t.titulo}
                    {t.premiada && (
                      <Trophy size={20} className="text-yellow-400" title="Vaga Premiada" />
                    )}
                  </h3>
                  <p className="text-sm text-gray-600">{t.descricao}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} className="text-purple-500" />
                      {t.cidade} - {t.bairro}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} className="text-purple-500" />
                      {t.duracao || "Não informado"}
                    </span>
                  </div>

                  <span
                    className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${
                      t.status === "Em andamento"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {t.status}
                  </span>

                  {/* 🔹 Botões de ação */}
                  <div className="pt-3 flex gap-3">
                    <Link
                      href={`/trabalhos/ONGS/edit/${t.id}`}
                      className="flex-1 text-center text-sm text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="flex items-center justify-center flex-1 gap-1 text-sm text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
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
