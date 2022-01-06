const express = require('express');
const router = express();
const contactController = require('../Controller/contactController');
const { authenticate, generateToken } = require('../models/auth');

router.get("/contact", authenticate, contactController.viewcontact);
router.get("/showcontact", authenticate, contactController.showcontact);
router.post("/addcontact", authenticate, contactController.addcontact);


router.get("/deleteContact/:id", authenticate, contactController.deleteContact);


router.get("/multiDeleteContact", authenticate, contactController.multiDeleteContact);


router.get("/showEditContact/:id", authenticate, contactController.showEditContact);
router.post("/updateContact/:id", authenticate, contactController.updateContact);

module.exports = router;