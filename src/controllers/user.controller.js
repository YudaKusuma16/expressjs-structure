const products = require('../services/products.service');

async function index(req, res) {
  try {
    const products_list = await products.getAll();
    res.render('user/index', {
      title: 'Products - E-Commerce Store',
      products: products_list
    });
  } catch (err) {
    console.error('Error while getting products', err.message);
    res.status(500).render('error', {
      error: err.message,
      status: 500
    });
  }
}

async function show(req, res) {
  try {
    const product = await products.getById(req.params.id);
    if (!product) {
      return res.status(404).render('error', {
        error: 'Product not found',
        status: 404
      });
    }
    res.render('user/product', {
      title: product.name + ' - E-Commerce Store',
      product: product
    });
  } catch (err) {
    console.error('Error while getting product', err.message);
    res.status(500).render('error', {
      error: err.message,
      status: 500
    });
  }
}

module.exports = {
  index,
  show
};
