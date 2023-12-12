// user.model.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  UserID: { type: Number, required: true, unique: true },
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  PhoneNumber: { type: String, required: true },
  Address: { type: String, required: true },
  BloodType: { type: String, required: true },
  MedicalHistory: { type: String, default: '' },
  Availability: { type: String, default: '' },
  Consent: { type: Boolean, required: true },
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: Date.now }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
