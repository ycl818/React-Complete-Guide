import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adjustVariable,
  fetchErrorShowBorder,
  updateDataByURL,
} from "../../../store";
import axios from "axios";

const VariableAccordion = ({
  fetchURl,
  panelID,
  setTextValue,
  handleSetURL,
  textRef,
}) => {
  const dispatch = useDispatch();
  let variablesArray = useSelector((state) => {
    return state.variable.variableArray;
  });

  const { datasource_url, allPanelURLs } = useSelector((state) => {
    const panelArray = state.widget.widgetArray;
    const allPanelURLs = panelArray.map((panel) => {
      return { id: panel.i, url: panel.data.datasource_url };
    });
    const targetPanel = panelArray.filter((panel) => panel.i === panelID);
    return {
      datasource_url: targetPanel[0]?.data?.datasource_url,
      allPanelURLs,
    };
  });

  const [inputs, setInputs] = useState(variablesArray);

  const handleChange = (e) => {
    let updatedVariablesArray = variablesArray.map((variable) => {
      return variable.variableName === e.target.name
        ? { ...variable, defaultValue: e.target.value }
        : variable;
    });
    setInputs(updatedVariablesArray);

    //fetchURl(updatedVariablesArray, textRef.current.value);
  };

  const handleOnBlur = (e) => {
    dispatch(adjustVariable({ inputs }));
    console.log("file: VariableAccordion.jsx:51 ~ handleOnBlur ~ e:", e);

    // 1. get all panels url
    // 2. check the urls which contain target variable
    // 3. fectch all target url
    const filteredURLs = allPanelURLs.filter((panel) =>
      panel.url.includes(e.target.name)
    );

    const newPanelsURL = filteredURLs?.map((panel) => {
      let newUrl = panel.url;
      inputs.forEach((variable) => {
        if (newUrl.includes(`@${variable.variableName}`)) {
          newUrl = newUrl.replace(
            new RegExp(`@${variable.variableName}`, "g"),
            variable.defaultValue
          );
        }
      });
      return { id: panel.id, url: newUrl };
    });

    Promise.all(
      newPanelsURL.map(async (panel) => {
        try {
          const response = await axios.get(panel.url);
          const id = panel.id;
          const result = response.data;
          const res = false;
          const message = "";
          dispatch(updateDataByURL({ result, id }));
          dispatch(fetchErrorShowBorder({ res, id, message }));
        } catch (error) {
          const id = panel.id;
          const res = true;
          const message = error.message;

          console.log(
            "file: VariableAccordion.jsx:84 ~ filteredURLs.map ~ panel.url:",
            panel.url
          );
          dispatch(fetchErrorShowBorder({ res, id, message }));
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

  const handlePasteVariable = (e) => {
    const pasteKey = e.target.value;
    // eslint-disable-next-line
    const newDataSouceUrl = datasource_url + "/@" + `${pasteKey}`;
    setTextValue(newDataSouceUrl);
    handleSetURL("link", newDataSouceUrl, panelID);
    // eslint-disable-next-line
    let cuurentText = textRef.current.value + "/@" + `${pasteKey}`;
    fetchURl(inputs, cuurentText);
  };

  return (
    <Box sx={{ marginTop: "1rem" }}>
      <Accordion>
        <AccordionSummary expandIcon={">"}>
          <Typography>Variables</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{ backgroundColor: "#323232", display: "flex", flexWrap: "wrap" }}
        >
          {variablesArray.map((variable) => {
            return (
              <Box
                sx={{ marginLeft: "1rem", marginTop: "1rem" }}
                key={variable.id}
              >
                <Button
                  value={variable.variableName}
                  onClick={handlePasteVariable}
                  disableRipple
                  disableFocusRipple
                  disableElevation
                  sx={{
                    color: "#5B9AFF",
                    backgroundColor: "#181B1F",
                    width: "10%",
                    textTransform: "none",

                    "&:hover": { backgroundColor: "#181B1F" },
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
                  defaultValue={`${variable.defaultValue}`}
                  value={inputs.defaultValue}
                  onChange={handleChange}
                  onBlur={handleOnBlur}
                />
              </Box>
            );
          })}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default VariableAccordion;
