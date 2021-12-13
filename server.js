require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const path = require('path');
const connectDB = require('./DB/connectDB')

const PostRoute = require('./routes/posts.route')
const authRoute = require('./routes/auth.route')

app.use(bodyParser.urlencoded({ extended: false }))
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
// parse application/json

app.use(bodyParser.json())
app.use(express.json())
app.use(cors())
app.use('/uploads/images', express.static(path.join('uploads', 'images')));

//connect DB
connectDB()

//router
app.use('/api/auth', authRoute)
app.use('/api/posts', PostRoute);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Listening on port `, PORT);
})