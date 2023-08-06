const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
    videoUrl:{
        type:String,
        required:true
    },
    videoTitle: {
        type: String,
        required: true
    },
    videoDescription: {
        type: String,
        required: true
    },
    videoViews: {
        type: Number,
        required: true
    },
    isVideoFree:{
        type:Boolean,
        required:true
    },
    videoDuration: {
        type: Number,
        requried: true
    },
    videoCourse: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Course'
    }
})
exports.Video = mongoose.model('Video', videoSchema)