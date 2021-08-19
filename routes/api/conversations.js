const router = require("express").Router();
const Conversation = require("../../models/Conversation");

//New conversation

router.post("/new-conversation", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    const conversations = await Conversation.find({
      members: { $in: [req.body.senderId] },
    });
    const responseConversations = {savedConversation: savedConversation, conversations: conversations}
    res.status(200).json(responseConversations);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Get conversation of a user

router.get("/get-conversations", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.query.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get conversation includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;