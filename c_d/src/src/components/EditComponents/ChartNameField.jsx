import { TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePanelName } from "../../store";

const ChartNameField = ({ panelID }) => {
  const dispatch = useDispatch();
  const { panelName } = useSelector((state) => {
    const panelArray = state.widget.widgetArray;
    const targetPanel = panelArray.filter((panel) => panel.i === panelID);
    return {
      panelName: targetPanel[0]?.panelName,
    };
  });
  const [name, setName] = useState(panelName || "New Title");
  const [isNameFocused, setIsNamedFocused] = useState(false);

  const titleText = useRef(null);

  return (
    <>
      {!isNameFocused ? (
        <Typography
          sx={{ textAlign: "center" }}
          onClick={() => {
            setIsNamedFocused(true);
          }}
        >
          {name}
        </Typography>
      ) : (
        <TextField
          autoFocus
          value={name}
          variant="filled"
          size="small"
          ref={titleText.current}
          onChange={(event) => {
            setName(event.target.value);
          }}
          onBlur={(event) => {
            setIsNamedFocused(false);
            dispatch(updatePanelName({ name, panelID }));
          }}
          sx={{
            marginBottom: "1rem",
            input: { textAlign: "center" },
            width: "30%",
            margin: "auto",
          }}
        />
      )}
    </>
  );
};

export default ChartNameField;
