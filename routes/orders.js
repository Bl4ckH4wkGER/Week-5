const { Router, query } = require("express");
var jwt = require('jsonwebtoken');
const router = Router();

const ordersDAO = require('../daos/orders');
const loginDAO = require('../daos/login');

// Main routes go here

module.exports = router;