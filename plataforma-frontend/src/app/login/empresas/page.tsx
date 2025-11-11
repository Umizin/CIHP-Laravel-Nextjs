"use client";

import { useState } from "react";
import Link from "next/link";
import { Briefcase } from "lucide-react";

export default function LoginEmpresa() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    try {
      const response = await fetch("http://localhost/api/login/empresa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: senha }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Falha ao realizar login.");

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify({user: data.user}));
      window.location.href = "/empresa/dashboard";
    } catch (error: unknown) {
      let message = "Erro ao conectar com o servidor.";
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }
      setErro(message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Imagem lateral */}
      <div className="hidden md:flex md:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200"
          alt="Empresas parceiras"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
          <Briefcase className="text-yellow-400 w-14 h-14 mb-3" />
          <h1 className="text-white text-4xl font-bold text-center px-8">
            Bem-vindo de volta! 💼
          </h1>
          <p className="text-yellow-300 mt-2 text-lg text-center">
            Acesse seu painel de parcerias e recompensas.
          </p>
        </div>
      </div>

      {/* Formulário */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 py-10 bg-white">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Login da Empresa
        </h2>

        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">
          <input
            type="email"
            placeholder="E-mail corporativo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 outline-none"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 outline-none"
            required
          />

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-yellow-400 text-gray-900 font-bold hover:bg-yellow-500 transition cursor-pointer"
          >
            ENTRAR
          </button>

          {erro && <p className="text-sm text-red-500 text-center mt-2">{erro}</p>}

          <p className="text-sm text-center text-gray-600 mt-2">
            Ainda não tem conta?{" "}
            <Link
              href="/cadastro/empresa"
              className="text-yellow-500 hover:underline"
            >
              Cadastre-se aqui!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
