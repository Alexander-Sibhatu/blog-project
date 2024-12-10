const jwt = require('jsonwebtoken');
const saltRounds = 10;
const bcrypt = require('bcrypt')
const { comparePassword } = require('../helper/bcryptPassword')
const fs = require('fs');
const createError = require('http-errors')
const User = require('../models/userModel');
const { successHandler, errorHandler } = require('./requestHandler');
const dev = require('../config')
const { sendEmailWithNodeMailer } = require('../helper/email')


const registerUser = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        const image = req.file ? req.file : null;

        if(!name || !email || !phone || !password) {
            return errorHandler(res, 400, "name, email, phone, or password is missing")
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: 'minimum length for password is 6'
            })
        }

        if (image && image.size > 1024 * 1024 * 2) {
            return res.status(400).json({
                message: 'maximum size for image is 1Mb'
            })
        }

        const isExist = await User.findOne({email: email})
        if(isExist){
            return res.status(404).json({
                message: 'user with email already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // //store the data temporarily
        const token = jwt.sign({name, email, phone, password: hashedPassword, image: image ? image.path : null }, 
            String(dev.app.jwtActivationSecretKey), 
            {expiresIn: '10m'}
        );


            // prepare the email
            const emailData = {
             email,
             subject: "Account Activation Email",
             html: `
             <h2> Hello ${name}, </h2>
             <p> Please click <a href="${dev.app.clientUrl}/api/users/activate/${token}" target="_blank">here</a> to  activate your account </p>     
             `, // html body
           };
            
            // Attempt to send the email
            await sendEmailWithNodeMailer(emailData);

        // verification email to the user
           return successHandler(
                res, 
                200,    
                `A verification email has been sent to your email: ${email}.`,
                { token: token },
            );
        

    } catch (error) {
        console.log('Eror in registerUser:', error)
        res.status(500).json({
            message: "controller failed"
        })
        // if (error.name === 'validationError')
        // next(createError(422, error.message))
    }
};

const verifyEmail = (req, res) => {
    try {
        // console.log("Request body: ", req.body)
        const token = req.body.token;
        console.log("verify email: ", token)

        if(!token) {
            return res.status(404).json({
                message: "token is missing"
            })
        }

        const decodedToken = jwt.decode(token, { complete: true });
        console.log("Decoded token without verification:", decodedToken);
    
        jwt.verify(token, String(dev.app.jwtActivationSecretKey), async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "Token has expired"
                });
            }

            console.log("Decoded token:", decoded)

            // decoded the data
        const { name, email, phone, password, image  } = decoded;
           

        // create the user

        const newUser = new User({
            name,
            email,
            password,
            phone,
        })

       // Attach the image if available
       if (image && fs.existsSync(image)) {
        try {
            newUser.image.data = fs.readFileSync(image);
            newUser.image.contentType = "image/jpeg"; // Replace with the actual type
        } catch (err) {
            console.error("Error reading image file:", err);
            return res.status(400).json({ message: "Error reading image file" });
        }
    }
        // save the user
        const user = await newUser.save()
        if(!user) {
            res.status(400).json({
                message: 'user was not repeated',
            });
        }
        res.status(201).json({
            user : user,
            message: 'user was created. Ready to sign in.'
        })
          });
          
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({
                message: 'email or password is missing',
            });
        }

        const registeredUser = await User.findOne({email});
        if(!registeredUser){
            return res.status(400).json({
                message: 'Please sign up first!',
            });
        }
        if(registeredUser.is_Banned) {
            return res.status(400).json({message: 'Banned user'})
        }

        const isPasswordMatch = await comparePassword(password, registeredUser.password);
        
        if(!isPasswordMatch){
            throw createError(400, 'email/password does not match')
        }

        if (registeredUser.is_Banned)
            throw createError(204, "you are banned. Please contact the authority")
        

        const token = jwt.sign(
            {_id: registeredUser._id},
            String(dev.app.jwtAuthorizationSecretKey || "gxJ3TlObUC6oHsdhZ8xnOgv4vMWySzDw9Hn8Ipqm"),
            {expiresIn:"3m"}
        );
        // reset the cookie
        if(res.cookies && req.cookies[`${registeredUser._id}`]){
            res.cookies[`${registeredUser._id}`] = '';
        }

        // Set a new cookie with the token
        res.cookie(String(registeredUser._id), token, {
            path: '/',
            expires: new Date(Date.now() + 1000 * 60 * 2),
            httpOnly: true,
            // sameSite: 'none',
            // securet: true
        });

        const userData = {
            id: registeredUser._id,
            name: registeredUser.name,
            email: registeredUser.email,
            phone: registeredUser.phone,
            image: registeredUser.image,
        }
        return successHandler(res, 200, "Loged in Successfully", {
            user: userData,
            token,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message, 
        })
    }
}

const logoutUser = (req, res) => {
    try {
        req.session.destroy();
        res.clearCookie('user_session');
        res.status(200).json({
            ok: true,
            message: 'logout successful'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message, 
        })   
    }
}

const userProfile = async (req, res) => {
    try {
        const id = req.params.id; 
        const user = await User.findById(id);
        if(!user) throw createError(404, 'user was not found')
        return successHandler(res, 200, 'user was returned successfully !', {
            user: user,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message, 
        })   
    }
}
const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.session.userId);
        res.status(200).json({
            ok: true,
            message: 'user is deleted successfuly',
        });
    } catch (error) {
        res.status(500).json({
            message: error.message, 
        })   
    }
}

const forgetPassword = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(404).json({
                message: "email or password is missing"
            })
        }

        if (password.length < 6) {
            return res.status(404).json({
                message: 'minimum length for password is 6'
            })
        }

        const user = await User.findOne({email: email});
        if(!user) return res.status(400).json({message: 'user was not found with this email address'});
        
        const hashedPassword = await securePassword(password);
        //store the data
        const token = jwt.sign(
                { email, hashedPassword }, 
                dev.jwtSecretKey,
                {expiresIn: '5m'}
            );

            // prepare the email
            const emailData = {
             email,
             subject: "Account Activation Email",
             html: `
             <h2> Hello ${user.name} . </h2>
             <p> Please click <a href="${dev.clientUrl}/user/reset-password/${token}">here</a> Reset password </p>     
             `, // html body
           };
            
           sendEmailWithNodeMailer(emailData);


        res.status(200).json({
            ok: true,
            message: 'Email has been sent. Please go to you email and reset the password',
            token: token
        });
    } catch (error) {
        res.status(500).json({
            message: error.message, 
        })   
    }
}

const resetPassword = (req, res) => {
    try {
        const {token} = req.body;
        if(!token) {
            return res.status(404).json({
                message: "token is missing"
            })
        }

        jwt.verify(token, dev.jwtSecretKey, async function(err, decoded) {
            if (err) {
                return res.status(401).json({
                    message: "Token is expired"
            
                });
            }

            // decoded the data
            const { email, hashedPassword } = decoded;
            const isExist = await User.findOne({email: email})
        if(!isExist){
            return res.status(404).json({
                message: 'user with email does not exist'
            })
        }

        // update the user
        const updatedUser = await User.updateOne({email: email},
            {
                $set: {
                    password: hashedPassword
                }
            });
            if(!updatedUser) {
                res.status(400).json({
                    message: 'reset password was successful',
                });
            }
        res.status(201).json({
            user : updateUser,
            message: 'password is reset successfuly'
        })
          });
          
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

const updateUser = async (req, res) => {
    try {
        if(!req.fields.password) {

        }
        const hashedPassword = await securePassword(req.fields.password);
        const updatedData = await User.findByIdAndUpdate(req.session.userId,
            { ...req.fields, password: hashedPassword }, 
            { new: true }
        );

        if(!updatedData) {
            res.status(400).json({
                ok: false,
                message: 'user was not updated'
            });
        }

        if(req.files.image) {
            updatedData.image.data = fs.readFileSync(image.path);
            updatedData.image.contentType = image.type;
        }
        await updatedData.save();

        res.status(200).json({
            ok: true,
            message: 'user is updated successfuly',
        });
    } catch (error) {
        res.status(500).json({
            message: error.message, 
        })   
    }
}


module.exports = { 
    registerUser, 
    verifyEmail,
    loginUser,
};