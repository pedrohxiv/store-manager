const sinon = require("sinon");
const chai = require("chai");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const connection = require("../../../src/models/connection");
const productsModel = require("../../../src/models/products");

const {
  allProductsResponse,
  productSearchNameResponse,
} = require("../../../__tests__/_dataMock");

describe('Testando a camada Models da rota "/products"', function () {
  afterEach(() => {
    sinon.restore();
  });

  describe("Usando o método GET em /products para buscar todos os produtos", function () {
    it("Retorna todos os produtos", async function () {
      sinon.stub(connection, "execute").resolves([allProductsResponse]);
      expect(await productsModel.getAll()).to.be.deep.equal(
        allProductsResponse
      );
    });
  });

  describe("Usando o método GET em /products/:id para buscar o ID 1", function () {
    it("Retorna o produto Martelo de Thor", async function () {
      sinon.stub(connection, "execute").resolves([[productSearchNameResponse]]);
      expect(await productsModel.getById(1)).to.be.deep.equal(
        productSearchNameResponse
      );
    });
  });
});
