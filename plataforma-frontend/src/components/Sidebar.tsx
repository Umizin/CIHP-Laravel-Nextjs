"use client";

import { useState, useEffect } from "react";
import { User, Settings, HelpCircle, LogOut, Folder, Menu } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  // Fecha automaticamente o menu ao mudar para modo desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Botão para abrir o menu */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="md:hidden fixed top-4 left-4 z-50 bg-purple-500 text-white p-2 rounded-md shadow-md"
          aria-label="Abrir menu"
        >
          <Menu size={22} />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen w-60 bg-[#1c1c1e] text-sm text-gray-200 flex flex-col
                    transform transition-transform duration-300 z-40
                    ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Conteúdo principal: flex column que ocupa toda a altura do aside */}
        <div className="flex flex-col h-full overflow-hidden">
          {/* Conteúdo rolável (links etc.) */}
          <div className="flex flex-col flex-grow overflow-y-auto">
            {/* Cabeçalho */}
            <div className="flex items-center gap-2 px-4 py-6 border-b border-gray-700">
              <User className="text-purple-400" />
              <h1 className="text-lg font-semibold text-purple-400">CHIP</h1>
            </div>

            {/* Navegação */}
            <nav className="mt-4 flex flex-col space-y-2 px-1">
              <Link
                href="/perfil"
                className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition"
                onClick={() => setOpen(false)}
              >
                <User size={18} /> Perfil
              </Link>

              <Link
                href="/trabalhos"
                className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition"
                onClick={() => setOpen(false)}
              >
                <Folder size={18} /> Meus trabalhos
              </Link>

              {/* aqui você pode adicionar mais links sem empurrar o rodapé */}
            </nav>
          </div>

          {/* Rodapé fixo na base do aside */}
          <div className="px-4 py-4 border-t border-gray-700">
            <div className="flex flex-col space-y-2">
              <Link
                href="/configuracoes"
                className="flex items-center gap-2 text-gray-400 hover:text-white"
                onClick={() => setOpen(false)}
              >
                <Settings size={18} /> Configurações
              </Link>

              <Link
                href="/suporte"
                className="flex items-center gap-2 text-gray-400 hover:text-white"
                onClick={() => setOpen(false)}
              >
                <HelpCircle size={18} /> Suporte
              </Link>

              <button
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300"
                onClick={() => setOpen(false)}
              >
                <LogOut size={18} /> Deslogar
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Fundo escurecido */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-30 md:hidden transition-opacity duration-300"
          aria-hidden
        />
      )}
    </>
  );
}
