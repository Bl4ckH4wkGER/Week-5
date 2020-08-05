const { Router, query } = require("express");
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = Router();

const loginDAO = require('../daos/login');

// Main routes go here

module.exports = router;