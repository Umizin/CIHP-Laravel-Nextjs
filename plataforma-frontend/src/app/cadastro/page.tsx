"use client";
import AuthLayout from "@/layouts/AuthLayout";
import Link from "next/link";

export default function CadastroPage() {
  return (
    <AuthLayout>
    <form className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Insira seu usuário..."
        className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
      <input
        type="email"
        placeholder="Insira seu e-mail..."
        className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
      <input
        type="password"
        placeholder="Insira sua senha..."
        className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
      <input
        type="password"
        placeholder="Confirme sua senha..."
        className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />

      <button
        type="submit"
        className="w-full py-2 rounded-lg bg-yellow-400 text-gray-900 font-bold hover:bg-yellow-500 transition cursor-pointer"
      >
        CADASTRAR
      </button>

      <p className="text-sm text-center text-gray-300 mt-2">
        Já possui cadastro?{" "}
        <Link href="/login" className="text-yellow-400 hover:underline">
          clique aqui!
        </Link>
      </p>
    </form>
    </AuthLayout>
  );
}
