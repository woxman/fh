import mongoose, { ConnectOptions } from 'mongoose'
mongoose.Promise = global.Promise
import config from '../utils/config'

mongoose.connect(config.dbUrl)

const db = mongoose.connection

db.on('error', error => {
	console.log(`There was an error connecting to the database: ${error}`)
})

db.once('open', () => {
	console.log(`You have successfully connected to your mongo database: ${config.dbUrl}`)
})

// When the connection is disconnected
db.on('disconnected', function () {  
	console.log('Mongoose default connection disconnected')
})
  
// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
	mongoose.connection.close(function () { 
	  console.log('Mongoose default connection disconnected through app termination') 
	  process.exit(0) 
	}) 
})

export default db