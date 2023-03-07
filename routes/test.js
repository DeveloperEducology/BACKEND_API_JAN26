const express = require('express')
const {
    getTests,
    getTest,
    newTest
} = require('../controllers/testController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)


//GET a single workout
router.get('/:id', getTest)

// Get all classes
router.get('/', getTests)

router.post('/new-test', newTest)


module.exports = router