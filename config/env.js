import dotenv from 'dotenv'

dotenv.config()

const ENV = {
  PORT: process.env.PORT,
  DB_NAME: process.env.DB_NAME,
  URI_MONGO: process.env.URI_MONGO,
  URI_MONGO_LOCAL: process.env.URI_MONGO_LOCAL
}

export default ENV;

