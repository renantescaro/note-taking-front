# Note Taking Frontend

Este é o cliente web da aplicação de notas, desenvolvido com **Next.js 14/15** e **Material UI (MUI)**.<br>
A interface foi projetada para ser leve, responsiva e integrada a um backend que utiliza **Supabase**.

## 🚀 Tecnologias e Ajustes de Design

- **Next.js**: Framework principal.
- **MUI v6**: Performance e modernização da estrutura de layout.
- **Axios**: Cliente HTTP configurado com interceptores globais.
- **Docker**: Build multi-stage.

## 🔗 Repositório do Backend

O backend que alimenta esta interface pode ser encontrado em:
[https://github.com/renantescaro/note-taking-app](https://github.com/renantescaro/note-taking-app)

## 🏗️ Como Rodar

1. **Instalação:**
   `npm install`
2. **Build de Produção:**
   `npm run build`
3. **Docker Build:**
   `docker build -t teskaro/note-taking-front:latest .`
