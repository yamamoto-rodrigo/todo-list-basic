# Simple To-do List

O meu primeiro projeto pessoal de desenvolvimento web, feito apenas com **HTML, CSS e JavaScript puro** (sem frameworks ou bibliotecas).

## Status atual
**Em Andamento**

Ultimamente, dediquei meu tempo para organizar melhor o código. Decidi dividir a lógica em objetos separados (`app`, `UI` e `LocalStorage`) para que cada parte do sistema tenha uma responsabilidade clara, o que facilitou muito a manutenção.
Também implementei persistência de dados (salvando tudo no navegador) e apliquei técnicas como **Delegação de Eventos** para otimizar o desempenho da aplicação, evitando criar múltiplos eventos desnecessários.

Principais melhorias:
- **Organização**: Código separado em módulos lógicos.
- **Performance**: Uso de delegação de eventos nos botões da lista.
- **Consistência**: Uso de IDs únicos e validação nativa do HTML.

Os próximos passos agora são focar 100% no **design e na experiência do usuário (UX)** e adicionar as validações finais.

## Objetivo do projeto
Construir uma To-do List funcional do zero. Meu foco aqui foi entender como o JavaScript funciona na prática, manipulando a página e organizando meus arquivos para não ficar tudo misturado.

## Tecnologias e Ferramentas
- **HTML5:** Para criar a estrutura da página.
- **CSS3:** Para estilizar e deixar bonito (usando Flexbox).
- **JavaScript Principal:** Usei apenas o básico e lógica de programação, sem nenhum framework, para garantir que aprendi os fundamentos.

## Funcionalidades
Aqui está o que já está funcionando e o que ainda pretendo fazer:

- [x] Adicionar novas tarefas
- [x] Marcar/Desfazer conclusão de tarefas
- [x] Deletar tarefas individuais com confirmação
- [x] Limpar todas as tarefas (em massa)
- [x] Limpar apenas tarefas concluídas
- [x] Contador de tarefas (Total, Concluídas e Pendentes)
- [x] Salvar tudo automaticamente no navegador

## Funcionalidades extras
- [x] Níveis de prioridade (baixa, média, alta) com cores diferentes
- [ ] Editar tarefas
- [ ] Modo escuro (Dark Mode)
- [ ] Validações finais (não aceitar nomes vazios ou datas que já passaram)

## O que estou aprendendo com esse projeto
- Como estruturar um HTML acessível.
- Como organizar o CSS usando variáveis e classes reaproveitáveis.
- A importância de não escrever todo o código em um lugar só.
- Como fazer um clique funcionar para vários botões (para não travar a página).
- Como conectar os dados (Array) com o que aparece na tela.
- Como usar o Git para salvar minhas alterações.
- Como organizar o código em **Objetos/Módulos** (`app`, `UI`, `LocalStorage`).
- Técnicas de performance como **Delegação de Eventos**.
- Lógica de estado e renderização (`State-Driven UI`).

---
Esse projeto representa o início real da minha jornada como desenvolvedor.