const { googleLogin } = require("../Controllers/AuthController");

const router = require("express").Router();

router.get("/test", (req, res) => {
  res.send("Test");
});

router.get("/google", googleLogin);

module.exports = router;
