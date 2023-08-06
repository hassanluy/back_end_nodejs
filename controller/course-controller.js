const { Course } = require('../model/course');

// Get all courses
const getAllCoursesController = async (req, res) => {
  try {
    const courses = await Course.find({});
    return res.json(courses);
  } catch (err) {
    return res.status(404).json({ msg: err });
  }
};

// Get one course
const getOneCourseController = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const course = await Course.findById(courseId);
    if (course) {
      return res.json(course);
    }
    return res.json({ msg: 'There is no data here' });
  } catch (error) {
    return res.json({ msg: error });
  }
};

// Delete one course
const deleteOneCourseController = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.json({ msg: 'There is no course with this ID' });
    }

    await Course.findByIdAndDelete(courseId);

    return res.json({ msg: 'Course deleted successfully' });
  } catch (error) {
    return res.json({ error });
  }
};

// Update one course
const updateOneCourseController = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const updatedCourse = await Course.findByIdAndUpdate(courseId, req.body);
    return res.json({ updatedCourse });
  } catch (error) {
    return res.json({msg:`their is an error with the updating course and this is the course error ${error}`});
  }
};

// Create one course
const postOneCourseController = async (req, res) => {
  const {
    courseTitle,
    courseImg,
    coursePrice,
    isCourseFree,
    courseDescription,
    courseTeacher,
    additionInformation,
    masterSpecialty,
  } = req.body;

  try {
    const newCourse = await Course.create({
      courseTitle,
      courseImg,
      coursePrice,
      isCourseFree,
      courseDescription,
      courseTeacher,
      additionInformation,
      masterSpecialty
    });

    return res.json({ message: 'New course added successfully', course: newCourse });
  } catch (error) {
    return res.json({ msg: `Error occurred while adding course: ${error}` });
  }
};

module.exports = {
  postOneCourseController,
  updateOneCourseController,
  deleteOneCourseController,
  getOneCourseController,
  getAllCoursesController
};
