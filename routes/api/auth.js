const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/auth");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.current);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

router.patch(
  "/subscription",
  authenticate,
  validateBody(schemas.subscriptionSchema),
  ctrl.updateSubscriptionUser
);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post("/verify", ctrl.verifyResend);

module.exports = router;
