const sinon = require("sinon");
const chai = require("chai");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const salesController = require("../../../src/controllers/sales");
const salesService = require("../../../src/services/sales");

const {
  wrongSaleNotProductIdBody,
  wrongSaleNotQuantityBody,
  wrongZeroQuantityBody,
  wrongZeroNegativeBody,
  nonexistentProductIdBody,
  saleCreateResponse,
  rightSaleBody,
} = require("../../../__tests__/_dataMock");

describe('Testando a camada Controller da rota "/sales"', function () {
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

  describe('Usando o método POST em /sales sem o campo "productId" para cadastrar uma venda', function () {
    it('Retorna a mensagem ""productId" is required"', async function () {
      sinon.stub(salesService, "create").rejects('"productId" is required');

      try {
        req = { body: wrongSaleNotProductIdBody };
        await salesController.create(req, res, next);
      } catch (error) {
        next(error);

        expect(res.status).to.have.been.calledWith(400);
        expect(next).to.have.been.calledWith(error);
      }
    });
  });

  describe('Usando o método POST em /sales sem o campo "quantity" para cadastrar uma venda', function () {
    it('Retorna a mensagem ""quantity" is required"', async function () {
      sinon.stub(salesService, "create").rejects('"quantity" is required');

      try {
        req = { body: wrongSaleNotQuantityBody };
        await salesController.create(req, res, next);
      } catch (error) {
        next(error);

        expect(res.status).to.have.been.calledWith(400);
        expect(next).to.have.been.calledWith(error);
      }
    });
  });

  describe('Usando o método POST em /sales com o campo "quantity" menor ou igual a 0 (Zero) para cadastrar uma venda', function () {
    it('Retorna a mensagem ""quantity" must be greater than or equal to 1" com o campo "quantity" igual a 0 (Zero)', async function () {
      sinon
        .stub(salesService, "create")
        .rejects('"quantity" must be greater than or equal to 1');

      try {
        req = { body: wrongZeroQuantityBody };
        await salesController.create(req, res, next);
      } catch (error) {
        next(error);

        expect(res.status).to.have.been.calledWith(422);
        expect(next).to.have.been.calledWith(error);
      }
    });

    it('Retorna a mensagem ""quantity" must be greater than or equal to 1" com o campo "quantity" igual a -1 (Menos Um)', async function () {
      sinon
        .stub(salesService, "create")
        .rejects('"quantity" must be greater than or equal to 1');

      try {
        req = { body: wrongZeroNegativeBody };
        await salesController.create(req, res, next);
      } catch (error) {
        next(error);

        expect(res.status).to.have.been.calledWith(422);
        expect(next).to.have.been.calledWith(error);
      }
    });
  });

  describe('Usando o método POST em /sales com o campo "productId" inexistente para cadastrar uma venda', function () {
    it('Retorna a mensagem "Product not found"', async function () {
      sinon.stub(salesService, "create").rejects("Product not found");

      try {
        req = { body: nonexistentProductIdBody };
        await salesController.create(req, res, next);
      } catch (error) {
        next(error);

        expect(res.status).to.have.been.calledWith(404);
        expect(next).to.have.been.calledWith(error);
      }
    });
  });

  describe("Usando o método POST em /sales para cadastrar uma venda", function () {
    it("Retorna a venda cadastrado", async function () {
      sinon.stub(salesService, "create").resolves(saleCreateResponse);

      try {
        req = { body: rightSaleBody };
        await salesController.create(req, res, next);

        expect(res.status).to.have.been.calledWith(201);
        expect(res.json).to.have.been.calledWith(saleCreateResponse);
      } catch (error) {
        next(error);
      }
    });
  });

  describe("Usando o método GET em /sales para para buscar todas as vendas", function () {
    it("Retorna todas as vendas", async function () {
      sinon.stub(salesService, "getAll").resolves([
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
        await salesController.getAll(req, res, next);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith([
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

  describe("Usando o método GET em /sales/:id para listar uma venda que não existe", function () {
    it('Retorna a mensagem "Sale not found"', async function () {
      sinon.stub(salesService, "getById").rejects("Sale not found");

      try {
        req = { params: { id: "9999" } };
        await salesController.getById(req, res, next);
      } catch (error) {
        next(error);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith(error);
      }
    });
  });

  describe("Usando o método GET em /sales/:id para buscar o ID 1", function () {
    it("Retorna todas as vendas da venda de ID 1", async function () {
      sinon.stub(salesService, "getById").resolves([
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
        req = { params: { id: "1" } };
        await salesController.getById(req, res, next);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith([
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

  describe("Usando o método DELETE em /sales/:id para deletar uma venda que não existe", function () {
    it('Retorna a mensagem "Sale not found"', async function () {
      sinon.stub(salesService, "remove").rejects("Sale not found");

      try {
        req = { params: { id: "9999" } };
        await salesController.remove(req, res, next);
      } catch (error) {
        next(error);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith(error);
      }
    });
  });

  describe("Usando o método DELETE em /sales/:id para deletar uma venda", function () {
    it("Retorna somente o status da venda deletada", async function () {
      sinon.stub(salesService, "remove").resolves();

      try {
        req = { params: { id: "1" } };
        await salesController.remove(req, res, next);

        expect(res.status).to.have.been.calledWith(204);
      } catch (error) {
        next(error);
      }
    });
  });

  describe("Usando o método PUT em /sales/:id para atualizar uma venda que não existe", function () {
    it('Retorna a mensagem "Sale not found"', async function () {
      sinon.stub(salesService, "update").rejects("Sale not found");

      try {
        req = { params: { id: "9999" } };
        await salesController.update(req, res, next);
      } catch (error) {
        next(error);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith(error);
      }
    });
  });

  describe("Usando o método PUT em /sales/:id para atualizar uma venda", function () {
    it("Retorna a venda atualizada", async function () {
      sinon.stub(salesService, "update").resolves({
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
        req = {
          params: { id: "1" },
          body: [
            {
              productId: 1,
              quantity: 10,
            },
            {
              productId: 2,
              quantity: 50,
            },
          ],
        };
        await salesController.update(req, res, next);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith({
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
