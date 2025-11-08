"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import DashboardLayout from "@/layouts/DashboardLayout";

interface Vaga {
  id: number;
  titulo: string;
  descricao: string;
  descricao_detalhada?: string;
  imagem?: string;
  duracao?: string;
  cidade: string;
  bairro: string;
  vagas_disponiveis: number;
  status: string;
  premiada?: boolean;
}

export default function EditarVagaPage() {
  const router = useRouter();
  const params = useParams(); // pega o ID da rota
  const vagaId = params.id;

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<any>({
    titulo: "",
    descricao: "",
    descricao_detalhada: "",
    imagem: null,
    duracao: "",
    cidade: "",
    bairro: "",
    vagas_disponiveis: 1,
    status: "Em andamento",
  });
  const [preview, setPreview] = useState<string>("");

  // 🔹 Carregar dados da vaga existente
  useEffect(() => {
    const fetchVaga = async () => {
      try {
        const res = await fetch(`http://localhost/api/vagas/${vagaId}`);
        if (!res.ok) throw new Error("Erro ao carregar vaga");
        const data = await res.json();

        // ✅ Garante que o formData é atualizado corretamente
        setFormData({
          titulo: data.titulo || "",
          descricao: data.descricao || "",
          descricao_detalhada: data.descricao_detalhada || "",
          imagem: null,
          duracao: data.duracao || "",
          cidade: data.cidade || "",
          bairro: data.bairro || "",
          vagas_disponiveis: data.vagas_disponiveis || 1,
          status: data.status || "Em andamento",
        });

        setPreview(data.imagem ? `http://localhost/storage/${data.imagem}` : "");
      } catch (err) {
        console.error("Erro ao carregar vaga:", err);
        alert("Não foi possível carregar as informações da vaga.");
      } finally {
        setLoading(false);
      }
    };

    if (vagaId) fetchVaga();
  }, [vagaId]);

  // 🔹 Atualizar campos do formulário
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  // 🔹 Atualizar imagem e preview
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev: any) => ({ ...prev, imagem: e.target.files![0] }));
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  // 🔹 Enviar formulário atualizado
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        payload.append(key, formData[key]);
      }
    });
    payload.append("_method", "PUT");

    try {
      const raw = sessionStorage.getItem("token");
      if (!raw) throw new Error("Token não encontrado no sessionStorage");

      let token = "";
      try {
        token = JSON.parse(raw).token;
      } catch {
        token = raw;
      }
      
      const res = await fetch(`http://localhost/api/vagas/${vagaId}`, {
        method: "POST",
        body: payload,
        headers:{
           Authorization: `Bearer ${token}`,
        }
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao atualizar vaga");

      alert("Vaga atualizada com sucesso!");
      router.push("/trabalhos/voluntarios");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Erro ao atualizar vaga");
    }
  };

  if (loading) return <p className="p-8 text-gray-600">Carregando vaga...</p>;

  return (
    <DashboardLayout>
      <div className="w-full min-h-screen bg-[#E9E6F0] text-gray-800 px-8 py-10">
        <h1 className="text-2xl font-semibold mb-6">Editar Vaga</h1>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-md">
          <div>
            <label className="block font-medium mb-1">Título</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Descrição</label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Descrição Detalhada</label>
            <textarea
              name="descricao_detalhada"
              value={formData.descricao_detalhada}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Imagem</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-2 h-48 w-full object-cover rounded-lg"
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Cidade</label>
              <input
                type="text"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Bairro</label>
              <input
                type="text"
                name="bairro"
                value={formData.bairro}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Duração</label>
              <input
                type="text"
                name="duracao"
                value={formData.duracao}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Vagas Disponíveis</label>
              <input
                type="number"
                name="vagas_disponiveis"
                value={formData.vagas_disponiveis}
                min={1}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="Em andamento">Em andamento</option>
              <option value="Concluído">Concluído</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Atualizar Vaga
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
