const db = require('./db.service');

async function getAll() {
  const rows = await db.query(
    `SELECT id, name, description, price, image, stock, created_at, updated_at
    FROM products ORDER BY created_at DESC`
  );
  return rows;
}

async function getById(id) {
  const rows = await db.query(
    `SELECT id, name, description, price, image, stock, created_at, updated_at
    FROM products WHERE id = ?`,
    [id]
  );
  return rows[0];
}

async function create(product) {
  const result = await db.query(
    `INSERT INTO products (name, description, price, image, stock)
    VALUES (?, ?, ?, ?, ?)`,
    [
      product.name,
      product.description || null,
      product.price,
      product.image || null,
      product.stock || 0
    ]
  );

  let message = 'Error in creating product';

  if (result.affectedRows) {
    message = 'Product created successfully';
  }

  return { message, insertId: result.insertId };
}

async function update(id, product) {
  const result = await db.query(
    `UPDATE products
    SET name=?, description=?, price=?, image=?, stock=?
    WHERE id=?`,
    [
      product.name,
      product.description || null,
      product.price,
      product.image || null,
      product.stock || 0,
      id
    ]
  );

  let message = 'Error in updating product';

  if (result.affectedRows) {
    message = 'Product updated successfully';
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM products WHERE id=?`,
    [id]
  );

  let message = 'Error in deleting product';

  if (result.affectedRows) {
    message = 'Product deleted successfully';
  }

  return { message };
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
