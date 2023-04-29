# Bulldog Gems - Cadastro de Novo Usuário

Este é um projeto de cadastro de novo usuário em uma plataforma de jogo online chamado Bulldog Gems, um jogo de estratégia em que os jogadores devem criar táticas inteligentes para superar desafios, coletar gemas preciosas e subir no ranking para se tornarem os melhores jogadores.

## Temas aplicados no projeto
- Validação de formulário utilizando apenas HTML;
- Utilização do atributo "required";
- Validação de e-mail utilizando o atributo "type" e pré-validação;
- Utilização do atributo "pattern" com expressões regulares para validar senha;
- Criação de validação personalizada em JavaScript para campos de data de nascimento;
- Validação de CPF utilizando contas matemáticas;
- Integração com API do Via CEP para preencher informações de endereço;
- Importação e reutilização de aplicação em outras páginas;
- Utilização de máscaras, incluindo a máscara monetária.

## Como instalar e utilizar o pacote browser-sync do node.js
1. Certifique-se de que você tem o Node.js instalado na sua máquina;
2. Abra o terminal e navegue até o diretório principal do projeto, 'bulldog-gems';
3. Instale o pacote browser-sync através do seguinte comando: 
```
npm install -g browser-sync
```
4. Após a instalação, execute o seguinte comando para iniciar o servidor:
```
browser-sync start --server --directory --files "**/*"
```
5. Aguarde até que a mensagem "Local: http://localhost:3000" apareça no terminal;
6. Abra o seu navegador e acesse o endereço "http://localhost:3000" para visualizar o site.

Observação: O comando do passo 4 deve ser executado dentro do diretório 'bulldog-gems' para que o servidor funcione corretamente.
