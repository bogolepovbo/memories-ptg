import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import postsRoutes from './routes/posts.js'

const app = express()
dotenv.config()


app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors())

app.use('/posts', postsRoutes)
// Маршрут по умолчанию для проверки размещения.
app.get('/', (req, res) => {
    res.send('Hello from Memories API.')
})

// Строка для облака VK: "mongodb://<USERNAME>:<PASSWORD>@10.0.0.8/<DATABASE>"
// Пользователь: MongoDB-6128.user
// Пароль: G6N7+TT0so31V6c1
// Внешний IP: 89.208.210.128
// Имя БД: MongoDB-6128
// const username = encodeURIComponent('MongoDB-6128.user')
// const password = encodeURIComponent('TG6N7+TT0so31V6c1')
// const db = encodeURIComponent('MongoDB-6128')
// console.log('Login:', username)
// console.log('Password:', password)
// const CONNECTION_URL = `mongodb://${username}:${password}@89.208.210.128/${db}`
// console.log('URL:',CONNECTION_URL)
// В логе ошибка авторизации. Возможно из за + в пароле.Попробовать взять из другого урока пример тогоЮ как строка кодируется в URI.
// Authentication failed во всех случаях.
// const CONNECTION_URL = 'mongodb+srv://jsmaster:jsmaster12345@testcluster.vuhhe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(error.message))
