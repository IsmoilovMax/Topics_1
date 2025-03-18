import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import app from './app'


const { PORT, MONGO_URL } = process.env


mongoose
	.connect(MONGO_URL as string, {})
	.then(data => {
		console.log('MongoDB Connected')
		app.listen(PORT, () => {
			console.info(`Server is running on http://localhost:${PORT}`)
		})
	})
	.catch(err => console.log(`Error on connection MongoDb`, err))
