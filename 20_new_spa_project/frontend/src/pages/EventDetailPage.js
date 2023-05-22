import React from "react";
import { useParams } from "react-router-dom";

const EventDetailPage = () => {
  const params = useParams();

  return (
    <>
      <div>EventDetailPage</div>
      <p>Event ID : {params.eventid}</p>
    </>
  );
};

export default EventDetailPage;
