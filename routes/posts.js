const express = require("express")
const router = express.Router()
const Post = require("../models/Post")
const User = require("../models/User")
const authMiddle = require("../middleware/authMiddle")
const { check, validationResult } = require("express-validator")
const Profile = require("../models/Profile")


// @route     GET api/posts
// @desc      retrieve all posts
// @access    public
router.get('/', async (req, res) => {
    
  try {

    const posts = await Post.find().populate('user', [ 'name', 'avatar' ])

    res.json(posts)
    
  } catch (err) {
    
    console.error(err)

    return res.status(500).send('server error')
  }
  
})


// @route     GET api/posts/:post_id
// @desc      retrieve post by ID
// @access    public
router.get('/:post_id', async (req, res) => {

  try {

    // TWO TECHNIQUES TO AVOID THE SPREAD OPERATOR RETURNING UNNECESSARY MONGOOSE OBJECT PROPERTIES

    // ...OBJECT.TOJSON()
    // const post = await Post.findById(req.params.post_id).populate('user', ['name', 'avatar'])
    // const profile = await Profile.findOne({ user:post.user._id })

    // res.json({
    //   ...post.toJSON(),
    //   status: profile.status

    // })

     // ...AWAIT MONGOOSEOBJECT.LEAN()
    const post = await Post.findById(req.params.post_id).lean().populate('user', [ 'name', 'avatar' ])
    const profile = await Profile.findOne({ user:post.user._id }).lean()

    res.json({
      ...post,
      status: profile.status,
      location: profile.location
    })

    
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


// @route     POST api/posts/:postId
// @desc      Like/unlike post
// @access    private
router.post('/like/:post_id', authMiddle, async (req, res ) => {
  
  try {
    
    const post = await Post.findById(req.params.post_id).populate('user', [ 'name', 'avatar' ])
    const user = await User.findById(req.user)
    const profile = await Profile.findOne({ user:post.user._id })   
  

    if(!post){
      return res.json({
        msg: "Post not found"
      })
    }


    const removeIdx = post.likes.map(like => like.user.toString()).indexOf(req.user)
  
    // like or unlike based on whether the user has already liked
    removeIdx !== -1 ? post.likes.splice(removeIdx, 1) : post.likes.unshift({user: req.user, name: user.name }) 

    console.log(post)
  
    await post.save()
    
    return res.status(200).json({
      ...post.toJSON(),
      status: profile.status,
      location: profile.location

    })

  } catch (err) {

    if(err.kind==='ObjectId') {
      return res.status(400).json({ msg: 'Post not found' })
    }

    // console.log(err)
    res.status(500).send(err)
  }

})


module.exports = router