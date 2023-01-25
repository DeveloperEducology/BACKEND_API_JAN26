const express = require('express')
const {
    getChapters,
    getChapter,
    deleteChapter,
    updateChapter,
      newChapter,
} = require('../controllers/chapterController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)


//GET a single workout
router.get('/:id', getChapter)

// Get all classes
router.post('/chapters', getChapters)

router.post('/new-chapter', newChapter)

// DELETE a workout
router.delete('/:id', deleteChapter)

// UPDATE a workout
router.patch('/:id', updateChapter)

module.exports = router