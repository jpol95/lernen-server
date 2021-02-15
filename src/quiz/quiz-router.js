const express = require('express')
const QuizService = require('./quiz-service')
const { requireAuth } = require('../middleware/jwt-auth')

const quizRouter = express.Router()
const jsonBodyParser = express.json()

quizRouter
  .route('/')
  .post(jsonBodyParser,  requireAuth, async (req, res, next) => {
    const {teacher_id, title, setup, finished} = req.body;
    const quiz = {teacher_id, title, setup, finished}
    for (let key in quiz){
        if (!quiz[key]) delete quiz[key]
    }
    if (!teacherId || !title) return res.status(400).json({error: "Required field is missing"})
    QuizService.insertQuiz(req.app.get('db'), quiz).then(quiz => {
        return res.status(201).json(quiz)
    })
  })

  quizRouter
  .route('/:id')
  .patch(jsonBodyParser, requireAuth, (req, res) => {
    const {id} = req.params
    const {teacherId, title, setup, finished} = req.body;
    const updatedQuiz = {teacherId, title, setup, finished};
    if (!teacherId && !title && !setup && !finished) return res.status(400).json({error: "Please provide a field to update"})
    QuizService.updateQuiz(req.app.get('db'), updatedQuiz, id).then(quiz => {
        return res.status(200).json(quiz)
    })
  })

module.exports = quizRouter
