import { Box, Button, Divider, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addDataPanel,
  fetchErrorShowBorder,
  updateData,
  updateDataSourceWithURL,
  removeDataPanel,
  updataDataPanel,
  updateDataSourceName,
} from "../../store";
import { v4 as uuidv4 } from "uuid";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import InspectDrawer from "../InspectDrawer";
import VariableAccordion from "./DataSourceComponent/VariableAccordion";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import DataPanelName from "./DataSourceComponent/DataPanelName";
import DataPanelTable from "./DataSourceComponent/DataPanelTable";
import ColumnSelectAccordion from "./DataSourceComponent/ColumnSelectAccordion";

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

  const [textValue, setTextValue] = useState(dataArray);

  let variablesArray = useSelector((state) => {
    return state.variable.variableArray;
  });

  useEffect(() => {
    setTextValue(dataArray);
  }, [addDataPanel, dataArray]);

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
    const newState = textValue.map((text) => {
      if (text.dataName === e.target.name)
        return { ...text, datasource_url: targetDataPanelURL };
      return text;
    });
    setTextValue(newState);
    SaveLinkIntoStore(e);
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
    return res[0]?.datasource_url;
  };

  const [inputs, setInputs] = useState(variablesArray);

  //border: "1px solid black"
  return (
    <Box sx={{ margin: "5px" }}>
      {dataArray?.map((data) => {
        const error = dataPanelError(data.dataName);
        const errorMsg = dataPanelErrorMessage(data.dataName);
        const currenturl = dataPanelURL(data.dataName);
        return (
          <div
            key={data.dataName}
            style={{
              backgroundColor: "rgba(255,255,255,0.01)",
              margin: "1.5rem 0rem",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ margin: "0.5rem 0rem" }}
            >
              <DataPanelName
                dataPanelName={data.dataLabel}
                dataPanelID={data.dataName}
                panelID={panelID}
              />
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
                //defaultValue={data.datasource_url}
                value={currenturl || ""}
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
                  padding: { sm: "10px 0px", lg: "0.5rem" },
                  width: { sm: "15%", lg: "20%" },
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
                dataPanelID={data.dataName}
                setTextValue={setTextValue}
                handleSetURL={handleSetURL}
                textValue={textValue}
                inputs={inputs}
                setInputs={setInputs}
              />
            ) : (
              ""
            )}

            {/* //////////// column selector //////////// */}
            {error ? null : <ColumnSelectAccordion panelID={panelID} data={data}/>}
            {/* ///////////////////////////////////////// */}

            <Divider
              sx={{
                backgroundColor: "white",
                borderBottomWidth: 1,
                width: "100%",
                textAlign: "center",
                marginTop: "1rem",
              }}
            />
          </div>
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
