const express = require("express")
const router = express.Router()
const multer = require('multer');
const upload = multer({dest: "uploads/"});
const Profile = require("../models/Profile")
const config = require("config")
const authMiddle = require("../middleware/authMiddle")
let AWS = require('aws-sdk')




// @route     GET api/profile/:user_id
// @desc      retrieve profile by user_id
// @access    private
router.get('/:user_id', authMiddle, async (req, res) => {

  try {

    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', [ 'name', 'avatar'])

    if (!profile) {
      console.log('no profile')
      return res.status(400).json({
        msg: 'No profile found for this user'
      })
    }


    console.log(profile)

    res.json(profile)

  } catch (err) {

    console.error(err.message)

    if(err.kind==='ObjectId') {
      return res.status(400).json({ msg: 'No profile found for this user' })
    }

    res.status(500).send('server error')
  }

})

// @route     GET api/profile
// @desc      retrieve profile with token (logged in user)
// @access    private
router.get('/', authMiddle, async (req, res) => {

  try {
    console.log(req.user)

    const profile = await Profile.findOne({ user: req.user }).populate('user', [ 'name', 'avatar'])

    if (!profile) {
      return res.status(400).json({
        msg: 'No profile found for this user'
      })
    }

    console.log(profile)
    res.json(profile)

  } catch (err) {

    console.error(err.message)

    res.status(500).send('server error')
  }

})

// @route     POST api/profile
// @desc      create/update profile
// @access    private
router.post('/', authMiddle, async (req, res) => {

  console.log(req.body)

  const dbUser = await (await User.findById(req.user).select('-password'));

  const {
    avatar,
    location,
    bio,
    genres,
    status,
    projects, // @TODO - deal with projects being passed/created by user on profile
    spotify,
    soundcloud,
    youtube,
    facebook,
    instagram,
    twitter,
    user
  } = req.body;

  const profileObject = {
    user: req.user
  }

  if (avatar) profileObject.avatar = avatar
  if (location) profileObject.location = location
  if (bio) profileObject.bio = bio
  if (status) profileObject.status = status
  if (genres) {
    profileObject.genres = typeof genres === 'string' ? genres.split(',').map(genre => genre.trim()) : genres
  }

  // @@TODO - deal with projects being passed/created by user on profile

  // profileObject.social = {}
  if (spotify) profileObject.spotify = spotify
  if (soundcloud) profileObject.soundcloud = soundcloud
  if (youtube) profileObject.youtube = youtube
  if (facebook) profileObject.facebook = facebook
  if (instagram) profileObject.instagram = instagram
  if (twitter) profileObject.twitter = twitter

  
  try {
    
    let profile = await Profile.findOne({ user: req.user })

    const resObject = {
      ...profileObject,
      user:{
        name:dbUser.name,
        avatar:dbUser.avatar
      }
    }
    
    console.log(profile)
    if(profile){
      //update
      profile = await Profile.findOneAndUpdate({ user: req.user }, { $set: profileObject }, { new: true })

      return res.json(resObject)
    }

    profile = new Profile(profileObject)

    await profile.save()

    res.json(resObject)

  } catch (err) {

    console.error(err.message)

    res.status(500).send('server error')

  }


})



router.post('/update_user', authMiddle, async (req, res) => {


  // const update = _.assign({ "iAm": 'baloo' });

  
  
  try {

    const user = await User.findById(req.user)

    user.name='Baboo Clydesdale'

    await user.save() 

    if(user){
      res.json({user})
    }
    
  } catch (error) {
   
    console.error(error.message)

    res.status(500).send('server error')

  }
})


router.post('/upload_image', [authMiddle, upload.single("image")],async (req,res) => {

    const s3Client = new AWS.S3({
      accessKeyId:config.get("AWSAccessKeyId"),
      secretAccessKey:config.get("AWSSecretKey"),
      region:"eu-west-1"
    });

    const uploadParams = {
      Bucket: "soundscapeuseravatars",
      Key: req.file.originalname,
      Body: req.file.buffer
    };


    s3Client.upload(uploadParams, async (err, data) => {
        if (err) {
          
          return res.status(500).json({error:"Error -> " + err});

        } else {

          const user = await User.findById(req.user)

          user.avatar=data.Location

          await user.save() 

          res.json({
            URL:data.Location,
            user: user
          });
        }
    });
});

module.exports = router;




// {
//   "Version":"2012-10-17",
//   "Statement":[
//     {
//       "Sid":"PublicRead",
//       "Effect":"Allow",
//       "Principal": "*",
//       "Action":["s3:GetObject","s3:GetObjectVersion"],
//       "Resource":["arn:aws:s3:::DOC-EXAMPLE-BUCKET/*"]
//     }
//   ]
// }


// {
//   "Version": "2008-10-17",
//   "Statement": [
//       {
//           "Sid": "AddPerm",
//           "Effect": "Allow",
//           "Principal": {
//               "AWS": "*"
//           },
//           "Action": "s3:GetObject",
//           "Resource": "arn:aws:s3:::soundscapeuseravatars/*"
//       }
//   ]
// }