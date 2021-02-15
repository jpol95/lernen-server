
const config = require('../config')
const xss = require("xss");

const AuthService = {
  insertQuiz(db, quiz) {
    return db('quizzes')
      .insert(quiz)
      .returning('*')
      .then(rows => rows[0])
      .then(quiz => this.serializeQuiz(quiz))
  },
  updateQuiz(db, quiz, id) {
    return db('quizzes')
      .where({id})
      .update(quiz)
      .returning('*')
      .then(rows => rows[0])
      .then(quiz => this.serializeQuiz(quiz))
  },


  serializeQuiz(quiz) {
    return {
      ...quiz, title: xss(quiz.title), setup: xss(quiz.setup)
    }
  },
}

module.exports = AuthService
