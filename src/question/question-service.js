
const config = require('../config')
const xss = require("xss");
const quizRouter = require('../quiz/quiz-router');

const AuthService = {
  insertQuestion(db, quiz) {
    return db('questions')
      .insert(quiz)
      .returning('*')
      .then(rows => rows[0])
      .then(quiz => this.serializeQuestion(quiz))
  },
  updateQuestion(db, quiz, id) {
    return db('questions')
      .where({id})
      .update(quiz)
      .returning('*')
      .then(rows => rows[0])
      .then(quiz => this.serializeQuestion(quiz))
  },


  serializeQuestion(quiz) {
    return {
      ...quiz, title: xss(quiz.title), setup: xss(quiz.setup), answers: quiz.answers.split(",").map(answer => xss(answer)), 

    }
  },
}

module.exports = AuthService
