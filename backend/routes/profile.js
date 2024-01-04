const express = require('express');
const { createProfile, updateProfile} = require('../controllers/profileController');
const router = express.Router();

router.route('/')
    .post(createProfile)

router.route('/:_id')
    .patch(updateProfile)

module.exports = router