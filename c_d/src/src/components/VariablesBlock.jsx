import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adjustVariable, fetchErrorShowBorder, updateData } from "../store";
import axios from "axios";

const VariablesBlock = () => {
  const dispatch = useDispatch();
  let variablesArray = useSelector((state) => {
    return state.variable.variableArray;
  });

  const [inputs, setInputs] = useState(variablesArray);

  const { allPanelURLs } = useSelector((state) => {
    const panelArray = state.widget.widgetArray;
    const allPanelURLs = panelArray.map((panel) => {
      const siglePanelURLs = panel.data.map((dataPanel) => {
        return {
          dataPanelID: dataPanel.dataName,
          dataPanelURL: dataPanel.datasource_url,
        };
      });
      return { id: panel.i, url: siglePanelURLs };
    });
    return {
      allPanelURLs,
    };
  });

  const handleChange = (e) => {
    let updatedVariablesArray = variablesArray.map((variable) => {
      return variable.variableName === e.target.name
        ? { ...variable, defaultValue: e.target.value }
        : variable;
    });
    setInputs(updatedVariablesArray);
  };

  const handleOnBlur = (e) => {
    dispatch(adjustVariable({ inputs }));
    /*
      step 1: check panels which contains modified variables
    */

    const targetArray = allPanelURLs
      .flatMap((panel) => panel.url.map((url) => ({ id: panel.id, ...url })))
      .filter(({ dataPanelURL }) => dataPanelURL.includes(e.target.name));

    const newPanelsURL = targetArray?.map((item) => {
      let newUrl = item.dataPanelURL;
      inputs.forEach((variable) => {
        if (newUrl.includes(`@${variable.variableName}`)) {
          newUrl = newUrl.replace(
            new RegExp(`@${variable.variableName}`, "g"),
            variable.defaultValue
          );
        }
      });
      return {
        id: item.id,
        dataPanelID: item.dataPanelID,
        dataPanelURL: newUrl,
      };
    });
    // Step 2: Send all URLs at the same time using Promise.all()
    Promise.all(
      newPanelsURL.map(async (item) => {
        try {
          const response = await axios.get(item.dataPanelURL);
          const id = item.id;
          const panelID = item.id;
          const data = response.data;
          const dataPanelID = item.dataPanelID;
          const res = false;
          const message = "";
          // find url is in which item then update
          dispatch(updateData({ data, panelID, dataPanelID }));
          dispatch(fetchErrorShowBorder({ id, res, message, dataPanelID }));
        } catch (error) {
          const id = item.id;
          const res = true;
          const dataPanelID = item.dataPanelID;
          const message = error.message;
          dispatch(fetchErrorShowBorder({ res, id, message, dataPanelID }));
          console.log(
            "file: variablesArea.jsx:65 ~ newPanelsURL.map ~ error:",
            error
          );
        }
      })
    )
      .then((responses) => {
        console.log(responses);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {variablesArray.map((variable) => {
        return (
          <Box
            sx={{ marginLeft: "0.5rem", marginTop: "0.5rem" }}
            key={variable.id}
          >
            <Button
              value={variable.variableName}
              disableRipple
              disableFocusRipple
              disableElevation
              sx={{
                color: "#5B9AFF",
                backgroundColor: "#181B1F",
                width: "10%",
                textTransform: "none",
                "&:hover": { backgroundColor: "#181B1F", cursor: "auto" },
              }}
              variant="contained"
            >
              {variable.variableName}
            </Button>

            <TextField
              name={variable.variableName}
              sx={{
                width: { sm: 50, md: 100 },
                marginBottom: "1rem",
              }}
              variant="outlined"
              size="small"
              value={inputs.defaultValue}
              defaultValue={`${variable.defaultValue}`}
              onChange={handleChange}
              onBlur={handleOnBlur}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default VariablesBlock;
