import React from "react";
import { json, redirect, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

const EventDetailPage = () => {
  const data = useRouteLoaderData("event-detail");

  return <EventItem event={data.event} />;
};

export default EventDetailPage;

export async function loader({ request, params }) {
  console.log("🚀 ~ file: EventDetailPage.js:16 ~ loader ~ params:", params);
  console.log("🚀 ~ file: EventDetailPage.js:16 ~ loader ~ request:", request);
  const id = params.eventid;
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected event." },
      { status: 500 }
    );
  } else {
    return response;
  }
}

export async function action({ params, request }) {
  const eventId = params.eventid;
  const response = await fetch(`http://localhost:8080/events/` + eventId, {
    method: request.method,
  });

  if (!response.ok) {
    throw json(
      {
        message: "Could not delete event.",
      },
      {
        status: 500,
      }
    );
  }

  return redirect("/events");
}
