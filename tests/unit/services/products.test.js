const sinon = require("sinon");
const chai = require("chai");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const productsService = require("../../../src/services/products");
const productsModel = require("../../../src/models/products");

const {
  allProductsResponse,
  productSearchNameResponse,
  productCreateResponse,
} = require("../../../__tests__/_dataMock");

describe('Testando a camada Services da rota "/products"', function () {
  let next;

  beforeEach(() => {
    next = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("Usando o método GET em /products para buscar todos os produtos", function () {
    it("Retorna todos os produtos", async function () {
      sinon.stub(productsModel, "getAll").resolves(allProductsResponse);

      try {
        expect(await productsService.getAll()).to.be.deeṕ.equal(
          allProductsResponse
        );
      } catch (error) {
        next(error);
      }
    });
  });

  describe("Usando o método GET em /products/:id para listar um produto que não existe", function () {
    it('Retorna a mensagem "Product not found"', async function () {
      sinon.stub(productsModel, "getById").resolves();

      try {
        await productsService.getById(9999);
      } catch (error) {
        next(error);
        expect(error.message).to.be.equal("Product not found");
      }
    });
  });

  describe("Usando o método GET em /products/:id para buscar o ID 1", function () {
    it("Retorna o produto Martelo de Thor", async function () {
      sinon.stub(productsModel, "getById").resolves(productSearchNameResponse);

      try {
        expect(await productsService.getById(1)).to.be.deeṕ.equal(
          productSearchNameResponse
        );
      } catch (error) {
        next(error);
      }
    });
  });

  describe("Usando o método POST em /products para cadastrar um produto", function () {
    it("Retorna o produto cadastrado", async function () {
      sinon.stub(productsModel, "create").resolves(productCreateResponse);

      try {
        expect(await productsService.create("Produto1")).to.be.deeṕ.equal(
          productSearchNameResponse
        );
      } catch (error) {
        next(error);
      }
    });
  });

  describe('Usando o método POST em /products sem o campo "name" para cadastrar um produto', function () {
    it('Retorna a mensagem ""name" is required"', async function () {
      sinon.stub(productsModel, "create").resolves();

      try {
        await productsService.create();
      } catch (error) {
        next(error);
        expect(error.message).to.be.equal('"name" is required"');
      }
    });
  });

  describe("Usando o método POST em /products com o campo name menor que 5 caracteres para cadastrar um produto", function () {
    it('Retorna a mensagem ""name" length must be at least 5 characters long"', async function () {
      sinon.stub(productsModel, "create").resolves();

      try {
        await productsService.create("Pro");
      } catch (error) {
        next(error);
        expect(error.message).to.be.equal(
          '"name" length must be at least 5 characters long'
        );
      }
    });
  });

  describe("Usando o método PUT em /products/:id para atualizar um produto que não existe", function () {
    it('Retorna a mensagem "Product not found"', async function () {
      sinon.stub(productsModel, "getById").resolves();

      try {
        await productsService.update(9999, "Produto1");
      } catch (error) {
        next(error);
        expect(error.message).to.be.equal("Product not found");
      }
    });
  });

  describe("Usando o método PUT em /products/:id para atualizar um produto", function () {
    it("Retorna o produto atualizado", async function () {
      sinon.stub(productsModel, "getById").resolves({
        id: 1,
        name: "Martelo do Batman",
      });

      try {
        expect(
          await productsService.update(1, "Martelo do Batman")
        ).to.be.deeṕ.equal({
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
      sinon.stub(productsModel, "getById").resolves();

      try {
        await productsService.remove(9999);
      } catch (error) {
        next(error);
        expect(error.message).to.be.equal("Product not found");
      }
    });
  });

  describe("Usando o método DELETE em /products/:id para deletar um produto", function () {
    it("Retorna somente o status do produto deletado", async function () {
      sinon.stub(productsModel, "getById").resolves({
        id: 1,
        name: "Martelo do Batman",
      });

      try {
        expect(await productsService.remove(1)).to.be.deeṕ.equal(undefined);
      } catch (error) {
        next(error);
      }
    });
  });

  describe('Usando o método GET em products/search?q=Martelo para buscar o produto pelo campo "name"', function () {
    it("Retorna o produto Martelo de Thor", async function () {
      sinon.stub(productsModel, "getByName").resolves([
        {
          id: 1,
          name: "Martelo de Thor",
        },
      ]);

      try {
        expect(await productsService.getByName("Martelo")).to.be.deeṕ.equal({
          id: 1,
          name: "Martelo do Thor",
        });
      } catch (error) {
        next(error);
      }
    });
  });

  describe('Usando o método GET em products/search?q= para buscar o produto pelo campo "name"', function () {
    it("Retorna todos os produtos", async function () {
      sinon.stub(productsModel, "getByName").resolves(allProductsResponse);

      try {
        expect(await productsService.getByName()).to.be.deeṕ.equal(
          allProductsResponse
        );
      } catch (error) {
        next(error);
      }
    });
  });
});
