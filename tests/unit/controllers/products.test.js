const sinon = require("sinon");
const chai = require("chai");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const productsController = require("../../../src/controllers/products");
const productsService = require("../../../src/services/products");

const {
  allProductsResponse,
  productSearchNameResponse,
  productCreateResponse,
  rightProductBody,
} = require("../../../__tests__/_dataMock");

describe('Testando a camada Controller da rota "/products"', function () {
  let req, res, next;

  beforeEach(() => {
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("Usando o método GET em /products para buscar todos os produtos", function () {
    it("Retorna todos os produtos", async function () {
      sinon.stub(productsService, "getAll").resolves(allProductsResponse);

      try {
        await productsController.getAll(req, res, next);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(allProductsResponse);
      } catch (error) {
        next(error);
      }
    });
  });

  describe("Usando o método GET em /products/:id para listar um produto que não existe", function () {
    it('Retorna a mensagem "Product not found"', async function () {
      sinon.stub(productsService, "getById").rejects("Product not found");

      try {
        req = { params: { id: "9999" } };
        await productsController.getById(req, res, next);
      } catch (error) {
        next(error);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith(error);
      }
    });
  });

  describe("Usando o método GET em /products/:id para buscar o ID 1", function () {
    it("Retorna o produto Martelo de Thor", async function () {
      sinon
        .stub(productsService, "getById")
        .resolves(productSearchNameResponse);

      try {
        req = { params: { id: "1" } };
        await productsController.getById(req, res, next);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(productSearchNameResponse);
      } catch (error) {
        next(error);
      }
    });
  });

  describe("Usando o método POST em /products para cadastrar um produto", function () {
    it("Retorna o produto cadastrado", async function () {
      sinon.stub(productsService, "create").resolves(productCreateResponse);

      try {
        req = { body: rightProductBody };
        await productsController.create(req, res, next);

        expect(res.status).to.have.been.calledWith(201);
        expect(res.json).to.have.been.calledWith(productCreateResponse);
      } catch (error) {
        next(error);
      }
    });
  });

  describe('Usando o método POST em /products sem o campo "name" para cadastrar um produto', function () {
    it('Retorna a mensagem ""name" is required"', async function () {
      sinon.stub(productsService, "create").rejects('"name" is required');

      try {
        req = { body: undefined };
        await productsController.create(req, res, next);
      } catch (error) {
        next(error);

        expect(res.status).to.have.been.calledWith(400);
        expect(next).to.have.been.calledWith(error);
      }
    });
  });

  describe("Usando o método POST em /products com o campo name menor que 5 caracteres para cadastrar um produto", function () {
    it('Retorna a mensagem ""name" length must be at least 5 characters long"', async function () {
      sinon
        .stub(productsService, "create")
        .rejects('"name" length must be at least 5 characters long');

      try {
        req = { body: { name: "mesa" } };
        await productsController.create(req, res, next);
      } catch (error) {
        next(error);

        expect(res.status).to.have.been.calledWith(422);
        expect(next).to.have.been.calledWith(error);
      }
    });
  });

  describe("Usando o método PUT em /products/:id para atualizar um produto que não existe", function () {
    it('Retorna a mensagem "Product not found"', async function () {
      sinon.stub(productsService, "update").rejects("Product not found");

      try {
        req = { params: { id: "9999" } };
        await productsController.update(req, res, next);
      } catch (error) {
        next(error);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith(error);
      }
    });
  });

  describe("Usando o método PUT em /products/:id para atualizar um produto", function () {
    it("Retorna o produto atualizado", async function () {
      sinon.stub(productsService, "update").resolves({
        id: 1,
        name: "Martelo do Batman",
      });

      try {
        req = {
          params: { id: "1" },
          body: {
            name: "Martelo do Batman",
          },
        };
        await productsController.update(req, res, next);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith({
          id: 1,
          name: "Martelo do Batman",
        });
      } catch (error) {
        next(error);
      }
    });
  });

  describe("Usando o método DELETE em /products/:id para deletar um produto que não existe", function () {
    it('Retorna a mensagem "Product not found"', async function () {
      sinon.stub(productsService, "remove").rejects("Product not found");

      try {
        req = { params: { id: "9999" } };
        await productsController.remove(req, res, next);
      } catch (error) {
        next(error);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith(error);
      }
    });
  });

  describe("Usando o método DELETE em /products/:id para deletar um produto", function () {
    it("Retorna somente o status do produto deletado", async function () {
      sinon.stub(productsService, "remove").resolves();

      try {
        req = { params: { id: "1" } };
        await productsController.remove(req, res, next);

        expect(res.status).to.have.been.calledWith(204);
      } catch (error) {
        next(error);
      }
    });
  });

  describe('Usando o método GET em products/search?q=Martelo para buscar o produto pelo campo "name"', function () {
    it("Retorna o produto Martelo de Thor", async function () {
      sinon.stub(productsService, "getByName").resolves([
        {
          id: 1,
          name: "Martelo de Thor",
        },
      ]);

      try {
        req = { query: { q: "Martelo" } };
        await productsController.getByName(req, res, next);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith([
          {
            id: 1,
            name: "Martelo de Thor",
          },
        ]);
      } catch (error) {
        next(error);
      }
    });
  });

  describe('Usando o método GET em products/search?q= para buscar o produto pelo campo "name"', function () {
    it("Retorna todos os produtos", async function () {
      sinon.stub(productsService, "getByName").resolves(allProductsResponse);

      try {
        req = { query: { q: "" } };
        await productsController.getByName(req, res, next);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(allProductsResponse);
      } catch (error) {
        next(error);
      }
    });
  });
});
