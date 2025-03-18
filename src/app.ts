import cors from 'cors'
import express from 'express'
import path from 'path'
//routers
import morgan from 'morgan'
import { MORGAN_FORMAT } from './libs/utils/config'
import cookieParser from 'cookie-parser'

import session from 'express-session'
import ConnectMongoDB from 'connect-mongodb-session'
import { T } from './libs/types/common'

const MongoDBStore = ConnectMongoDB(session)
const store = new MongoDBStore({
	uri: process.env.MongoDB_URI as string,
	collection: 'session'
})

/**1-Entrance */
const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static('./uploads'))
app.use(express.urlencoded({ extended: true }))
app.use(
	cors({
		credentials: true,
		origin: true
	})
)

app.use(express.json())
app.use(cookieParser())
app.use(morgan(MORGAN_FORMAT))

/**2-Session */

app.use(
	session({
		secret: process.env.SESSION_SECRET as string,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 7
		},
		store: store,
		resave: true,
		saveUninitialized: true
	})
)

app.use((req, res, next) => {
	const sessionInstance = req.session as T
	const localsInstance = res.locals as T
	localsInstance.user = sessionInstance.user
	next()
})

/**3-Views*/

app.set('views', path.join(__dirname, 'views'))
app.set('view engina', 'ejs')

/**4-Routers*/
// app.use('/admin')
// app.use('/')

export default app
