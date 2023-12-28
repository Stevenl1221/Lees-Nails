const express = require('express');
const router = express.Router();
const data = require("../data");
const userData = data.userData;

router.get("/get-allusers", async (req, res) => {
  try {
    const userList = await userData.getAllUsers();
    res.json(userList);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/get-user/:name", async (req, res) => {
  try {
    const user = await userData.getUser(req.params.name);
    res.json(user);
  } catch (e) {
    res.status(404).json({ error: "User not found" });
  }
});

router.post("/add-user", async (req, res) => {
  const userInfo = req.body;
  if (!userInfo) {
    res.status(400).json({ error: "You must provide data to create a user" });
    return;
  }
  if (!userInfo.name) {
    res.status(400).json({ error: "You must provide a name" });
    return;
  }

  try {
    const newUser = await userData.addUser(
      userInfo,
    );
    res.json(newUser);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;