const formidable = require('express-formidable')
const userRouter = require('express').Router(); 


const {isLoggedIn, isLoggedOut} = require('../middlewares/auth');
const upload = require('../middlewares/upload');


userRouter.post('/register', upload.single('image'), registerUser)
// userRouter.post('/verify-email', verifyEmail)
// userRouter.post('/login', isLoggedOut, loginUser)
// userRouter.get('/logout', isLoggedIn, logoutUser)
// userRouter.get('/', isLoggedIn, userProfile)
// userRouter.delete('/', isLoggedIn, deleteUser)
// userRouter.put('/', isLoggedIn, formidable(), updateUser);
// userRouter.post('/forget-password', isLoggedOut, forgetPassword);
// userRouter.post('/reset-password', isLoggedOut, resetPassword);

module.exports = userRouter