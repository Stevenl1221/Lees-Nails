const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;

// Function to add a new user
async function addUser(user) {
  const userCollection = await users();
  console.log(user.name);
  const checkUser = await userCollection.findOne({ name: user.name });
  if (checkUser) {
    throw "User already exists";
  }
  const insertInfo = await userCollection.insertOne(user);
  const newUser = await userCollection.findOne({ _id: insertInfo.insertedId });
  return newUser;
}

// Function to get a specific user by ID
async function getUser(userName) {
  const userCollection = await users();
  const user = await userCollection.findOne({ name: userName });
  if (!user) {
    throw "User not found";
  }
  return user;
}

// Function to get all users
async function getAllUsers() {
  const userCollection = await users();
  const userList = await userCollection.find({}).toArray();
  return userList;
}

module.exports = {
  addUser,
  getAllUsers,
  getUser,
};
