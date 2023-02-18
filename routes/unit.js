const express = require('express')
const {
    getUnits,
    getUnit,
    deleteUnit,
    updateUnit,
      newUnit,
} = require('../controllers/unitController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

//GET a single workout
router.get('/:id', getUnit)

// Get all classes
router.get('/', getUnits)

router.post('/new-unit', newUnit)

// DELETE a workout
router.delete('/:id', deleteUnit)

// UPDATE a workout
router.patch('/:id', updateUnit)


module.exports = router