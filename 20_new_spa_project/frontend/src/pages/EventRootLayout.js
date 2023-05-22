import React from "react";
import EventsNavigation from "../components/EventsNavigation";
import { Outlet } from "react-router-dom";

const EventRootLayout = () => {
  return (
    <>
      <EventsNavigation />
      <Outlet />
    </>
  );
};

export default EventRootLayout;
