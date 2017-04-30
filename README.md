# Teste Catho
Teste Catho com as tecnologias Nodejs + Mysql + Angular 2

###Documentos
  - O documento com a descrição do teste está na pasta "_documentos"

###Requisitos
  - Banco Mysql devidamente configurado e rodando
  - Node devidamente configurado e rodando
  - Angular2 Cli configurado e rodando
    * Para mais informações sobre Angular2 Cli acesse: https://github.com/angular/angular-cli

###Preparando o Banco de Dados
  - Já com tudo certo    
    * Entrar na pasta "db" e rodar no banco mysql o arquivo db.sql    
    PS: será criado um banco chamado 'catho'

###Testando o WebService
  - Agora com o banco de dados criado e alimentado
    * Entrar na pasta "backend/enum", abrir o arquivo config.js e modificar os dados de acesso ao banco    
    * Padrão: Host: '127.0.0.1'   User: 'root'    Password: '123'   Database: "catho"
    * Depois de configurado, rode script "backend/index.js" pelo terminal
    ```sh
    $ node ./backend/index.js
    ```

    * PS: Por padrão, rodará na porta 8080, se desejar mudar, abra o arquivo "backend/index.js" e modifique na linha 15. Em seguida abra o arquivo "frontend/src/app/enum/config.enum.ts" e mude no endereço também.

 ###Rodando o Sistema \o/
  - Agora com o Mysql rodando e alimentado e o WebService rodando
    * Entrar na pasta "frontend" e rodar pelo angular-cli
    ```sh
    $ ng serve
    ```
    
  - Abrir no navegador (padrão: http://localhost:4200)
  - Abrirá o sistema já na Home (não tive muito tempo para criar o login)   
    
  - Vá ao menu Cliente
    * Clique em Regras para adicionar ou editar as regras do Cliente
    * Clique em Novo para realizar um novo pedido

  - Regras
    * Ao clicar na opção regras será mostrada a listagem de regras do cliente
    * Prefixo é o identificador da regra no sistema
    * Descrição é a descrição da regra
    * Parametros é um json pré-determinado com dados usados pelo sistema

  - Novo pedido
    * Ao clicar na opção novo pedido será mostrada a tabela de itens no pedido (Estará em branco em primeiro momento, apenas com o total zerado em baixo)
    * Ao clicar no botão novo, selecione um produto e clique em Concluir. Será recarregada a tabela contendo o produto desejado já com o calculo de total
    * A coluna "Motivo" será preenchido apenas se ocorrer alguma forma de desconto por alguma regra do cliente
