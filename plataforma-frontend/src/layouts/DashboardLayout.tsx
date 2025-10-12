import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen overflow-x-hidden">
      <Sidebar />
      <main className="flex-1 bg-gray-100 text-black p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
