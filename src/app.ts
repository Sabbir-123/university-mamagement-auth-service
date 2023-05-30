import express, { Application, Request } from 'express'
const app:Application = express()
const port = 3000
import cors from "cors"

app.use(cors())
//parser
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//testing
app.get('/', (req:Request, res) => {
  res.send('Hello World!')
})

export default app