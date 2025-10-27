import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  Icon?: React.ElementType;       // O ícone customizável que vai dentro do círculo
  iconClassName?: string;         // Classes de estilo para o ícone (cor, tamanho, etc)
}

export default function AuthLayout({ children, Icon, iconClassName }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <div className="w-full max-w-md px-6 py-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl">
        <div className="flex flex-col items-center mb-6">
          
       {Icon ? <Icon className={`h-8 w-8 ${iconClassName ?? "text-white"}`} /> : null}
        </div>

        {children}
      </div>
    </div>
  );
}
