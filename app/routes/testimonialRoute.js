const express = require('express');
const router = express();
const testimonialController = require('../Controller/testimonialController');
const { authenticate, generateToken } = require('../models/auth');



const multer = require('multer');



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

router.get("/testimonial", authenticate, testimonialController.viewTestimonial);
router.get("/showTestimonial", authenticate, testimonialController.showTestimonial);
router.post("/addTestimonial", authenticate, upload.single("T_Image"), testimonialController.addTestimonial);


router.get("/deleteTestimonial/:id", authenticate, testimonialController.deleteTestimonial);
router.get("/multiDeleteTestimonial ", authenticate, testimonialController.multiDeleteTestimonial);


router.get("/showEditTestimonial/:id", authenticate, testimonialController.showEditTestimonial);
router.post("/updateTestimonial/:id", authenticate, upload.single("T_Image"), testimonialController.updateTestimonial);







module.exports = router;