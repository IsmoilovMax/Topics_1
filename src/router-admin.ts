import express from 'express'
import { adminController } from './controllers/adminController'

const routerAdmin = express.Router()

routerAdmin.get('/', adminController.goHome)
routerAdmin
    .get('/signup', adminController.getSignup)
    .post('/signup', adminController.processSignup)

routerAdmin.get('/login', adminController.getLogin)

export default routerAdmin
