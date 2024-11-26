const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  userType: {
    type: String,
    enum: ["admin", "professional", "pacient"],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profession: String,
  birthDate: Date,
  city: String,
  country: String,
  history: String,
  symptoms: {
    type: [String],
    enum: [
      "ciclos menstruales irregulares",
      "aumento de peso",
      "acné",
      "caída del cabello",
      "hirsutismo",
      "acantosis nigricans",
      "dolor pélvico",
      "dificultad para quedar embarazada",
      "fatiga",
      "cambios de humor",
      "dolores de cabeza",
      "resistencia a la insulina",
      "insomnio",
    ],
    required: true,
  },
  needsInfo: String,
  sopManaging: String,
  recomendations: String,
  phrase: String,
  interests: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  posts: [
    {
      content: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
