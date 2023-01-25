const express = require('express')
const {
    getClasses,
    getClass,
    deleteClass,
    updateClass,
  newClass
} = require('../controllers/classController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

//GET a single workout
router.get('/:id', getClass)

// Get all classes
router.post('/classes', getClasses)

router.post('/new-class', newClass)

// DELETE a workout
router.delete('/:id', deleteClass)

// UPDATE a workout
router.patch('/:id', updateClass)


module.exports = router