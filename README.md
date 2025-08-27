Stacker

Stacker — A full-stack Task Manager App desenvolvida com React, Node.js e MongoDB, ideal para organizar tarefas diárias com uma interface simples e produtiva.

Demonstração ao vivo

Acesse a versão online da aplicação aqui: stacker-client.vercel.app
 
GitHub

Tecnologias Utilizadas

Front-end: React

Back-end: Node.js (possivelmente Express)

Banco de dados: MongoDB

Estilização: CSS

Deploy: Vercel (client)

Funcionalidades

CRUD de tarefas: crie, visualize, edite e exclua tarefas.

Categoria ou prioridade (se aplicável): atribua níveis de dificuldade ou categorias às tarefas.

Contador ou timer integrado: para acompanhar o tempo dedicado a cada atividade.

Interface interativa e responsiva: adaptável para diferentes tamanhos de tela.

(Caso seu projeto tenha funcionalidades adicionais, você pode listá-las aqui!)

Estrutura do Projeto
Stacker/
├── client/      # Front-end React
├── server/      # API com Node.js + MongoDB
└── README.md    # Este arquivo

Como executar localmente
1. Clone o repositório
git clone https://github.com/nateejpg/Stacker.git
cd Stacker

2. Execute o back-end
cd server
npm install
npm start

3. Execute o front-end

Em outra aba do terminal:

cd client
npm install
npm start


O front-end será iniciado em: http://localhost:3000 (ou outro porto configurado)

Variáveis de Ambiente

Em server/, crie um arquivo .env com as seguintes variáveis (se necessário):

MONGODB_URI=seu_uri_do_mongodb
PORT=5000


Adapte conforme a configuração do seu projeto.

Contribuição

Contribuições são bem-vindas! Veja o arquivo CONTRIBUTING.md (se existir) para diretrizes de contribuição. Caso não tenha, você pode adicionar algo como:

1. Fork o projeto  
2. Crie uma nova branch: `git checkout -b feature/nome-da-melhoria`  
3. Implemente sua sugestão e commit suas mudanças: `git commit -m 'Descrição clara'`  
4. Faça o push: `git push origin feature/nome-da-melhoria`  
5. Abra um Pull Request

Contato

Sinta-se à vontade para me contatar em caso de dúvidas ou feedback: [Seu Nome ou E-mail aqui]

Licença

Projeto sob [MIT License]
