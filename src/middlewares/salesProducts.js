const productsModel = require('../models/products');

const creationValidation = async (req, res, next) => {
  const sales = req.body;
  const products = await Promise.all(
    sales.map((sale) => {
      const { productId } = sale;
      return productsModel.getById(productId);
    }),
  );

  if (products.some((product) => product === undefined)) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

module.exports = { creationValidation };
