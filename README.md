# Projeto Store Manager

Neste projeto, desenvolvi uma API de gerenciamento de vendas para um sistema de dropshipping. A API permitirá a criação, visualização, atualização e exclusão de produtos e vendas. Utilizei um banco de dados MySQL para armazenar os dados e seguirá a arquitetura MSC (Model-Service-Controller) para a organização do código. A API será RESTful, ou seja, seguirá os princípios da arquitetura REST.

## O que foi desenvolvido

O projeto consiste em desenvolver uma API que suporta as seguintes funcionalidades:

1. **Listar produtos**: Criei endpoints para listar produtos. O endpoint `/products` retornam todos os produtos, e o endpoint `/products/:id` retornam um produto específico com base no ID fornecido na URL.

2. **Cadastrar produtos**: Implementei um endpoint acessível através do caminho `/products` para cadastrar produtos. Os produtos enviados foram salvos na tabela `products` do banco de dados.

3. **Validar produtos**: Criei validações para produtos no endpoint `/products`. As validações foram realizadas antes de acessar o banco de dados e retornam um erro com status 400 se os dados forem inválidos.

4. **Cadastrar vendas**: Criei um endpoint acessível através do caminho `/sales` para cadastrar vendas. As vendas enviadas foram salvas nas tabelas `sales` e `sales_products` do banco de dados. Além disso, permiti o cadastro de vendas de vários produtos em uma única requisição.

5. **Listar vendas**: Criei endpoints para listar vendas. O endpoint `/sales` retornam todas as vendas, e o endpoint `/sales/:id` retornam uma venda específica com base no ID fornecido na URL.

6. **Atualizar produtos**: Implementei um endpoint acessível através do caminho `/products/:id` para atualizar um produto específico com base no ID fornecido na URL. As atualizações foram validadas da mesma forma que no cadastro de produtos.

7. **Deletar produtos**: Criei um endpoint acessível através do caminho `/products/:id` para deletar um produto específico com base no ID fornecido na URL.

8. **Deletar vendas**: Criei um endpoint acessível através do caminho `/sales/:id` para deletar uma venda específica com base no ID fornecido na URL.

9. **Atualizar vendas**: Implementei um endpoint acessível através do caminho `/sales/:id` para atualizar uma venda específica com base no ID fornecido na URL. As atualizações foram validadas da mesma forma que no cadastro de vendas.

10. **Endpoint de busca de produtos**: Criei um endpoint `/products/search?q=searchTerm` que permite buscar produtos com base em um termo de pesquisa fornecido no parâmetro de consulta `q=searchTerm`. A API retorna um array de produtos que contenham o termo no nome.

Além dessas funcionalidades, desenvolvi inúmeros **testes** para a API.

Neste projeto, tive a oportunidade de aprimorar as seguintes habilidades:

- Desenvolvimento de uma API RESTful com Node.js e Express.
- Organização do código seguindo a arquitetura MSC (Model-Service-Controller).
- Integração com um banco de dados MySQL para persistência de dados.
- Criação de testes unitários para garantir a qualidade do código.
- Implementação de validações de entrada para garantir dados consistentes.
- Manipulação de consultas SQL para obter e atualizar dados no banco de dados.

## Como usar

Para testar os endpoints da API, você pode usar ferramentas como o Postman ou o Insomnia. Certifique-se de configurar a conexão com o banco de dados na aplicação.

## Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- Node.js
- Express
- Integração com banco de dados MySQL

## Contato

- [Pedro Henrique] - [pedrohalmeidamendonca@gmail.com]
- [LinkedIn](https://www.linkedin.com/in/pedrohxiv/)
- [GitHub](https://github.com/pedrohxiv)

---

**Nota:** Este projeto é uma oportunidade para demonstrar minhas habilidades no desenvolvimento de APIs com Node.js, Express e integração com banco de dados MySQL. Sinta-se à vontade para explorar e entre em contato se tiver alguma pergunta ou feedback!
