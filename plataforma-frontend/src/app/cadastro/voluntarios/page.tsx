"use client";

import Link from "next/link";
import { useState } from "react";

export default function CadastroVoluntarioPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
    birthdate: "",
    city: "",
    state: "",
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

    try {
      const res = await fetch("http://localhost/api/voluntario/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Erro ao cadastrar.");
      } else {
        setSuccess("Cadastro realizado com sucesso!");
        setFormData({
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
          phone: "",
          birthdate: "",
          city: "",
          state: "",
        });
      }
    } catch (err) {
      setError("Erro de conexão com o servidor.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Seção da imagem */}
      <div className="hidden md:flex md:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1200"
          alt="Voluntariado"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold text-center px-8">
            Faça parte da mudança 🌍
            <span className="block text-yellow-400 text-2xl mt-2">
              Cadastre-se como voluntário
            </span>
          </h1>
        </div>
      </div>

      {/* Seção do formulário */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 py-10 bg-white">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Cadastro de Voluntário
        </h2>

        <form
          className="w-full max-w-md grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome completo"
            className="col-span-2 w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 outline-none"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-mail"
            className="col-span-2 w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 outline-none"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Senha"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 outline-none"
          />
          <input
            type="password"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            placeholder="Confirmar senha"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 outline-none"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Telefone (DDD + número)"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 outline-none"
          />
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 outline-none"
          />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Cidade"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 outline-none"
          />
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Estado"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="col-span-2 w-full py-2 mt-4 rounded-lg bg-yellow-400 text-gray-900 font-bold hover:bg-yellow-500 transition cursor-pointer"
          >
            {loading ? "Cadastrando..." : "CADASTRAR"}
          </button>
        </form>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}

        <p className="text-sm text-center text-gray-600 mt-4">
          Já possui cadastro?{" "}
          <Link href="/login" className="text-yellow-500 hover:underline">
            Clique aqui!
          </Link>
        </p>
      </div>
    </div>
  );
}
