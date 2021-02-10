const Exam = require('../models/examModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');

exports.getAllExams = catchAsync(async (req, res, next) => {
  //EXECUTE QUERY
  const features = new APIFeatures(Exam.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const exams = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    result: exams.length,
    data: {
      exams,
    },
  });
});

// getting just single exam using id
exports.getExam = catchAsync(async (req, res, next) => {
  //exam.findOne({ _id: req.param.id});
  const exam = await Exam.findById(req.params.id);
//   console.log(req.params);

  if (!exam) {
    return next(new AppError('Exam not Found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      exam,
    },
  });
});

// creating a new exam
exports.createExam = catchAsync(async (req, res, next) => {
  const newExam = await Exam.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      exam: newExam,
    },
  });
});

exports.updateExam = catchAsync(async (req, res, next) => {
  const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!exam) {
    return next(new AppError('Exam not Found', 404));
  }
  res.status(201).json({
    status: 'success',
    data: {
      exam,
    },
  });
});

exports.deleteExam = catchAsync(async (req, res, next) => {
  const exam = await Exam.findByIdAndDelete(req.params.id);

  if (!exam) {
    return next(new AppError('Exam not Found', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
