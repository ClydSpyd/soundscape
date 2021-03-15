const express = require("express")
const router = express.Router()
const Post = require("../models/Post")
const User = require("../models/User")
const authMiddle = require("../middleware/authMiddle")
const { check, validationResult } = require("express-validator")


// @route     GET api/posts
// @desc      retrieve all posts
// @access    public
router.get('/', async (req, res) => {
    
  try {

    const posts = await Post.find().sort({ date: -1 })

    res.json(posts)
    
  } catch (err) {
    
    console.error(err)

    return res.status(500).send('server error')
  }
  
})

// @route     POST api/posts
// @desc      create a new post
// @access    private
router.post('/', [authMiddle,[
  check('textPlain', "No comment text received").not().isEmpty(),
  check('textHTML', "No comment text received").not().isEmpty(),
  check('category', "Please provide a category").not().isEmpty(),
  check('title', "Please provide a title").not().isEmpty(),
]], async(req, res) => {

  const errors = validationResult(req);

  if(!errors.isEmpty()){  
    return res.status(400).json({ errors: errors.array().map(({msg, param}) => ({msg, param})) }) 
  }

  try {
  
    const user = await User.findById(req.user).select('-password')
  
    const { textPlain, textHTML, category, title } = req.body
    const { name, avatar } = user
  
    const newPost = new Post({
      user: req.user,
      name,
      avatar,
      textPlain,
      textHTML,
      category,
      title,
      createdO: new Date(),
      likes:[],
      comments:[]
    })
  
    await newPost.save()
  
    res.json({msg:"success!", post: newPost})
    
  } catch (err) {
    
    console.error(err)

    return res.status(500).send('server error')

  }




})

module.exports = router