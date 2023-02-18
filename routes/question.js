const express = require('express')
const {
    getQuestions,
    getQuestion,
    deleteQuestion,
    updateQuestion,
    newQuestion,
} = require('../controllers/questionController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)


//GET a single workout
router.get('/:id', getQuestion)

// Get all classes
router.get('/', getQuestions)

router.post('/new-question', newQuestion)

// DELETE a workout
router.delete('/:id', deleteQuestion)

// UPDATE a workout
router.patch('/:id', updateQuestion)

module.exports = router