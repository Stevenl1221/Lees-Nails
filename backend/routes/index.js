const userRoutes = require("./user");
const scheduleRoutes = require("./schedule");

const constructorMethod = (app) => {
  app.use("/", userRoutes);
  app.use("/", scheduleRoutes);
  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
