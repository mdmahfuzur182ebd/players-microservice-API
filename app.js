const express = require('express')
const cors = require('cors')
const morgan = require('morgan')





const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())


app.get('/', (_req,res) => {
    res.send("First API Create ")
  //  res.status(200).json({status: 'OK'})
})


const PORT = process.env.PORT || 8080
app.listen(PORT, ()=>{
    console.log(`Server is Running On PORT : ${PORT}`)
    console.log(`localhost: ${PORT}`)
})