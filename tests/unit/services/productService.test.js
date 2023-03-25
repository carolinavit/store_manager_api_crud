const { expect } = require("chai");
const sinon = require("sinon");
const productsModel = require("../../../src/models/products.model");
const productsService = require("../../../src/services/products.service");

const { products } = require("../mocks/product.mock");

describe("Testes de unidade de service de produtos", function () {
  afterEach(function () {
    sinon.restore();
  });

  it("Recuperando a lista de produtos", async function () {
    // Arrange
    sinon.stub(productsModel, "getAll").resolves(products);
    // Act
    const result = await productsService.getAll();
    // Assert
    expect(result).to.be.deep.equal(products);
  });

  it("Recuperando um produto a partir do seu id", async function () {
    // Arrange
    sinon.stub(productsModel, "getById").resolves(products[0]);
    // Act
    const result = await productsService.getById(1);
    // Assert
    expect(result).to.be.deep.equal(products[0]);
  });
});
