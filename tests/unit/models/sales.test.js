const sinon = require("sinon");
const chai = require("chai");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const connection = require("../../../src/models/connection");
const salesModel = require("../../../src/models/sales");

describe('Testando a camada Controller da rota "/sales"', function () {
  afterEach(() => {
    sinon.restore();
  });

  describe("Usando o método GET em /sales para para buscar todas as vendas", function () {
    it("Retorna todas as vendas", async function () {
      sinon.stub(connection, "execute").resolves([
        [
          {
            saleId: 1,
            date: "2021-09-09T04:54:29.000Z",
            productId: 1,
            quantity: 2,
          },
          {
            saleId: 1,
            date: "2021-09-09T04:54:54.000Z",
            productId: 2,
            quantity: 2,
          },
        ],
      ]);
      expect(await salesModel.getAll()).to.be.deep.equal([
        {
          saleId: 1,
          date: "2021-09-09T04:54:29.000Z",
          productId: 1,
          quantity: 2,
        },
        {
          saleId: 1,
          date: "2021-09-09T04:54:54.000Z",
          productId: 2,
          quantity: 2,
        },
      ]);
    });
  });

  describe("Usando o método GET em /sales/:id para buscar o ID 1", function () {
    it("Retorna todas as vendas da venda de ID 1", async function () {
      sinon.stub(connection, "execute").resolves([
        [
          {
            saleId: 1,
            date: "2021-09-09T04:54:29.000Z",
            productId: 1,
            quantity: 2,
          },
          {
            saleId: 1,
            date: "2021-09-09T04:54:54.000Z",
            productId: 2,
            quantity: 2,
          },
        ],
      ]);
      expect(await salesModel.getById(1)).to.be.deep.equal([
        {
          date: "2021-09-09T04:54:29.000Z",
          productId: 1,
          quantity: 2,
        },
        {
          date: "2021-09-09T04:54:54.000Z",
          productId: 2,
          quantity: 2,
        },
      ]);
    });
  });
});
