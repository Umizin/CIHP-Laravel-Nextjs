"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function CadastroEmpresaPage() {
  const [formData, setFormData] = useState({
    company_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    cnpj: "",
    telefone: "",
    cidade: "",
    estado: "",
    site: "",
    setor: "",
    responsavel: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (formData.password !== formData.password_confirmation) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost/api/empresa/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Erro ao cadastrar empresa.");
      } else {
        setSuccess("Empresa cadastrada com sucesso!");
        setFormData({
          company_name: "",
          email: "",
          password: "",
          password_confirmation: "",
          cnpj: "",
          telefone: "",
          cidade: "",
          estado: "",
          site: "",
          setor: "",
          responsavel: "",
        });
      }
    } catch {
      setError("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Lado esquerdo - imagem */}
      <div className="hidden md:flex md:w-1/2 relative">
        <Image
          src="https://images.unsplash.com/photo-1568992688065-536aad8a12f6?q=80&w=1200"
          alt="Empresas parceiras"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-8 bg-black/30">
          <h1 className="text-4xl font-bold mb-4">Seja uma Empresa Parceira</h1>
          <p className="max-w-md text-lg">
            Apoie causas sociais e ganhe visibilidade enquanto transforma vidas.
          </p>
        </div>
      </div>

      {/* Lado direito - formulário */}
      <div className="flex-1 flex items-center justify-center p-10 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Cadastro de Empresa
          </h2>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                name="company_name"
                type="text"
                placeholder="Nome da empresa"
                value={formData.company_name}
                onChange={handleChange}
                className="input"
              />
              <input
                name="email"
                type="email"
                placeholder="E-mail corporativo"
                value={formData.email}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                name="password"
                type="password"
                placeholder="Senha"
                value={formData.password}
                onChange={handleChange}
                className="input"
              />
              <input
                name="password_confirmation"
                type="password"
                placeholder="Confirmar senha"
                value={formData.password_confirmation}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                name="cnpj"
                type="text"
                placeholder="CNPJ"
                value={formData.cnpj}
                onChange={handleChange}
                className="input"
              />
              <input
                name="telefone"
                type="text"
                placeholder="Telefone comercial"
                value={formData.telefone}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                name="cidade"
                type="text"
                placeholder="Cidade"
                value={formData.cidade}
                onChange={handleChange}
                className="input"
              />
              <input
                name="estado"
                type="text"
                placeholder="Estado"
                value={formData.estado}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                name="site"
                type="text"
                placeholder="Site"
                value={formData.site}
                onChange={handleChange}
                className="input"
              />
              <input
                name="setor"
                type="text"
                placeholder="Setor de atuação"
                value={formData.setor}
                onChange={handleChange}
                className="input"
              />
            </div>

            <input
              name="responsavel"
              type="text"
              placeholder="Responsável"
              value={formData.responsavel}
              onChange={handleChange}
              className="input"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg font-semibold text-white transition ${
                loading ? "bg-yellow-400/60 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"
              }`}
            >
              {loading ? "Cadastrando..." : "Cadastrar Empresa"}
            </button>

            {error && <p className="text-center text-sm text-red-500 mt-2">{error}</p>}
            {success && <p className="text-center text-sm text-green-500 mt-2">{success}</p>}

            <p className="text-sm text-center text-gray-500 mt-2">
              Já possui conta?{" "}
              <Link href="/login" className="text-yellow-600 hover:underline">
                Faça login
              </Link>
            </p>
          </form>
        </div>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 0.6rem 0.8rem;
          border-radius: 0.5rem;
          border: 1px solid #e2e8f0;
          background-color: #f9fafb;
          color: #1f2937;
          font-size: 0.95rem;
          transition: all 0.2s;
        }
        .input:focus {
          outline: none;
          border-color: #facc15;
          box-shadow: 0 0 0 3px rgba(250, 204, 21, 0.3);
        }
      `}</style>
    </div>
  );
}
