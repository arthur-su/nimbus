const express = require('express') 
// import Request and Response types from express library
import { Request, Response } from 'express'
import userController from '../controllers/userController'
import credentialsController from '../controllers/aws/credentialsController'
// Give our express app the ability define routes, handle requests, and configure the router by creating an instance of an Express Router
const router = express.Router()

// handle post requests sent to /login endpoint from the client 
router.post('/login', userController.verifyUser, (req: Request, res: Response) => {
    // Redirect to the dashboard here? What do we want to send to the front end
    // if (res.locals.email === false) res.redirect('/signup');
    // what should happen here on successful log in?
    // else res.redirect('/dashboard');
    return res.status(200).send({
        email: res.locals.email, 
        success: true,
        token: res.locals.token
    });
})

// userController.assignJWT, 
// Handle post request sent to /signup endpoint
router.post('/register', credentialsController.getCredentials, userController.createUser, (req: Request, res: Response) => {
    // Redirect to the dashboard here? What do we want to send to the front end
    return res.status(200).json(res.locals.user)
})

module.exports = router