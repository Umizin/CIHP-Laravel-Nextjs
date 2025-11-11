# Plataforma de Voluntariado - Interface Frontend (Next.js)

_Interface de usuário (SPA - Single Page Application) desenvolvida com Next.js, React e Tailwind CSS para a Plataforma de Voluntariado._

---

## ?? Sobre o Projeto

Este projeto consiste na camada de apresentação (`frontend`) da Plataforma de Voluntariado. Ele consome a [API Backend](https://github.com/Umizin/CIHP-Laravel-Nextjs) para buscar e exibir dados, além de fornecer uma experiência de usuário rica e interativa para voluntários e organizações.

## ?? Tecnologias Utilizadas

* **Framework Principal:** Next.js
* **Biblioteca UI:** React
* **Linguagem:** TypeScript
* **Estilização:** Tailwind CSS
* **Animações:** Framer Motion

## ?? Setup e Instalação

Siga os passos abaixo para executar o ambiente de desenvolvimento localmente.

### Pré-requisitos

* [Node.js](https://nodejs.org/) (versão 20.x ou superior)
* [Git](https://git-scm.com/)
* **A API Backend deve estar em execução.** Consulte o [README do Backend](https://github.com/Umizin/CIHP-Laravel-Nextjs/blob/main/README-Back.md) para instruções.

### Passos

1.  **Clonar o Repositório:**
    ```bash
    git clone [https://github.com/Umizin/CIHP-Laravel-Nextjs](https://github.com/Umizin/CIHP-Laravel-Nextjs)
    cd plataforma-frontend
    ```

2.  **Configurar Variáveis de Ambiente:**
    Crie seu arquivo de configuração local a partir do exemplo.
    ```bash
    cp .env.local.example .env.local
    ```
    Edite o arquivo `.env.local` e configure a URL da sua API backend.
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:8082
    ```

3.  **Instalar Dependências:**
    ```bash
    npm install
    ```

4.  **Iniciar o Servidor de Desenvolvimento:**
    ```bash
    npm run dev
    ```

A aplicação estará disponível em **`http://localhost:3000`**.

## ??? Arquitetura do Sistema

Este projeto faz parte de um ecossistema desacoplado:

* **[plataforma-voluntariado (Backend)](https://github.com/Umizin/CIHP-Laravel-Nextjs/blob/main/README-Back.md):** A API RESTful construída com Laravel, responsável pela lógica de negócio, autenticação e persistência de dados.
* **[plataforma-frontend (Frontend)](https://github.com/Umizin/CIHP-Laravel-Nextjs/blob/main/README-Front.md):** A interface de usuário (SPA) construída com Next.js, que consome a API do backend.

Para uma experiência de desenvolvimento completa, ambos os projetos devem ser configurados e executados simultaneamente.