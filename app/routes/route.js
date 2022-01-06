const express = require('express');
const router = express();
const authController = require('../Controller/authController');
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




router.get("/", authController.login);

router.post("/loginUser", generateToken, authController.authUser);




router.get("/registration", authController.registration);
router.post("/signup", upload.single('Image'), authController.signup);


router.get("/forgetpassword", authController.forgetpassword);
router.post("/verifyEmail", authController.verifyEmail);

router.get("/logout", authController.logout);

router.post("/otp", authController.otp);
router.post("/verifyOtp", authController.verifyOtp);


router.get("/verifyemail", authController.verifyemail);

router.post("/updatePassword", authController.updatePassword);

router.get("/viewprofile", authenticate, authController.viewprofile);
// router.get("/showprofile", authenticate, authController.showprofile);
router.post("/updateprofile", authenticate, upload.single('Image'), authController.updateprofile);

router.get("/resetPassword", authenticate, authController.resetPassword);
router.post("/resetPass", authenticate, authController.resetPass);








module.exports = router;