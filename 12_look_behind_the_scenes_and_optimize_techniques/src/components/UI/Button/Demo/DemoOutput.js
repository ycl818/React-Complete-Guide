import React from "react";

const DemoOutput = (props) => {
  console.log("OUTPUT RUNNGING");
  return <p>{props.show ? "here is paragraph" : ""}</p>;
};

export default React.memo(DemoOutput);
