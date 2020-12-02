
# Usability Validation Instrument :: Frontend

Projeto de desenvolvimento do módulo _frontend_ da aplicação **Usability Validation Instrument**  implementado no framework Angular com TypeScript que é um superconjunto de JavaScript, com o objetivo de prover as funcionalidades necessárias ao usuário a partir dos serviços disponibilizados pelo módulo _backend_ implementado na linguagem Java.

Repositório do Back-end: [clique aqui](https://github.com/rodrigorjsf/tcc-usability-backend)

```
                    :: Usability Validation Instrument ::

┌────────────┐       ┌───┬─────────┐       ┌──────────────┐
│  Usavalins │       │ R │Usavalins│       │              │
│  Frontend  │ <===> │ E │ Backend │ <===> │      BD      │
│  (Angular) │       │ S │ (Java)  │       │ (PostgreSQL) │
│            │       │ T │         │       │              │
└────────────┘       └───┴─────────┘       └──────────────┘
```

Este projeto usa as seguintes tecnologias:

- [Angular](https://angular.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Nebular](https://akveo.github.io/nebular/)
- [Nginx](https://www.nginx.com/)

## 1- Ferramentas e Configurações

O setup de configuração do ambiente de desenvolvimento é simples e independente da (s) IDE (s). Utilizei o Webstorm para desenvolver as funcionalidades do frontend.

Este projeto foi gerado com  [Angular CLI](https://github.com/angular/angular-cli) versão 10.0.6.

## Servidor de desenvolvimento

Execute `ng serve` para um servidor de desenvolvimento. Navegue até `http://localhost:3000/`. O aplicativo será recarregado automaticamente se você alterar qualquer um dos arquivos de origem.

## Estrutura de código

Execute `ng generate component-name` para gerar um novo componente. Você também pode usar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Execute `ng build` para construir o projeto. Os artefatos de construção serão armazenados no diretório `dist /`. Use o sinalizador `-prod` para uma construção de produção.

## Mais ajuda

Para obter mais ajuda sobre a CLI Angular, use `ng help` ou confira o [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## 2- Arquitetura do Sistema

Este projeto segue um padrão arquitetural recomendado pelo Angular CLI baseado em componentes (Web components) resultando na sua árvore de componentes [[1](https://www.tutorialspoint.com/software_architecture_design/component_based_architecture.htm#:~:text=Component%2Dbased%20architecture%20focuses%20on,methods%2C%20events%2C%20and%20properties.),[2](https://medium.com/omarelgabrys-blog/component-based-architecture-3c3c23c7e348)]. Para se comunicar com o _backend_ que disponibiliza uma API REST [[3](https://dzone.com/articles/intro-rest),[4](https://www.quora.com/What-are-RESTful-APIs-and-how-do-they-work),[5](https://blog.caelum.com.br/rest-principios-e-boas-praticas/)], é utilizado o servidor web NGINX que é baseado em uma estrutura assíncrona e orientada a eventos[[6](https://microservices.io/patterns/data/event-driven-architecture.html)]. 

O projeto foi desenvolvido usando o servidor web [Nginx](https://www.nginx.com/) e o framework Angular. A aplicação é executada em contêineres do Docker. Para isto, basta rodar o seguinte comando com o Docker:
