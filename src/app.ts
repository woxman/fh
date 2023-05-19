import express, { Express } from 'express'
import dotenv from "dotenv"
// Defining environment variables and connecting to db
dotenv.config()
require("./db")
import winston from 'winston'
import expressWinston from 'express-winston'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import path from 'path'

import mainRouter from './routes'
import config from "./utils/config"

const server: Express = express()

server.use(express.json({limit: '50mb'}))
server.use(express.urlencoded({ extended: true, limit: '10mb' }))
server.use(cors())

// Logging requests
server.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  ),
  meta: true, 
  msg: "HTTP {{req.method}} {{res.statusCode}} {{req.url}}",
  expressFormat: false,
  colorize: true, 
  // ignoreRoute: function (req, res) { return false } // optional: allows to skip some log messages based on request and/or response
}))

// Configuring swagger ui and swagger jsdoc
const swaggerJsdocOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'hadad node api',
      version: '1.0.0',
    },
  },
  apis: [ 
    path.join(__dirname, 'controllers', '*', 'index.js'),
    path.join(__dirname, 'controllers', '*', '*', 'index.js') 
  ]
}

const swaggerSpecification = swaggerJsdoc(swaggerJsdocOptions)
const swaggerUiOptions = { 
  explorer: true,
  swaggerOptions: {
    docExpansion: 'none'
  }
}
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecification, swaggerUiOptions))

server.use(mainRouter)

server.get('/', (req, res) => {
  res.status(200).send()
})

// Logging errors
server.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
}))

const port: number = (config.port || 3000) as number

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})