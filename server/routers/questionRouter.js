const Router = require("express");
const router = new Router();
const validateRequest = require("../middlewares/validateRequest");

//User registration
router.post(
  "/registration",
  validateRequest,
);

//User login
router.post("/login", loginValidator, validateRequest, controller.login);

//Get all users
router.get("/users", roleMiddleware(["ADMIN"]), controller.getUsers);

module.exports = router;