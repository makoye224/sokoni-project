const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const nodemailer = require('nodemailer')

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
    },
  });

// @desc Register new user
//@route POST/api/users
//@access Public 
const registerUser = asyncHandler(async(req, res) => {
    console.log(`registering`)
    const {name, email, password, businessType, userType, mainProduct, businessRegistration, businessName} = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please add all fields")
    }

    // check if user exists 
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error("User already exists")
    }

    //hash password 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user 

    const user = await User.create({
        name, 
        email,
        businessName,
        businessRegistration,
        businessType,
        mainProduct,
        userType,
        password: hashedPassword
        
    })
    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            businessName: user.businessName,
            businessType: user.businessType,
            userType: user.userType,
            mainProduct: user.mainProduct,
            businessRegistration: user.businessRegistration,
            token: generateToken(user._id) 
        })
    }
    else{
        res.status(400)
        throw new Error("Invalid user data")
    }
    res.json({message: "Register User"})
})



// @desc Authenticate a user
//@route POST/api/users/login
//@access Public 
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    //check for user email
    const user = await User.findOne({email})
   

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            businessName: user.businessName,
            businessType: user.businessType,
            userType: user.userType,
            mainProduct: user.mainProduct,
            businessRegistration: user.businessRegistration,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error("Invalid credentials")
    }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
  })

  // @desc     Change user password
// @route   POST /api/users/me
// @access  Private
const forgotPassword = asyncHandler(async (req, res) => {
    const {email} = req.body
    try{
      // check if user exists 
    const userExists = await User.findOne({email})
    if(!userExists){
        res.status(400)
        throw new Error("User does not exist")
       //return res.send("User does not exist")
    }
    const jwt = require('jsonwebtoken');
    const payload = {
        id: userExists._id,
        email: userExists.email
    };
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secret, { expiresIn: '60m' });
    
    const link = `http://localhost:5200/api/users/forgot-password/${userExists._id}/${token}`;
    
    // send email with reset link
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS, // sender address
        to: userExists.email, // list of receivers
        subject: 'Reset your password', // Subject line
        html: `<p>Hi ${userExists.name},</p><p>You have requested to reset your password. Please click the link below to reset your password:</p><a href="${link}">${link}</a><p>This link will expire in 1 hour.</p>`, // html body
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          throw new Error('Failed to send email');
        }
        console.log('Message sent: %s', info.messageId);
        res.status(200).json(userExists);
      });
    console.log(link)
    res.status(200).json(userExists)
    } catch(error){
        res.status(400)
        throw new Error("invalid input")
    }
   
  })

// @desc    Get user data
// @route   GET /forgot-password/:id/:token
// @access  Public
const getForgotPassword = asyncHandler(async (req, res) => {
    const { id, token } = req.params;
  
    try {
      // check if user exists
      const userExists = await User.findOne({ _id: id });
  
      if (!userExists) {
        console.log(`just checking`)
        return res.status(400).send("User does not exist");
      }
  
      const secret = process.env.JWT_SECRET;
      console.log(`final token ${token}`)
      // verify the token
      const payload = jwt.verify(token, secret);
      const email = payload.email;
  
      // render the HTML page with the email
      res.render("index", {email: email, status: "not verified"})
    } catch (error) {
      res.status(400);
      throw new Error("Not verified");
    }
  });
  

    // @desc    update user password
// @route   POST /api/users/me
// @access  Private
const postForgotPassword = asyncHandler(async (req, res) => {
    
    const {id, token} = req.params
    const {newpassword} = req.body
    console.log(`my new password ${newpassword}`)
       // check if user exists 
       const userExists = await User.findOne({_id: id})
      
       // console.log(userExists.password)
        if(!userExists){
            return res.send("User does not exist")
        }
        const secret = process.env.JWT_SECRET
        try{
            
            const verify = jwt.verify(token, secret)
             //hash password 
             const salt = await bcrypt.genSalt(10)
             const hashedPassword = await bcrypt.hash(newpassword, salt) 
             console.log("check point 10")
             await User.updateOne(
                {
                    _id: id,
                },
                {
                    $set:{
                        password: hashedPassword,
                    },
                }
             )
             res.render("index", {email: verify.email, status: "verified"})
            res.send("Password Updated")
        }catch(error){
            res.status(400)
            throw new Error("Something went wrong")
        }
        
    res.status(200).json(req.params)
    console.log(req.body)
    res.send("done")
  })

//generate user token 
const generateToken = (id) => {
    return  jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "30d", 
    })
}



module.exports = {
     registerUser,
     loginUser,
     getMe,
     forgotPassword,
     getForgotPassword,
     postForgotPassword
}