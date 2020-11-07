const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const db = require("./db");
const PORT = process.env.PORT || 1111;
const session = require("express-session");
const passport = require("passport");
const User = require("./db/models/user");

require("../localSecrets"); // this will mutate the process.env object with your secrets.

//configure and create our database store
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const dbStore = new SequelizeStore({ db: db });

// sync so that our session table gets created
dbStore.sync();

//sync server
const server = app.listen(PORT, () =>
  console.log(`Feeling chatty on port ${PORT}`)
);

//sync database
db.sync().then(() => console.log("Database is synced"));

//logging middleware
app.use(morgan("dev"));

//static middleware
app.use(express.static(path.join(__dirname, "..", "public")));

//body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "a wildly insecure secret",
    store: dbStore,
    resave: false,
    saveUninitialized: false,
  })
);

// consumes 'req.session' so that passport can know what's on the session
app.use(passport.initialize());

// this will invoke our registered 'deserializeUser' method
// and attempt to put our user on 'req.user'
app.use(passport.session());

// after we find or create a user, we 'serialize' our user on the session
passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then((user) => done(null, user))
    .catch(done);
});
//backend routes
app.use("/api", require("../server/api/index"));
app.use("/auth", require("../server/api/auth"));

//send index.html
app.use("*", (req, res, next) =>
  res.sendFile(path.join(__dirname, "..", "public/index.html"))
);

//handle 500 errors
app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});
