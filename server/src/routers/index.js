const express = require("express");

const router = express.Router();

const { 
        login,
        registrasi,
        checkAuth } = require('../controllers/auth');

const { 
        getUsers, 
        getUser, 
        updateUser, 
        deleteUser  } = require('../controllers/user');

const {auth} = require('../middlewares/auth')

// AUTH
router.post("/login", login);
router.post("/register", registrasi);
router.get("/check-auth",auth, checkAuth);

// USER
router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

module.exports = router;