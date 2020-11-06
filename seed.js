const db = require("./server/db");
const User = require("./server/db/models/user");

const seed = async () => {
  try {
    await db.sync({ force: true });
    const users = await Promise.all([
      User.create({
        firstName: "Chicken",
        email: "mrChicken@gmail.com",
        password: "123chicken",
        googleId: "MrChicken3",
      }),
      User.create({
        firstName: "Duck",
        email: "msDuck@gmail.com",
        password: "123duckie",
        googleId: "LadyDuck4",
      }),
      User.create({
        firstName: "Puppy",
        email: "mrPuppy@gmail.com",
        password: "54PuppyDog",
        googleId: "MrPupJunior",
      }),
      User.create({
        firstName: "Ellen",
        email: "e@gmail.com",
        password: "123",
        googleId: "Junior",
      }),
    ]);
  } catch (err) {
    console.log(err);
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log("Seeding success!");
      db.close();
    })
    .catch((err) => {
      console.error("YIKES! Seeding Problem");
      console.error(err);
      db.close();
    });
}
