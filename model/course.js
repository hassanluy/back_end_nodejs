const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    courseImg: {
        type: String,
        required: true
    },
    courseTitle: {
        type: String,
        required: true
    },
    coursePrice: {
        type: Number
    },
    isCourseFree: {
        type: Boolean
    },
    courseDescription: {
        type: String,
        required: true
    },
    courseTeacher: {
        type: String,
        required: true
    },
    additionInformation: {
        type: String,
        required: true
    },
    masterSpecialty: {
        type: String,
        required: true
    },
    courseVideos: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Video' }
    ],
})

exports.Course = mongoose.model('Course', courseSchema)








