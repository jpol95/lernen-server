const express = require('express')
const QuestionService = require('./quiz-service')
const { requireAuth } = require('../middleware/jwt-auth')

const questionRouter = express.Router()
const jsonBodyParser = express.json()

questionRouter
  .route('/')
  .post(jsonBodyParser,  requireAuth, async (req, res, next) => {
    const {quiz_id, title, answers, correct_answers, value} = req.body;
    const question = {quiz_id, title, answers, correct_answers, value}
    if (!quiz_id || !title || !answers || correct_answers) return res.status(400).json({error: "Required field is missing"})
    QuestionService.insertQuiz(req.app.get('db'), question).then(question => {
        return res.status(201).json(question)
    })
  })

  questionRouter
  .route('/:id')
  .patch(jsonBodyParser, requireAuth, (req, res) => {
    const {id} = req.params;
    const {quiz_id, title, answers, correct_answers, value} = req.body;
    const updatedQuestion = {quiz_id, title, answers, correct_answers, value};
    if (!quiz_id && !title && !answers && !correct_answers && !value) return res.status(400).json({error: "Please provide a field to update"})
    QuestionService.updateQuestion(req.app.get('db'), updatedQuestion, id).then(quiz => {
        return res.status(200).json(quiz)
    })
  })

module.exports = questionRouter
