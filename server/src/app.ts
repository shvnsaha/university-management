import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFound from './app/middlewares/notFound'
import router from './app/routes'

const app: Application = express()

//parsers
app.use(express.json())
app.use(cors())

// application routes
app.use('/api/v1', router)

const getAController = (req: Request, res: Response) => {
  const a = 10
  res.send(a)
}

app.get('/', getAController)
app.use(globalErrorHandler)
app.use(notFound)
export default app
