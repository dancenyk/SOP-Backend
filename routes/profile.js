const express = require("express");
const router = express.Router();
const User = require("../models/User");
const verifyToken = require("../middleware/auth");

router.post("/", verifyToken, async (req, res) => {
  const {
    uid,
    name,
    lastName,
    email,
    userType,
    profession,
    birthDate,
    city,
    country,
    history,
    symptoms,
    needsInfo,
    sopManaging,
    recomendations,
    phrase,
    interests,
    isActive,
    isAdmin,
    image,
  } = req.body;
  try {
    
    let user = await User.findOne ({uid});
    
    if (!user){
      user= new User ({
        uid,
        name,
        lastName,
        email,
        userType,
        profession,
        birthDate,
        city,
        country,
        history,
        symptoms,
        needsInfo,
        sopManaging,
        recomendations,
        phrase,
        interests,
        isActive,
        isAdmin,
        image,
       })
       await user.save();
       res.status(201).json(user);
    }else{
      user.name = name || user.name;
      user.lastName = lastName || user.lastName;
      user.email = email || user.email;
      user.userType = userType || user.userType;
      user.profession = profession || user.profession;
      user.birthDate = birthDate || user.birthDate;
      user.city = city || user.city;
      user.country = country || user.country;
      user.history = history || user.history;
      user.symptoms = symptoms || user.symptoms;
      user.needsInfo = needsInfo || user.needsInfo;
      user.sopManaging = sopManaging || user.sopManaging;
      user.recomendations = recomendations || user.recomendations;
      user.phrase = phrase || user.phrase;
      user.interests = interests || user.interests;
      user.isActive = isActive ?? user.isActive;
      user.isAdmin = isAdmin ?? user.isAdmin;
      user.image = image || user.image;

      await user.save();
      res.status(200).json(user);

    }
    
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/users",verifyToken, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

router.get("/users/:uid", verifyToken, async (req, res) => {
  try {
    const userById = await User.findOne(req.params.uid);
    if (!userById) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(userById);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

router.delete("/delete/:userId", verifyToken,  async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al eliminar el usuario", error: err.message });
  }
});
module.exports = router;


