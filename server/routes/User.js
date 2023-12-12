const express = require('express');
const router = express.Router();
const userModel = require('../models/UserModel');
const data = require('../dummyData/data.json');

router.get('/', async (req, res) => {
  try {
    const getAllUsers = await userModel.find();
    res.status(200).json(getAllUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    console.log(JSON.stringify(req.body));
    const newUser = new userModel({
      "UserID": req.body.UserID,
      "FirstName": req.body.FirstName,
      "LastName": req.body.LastName,
      "Email": req.body.Email,
      "PhoneNumber": req.body.PhoneNumber,
      "Address": req.body.Address,
      "BloodType": req.body.BloodType,
      "MedicalHistory": req.body.MedicalHistory,
      "Availability": req.body.Availability,
      "Consent": req.body.Consent,
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: 'Added entry successfully', user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
