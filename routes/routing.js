//import express
const express = require('express')
const userController = require('../controller/userController')
const toolController = require('../controller/toolController')
const bookingController = require('../controller/bookingController')

// const jwtMiddleware = require('../middlewares/jwtMiddleware')
// const multerMiddleware = require('../middlewares/multerMiddleware')

//create Router object
const router = new express.Router()


router.post("/login", userController.loginController);
router.post("/register", userController.registerController);
router.get("/getuser", userController.getUserController);

// Tool routes
router.post("/tools", toolController.addToolController);
router.get("/tools", toolController.getAllToolsController);
router.get("/provider/tools/:providerId", toolController.getProviderToolsController);
router.put("/tools/:id", toolController.updateToolController);
router.delete("/tools/:id", toolController.deleteToolController);

// Booking routes
router.post("/bookings", bookingController.addBookingController);
router.get("/provider/bookings/:providerId", bookingController.getProviderBookingsController);

module.exports = router;
