const Student = require('../models/studentModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');

exports.getAllStudents = catchAsync(async (req, res, next) => {
  //EXECUTE QUERY
  const features = new APIFeatures(Student.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const students = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    result: students.length,
    data: {
      students,
    },
  });
});

// getting just single student using id
exports.getStudent = catchAsync(async (req, res, next) => {
  //student.findOne({ _id: req.param.id});
  const student = await Student.findById(req.params.id);
//   console.log(req.params);

  if (!student) {
    return next(new AppError('Student not Found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      student,
    },
  });
});

// creating a new student
exports.createStudent = catchAsync(async (req, res, next) => {
  const newStudent = await Student.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      student: newStudent,
    },
  });
});

exports.updateStudent = catchAsync(async (req, res, next) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!student) {
    return next(new AppError('Student not Found', 404));
  }
  res.status(201).json({
    status: 'success',
    data: {
      student,
    },
  });
});

exports.deleteStudent = catchAsync(async (req, res, next) => {
  const student = await Student.findByIdAndDelete(req.params.id);

  if (!student) {
    return next(new AppError('Student not Found', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
