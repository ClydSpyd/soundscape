const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator")
const User = require("../models/User")
const gravatar = require("gravatar")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")


// @route     POST api/users
// @desc      register user
// @@access   public
router.post('/', [
  check('name', 'Tell us your name, stranger').not().isEmpty(),
  check('email', 'Please enter a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6})
], async (req, res) => {

  const errors = validationResult(req);

  if(!errors.isEmpty()){
    
    return res.status(400).json({ errors: errors.array().map(({msg, param}) => ({msg, param})) }) 
  }

  const { name, email, password } = req.body

  try {
  
    let user = await User.findOne({ email })

    if(user){
      return res.status(400).json({
        errors:[{ msg: 'User already exists' }]
      })
    }
    
    // const avatar = gravatar.url(email, {
    //   s: '200', //size - default size
    //   r: 'pg', // rating - no rude stuff
    //   d: 'mm' // default - default user icon
    // })

    user = new User({name, email, password}) 

    const salt = await bcrypt.genSalt(10) 
    user.password = await bcrypt.hash(password, salt) 

    await user.save() 

    const jwtPayload = { id: user.id }

    jwt.sign(
      jwtPayload,
      config.get("jwtSecret"),
      { expiresIn:36000 }, // 10 hours
      // { expiresIn:3600 }, // 1 hour
      (err, token) => {
        if(err) throw err;
        res.json({ token })
      }
    )


  } catch (err) {

    console.error(err.message)
    return res.status(500).send('server error')
    
  }
})

module.exports = router