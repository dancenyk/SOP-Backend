const express = require("express");
const router = express.Router();
const User = require("../models/User");
const verifyToken = require("../middleware/auth");

router.post("/new", verifyToken, async (req, res) => {
  
  try {
   const {content} = req.body;
   const user = await User.findOne({ uid: req.uid });
  
    if (!user) {
      return res.status(404).json({error: "no se encontró ningún usuario"})
    }

    const newPost = { content, timestamp: new Date()}
    user.posts.push(newPost)
  
    await user.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get("/mypost", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.uid }); 
    if (!user) return res.status(404).send("User not found");
    res.json(user.posts);
  } catch (error) {
    res.status(500).send("Error retrieving posts");
  }
});

router.get("/allposts", verifyToken, async (req, res)=>{
  try{
    const allUsers = await User.find({}, "posts name");
    const usersWithPosts = allUsers.filter(user => user.posts.length > 0);
    res.status(200).json(usersWithPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})


router.put("/edit/:postId", verifyToken, async (req, res) => {
  const { postId } = req.params; 
  const { content} = req.body;  

  try {
    const user = await User.findOne({ uid: req.uid });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const post = user.posts.id(postId); 
    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    post.content = content || post.content;
    await user.save();

    res.status(200).json(post);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.delete("/delete/:postId", verifyToken, async (req, res) => {
  const { postId } = req.params;
  try {
    const user = await User.findOne({ uid: req.uid });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const postIndex = user.posts.findIndex((post) => post._id.toString() === postId);
    if (postIndex === -1) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    user.posts.splice(postIndex, 1);
    await user.save();
    res.status(200).json({ message: "Post eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;

