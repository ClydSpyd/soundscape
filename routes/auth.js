const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator")
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")
const authMiddle = require('../middleware/authMiddle')


// @route     GET api/auth
// @desc      return user object if authenticated with auth middleware
// @access    public
router.get('/', authMiddle, async (req, res) => {
  
  try {

    const user = await (await User.findById(req.user).select('-password'));
    res.json({ user })
    
  } catch (err) {
    
    console.error(err.message)
    res.status(500).send('server error')
    
  }
})



// @route     POST api/auth
// @desc      authenticate user & get token (login)
// @access    public
router.post('/', [
  check('email', 'Please enter a valid email').isEmail(),
  check('password', 'Please enter password').not().isEmpty()
], async (req,res) =>{ 


    const errors = validationResult(req);

    if(!errors.isEmpty()){
      // trimming response to just param and msg
      return res.status(400).json({ errors: errors.array().map(({msg, param}) => ({msg, param})) }) 
    }

    const { email, password } = req.body
    

    try {

    let user = await User.findOne({ email })

    if( !user ){
      return res.status(400).json({
        errors: [{
          msg:'Invalid Credentials'
        }]
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
      return res.status(400).json({
        errors: [{
          msg:'Invalid Credentials'
        }]
      })
    }


    // Return JWT
   
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