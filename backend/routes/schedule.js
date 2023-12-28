const express = require('express');
const router = express.Router();
const data = require("../data");
const scheduleData = data.scheduleData;

router.get("/get-allapppointments/:id", async (req, res) => {
  try {
    const scheduleList = await scheduleData.getAllAppointments(req.params.id);
    res.json(scheduleList);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/add-appointment", async (req, res) => {
  const appointment = req.body;

  if (!appointment) {
    res.status(400).json({ error: "You must provide data to create an appointment" });
    return;
  }
  if (!appointment.title) {
    res.status(400).json({ error: "You must provide a title" });
    return;
  }
  if (!appointment.startDate) {
    res.status(400).json({error: "You must provide a start date" });
    return;
  }
  if (!appointment.endDate) {
    res.status(400).json({ error: "You must provide an end date" });
    return;
  }
  if (!appointment.id) {
    res.status(400).json({ error: "You must provide an id" });
    return;
  }
  try {
    const schedule = await scheduleData.addAppointment(appointment.id, appointment.title, appointment.startDate, appointment.endDate);
    res.json(schedule);
  } catch (e) {
    res.status(404).json({ error: "Appointment not found" });
  }
});

router.delete("/delete-appointment/:id", async (req, res) => {
  try {
    const schedule = await scheduleData.deleteAppointment(req.params.id);
    if (schedule) {
        res.sendStatus(200);   
    } else {
        res.sendStatus(404);
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;