import DashboardLayout from "@/layouts/DashboardLayout";
import UserCard from "@/layouts/UserCard";

export default function OngPerfilPage() {
  return (
    <DashboardLayout>
      <div className="w-full relative">
        {/* Banner */}
        <div className="relative">
          <img
            src="https://img.freepik.com/fotos-premium/grupo-de-voluntarios-trabalhando-juntos-em-projeto-comunitario-em-um-dia-ensolarado_123827-19461.jpg"
            alt="Banner da ONG"
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>

        {/* Conteúdo principal */}
        <div className="flex flex-col lg:flex-row items-start gap-8 mt-10 px-6">
          {/* Descrição da ONG */}
          <div className="flex-1 w-full min-w-0 order-2 lg:order-1">
            <h2 className="text-[#E85C8B] font-semibold mb-3">SOBRE A ONG</h2>
            <p className="bg-[#FFF0F6] border border-[#F5B7D1] rounded-lg p-3 text-sm text-gray-700">
              Somos uma organização sem fins lucrativos dedicada a promover ações sociais
              e ambientais em comunidades locais. Nosso foco é fortalecer o voluntariado
              e criar oportunidades que gerem impacto positivo e transformação social.
            </p>
          </div>

          {/* Card desktop */}
          <div className="hidden lg:block w-[300px] flex-shrink-0 self-start order-1 lg:order-2">
            <UserCard
              name="Instituto Esperança"
              subtitle="Organização Não Governamental"
              infoItems={[
                { icon: "mail", value: "contato@institutoesperanca.org" },
                { icon: "map", value: "Av. Central, 250 - Maricá, RJ" },
                { icon: "globe", value: "www.institutoesperanca.org" },
              ]}
              className="w-full"
            />
          </div>

          {/* Card mobile */}
          <div className="lg:hidden w-full mb-6 order-1">
            <UserCard
              name="Instituto Esperança"
              subtitle="Organização Não Governamental"
              infoItems={[
                { icon: "mail", value: "contato@institutoesperanca.org" },
                { icon: "map", value: "Av. Central, 250 - Maricá, RJ" },
                { icon: "globe", value: "www.institutoesperanca.org" },
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
