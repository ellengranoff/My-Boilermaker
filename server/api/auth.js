const router = require("express").Router();
const User = require("../db/models/user");

// PUT   /api/auth/login
router.put("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
        // password: req.body.password,
      },
    });
    if (!user) {
      res.status(401).send("User not found");
      console.log("No such user found:", req.body.email);
    } else if (!user.correctPassword(req.body.password)) {
      console.log("Incorrect password for user:", req.body.email);
      res.status(401).send("Wrong username and/or password");
    } else {
      req.login(user, (err) => {
        if (err) next(err);
        else res.json(user);
      });
    }
  } catch (err) {
    next(err);
  }
});

// POST    /api/auth/signup

module.exports = router;
