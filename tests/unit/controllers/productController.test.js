const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const productsService  = require("../../../src/services/products.service");
const productsController = require("../../../src/controllers/products.controller");
const { products, oneProduct } = require("../mocks/product.mock");

describe("Teste de unidade do products Controller", function () {
    it("Deve retornar o status 200 e a lista", async function () {
      // arrange
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, "getAll")
        .resolves(products);

      // act
      await productsController.getAll(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products[0]);
    });

  afterEach(function () {
    sinon.restore();
  });

  it("Deve retornar o produto do id informado", async function () {
      // arrange
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, "getById")
        .resolves(oneProduct);

      // act
      await productsController.getById(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(oneProduct);
    });
  });
