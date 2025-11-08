"use client";

import { useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";

export default function LoginVoluntario() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Erro ao efetuar login");
      }

      const token = await response.text();
      localStorage.setItem("token", token);
      window.location.href = "/perfil/voluntario";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Imagem lateral */}
      <div className="hidden md:flex md:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200"
          alt="Voluntariado"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
          <User className="text-yellow-400 w-14 h-14 mb-3" />
          <h1 className="text-white text-4xl font-bold text-center px-8">
            Bem-vindo de volta! 🌻
          </h1>
          <p className="text-yellow-400 mt-2 text-lg text-center">
            Entre e continue espalhando o bem.
          </p>
        </div>
      </div>

      {/* Formulário */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 py-10 bg-white">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Login do Voluntário
        </h2>

        <form
          onSubmit={handleLogin}
          className="w-full max-w-md flex flex-col gap-4"
        >
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 outline-none"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 outline-none"
            required
          />

          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" className="accent-yellow-400" /> Lembrar-me
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-yellow-400 text-gray-900 font-bold hover:bg-yellow-500 transition cursor-pointer disabled:opacity-50"
          >
            {loading ? "Entrando..." : "ENTRAR"}
          </button>

          {error && (
            <p className="text-sm text-red-500 text-center mt-2">{error}</p>
          )}

          <p className="text-sm text-center text-gray-600 mt-2">
            Ainda não tem conta?{" "}
            <Link
              href="/cadastro/voluntario"
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
