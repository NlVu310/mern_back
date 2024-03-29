const express = require("express"); //framework
const dotenv = require('dotenv'); //tải biến môi trường từ .env
const mongoose = require("mongoose"); //db
const routes = require('./routes')
const cors = require("cors"); //giúp bảo mật web 
const bodyParser = require('body-parser') //để nhận req từ client
const cookieParser = require('cookie-parser') //xử lí cookies trong express

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(bodyParser.json())
app.use(cookieParser())

routes(app);

mongoose.connect(`${process.env.MONGO_DB}`)
    .then(() => {
        console.log('Connect Db success!')
    })
    .catch((err) => {
        console.log(err)
    })

// console.log(`${process.env.CLIENT_ID}`)
app.listen(port, () => {
    console.log('Server is running in port: ', + port)
})