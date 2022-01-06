const mongoose = require('mongoose');

const Testimonial = new mongoose.Schema({


    T_Name: {
        type: String
    },
    designation: {
        type: String
    },
    T_Desc: {
        type: String
    },
    T_Image: {
        type: String
    }

});

const TestimonialModel = mongoose.model('Testimonial', Testimonial);

module.exports = TestimonialModel;