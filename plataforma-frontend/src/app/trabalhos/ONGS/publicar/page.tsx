"use client";

import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useRouter } from "next/navigation";
import { Loader2, Upload } from "lucide-react";

export default function PublicarVagaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    descricaoDetalhada: "",
    duracao: "",
    cidade: "Maricá",
    bairro: "",
    vagas_disponiveis: "",
  });

  const bairrosMarica = [
    "Araçatiba",
    "Barra de Maricá",
    "Cordeirinho",
    "Centro",
    "Itaipuaçu",
    "Inoã",
    "Ponta Negra",
    "São José do Imbassaí",
    "Bambuí",
    "Caju",
    "Condado",
    "Guaratiba",
    "Spar",
    "Ubatiba",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

      const data = new FormData();
      data.append("titulo", formData.titulo);
      data.append("descricao", formData.descricao);
      data.append("descricao_detalhada", formData.descricaoDetalhada);
      data.append("duracao", formData.duracao);
      data.append("cidade", formData.cidade);
      data.append("bairro", formData.bairro);
      data.append("vagas_disponiveis", formData.vagas_disponiveis);

      const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
      if (fileInput?.files?.[0]) {
        data.append("imagem", fileInput.files[0]);
      }

      const response = await fetch("http://localhost/api/vagas", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Erro ao publicar vaga:", response.status, text);
        throw new Error("Erro na requisição");
      }

      alert("Vaga publicada com sucesso!");
      router.push("/trabalhos/voluntarios");
    } catch (err) {
      console.error(err);
      alert("Erro ao publicar vaga. Veja o console para detalhes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg mt-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Publicar nova vaga
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título da vaga
            </label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
              placeholder="Ex: Limpeza de praia"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {/* Descrição curta */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição curta
            </label>
            <input
              type="text"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              required
              placeholder="Breve resumo da atividade"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {/* Descrição detalhada */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição detalhada
            </label>
            <textarea
              name="descricaoDetalhada"
              value={formData.descricaoDetalhada}
              onChange={handleChange}
              required
              placeholder="Explique a ação, os objetivos e o impacto esperado..."
              className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {/* Imagem */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Imagem da ação
            </label>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 bg-purple-100 text-purple-700 border border-purple-300 rounded-md px-4 py-2 cursor-pointer hover:bg-purple-200 transition">
                <Upload size={18} />
                <span>Fazer upload</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </div>

            {preview && (
              <div className="mt-3">
                <img
                  src={preview}
                  alt="Preview da imagem"
                  className="w-full max-h-64 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>

          {/* Duração */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duração estimada
            </label>
            <input
              type="text"
              name="duracao"
              value={formData.duracao}
              onChange={handleChange}
              required
              placeholder="Ex: 4h, 1 dia, 2 turnos..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {/* Localidade */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cidade
              </label>
              <select
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
              >
                <option value="Maricá">Maricá</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bairro
              </label>
              <select
                name="bairro"
                value={formData.bairro}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
              >
                <option value="">Selecione o bairro</option>
                {bairrosMarica.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Vagas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Número de vagas
            </label>
            <input
              type="number"
              name="vagas_disponiveis"
              value={formData.vagas_disponiveis}
              onChange={handleChange}
              required
              min={1}
              placeholder="Ex: 20"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-purple-600 text-white font-medium rounded-lg py-3 hover:bg-purple-700 transition disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Publicando...
              </>
            ) : (
              "Publicar vaga"
            )}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
