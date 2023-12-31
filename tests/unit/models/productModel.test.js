const { expect } = require("chai");
const sinon = require("sinon");
const productsModel = require("../../../src/models/products.model");

const connection = require("../../../src/models/connection");
const { products } = require("../mocks/product.mock");

describe("Testes de unidade do model de produtos", function () {

  afterEach(function () {
    sinon.restore();
  });

  it("Recuperando a lista de produtos", async function () {
    // Arrange
    sinon.stub(connection, "execute").resolves(products);
    // Act
    const result = await productsModel.getAll();
    // Assert
    expect(result).to.be.deep.equal(products);
  });

  it("Recuperando um produto a partir do seu id", async function () {
    // Arrange
    sinon.stub(connection, "execute").resolves([[products[0]]]);
    // Act
    const result = await productsModel.getById(1);
    // Assert
    expect(result).to.be.deep.equal(products[0]);
  });
});
