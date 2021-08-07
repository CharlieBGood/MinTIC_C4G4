const express = require("express"); 
const router = express.Router(); 
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken"); 
const keys = require("../../config/keys"); 
const multer = require('multer')

// Load input validation 
const validateRegisterInput = require("../../validation/register"); 
const validateLoginInput = require("../../validation/login"); 

// Load User model 
const User = require("../../models/User");

// @route POST api/users/register 
// @desc Register user 
// @access Public 
router.post("/register", (req, res) => { 
    // Form validation 
    const { errors, isValid } = validateRegisterInput(req.body); 
    // Check validation 
    if (!isValid) { 
        return res.status(400).json(errors); 
    } 
    User.findOne({ email: req.body.email }).then(user => { 
        if (user) { 
            return res.status(400).json({ email: "User registered with that email already exists" }); 
        } 
        else { 
            const newUser = new User({ 
            nickname: req.body.nickname, 
            email: req.body.email, 
            password: req.body.password 
            }); 
            // Hash password before saving in database 
            bcrypt.genSalt(10, (err, salt) => { 
                bcrypt.hash(newUser.password, salt, (err, hash) => { 
                    if (err) throw err; 
                    newUser.password = hash; 
                    newUser 
                    .save() 
                    .then(user => res.json(user)) 
                    .catch(err => console.log(err)); 
                }); 
            }); 
        } 
    }); 
});

// @route POST api/users/login 
// @desc Login user and return JWT token 
// @access Public 
router.post("/login", (req, res) => { 
    // Form validation 
    const { errors, isValid } = validateLoginInput(req.body); 
    // Check validation 
    if (!isValid) { 
        return res.status(400).json(errors); 
    } 
    const email = req.body.email; 
    const password = req.body.password; 
    // Find user by email 
    User.findOne({ email }).then(user => { 
        // Check if user exists 
        if (!user) { 
            return res.status(404).json({ emailnotfound: "User does not exists" }); 
        } 
        // Check password 
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) { 
                // User matched 
                // Create JWT Payload 
                const payload = { 
                    id: user.id, 
                    nickname: user.nickname,
                    contacts : user.contacts
                }; 
                // Sign token 
                jwt.sign( 
                    payload, 
                    keys.secretOrKey, 
                    { 
                        expiresIn: 3600 // 1 hour in seconds 
                    }, 
                    (err, token) => { 
                        res.json({ 
                            success: true, 
                            token: "Bearer " + token 
                        }); 
                    }  
                ); 
            } 
            else { 
                return res 
                    .status(400) 
                    .json({ passwordincorrect: "Incorrect password" }); 
            } 
        }); 
    }); 
}); 

// @route POST api/users/upload_image 
// @desc Register user 
// @access Public 
router.post("/upload_image", (req, res) => { 
    // Form validation 
    const { errors, isValid } = validateRegisterInput(req.body); 
    // Check validation 
    if (!isValid) { 
        return res.status(400).json(errors); 
    } 
    User.findOne({ email: req.body.email }).then(user => { 
        if (user) { 
             
        } 
        else { 
            return res 
                .status(400) 
                .json({ passwordincorrect: "User does not exists" }); 
        } 
    }); 
});
     
module.exports = router; 