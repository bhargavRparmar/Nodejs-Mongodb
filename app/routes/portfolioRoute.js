const express = require('express');
const router = express();
const multer = require('multer');

const portfolioController = require('../Controller/portfolioController');
const { authenticate, generateToken } = require('../models/auth');





const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'app/upload')
    },

    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }


});

const upload = multer({
    storage: storage
})



router.get("/portfolio", authenticate, portfolioController.viewPortfolio);
router.get("/showPortfolio", authenticate, portfolioController.showPortfolio);
router.post("/addPortfolio", authenticate, upload.array("P_image", 5), portfolioController.addPortfolio);



router.get("/deletePortfolio/:id", authenticate, portfolioController.deletePortfolio);


router.get("/multiDeletePortfolio", authenticate, portfolioController.multiDeletePortfolio);



router.get("/showEditPortfolio/:id", authenticate, portfolioController.showEditPortfolio);
router.post("/updatePortfolio/:id", authenticate, upload.array("P_image", 5), portfolioController.updatePortfolio);


module.exports = router;