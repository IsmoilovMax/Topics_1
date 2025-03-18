import express from 'express'
const routerAdmin = express.Router()

routerAdmin.get('/', (req, res) => {
	res.send('Admin Page')
})

export default routerAdmin
