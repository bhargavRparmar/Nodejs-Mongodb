const express = require('express');
const router = express();
const categoryController = require('../Controller/categoryController');
const { authenticate, generateToken } = require('../models/auth');

router.get("/category", authenticate, categoryController.viewCategory);
router.get("/showCategory", authenticate, categoryController.showCategory);
router.post("/addCategory", authenticate, categoryController.addCategory);


router.get("/deleteCategory/:id", authenticate, categoryController.deleteCategory);

router.get("/multiDeleteCategory", authenticate, categoryController.multiDeleteCategory);

router.get("/showEditCategory/:id", authenticate, categoryController.showEditCategory);
router.post("/updateCategory", authenticate, categoryController.updateCategory);

module.exports = router;