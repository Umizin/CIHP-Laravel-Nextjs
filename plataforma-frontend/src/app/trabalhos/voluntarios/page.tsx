"use client";

import { useState, useMemo } from "react";
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
} from "lucide-react";

const categorias = [
  { nome: "Todos", icone: Globe },
  { nome: "Meio ambiente", icone: Leaf },
  { nome: "Comunidade", icone: Users },
  { nome: "Saúde", icone: HeartHandshake },
  { nome: "Reciclagem", icone: Recycle },
];

const mockTrabalhos = {
  Todos: [
    {
      titulo: "Limpeza de praia",
      descricao: "Ação de preservação costeira e conscientização ambiental.",
      imagem: "https://www.marica.rj.gov.br/wp-content/uploads/2023/09/dsc_6045_53191680024_o-scaled.jpg",
      status: "Em andamento",
      duracao: "4h",
      localidade: "Maricá - Ponta Negra",
    },
    {
      titulo: "Entrega de mudas",
      descricao: "Distribuição de mudas para reflorestamento urbano.",
      imagem: "https://www.sema.ce.gov.br/wp-content/uploads/sites/36/2023/11/EXPOECE23.4.jpeg",
      status: "Concluído",
      duracao: "2h",
      localidade: "Maricá - Itaipuaçu",
    },
    {
      titulo: "Mutirão comunitário",
      descricao: "Apoio a famílias em situação de vulnerabilidade.",
      imagem: "https://imagens.ebc.com.br/73iIz9HEMqqXlfPMFhrkJb0QCZc=/1170x700/smart/https://agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/img_7895_0.jpg?itok=y5NyYtoW",
      status: "Concluído",
      duracao: "5h",
      localidade: "Maricá - Centro",
    },
  ],
  "Meio ambiente": [
    {
      titulo: "Limpeza de praia",
      descricao: "Ação de preservação costeira e conscientização ambiental.",
      imagem: "https://www.marica.rj.gov.br/wp-content/uploads/2023/09/dsc_6045_53191680024_o-scaled.jpg",
      status: "Em andamento",
      duracao: "4h",
      localidade: "Maricá - Ponta Negra",
    },
    {
      titulo: "Entrega de mudas",
      descricao: "Distribuição de mudas para reflorestamento urbano.",
      imagem: "https://www.sema.ce.gov.br/wp-content/uploads/sites/36/2023/11/EXPOECE23.4.jpeg",
      status: "Concluído",
      duracao: "2h",
      localidade: "Maricá - Itaipuaçu",
    },
  ],
  Comunidade: [
    {
      titulo: "Mutirão comunitário",
      descricao: "Apoio a famílias em situação de vulnerabilidade.",
      imagem: "https://imagens.ebc.com.br/73iIz9HEMqqXlfPMFhrkJb0QCZc=/1170x700/smart/https://agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/img_7895_0.jpg?itok=y5NyYtoW",
      status: "Concluído",
      duracao: "5h",
      localidade: "Maricá - Centro",
    },
  ],
  Saúde: [],
  Reciclagem: [],
};

export default function TrabalhosPage() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const [abaAtiva, setAbaAtiva] = useState<"Todos" | "Em andamento" | "Concluído">("Todos");
  const [carregando, setCarregando] = useState(false);
  const [trabalhos, setTrabalhos] = useState(mockTrabalhos["Todos"]);
  const [busca, setBusca] = useState("");

  const handleCategoriaClick = (categoria: string) => {
    setCarregando(true);
    setCategoriaAtiva(categoria);
    setTimeout(() => {
      setTrabalhos(mockTrabalhos[categoria]);
      setCarregando(false);
    }, 600);
  };

  const trabalhosFiltrados = useMemo(() => {
    return trabalhos.filter((t) => {
      const combinaBusca =
        t.titulo.toLowerCase().includes(busca.toLowerCase()) ||
        t.descricao.toLowerCase().includes(busca.toLowerCase());
      const combinaStatus =
        abaAtiva === "Todos" ? true : t.status === abaAtiva;
      return combinaBusca && combinaStatus;
    });
  }, [busca, abaAtiva, trabalhos]);

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

        {/* 🔹 Abas de status + barra de pesquisa */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-8 border-b border-gray-300 pb-2">
          {/* Abas */}
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

          {/* Barra de pesquisa */}
          <div className="relative max-w-md w-full">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Buscar trabalho..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* 🔹 Título */}
        <h1 className="text-xl font-semibold text-gray-800 mb-6">
          Trabalhos — {categoriaAtiva}
        </h1>

        {/* 🔹 Lista de trabalhos */}
        {carregando ? (
          renderSkeleton()
        ) : trabalhosFiltrados.length === 0 ? (
          <p className="text-gray-500">
            Nenhum trabalho encontrado com os filtros aplicados.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trabalhosFiltrados.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={t.imagem}
                  alt={t.titulo}
                  className="h-44 w-full object-cover"
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {t.titulo}
                  </h3>
                  <p className="text-sm text-gray-600">{t.descricao}</p>

                  {/* Local e duração */}
                  <div className="flex items-center justify-between text-sm text-gray-500 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} className="text-purple-500" />
                      {t.localidade}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} className="text-purple-500" />
                      {t.duracao}
                    </span>
                  </div>

                  {/* Status */}
                  <span
                    className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${
                      t.status === "Em andamento"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {t.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
