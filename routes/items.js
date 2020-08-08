const { Router, query } = require("express");
const jwt = require('jsonwebtoken');
const router = Router();

const itemsDAO = require('../daos/items');
const userDAO = require('../daos/user');

// isAuthorized middleware
// const isAuthorized = async (req, res, next) => {};

// isAdmin middleware
// const isAdmin = async (req, res, next) => {
//     if (req.user.roles.includes('admin')) {
//         next();
//     } else {
//         res.sendStatus(403);
//     }
// };

// Create
// router.post("/",
//     isAuthorized,
//     isAdmin,
//     async (req, res, next) => {
// });

// Get all items
// router.get("/",
//     isAuthorized,
//     isAdmin,
//     async (req, res, next) => {
// });

// Update an item
// router.put("/:id", 
//     isAuthorized, 
//     async (req, res, next) => {
// });

module.exports = router;