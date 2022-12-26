const express = require('express');
//bring in the controller
const { genimage } = require('../controllers/openaiController');
const router = express.Router();

//generating an image
router.post('/genimage', genimage);

module.exports = router;