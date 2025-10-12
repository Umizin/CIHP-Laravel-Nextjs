import DashboardLayout from "@/layouts/DashboardLayout";
import UserCard from "@/layouts/UserCard";

export default function EmpresaParceiraPage() {
  return (
    <DashboardLayout>
      <div className="w-full relative">
        {/* Banner */}
        <div className="relative">
          <img
            src="https://img.freepik.com/fotos-premium/esta-imagem-representa-a-importancia-da-energia-renovavel-para-um-futuro-melhor-ia-generativa_818261-78.jpg"
            alt="Banner da empresa"
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>

        {/* Conteúdo principal */}
        <div className="flex flex-col lg:flex-row items-start gap-8 mt-10 px-6">
          {/* Descrição da empresa */}
            <div className="flex-1 w-full min-w-0 order-2 lg:order-1">
                <h2 className="text-[#775EFF] font-semibold mb-3">SOBRE A EMPRESA</h2>
                <p className="bg-[#F5F3FF] border border-[#D5CCFF] rounded-lg p-3 text-sm text-gray-700">
                    Somos uma organização parceira do projeto, comprometida com o desenvolvimento sustentável e o impacto social positivo em Maricá e região.
                </p>
            </div>


          {/* Card desktop */}
          <div className="hidden lg:block w-[300px] flex-shrink-0 self-start order-1 lg:order-2">
            <UserCard
              name="Empresa Exemplo"
              subtitle="Parceira"
              infoItems={[
                { icon: "mail", value: "contato@empresaexemplo.com" },
                { icon: "map", value: "Rua das Flores, 123 - Maricá, RJ" },
                { icon: "globe", value: "www.empresaexemplo.com" },
              ]}
              className="w-full"
            />
          </div>

          {/* Card mobile */}
          <div className="lg:hidden w-full mb-6 order-1">
            <UserCard
              name="Empresa Exemplo"
              subtitle="Parceira"
              infoItems={[
                { icon: "mail", value: "contato@empresaexemplo.com" },
                { icon: "map", value: "Rua das Flores, 123 - Maricá, RJ" },
                { icon: "globe", value: "www.empresaexemplo.com" },
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
