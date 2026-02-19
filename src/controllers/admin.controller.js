const products = require('../services/products.service');
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// Render login page
function loginPage(req, res) {
  res.render('admin/login', {
    title: 'Admin Login'
  });
}

// Handle login submit
function login(req, res) {
  const { password } = req.body;

  if (password === ADMIN_PASSWORD) {
    req.session.isAdmin = true;
    res.redirect('/admin');
  } else {
    res.render('admin/login', {
      title: 'Admin Login',
      error: 'Invalid password'
    });
  }
}

// Logout
function logout(req, res) {
  req.session.destroy(() => {
    res.redirect('/admin/login');
  });
}

// Admin dashboard - show all products
async function dashboard(req, res) {
  try {
    const products_list = await products.getAll();
    res.render('admin/dashboard', {
      title: 'Admin Dashboard',
      products: products_list,
      success: req.query.success
    });
  } catch (err) {
    console.error('Error while getting products', err.message);
    res.status(500).render('error', {
      error: err.message,
      status: 500
    });
  }
}

// Render add product form
function addPage(req, res) {
  res.render('admin/add', {
    title: 'Add Product'
  });
}

// Handle add product submit
async function add(req, res) {
  try {
    await products.create(req.body);
    res.redirect('/admin?success=Product created successfully');
  } catch (err) {
    console.error('Error while creating product', err.message);
    res.render('admin/add', {
      title: 'Add Product',
      error: err.message,
      product: req.body
    });
  }
}

// Render edit product form
async function editPage(req, res) {
  try {
    const product = await products.getById(req.params.id);
    if (!product) {
      return res.redirect('/admin?error=Product not found');
    }
    res.render('admin/edit', {
      title: 'Edit Product',
      product: product
    });
  } catch (err) {
    console.error('Error while getting product', err.message);
    res.redirect('/admin?error=' + err.message);
  }
}

// Handle edit product submit
async function edit(req, res) {
  try {
    await products.update(req.params.id, req.body);
    res.redirect('/admin?success=Product updated successfully');
  } catch (err) {
    console.error('Error while updating product', err.message);
    const product = await products.getById(req.params.id);
    res.render('admin/edit', {
      title: 'Edit Product',
      error: err.message,
      product: { ...product, ...req.body }
    });
  }
}

// Handle delete product
async function remove(req, res) {
  try {
    await products.remove(req.params.id);
    res.redirect('/admin?success=Product deleted successfully');
  } catch (err) {
    console.error('Error while deleting product', err.message);
    res.redirect('/admin?error=' + err.message);
  }
}

module.exports = {
  loginPage,
  login,
  logout,
  dashboard,
  addPage,
  add,
  editPage,
  edit,
  remove
};
