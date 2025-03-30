import ENV from './env.js'
import express from 'express'
import connectMongoDB from './dbMongo.js'
import candidatureRouter from '../controllers/helper/node_modules/candidature.router.js'

const app = express()


connectMongoDB(ENV.URI_MONGO_LOCAL, ENV.DB_NAME);

app.use(express.json())

app.use('/api/candidatures', candidatureRouter);


export default app;