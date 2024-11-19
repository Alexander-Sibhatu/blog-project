// const formidable = require('express-formidable')
const userRouter = require('express').Router();
const { 
    registerUser,
    verifyEmail
} = require('../controller/userController') 
const uploadUser = require('../middleware/fileUploadUser');


// const {isLoggedIn, isLoggedOut} = require('../middlewares/auth');


userRouter.post('/register', uploadUser.single('image'), registerUser)
userRouter.post('/activate', verifyEmail)
// userRouter.post('/login', isLoggedOut, loginUser)
// userRouter.get('/logout', isLoggedIn, logoutUser)
// userRouter.get('/', isLoggedIn, userProfile)
// userRouter.delete('/', isLoggedIn, deleteUser)
// userRouter.put('/', isLoggedIn, formidable(), updateUser);
// userRouter.post('/forget-password', isLoggedOut, forgetPassword);
// userRouter.post('/reset-password', isLoggedOut, resetPassword);

module.exports = userRouter