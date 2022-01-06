const logger = require('../logger/logger');
const TestimonialModel = require('../models/testimonial');
const { testimonialValidate } = require('../validation/testimonialValidation');


exports.testimonial = async(req, res) => {
    res.render('testimonial', {
        values: req.body,
    })
};

exports.viewTestimonial = async(req, res) => {
    try {
        const user = await TestimonialModel.find();

        if (user) {
            res.render('testimonial', {
                values: user
            });
        }
    } catch (err) {
        logger.error("err", err);
    }
};



exports.showTestimonial = async(req, res) => {
    res.render('addTestimonial', {
        values: req.body,
    })
};



exports.addTestimonial = async(req, res) => {

    try {

        let { error } = testimonialValidate(req.body);
        if (error) {

            if (error.details[0].context.key == 'T_Name') {
                var err1 = error.details[0].message;
                return res.render('addTestimonial', {
                    error1: err1,
                    values: req.body,

                });
            }
            if (error.details[0].context.key == 'designation') {
                var err1 = error.details[0].message;
                return res.render('addTestimonial', {
                    error2: err1,
                    values: req.body,

                });
            }
            if (error.details[0].context.key == 'T_Desc') {
                var err1 = error.details[0].message;
                return res.render('addTestimonial', {
                    error3: err1,
                    values: req.body,

                });
            }

        }



        const user = {
            T_Name: req.body.T_Name,
            designation: req.body.designation,
            T_Desc: req.body.T_Desc,
            T_Image: req.file.filename,

        }
        const userData = await new TestimonialModel(user)
        await userData.save().then(
            data => {
                res.redirect('/testimonial');
            });


    } catch (err) {
        logger.error("err", err)

    }
};





exports.showEditTestimonial = async(req, res) => {
    try {
        const user = await TestimonialModel.findById({ _id: req.params.id });

        if (user) {
            res.render('editTestimonial', {
                values: user
            });
        }
    } catch (err) {
        logger.error("err", err);
    }
};



exports.updateTestimonial = async(req, res) => {

    try {
        let { error } = testimonialValidate(req.body);
        if (error) {
            if (error.details[0].context.key == 'T_Name') {
                var err1 = error.details[0].message;
                res.render('editTestimonial', {
                    error1: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'designation') {
                var err1 = error.details[0].message;
                res.render('editTestimonial', {
                    error2: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'T_Desc') {
                var err1 = error.details[0].message;
                res.render('editTestimonial', {
                    error3: err1,
                    values: req.body
                });
            }

        } else {
            const userData = await TestimonialModel.findByIdAndUpdate(req.params.id, {
                T_Name: req.body.T_Name,
                designation: req.body.designation,
                T_Desc: req.body.T_Desc,
                T_Image: req.file.filename,
            });
            if (userData) {
                res.redirect('/testimonial');
            }
        }
    } catch (err) {
        logger.error("err", err);
    }
};



exports.deleteTestimonial = async(req, res) => {
    try {

        const user = await TestimonialModel.findById({ _id: req.params.id });
        await TestimonialModel.deleteOne(user);
        await res.redirect('/testimonial');

    } catch (err) {
        logger.error("err", err);
    }
}

exports.multiDeleteTestimonial = (req, res) => {
    try {
        console.log(req.query);
        var id = req.query;
        var count = Object.keys(id).length;
        for (let i = 0; i < count; i++) {
            TestimonialModel.findByIdAndDelete(Object.keys(id)[i], function(err) {
                if (err)
                    logger.error("err", err);
            });

        }
        res.redirect('/testimonial');

    } catch (err) {
        logger.error("err", err);
    }
}