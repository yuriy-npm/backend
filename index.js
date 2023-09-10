require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const path = require('path')
const router = require('./routes/index')
const filePathMiddleware = require('./services/cloudinary')

// const PORT = 5432
const PORT = process.env.PORT || 5000

const app = express()
// app.use(filePathMiddleware(path.resolve(__dirname, 'static')))
app.use(cors())
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router) 


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (error) {
        console.log(error);
    }
}

start ()
