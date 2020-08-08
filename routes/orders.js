const { Router, query } = require("express");
const jwt = require('jsonwebtoken');
const router = Router();

const ordersDAO = require('../daos/orders');
const userDAO = require('../daos/user');

// isAuthorized middleware
// const isAuthorized = async (req, res, next) => {};

// Create an order
// router.post("/", 
//     isAuthorized,
//     async (req, res, next) => {
// });

// Get my orders
// router.get("/", 
//     isAuthorized, 
//     async (req, res, next) => {
// });

// Get an order (ACCOUNT FOR DIFFERENT BEHAVIOR FOR ADMINS HERE)
// router.get("/:id", 
//     isAuthorized, 
//     async (req, res, next) => {
//         if (req.user.roles.includes('admin') ==  true) {
//             // allow all orderIds
//         } else {
//             // limit to ordersIds of that user
//         }
// });

module.exports = router;