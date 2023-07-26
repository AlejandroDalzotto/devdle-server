import dotenv from 'dotenv'
import AppServer from './models/server'

dotenv.config()

const server = new AppServer()

server.listen()
