const express = require('express')
const morgan = require('morgan')




const app = express()
app.use(morgan('dev'))



app.get('/', (req,res) => {
    res.send("First API Create ")
})


const PORT = process.env.PORT || 8080
app.listen(PORT, ()=>{
    console.log(`Server is Running On PORT : ${PORT}`)
    console.log(`localhost: ${PORT}`)
})