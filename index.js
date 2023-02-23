require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const classRoutes = require('./routes/class')
const chapterRoutes = require('./routes/chapter')
const unitRoutes = require('./routes/unit')
const questionRoutes = require('./routes/question')
const cors = require('cors');





// express app
const app = express()

// middleware
app.use(express.json())


app.use(cors({
    origin: 'https://feb23.onrender.com', // use your actual domain name (or localhost), using * is not recommended
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true
}))


app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)
app.use('/api/class', classRoutes)
app.use('/api/chapter', chapterRoutes)
app.use('/api/unit', unitRoutes)
app.use('/api/question', questionRoutes)

const port = process.env.PORT || 5000;


// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(port, () => {
      console.log('connected to db & listening on port', port)
    })
  })
  .catch((error) => {
    console.log(error)
  })
