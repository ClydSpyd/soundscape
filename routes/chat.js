const express = require("express")
const authMiddle = require("../middleware/authMiddle")
const router = express.Router()
const Conversation = require("../models/Conversation")
const Message = require("../models/Message")


// @route     GET api/chat
// @desc      retrieve chat data by user_id
// @access    private
router.get('/', authMiddle, async (req, res) => {

  try {

    const user = req.user
    let messages = await Message.find({ chatters: user }).populate('chatters', [ 'name', 'avatar' ]).populate('user', [ 'name', 'avatar' ])


  
    res.send(messages)

    
  } catch (err) {

    console.error(err.message)

    res.status(500).json({ msg: 'Server Error' })
    
  }
})

module.exports = router;