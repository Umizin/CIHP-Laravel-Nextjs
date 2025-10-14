# Plataforma de Voluntariado - API Backend

_API RESTful desenvolvida com Laravel para gerenciar voluntários, organizações e oportunidades de voluntariado._

---

## ?? Sobre o Projeto

Este projeto consiste no desenvolvimento do backend para uma plataforma de voluntariado. A API é responsável por gerenciar a autenticação de usuários (voluntários e organizações), o cadastro de oportunidades, o sistema de gamificação e a comunicação com o frontend.

Este é um projeto de aprendizado prático, focado em boas práticas de arquitetura, Clean Code e desenvolvimento em um ambiente profissional com Docker.

## ?? Tecnologias Utilizadas

* **Framework Principal:** Laravel 12
* **Linguagem:** PHP 8.4
* **Banco de Dados:** PostgreSQL
* **Ambiente de Desenvolvimento:** Docker com Laravel Sail
* **Autenticação:** Laravel Sanctum (autenticação baseada em token para SPAs)
* **Testes:** PHPUnit (a ser implementado)

## ?? Setup e Instalação

Siga os passos abaixo para configurar e executar o ambiente de desenvolvimento localmente.

### Pré-requisitos

* [Docker](https://www.docker.com/products/docker-desktop/)
* [Git](https://git-scm.com/)

### Passos

1.  **Clonar o Repositório**
    ```bash
    git clone [https://github.com/Umizin/CIHP-Laravel-Nextjs](https://github.com/Umizin/CIHP-Laravel-Nextjs)
    cd plataforma-voluntariado
    ```

2.  **Configurar Variáveis de Ambiente**
    Crie seu arquivo de configuração local a partir do exemplo fornecido.
    ```bash
    cp .env.example .env
    ```
    *Este comando cria o arquivo `.env`. Para este projeto, as configurações padrão já são suficientes para rodar o ambiente com o Sail.*

3.  **Construir e Iniciar os Contêineres**
    Use o Laravel Sail para construir as imagens e iniciar os serviços (PHP, PostgreSQL, etc.) em segundo plano.
    ```bash
    ./vendor/bin/sail up -d
    ```
    *A primeira execução pode demorar alguns minutos para baixar as imagens Docker.*

4.  **Instalar Dependências do Composer**
    Se a pasta `vendor` não foi criada automaticamente, instale as dependências do PHP.
    ```bash
    ./vendor/bin/sail composer install
    ```

5.  **Gerar a Chave da Aplicação**
    O Laravel precisa de uma chave de encriptação para operar com segurança.
    ```bash
    ./vendor/bin/sail artisan key:generate
    ```

6.  **Executar as Migrations do Banco de Dados**
    Este comando criará todas as tabelas necessárias no banco de dados PostgreSQL.
    ```bash
    ./vendor/bin/sail artisan migrate
    ```

7.  **(Opcional) Popular o Banco de Dados com Dados de Teste**
    ```bash
    ./vendor/bin/sail artisan db:seed
    ```

Após estes passos, a aplicação estará online e acessível em **`http://localhost:8082`** (ou a porta que você configurou no seu `.env`).

## ?? Manual de Operações (Uso da API)

A API é stateless e utiliza autenticação via Bearer Token.

### Autenticação

1.  **Obter um Token:** Faça uma requisição `POST` para `http://localhost:8082/api/login`. Envie seu `email` e `password` no corpo da requisição em formato JSON. A resposta conterá seu token de acesso.

2.  **Usar o Token:** Em todas as requisições para rotas protegidas, adicione o seguinte cabeçalho:
    * `Accept: application/json`
    * `Authorization: Bearer SEU_TOKEN_AQUI`

### Endpoints Principais

* `POST /api/login`: Autentica um usuário e retorna um token.
* `GET /api/user`: (Protegido) Retorna os dados do usuário autenticado.
* `GET /api/missoes`: (Público) Retorna uma lista de todas as missões.

## ??? Arquitetura do Sistema

Este projeto faz parte de um ecossistema desacoplado:

* **[plataforma-voluntariado (Backend)](https://github.com/Umizin/CIHP-Laravel-Nextjs/blob/main/README-Back.md):** A API RESTful construída com Laravel, responsável pela lógica de negócio, autenticação e persistência de dados.
* **[plataforma-frontend (Frontend)](https://github.com/Umizin/CIHP-Laravel-Nextjs/blob/main/README-Front.md):** A interface de usuário (SPA) construída com Next.js, que consome a API do backend.

Para uma experiência de desenvolvimento completa, ambos os projetos devem ser configurados e executados simultaneamente.