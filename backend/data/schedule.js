const mongoCollections = require("../config/mongoCollections");
const schedules = mongoCollections.schedules;
const users = mongoCollections.users;

/*
  {
    title: "Website Re-Design Plan",
    startDate: new Date(2018, 5, 25, 9, 35),
    endDate: new Date(2018, 5, 25, 11, 30),
    id: 0,
    location: "Room 1",
}
*/

async function getScheduleById(_id) {
  const scheduleCollection = await schedules();
  const schedule = await scheduleCollection.findOne({ _id: _id });
  if (!schedule) {
    throw "Schedule not found";
  }
  return schedule;
}

async function addAppointment(id, title, startDate, endDate) {
  const scheduleCollection = await schedules();
  const schedule = {
    title: title,
    startDate: startDate,
    endDate: endDate,
    id: id,
    location: "",
  };
  const insertInfo = await scheduleCollection.insertOne(schedule);
  const newSchedule = await scheduleCollection.findOne({
    _id: insertInfo.insertedId,
  });
  return newSchedule;
}

async function deleteAppointment(_id) {
  console.log("delete_appointment");
  const scheduleCollection = await schedules();
  const deleteInfo = await scheduleCollection.deleteOne({ _id: ObjectId(_id) });
  if (deleteInfo.deletedCount === 0) {
    throw `Could not delete schedule with id of ${id}`;
  }
  return true;
}

async function editAppointment(_id, id, title, startDate, endDate) {
  const scheduleCollection = await schedules();
  const schedule = {
    title: title,
    startDate: startDate,
    endDate: endDate,
    id: id,
    location: "",
  };
  const updateInfo = await scheduleCollection.updateOne(
    { _id: _id },
    { $set: schedule }
  );
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount) {
    throw "Update failed";
  }
  return await this.getScheduleById(_id);
}

async function getAllAppointments(id) {
  const scheduleCollection = await schedules();
  const userList = await scheduleCollection.find({ id: id }).toArray();
  return userList;
}

module.exports = {
  getScheduleById,
  addAppointment,
  deleteAppointment,
  editAppointment,
  getAllAppointments,
};
