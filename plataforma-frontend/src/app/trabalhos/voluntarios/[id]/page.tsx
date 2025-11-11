// src/app/trabalhos/voluntarios/[id]/page.tsx

import DashboardLayout from "@/layouts/DashboardLayout";
import JobDetailLayout from "@/layouts/JobDetailLayout";

// 🔁 Mock temporário (substitua futuramente por chamada API)
const mockTrabalhos = [
  {
    titulo: "Limpeza de praia",
    descricao: "Ação de preservação costeira e conscientização ambiental.",
    descricaoDetalhada:
      "Participe do mutirão para limpar a orla da praia, removendo lixo e conscientizando os banhistas sobre a importância da preservação ambiental. O trabalho contribui diretamente para a conservação do ecossistema marinho e promove educação ambiental para a comunidade local.",
    imagem:
      "https://www.marica.rj.gov.br/wp-content/uploads/2023/09/dsc_6045_53191680024_o-scaled.jpg",
    status: "Em andamento",
    duracao: "4h",
    localidade: "Maricá - Ponta Negra",
    vagas: 20,
    inscritos: 14,
    premiado: true,
    descricaoPremio:
      "Desconto de 20% em eventos parceiros e camiseta exclusiva do projeto.",
  },
  {
    titulo: "Entrega de mudas",
    descricao: "Distribuição de mudas para reflorestamento urbano.",
    descricaoDetalhada:
      "Esta ação visa distribuir mudas de árvores nativas para moradores e escolas da região, incentivando o plantio e o cuidado com as áreas verdes urbanas. A iniciativa ajuda a melhorar a qualidade do ar e aumenta a biodiversidade local.",
    imagem:
      "https://www.sema.ce.gov.br/wp-content/uploads/sites/36/2023/11/EXPOECE23.4.jpeg",
    status: "Concluído",
    duracao: "2h",
    localidade: "Maricá - Itaipuaçu",
    vagas: 15,
    inscritos: 15,
    premiado: false,
  },
  {
    titulo: "Mutirão comunitário",
    descricao: "Apoio a famílias em situação de vulnerabilidade.",
    descricaoDetalhada:
      "Voluntários ajudarão na organização e distribuição de alimentos, roupas e itens de higiene para famílias em vulnerabilidade social. Além disso, haverá atividades de integração e suporte psicológico.",
    imagem:
      "https://imagens.ebc.com.br/73iIz9HEMqqXlfPMFhrkJb0QCZc=/1170x700/smart/https://agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/img_7895_0.jpg?itok=y5NyYtoW",
    status: "Concluído",
    duracao: "5h",
    localidade: "Maricá - Centro",
    vagas: 25,
    inscritos: 22,
    premiado: true,
    descricaoPremio:
      "Certificado oficial de voluntariado e convite para evento de networking.",
  },
];

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const trabalho = mockTrabalhos[Number(params.id)];

  if (!trabalho) {
    return (
      <DashboardLayout>
        <div className="text-center text-gray-600 mt-20">
          Trabalho não encontrado.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <JobDetailLayout {...trabalho}>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>{trabalho.descricaoDetalhada}</p>
          <div className="flex gap-6 text-sm">
            <div>
              <strong>Vagas disponíveis:</strong> {trabalho.vagas}
            </div>
            <div>
              <strong>Pessoas inscritas:</strong> {trabalho.inscritos}
            </div>
          </div>

          {trabalho.premiado && trabalho.descricaoPremio && (
            <div className="mt-4 p-4 border-l-4 border-yellow-400 bg-yellow-50 rounded">
              <h3 className="font-semibold text-yellow-700 mb-1">Prêmio da vaga</h3>
              <p className="text-yellow-800">{trabalho.descricaoPremio}</p>
            </div>
          )}
        </div>
      </JobDetailLayout>
    </DashboardLayout>
  );
}
