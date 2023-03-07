const express = require('express')
const {
    getBlogs,
    getBlog,
    newBlog
} = require('../controllers/blogController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)


//GET a single workout
router.get('/:id', getBlog)

// Get all classes
router.get('/', getBlogs)

router.post('/add-new-blog', newBlog)


module.exports = router