const express = require('express');

const examController = require('../controllers/examController');

const router = express.Router();

router
  .route('/')
  .get(examController.getAllExams)
  .post(examController.createExam);
router
  .route('/:id')
  .get(examController.getExam)
  .patch(examController.updateExam)
  .delete(examController.deleteExam);

module.exports = router;
