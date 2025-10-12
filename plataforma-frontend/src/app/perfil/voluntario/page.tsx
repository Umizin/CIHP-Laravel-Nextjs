import DashboardLayout from "@/layouts/DashboardLayout";
import UserCard from "@/layouts/UserCard";

export default function PerfilPage() {
  return (
    <DashboardLayout>
      <div className="w-full relative">
        {/* Banner */}
        <div className="relative">
          <img
            src="https://i2.wp.com/letraefilosofia.com.br/wp-content/uploads/2015/11/cora%C3%A7%C3%A3o-e-c%C3%A9rebro.jpg?resize=730%2C277"
            alt="Banner do voluntário"
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>

        {/* Conteúdo principal */}
        <div className="flex flex-col lg:flex-row items-start gap-8 mt-10 px-6">
          {/* Biografia */}
          <div className="flex-1 w-full min-w-0 order-2 lg:order-1">
            <h2 className="text-[#775EFF] font-semibold mb-3">BIOGRAFIA</h2>
            <textarea
              placeholder="Fale um pouco sobre você..."
              className="w-full h-40 bg-[#F5F3FF] border border-[#D5CCFF] rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-[#775EFF] resize-none"
            />
          </div>


          {/* Card desktop */}
          <div className="hidden lg:block w-[300px] flex-shrink-0 self-start order-1 lg:order-2">
            <UserCard
              name="Usuário"
              subtitle="@usuario"
              infoItems={[
                { icon: "mail", value: "usuario270@yahoo.com" },
                { icon: "map", value: "Ponta Negra - Maricá, RJ" },
                { icon: "globe", value: "Outra_rede_social" },
              ]}
              className="w-full"
            />
          </div>

          {/* Card mobile */}
          <div className="lg:hidden w-full mb-6 order-1">
            <UserCard
              name="Usuário"
              subtitle="@usuario"
              infoItems={[
                { icon: "mail", value: "usuario270@yahoo.com" },
                { icon: "map", value: "Ponta Negra - Maricá, RJ" },
                { icon: "globe", value: "Outra_rede_social" },
              ]}
              className="w-full"
              variant="horizontal"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
