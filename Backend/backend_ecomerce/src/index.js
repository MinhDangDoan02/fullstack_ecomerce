const express = require('express')
const app = express()
const cors = require('cors');
const router = require('./Router/api')
const path = require('path')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/public", express.static(path.join(__dirname, "../public")))

app.use('/api', router)


app.listen(5000 , () => {
    console.log('server is running on port 5000')
})