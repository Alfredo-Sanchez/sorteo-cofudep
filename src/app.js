const express = require('express')
const app = express()
const path = require('path')

app.use(express.urlencoded({extended: false}))

//routes
app.use(require('./routes/index.routers'))

//views
app.set('views', path.join(__dirname, '../public/views'))

// static files
app.use(express.static(path.join(__dirname, '../public')))

// defaul page for anywhere address
app.use((req, res)=>{
    res.sendFile(path.join(__dirname, '../public/404.html'))
})

app.listen(3000);
console.log('Server on port 3000')