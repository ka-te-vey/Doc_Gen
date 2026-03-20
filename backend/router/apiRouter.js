const express = require('express');
const router = express.Router();
const apiController = require('../controller/apiController');

router.post('/generate', apiController.generateDocumentation);

module.exports = router;
