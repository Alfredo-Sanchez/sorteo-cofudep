const express = require('express')
const app = express()
const path = require('path')

//middlewares
app.use(express.json()) //es para que pueda interpretar datos enviados desde el cliente en el request.body
app.use(express.urlencoded({extended: true})) // es para que pueda recibir datos desde un formularios desde un cliente

//routes
app.use(require('./routes/index.routers'))
app.use(require('./routes/winners.routers'))
app.use(require('./routes/uploadfile.routers'))
app.use(require('./routes/exportExcel.routers'))

// static files
app.use(express.static(path.join(__dirname, '../public')))

// defaul page for anywhere address
app.use((req, res)=>{
    res.status(404)
    res.sendFile(path.join(__dirname, '../public/404.html'))
})

app.listen(4000);
console.log('Server on port 4000')

// se ejecuta con el comando " npm run dev"