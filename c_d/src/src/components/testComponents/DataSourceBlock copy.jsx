import { Box, Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addDataPanel,
  fetchErrorShowBorder,
  updateData,
  updateDataSourceWithURL,
  removeDataPanel,
} from "../../store";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import { useRef, useState } from "react";
import axios from "axios";
import InspectDrawer from "../InspectDrawer";
import VariableAccordion from "../EditComponents/DataSourceComponent/VariableAccordion";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const StyleButton = () => {
  return (
    <Button
      disableRipple
      disableFocusRipple
      disableElevation
      sx={{
        color: "#5B9AFF",
        backgroundColor: "#181B1F",
        width: "10%",
        marginRight: "1rem",
        "&:hover": { backgroundColor: "#181B1F" },
      }}
      variant="contained"
    >
      URL
    </Button>
  );
};

const DataSourceBlock = ({ panelID }) => {
  const dispatch = useDispatch();
  const textRef = useRef("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [targetDataPanel, setTargetDataPanel] = useState("");

  const { datasource_url, fetchError, fetchErrorMessage, dataArray } =
    useSelector((state) => {
      const panelArray = state.widget.widgetArray;
      const targetPanel = panelArray.filter((panel) => panel.i === panelID);
      return {
        datasource_url: targetPanel[0]?.data.map((data) => {
          return {
            dataName: data.dataName,
            datasource_url: data.datasource_url,
          };
        }),

        fetchError: targetPanel[0]?.data.map((data) => {
          return { dataName: data.dataName, fetchError: data.fetchError };
        }),
        fetchErrorMessage: targetPanel[0]?.data.map((data) => {
          return {
            dataName: data.dataName,
            fetchErrorMessage: data.fetchErrorMessage,
          };
        }),
        dataArray: targetPanel[0]?.data,
      };
    });

  const [textValue, setTextValue] = useState([]);

  let variablesArray = useSelector((state) => {
    return state.variable.variableArray;
  });

  const fetchURl = async (variablesArray, currentText, dataPanelID) => {
    try {
      // Define default values for each variable
      let defaultValues = {};

      variablesArray.forEach(({ variableName, defaultValue }) => {
        defaultValues[variableName] = defaultValue;
      });
      // console.log(
      //   "🚀 ~ file: DataSourceBlock.jsx:41 ~ fetchURl ~ defaultValues:",
      //   defaultValues
      // );
      // console.log("before Regex ARRAY: ", variablesArray);

      console.log("before regex:", currentText);

      currentText = currentText.replace(/@(\w+)/g, (match, variableName) => {
        const variableValue = defaultValues[variableName];
        return variableValue !== undefined ? variableValue : match;
      });
      console.log("after regex:", currentText);
      if (currentText === "http://localhost:5001/updates") return;
      if (currentText === "http://localhost:5001/updates/v2") return;
      const response = await axios.get(currentText);
      // console.log(
      //   "🚀 ~ file: DataSourceBlock.jsx:88 ~ fetchURl ~ response:",
      //   response
      // );

      const data = response.data;
      dispatch(updateData({ data, panelID, dataPanelID }));
      const res = false;
      const id = panelID;
      const message = "";
      dispatch(fetchErrorShowBorder({ id, res, message, dataPanelID }));
    } catch (error) {
      console.log(
        "🚀 ~ file: DataSourceBlock.jsx:100 ~ fetchURl ~ error:",
        error
      );

      const res = true;
      const id = panelID;
      const message = error.message;
      dispatch(fetchErrorShowBorder({ id, res, message, dataPanelID }));
    }
  };

  const handleSetURL = (datasourceName, datasource_url, panelID) => {
    dispatch(
      updateDataSourceWithURL({ datasourceName, datasource_url, panelID })
    );
  };

  const TypeHandler = (e) => {
    const targetDataPanel = e.target.name;
    // immediately fetch here
    const targetDataPanelURL = e.target.value;
    // for showing url text
    setTextValue((prevState) => {
      return [
        ...prevState,
        { dataName: targetDataPanel, datasource_url: targetDataPanelURL },
      ];
    });
    console.log(
      "🚀 ~ file: DataSourceBlock.jsx:73 ~ DataSourceBlock ~ textValue:",
      textValue
    );
    fetchURl(variablesArray, targetDataPanelURL, targetDataPanel);
  };
  const SaveLinkIntoStore = (e) => {
    // onBlur save into store
    const dataPanelID = e.target.name;
    const datasource_url = e.target.value;
    const datasourceName = "link";
    dispatch(
      updateDataSourceWithURL({
        panelID,
        dataPanelID,
        datasource_url,
        datasourceName,
      })
    );
  };

  const dataPanelError = (id) => {
    const res = fetchError.filter((data) => data.dataName === id);
    if (res[0]?.fetchError === true) return true;
    else return false;
  };

  const dataPanelErrorMessage = (id) => {
    const res = fetchErrorMessage.filter((data) => data.dataName === id);
    return res[0]?.fetchErrorMessage;
  };

  const dataPanelURL = (id) => {
    const res = textValue?.filter((text) => text.dataName === id);
    console.log("aaaa", res);
    return res[0]?.datasource_url;
  };

  //border: "1px solid black"
  return (
    <Box sx={{ margin: "5px" }}>
      {dataArray?.map((data) => {
        const error = dataPanelError(data.dataName);
        const errorMsg = dataPanelErrorMessage(data.dataName);

        return (
          <>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ margin: "0.5rem 0rem" }}
            >
              <Box component="div" sx={{}} overflow="hidden">
                DataSourceBlock
              </Box>
              <Button
                onClick={() => {
                  const dataPanelID = data.dataName;
                  dispatch(removeDataPanel({ panelID, dataPanelID }));
                }}
              >
                <DeleteIcon />
              </Button>
            </Box>

            <Box display="flex" alignItems="center">
              <StyleButton />
              <TextField
                key={data.dataName}
                error={error}
                sx={{ backgroundColor: "#141414" }}
                fullWidth
                hiddenLabel
                id="filled-hidden-label-small"
                name={data.dataName}
                variant="filled"
                helperText={errorMsg ? `${errorMsg}` : ""}
                size="small"
                onChange={TypeHandler}
                onBlur={SaveLinkIntoStore}
              />
              <Button
                name={data.dataName}
                variant="contained"
                style={{
                  textTransform: "unset",
                  marginLeft: "1rem",
                }}
                sx={{
                  fontSize: { sm: "10px", lg: "14px" },
                  padding: { sm: "0", lg: "0.5rem" },
                  width: { sm: "5%", lg: "15%" },
                }}
                onClick={(e) => {
                  setTargetDataPanel(e.target.name);
                  setDrawerOpen(true);
                }}
              >
                Query inspector
              </Button>
            </Box>
            {variablesArray.length ? (
              <VariableAccordion
                fetchURl={fetchURl}
                panelID={panelID}
                setTextValue={setTextValue}
                handleSetURL={handleSetURL}
                textRef={textRef}
              />
            ) : (
              ""
            )}
          </>
        );
      })}
      <InspectDrawer
        dataPanelID={targetDataPanel}
        panelID={panelID}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
      <Button
        onClick={() => {
          dispatch(addDataPanel({ panelID }));
        }}
      >
        <AddIcon />
      </Button>
    </Box>
  );
};

export default DataSourceBlock;
