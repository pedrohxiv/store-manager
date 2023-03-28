const sinon = require("sinon");
const chai = require("chai");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const salesService = require("../../../src/services/sales");
const salesModel = require("../../../src/models/sales");

const {
  wrongSaleNotProductIdBody,
  wrongSaleNotQuantityBody,
  wrongZeroQuantityBody,
  wrongZeroNegativeBody,
  nonexistentProductIdBody,
  saleCreateResponse,
  rightSaleBody,
} = require("../../../__tests__/_dataMock");

describe('Testando a camada Services da rota "/sales"', function () {
  let next;

  beforeEach(() => {
    next = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Usando o método POST em /sales sem o campo "productId" para cadastrar uma venda', function () {
    it('Retorna a mensagem ""productId" is required"', async function () {
      sinon.stub(salesModel, "create").resolves();

      try {
        await salesService.create(wrongSaleNotProductIdBody);
      } catch (error) {
        next(error);
        expect(error.message).to.be.equal('"productId" is required');
      }
    });
  });

  describe('Usando o método POST em /sales sem o campo "quantity" para cadastrar uma venda', function () {
    it('Retorna a mensagem ""quantity" is required"', async function () {
      sinon.stub(salesModel, "create").resolves();

      try {
        await salesService.create(wrongSaleNotQuantityBody);
      } catch (error) {
        next(error);
        expect(error.message).to.be.equal('"quantity" is required');
      }
    });
  });

  describe('Usando o método POST em /sales com o campo "quantity" menor ou igual a 0 (Zero) para cadastrar uma venda', function () {
    it('Retorna a mensagem ""quantity" must be greater than or equal to 1" com o campo "quantity" igual a 0 (Zero)', async function () {
      sinon.stub(salesModel, "create").resolves();

      try {
        await salesService.create(wrongZeroQuantityBody);
      } catch (error) {
        next(error);
        expect(error.message).to.be.equal(
          '"quantity" must be greater than or equal to 1'
        );
      }
    });

    it('Retorna a mensagem ""quantity" must be greater than or equal to 1" com o campo "quantity" igual a -1 (Menos Um)', async function () {
      sinon.stub(salesModel, "create").resolves();

      try {
        await salesService.create(wrongZeroNegativeBody);
      } catch (error) {
        next(error);
        expect(error.message).to.be.equal(
          '"quantity" must be greater than or equal to 1'
        );
      }
    });
  });

  describe('Usando o método POST em /sales com o campo "productId" inexistente para cadastrar uma venda', function () {
    it('Retorna a mensagem "Product not found"', async function () {
      sinon.stub(salesModel, "create").resolves();

      try {
        await salesService.create(nonexistentProductIdBody);
      } catch (error) {
        next(error);
        expect(error.message).to.be.equal("Product not found");
      }
    });
  });

  describe("Usando o método POST em /sales para cadastrar uma venda", function () {
    it("Retorna a venda cadastrado", async function () {
      sinon.stub(salesModel, "create").resolves(saleCreateResponse);

      try {
        expect(await salesService.create(rightSaleBody)).to.be.deep.equal(
          saleCreateResponse
        );
      } catch (error) {
        next(error);
      }
    });
  });

  describe("Usando o método GET em /sales para para buscar todas as vendas", function () {
    it("Retorna todas as vendas", async function () {
      sinon.stub(salesModel, "getAll").resolves([
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

      try {
        expect(await salesService.getAll()).to.be.deep.equal([
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
      } catch (error) {
        next(error);
      }
    });
  });

  describe("Usando o método GET em /sales/:id para buscar o ID 1", function () {
    it("Retorna todas as vendas da venda de ID 1", async function () {
      sinon.stub(salesModel, "getById").resolves([
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

      try {
        expect(await salesService.getById(1)).to.have.been.calledWith([
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
      } catch (error) {
        next(error);
      }
    });
  });

  describe("Usando o método DELETE em /sales/:id para deletar uma venda", function () {
    it("Retorna somente o status da venda deletada", async function () {
      sinon.stub(salesModel, "remove").resolves();

      try {
        expect(await salesService.remove(1)).to.be.deeṕ.equal(undefined);
      } catch (error) {
        next(error);
      }
    });
  });

  describe("Usando o método PUT em /sales/:id para atualizar uma venda", function () {
    it("Retorna a venda atualizada", async function () {
      sinon.stub(salesModel, "getById").resolves({
        saleId: 1,
        itemsUpdated: [
          {
            productId: 1,
            quantity: 10,
          },
          {
            productId: 2,
            quantity: 50,
          },
        ],
      });

      try {
        expect(
          await salesService.update(1, [
            {
              productId: 1,
              quantity: 10,
            },
            {
              productId: 2,
              quantity: 50,
            },
          ])
        ).to.be.deeṕ.equal({
          saleId: 1,
          itemsUpdated: [
            {
              productId: 1,
              quantity: 10,
            },
            {
              productId: 2,
              quantity: 50,
            },
          ],
        });
      } catch (error) {
        next(error);
      }
    });
  });
});
