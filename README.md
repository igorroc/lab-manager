# Sistema de Gestão de Laboratórios e Salas

![Sistema de Gestão de Laboratórios e Salas](caminho/para/imagem.png)

## Descrição

Este projeto desenvolve um sistema de gestão de laboratórios e salas destinado a facilitar a organização e a busca por espaços acadêmicos. Administradores do sistema podem cadastrar e gerenciar informações relativas a salas, laboratórios, professores, disciplinas e turmas. Usuários têm à disposição funcionalidades para realizar buscas e visualizar calendários das suas buscas, melhorando significativamente a acessibilidade e a gestão dos espaços educacionais.

## Funcionalidades

-   **Para Administradores:**
    -   Cadastro e gerenciamento de salas, laboratórios, professores, disciplinas e turmas.
-   **Para Usuários:**
    -   Realização de buscas e visualização de calendários baseados nas buscas.

## Tecnologias Utilizadas

-   **Frontend e Backend:** Next.js
-   **Banco de Dados:** PostgreSQL
-   **Containerização:** Docker
-   **Deploy:** Vercel

## Como Instalar

1. Clone o repositório:

```bash
git clone https://github.com/igorroc/lab-manager.git
cd lab-manager
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o container do banco de dados:

```bash
docker-compose up -d
```

4. Execute as migrações do banco de dados:

```bash
npm run migrate
```

## Configurações

Crie um arquivo `.env` na raiz do projeto com base no `.env.example` fornecido, preenchendo as variáveis de ambiente necessárias para a configuração do sistema.

## Como Executar

Após configurar o ambiente, inicie a aplicação localmente:

```bash
npm run dev
```

Acesse http://localhost:3000 no seu navegador para visualizar o sistema em execução.

## Contribuições

Contribuições são bem-vindas! Para contribuir, siga os passos abaixo:

1. Faça um fork do projeto
2. Crie uma nova branch com a sua feature: `git checkout -b feature/nome-da-feature`
3. Faça commit das suas alterações: `git commit -m 'feat: My new feature'`
4. Faça push para a sua branch: `git push origin feature/nome-da-feature`
5. Abra um Pull Request
6. Após a aprovação da sua PR, você pode fazer o merge da sua branch para a branch principal

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

-   **Desenvolvedor:** Igor Rocha
-   **E-mail:** [igor@ilrocha.com](mailto:igor@ilrocha.com)
