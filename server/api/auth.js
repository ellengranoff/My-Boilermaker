const router = require("express").Router();
const User = require("../db/models/user");

// PUT   /auth/login
router.put("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      console.log("No such user found:", req.body.email);
      res.status(401).send("User not found");
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
    console.error(error);
    next(err);
  }
});

// POST    /auth/signup
router.post("/signup", async (req, res, next) => {
  try {
    let newUser = await User.create(req.body);
    req.login(newUser, (err) => {
      if (err) next(err);
      else res.json(newUser);
    });
  } catch (error) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      console.error(error);
      next(err);
    }
  }
});

// DELETE    /auth/logout
router.post("/logout", async (req, res, next) => {
  try {
    req.logout();
    req.session.destroy();
    res.status(204).send("User Logged Out!");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//GET   /auth/me
router.get("/me", (req, res, next) => {
  res.json(req.user);
});

module.exports = router;
