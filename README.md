# ProAgil - Sistema de Cadastro e Pesquisa de usuários

Projeto desenvolvido baseado no curso Seja Fullstack com Asp.NET Core Web API, Angular 7 &amp; EF Core 

## Configuração do Projeto

Para rodar o projeto é necessário ter instalado a ferramenta Angular CLI no seu computador.

Abra o cmd na pasta raiz e execute o seguinte comando 
```
npm i @angular/cli

```

## Estrutura do Projeto

O projeto esta divido em 4 camadas:

  1. Camada da API
      Contém as controllers e os objetos de transferência de dados(DTOs)
      Camada mais externa do Projeto, ela que recebe as chamadas do aplicativo angular
      "É como se fosse o cérebro da aplicação, redireciona para os lugares certos e retorna os valores"
      
  2. Camada de Dominío(Domain)
      Contém todas as entidades(Parece com uma Model) e regras de negócio do projeto --> Por conter as regras de negócio, deve ser a camada mais segura
      
  3. Camada de Repositório(Repository)
      Faz as consultas ao banco 
      
  4. Camada do Aplicativo Angular
      Parte de front que faz as chamadas da api
      
## Banco de dados

o Projeto utiliza o banco de dado SqlLite para salvar os dados.

## Rodar Projeto

Rodar API
  ```
    cd Intuitive.Api
    dotnet run
  ```
  
 Rodar App Angular
  ```
    cd Intuitive-App
    npx ng serve ou ng serve
  ```

  
