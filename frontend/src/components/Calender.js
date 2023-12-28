import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import {
  Scheduler,
  WeekView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";

import { appointments } from "./appointment";
import Typography from "@mui/material/Typography";

const Appointment = ({ children, style, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      ...style,
      backgroundColor: "#66BCFF",
      borderRadius: "8px",
    }}
  >
    {children}
  </Appointments.Appointment>
);

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState("2018-06-26");

  const handlePreviousWeek = () => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - 7); // Subtract 7 days
    setCurrentDate(date.toISOString().split("T")[0]); // Update the state
  };

  const handleNextWeek = () => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + 7); // Subtract 7 days
    setCurrentDate(date.toISOString().split("T")[0]); // Update the state
  };

  return (
    <Paper>
      <Stack
        spacing={24}
        direction="row"
        sx={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          margin: 2,
        }}
      >
        <Button variant="outlined" color="primary" onClick={handlePreviousWeek}>
          Previous Week
        </Button>
        <Typography
          sx={{
            maxWidth: "auto",
            whiteSpace: "nowrap",
            textAlign: "center",
          }}
        >
          Today: {currentDate}
        </Typography>
        <Button variant="outlined" color="primary" onClick={handleNextWeek}>
          Next Week
        </Button>
      </Stack>
      <Scheduler data={appointments} height={660}>
        <ViewState currentDate={currentDate} />
        <WeekView startDayHour={9} endDayHour={19} />
        <Appointments appointmentComponent={Appointment} />
      </Scheduler>
    </Paper>
  );
};

export default Calendar;
