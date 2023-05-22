import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useSelector } from "react-redux";
import ChartNameField from "./EditComponents/ChartNameField";
import GraphTypeSwitcher from "./GraphTypeSwitcher";
import React from "react";
import { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import DataPanelTable from "./EditComponents/DataSourceComponent/DataPanelTable";

const GraphBolck = ({ panelID }) => {
  const { dataArray, defaultTable, chartType, chartSetting, transformData } =
    useSelector((state) => {
      const panelArray = state.widget.widgetArray;
      const targetPanel = panelArray.filter((panel) => panel.i === panelID);
      const chartType = state.chartData.value.chartType;

      let chartStyleSetting = {};
      let chartOtherSetting = {};

      switch (chartType) {
        case "Bar Chart":
          chartStyleSetting = state.barSetting.value;
          chartOtherSetting = state.chartSetting.value.Recharts;
          break;
        case "Line Chart":
          chartStyleSetting = state.lineSetting.value;
          chartOtherSetting = state.chartSetting.value.Recharts;
          break;
        case "Area Chart":
          chartStyleSetting = state.areaSetting.value;
          chartOtherSetting = state.chartSetting.value.Recharts;
          break;
        case "Pie Chart":
          chartStyleSetting = state.pieSetting.value;
          chartOtherSetting = state.chartSetting.value.Recharts;
          break;
        case "Compose Chart":
          chartStyleSetting = {
            keys: state.composeSetting.value,
            BarSetting: state.barSetting.value,
            LineSetting: state.lineSetting.value,
            AreaSetting: state.areaSetting.value,
          };
          chartOtherSetting = state.chartSetting.value.Recharts;
          break;
        default:
          break;
      }

      // let defaultTable = targetPanel[0]?.data[0].dataName
      // if (targetPanel[0].transform_data.length > 0) defaultTable = targetPanel[0].transform_data[0].dataName

      return {
        dataArray: targetPanel[0]?.data,
        // defaultTable: defaultTable,
        defaultTable: targetPanel[0]?.data[0].dataName,
        chartType: chartType,
        chartSetting: { style: chartStyleSetting, other: chartOtherSetting },
        transformData: targetPanel[0]?.transform_data,
      };
    });

  let chart_data = [];
  if (transformData.length > 0) {
    chart_data = transformData[0].dataTable; ///////////////data[0] 不確定是否永遠data[0]
  } else {
    chart_data = dataArray[0].dataTable; ///////////////data[0] 不確定是否永遠data[0]
  }
  // let chart_data = dataArray[0].dataTable; ///////////////data[0] 不確定是否永遠data[0]
  let keysArry = [];
  if (chart_data && chart_data.length > 0) {
    keysArry = Object.keys(chart_data[0]);
  }

  /*******************************/
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const [table, setTable] = useState(defaultTable);

  useEffect(() => {
    if (transformData.length > 0) {
      setTable(transformData[0].dataName);
    } else {
      setTable(defaultTable);
    }
  }, [transformData]);

  const handleChangeTable = (event) => {
    setTable(event.target.value);
  };
  /*******************************/

  let tableSelector = (
    <FormControl
      sx={{
        minWidth: 120,
        marginBottom: "1rem",
        marginTop: "0.3rem",
      }}
    >
      <InputLabel>Table</InputLabel>
      <Select
        sx={{ padding: 0 }}
        value={table}
        // value={transformData.length > 0 ? transformData[0].dataName : table}
        label="Table"
        onChange={handleChangeTable}
      >
        {/* /////////////////////////////////////// */}
        {transformData.length > 0
          ? transformData.map((data, idx) => (
              <MenuItem key={idx} value={data.dataName}>
                {data.dataLabel}
              </MenuItem>
            ))
          : dataArray.map((data, idx) => (
              <MenuItem key={idx} value={data.dataName}>
                {data.dataLabel}
                {/* {data.datasource_url} */}
              </MenuItem>
            ))}
      </Select>
    </FormControl>
  );
  let tableTypes;
  if (transformData.length) {
    tableTypes = transformData.map((data, idx) => {
      if (data.dataName === table)
        return (
          <Box key={idx} paddingRight={2} paddingLeft={2}>
            {data.dataTable && Array.isArray(data.dataTable) && (
              <DataPanelTable
                data={data.dataTable}
                panelID={panelID}
                dataPanelID={data.dataName}
              />
            )}
          </Box>
        );
    });
  } else {
    tableTypes = dataArray.map((data, idx) => {
      if (data.dataName === table)
        return (
          <Box key={idx} paddingRight={2} paddingLeft={2}>
            {data.dataDetail &&
              Array.isArray(data.dataDetail) &&
              (data.datasource_url !== "http:" ||
                data.datasource_url !== "http:/") &&
              data.fetchError !== true &&
              data.fetchErrorMessage === "" && (
                <DataPanelTable
                  // data={data.dataDetail}
                  data={data.dataTable}
                  panelID={panelID}
                  dataPanelID={data.dataName}
                />
              )}
          </Box>
        );
    });
  }

  const GrpahPart = () => {
    return (
      <Box
        component="div"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
        p={2}
        m={2}
      >
        <ChartNameField panelID={panelID} />
        <GraphTypeSwitcher
          type={chartType}
          // data={dataDetail}
          data={chart_data}
          // width={500}
          // height={300}
          dataKey={keysArry.slice(1) || "name"} // 這邊之後應該要換成chartData的yKey
          chartSetting={chartSetting}
          XaxisName={keysArry[0] || "hi"} // 這邊之後應該要換成chartData的xKey
          // panelID={panelID}
        />
      </Box>
    );
  };

  const Switcher = () => {
    return (
      <FormControlLabel
        sx={{ marginLeft: "0.2rem" }}
        control={
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label="Table View"
      />
    );
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Switcher />
        {checked && dataArray.length > 0 ? tableSelector : ""}
      </Box>
      {checked && tableTypes}
      {!checked && chart_data.length > 0 && <GrpahPart />}
      {!checked && !chart_data.length && (
        <p style={{ textAlign: "center" }}>No Data to draw</p>
      )}
    </>
  );
};

export default React.memo(GraphBolck);
