import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar fixa */}
      <Sidebar />

      {/* Conteúdo rolável */}
      <main className="flex-1 bg-gray-100 text-black overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
}
