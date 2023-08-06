const express = require('express')
const router = express.Router()
const{
   postOneCourseController,
    updateOneCourseController,
    deleteOneCourseController,
    getOneCourseController,
    getAllCoursesController
} = require('../controller/course-controller')
const { canModify } = require('../middleware/roles')
const { authAccounts } = require('../middleware/auth')


//GET ALL
exports.getAllCourses = router.get('/api/course',authAccounts,getAllCoursesController)
//GET ONE
exports.getOneCourse = router.get('/api/course/:courseId',authAccounts,getOneCourseController )
//DELETE ONE
exports.deleteOneCourse = router.delete('/api/course/:courseId',authAccounts,canModify("Admin"),deleteOneCourseController)
//UPDATE ONE
exports.updatedOneCourse = router.patch('/api/course/:courseId',authAccounts,canModify("Admin"),updateOneCourseController )
//POST ONE
exports.postOneCourse = router.post('/api/course/addnewcourse',authAccounts,canModify("Admin"),postOneCourseController)




