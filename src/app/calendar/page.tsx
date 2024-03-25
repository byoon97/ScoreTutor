"use client";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import React from "react";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [view, setView] = React.useState("month");
  const [events, setEvents] = React.useState([
    {
      title: "Event 1",
      start: new Date(),
      end: new Date(),
    },
    {
      title: "Event 2",
      start: new Date(),
      end: new Date(),
    },
    // Add more events as needed
  ]);

  const handleViewChange = (newView: any) => {
    setView(newView);
  };

  return (
    <div className="bg-white text-black p-4">
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={["month", "day"]}
        onView={handleViewChange}
        events={events} // Provide events to the calendar component
      />
    </div>
  );
};

export default MyCalendar;
