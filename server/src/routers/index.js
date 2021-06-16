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

const { 
        addProduct, 
        getProducts,
        deleteProduct } = require('../controllers/product')

// MIDDLEWARE
const {auth} = require('../middlewares/auth')
const { uploadFile } = require('../middlewares/uploadFile')

// AUTH
router.post("/login", login);
router.post("/register", registrasi);
router.get("/check-auth",auth, checkAuth);

// USER
router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

// PRODUCT
router.post("/product", uploadFile("imageFile"), addProduct);
router.get("/products", getProducts);
router.delete("/product/:id", deleteProduct);
// router.pathc("/product/:id",uploadFile("imageFile"), updateProduct);


module.exports = router;