const createError = require('http-errors');
const dev = require('../config');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken')

const isLoggedIn = (req, res, next) => {
    try {
        // cookies here
        const cookies = req.headers.cookie
        if(!cookies) {
            return res.status(404).send({
                message: 'No cookie found',
            })
        }

        const token = cookies.split('=')[1];

        // verify token
        if (!token){
            return res.status(404).send({
                message: 'No token found',
            })
        }

        const decoded = jwt.verify(token, String(dev.app.jwtAuthorizationSecretKey));
        if (!decoded) throw createError(403, 'Invalid Token');
        req._id = decoded._id;
        next();
    } catch (error) {
        next(error)
    }
}

const isLoggedOut = (req, res, next) => {
    try {
        if(req.headers.cookie) {
            throw createError(
                401,
                'Not accessible request, you need to be logged in'
            )
        }
        next()
    } catch (error) {
        next(error)
    }
}

const isAdmin = async (req, res, next ) => {
    try {
        const id = req._id;
        if(id) {
            const user = await User.findById(id);
            if(!user) throw createError(404, 'No user found with this id');

            // check if user is admin
            if (!user.is_admin) throw createError(401, 'User is not an admin');

            next();
        } else {
            throw createError(400, 'Please login')
        }
    } catch (error) {
        next(error)
    }
}
module.exports = { isLoggedIn, isLoggedOut, isAdmin}