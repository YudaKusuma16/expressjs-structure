const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { requireAdmin } = require('../middlewares/auth.middleware');

// Admin login page
router.get('/login', adminController.loginPage);

// Handle login submit
router.post('/login', adminController.login);

// Admin dashboard (protected)
router.get('/', requireAdmin, adminController.dashboard);

// Add product form (protected)
router.get('/add', requireAdmin, adminController.addPage);

// Handle add product submit (protected)
router.post('/add', requireAdmin, adminController.add);

// Edit product form (protected)
router.get('/edit/:id', requireAdmin, adminController.editPage);

// Handle edit product submit (protected)
router.post('/edit/:id', requireAdmin, adminController.edit);

// Delete product (protected)
router.post('/delete/:id', requireAdmin, adminController.remove);

// Logout
router.get('/logout', adminController.logout);

module.exports = router;
