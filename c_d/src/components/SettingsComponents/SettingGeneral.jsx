import { Box, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDashboardName } from "../../store";

const SettingGeneral = () => {
  const dispatch = useDispatch();
  let dahboardName = useSelector((state) => {
    return state.widget.dashboardName;
  });
  const [input, setInput] = useState(dahboardName);

  const handleDashboardName = (e) => {
    setInput(e.target.value);
  };
  return (
    <Box bgcolor="#181B1F" className="fullHeightBox">
      <Typography
        style={{ color: "white", padding: "2rem", fontSize: "1.5rem" }}
      >
        General
      </Typography>
      <Typography
        style={{ color: "white", paddingLeft: "2rem", marginBottom: "0.5rem" }}
      >
        Name
      </Typography>
      <TextField
        name="dashboardName"
        sx={{
          paddingLeft: "2rem",
          width: { sm: "50%", md: "50%" },
          marginBottom: "1rem",
        }}
        variant="outlined"
        size="small"
        value={input}
        onChange={handleDashboardName}
        onBlur={() => {
          dispatch(updateDashboardName(input));
        }}
      />
    </Box>
  );
};

export default SettingGeneral;
