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
import { useState } from "react";
import Switch from "@mui/material/Switch";
import DataPanelTable from "./EditComponents/DataSourceComponent/DataPanelTable";

const GraphBolck = ({ panelID }) => {
  // const { dataDetail, dataType } = useSelector((state) => {
  //   const panelArray = state.widget.widgetArray;
  //   const targetPanel = panelArray.filter((panel) => panel.i === panelID);

  //   return {
  //     dataDetail: targetPanel[0]?.data?.dataDetail,
  //     dataType: targetPanel[0]?.data?.dataType,
  //   };
  // });

  /////////////////////////////////////////
  const { dataDetail, chartType, chartSetting } = useSelector((state) => {
    const panelArray = state.widget.widgetArray;
    const targetPanel = panelArray.filter((panel) => panel.i === panelID);
    const chartType = state.chartData.value.chartType;

    let chartStyleSetting = {};
    let chartOtherSetting = {};
    if (chartType === "Bar Chart") {
      chartStyleSetting = state.barSetting.value;
      chartOtherSetting = state.chartSetting.value.Recharts;
    } else if (chartType === "Line Chart") {
      chartStyleSetting = state.lineSetting.value;
      chartOtherSetting = state.chartSetting.value.Recharts;
    } else if (chartType === "Area Chart") {
      chartStyleSetting = state.areaSetting.value;
      chartOtherSetting = state.chartSetting.value.Recharts;
    } else if (chartType === "Pie Chart") {
      chartStyleSetting = state.pieSetting.value;
      chartOtherSetting = state.chartSetting.value.Recharts;
    } else if (chartType === "Compose Chart") {
      chartStyleSetting = {
        keys: state.composeSetting.value,
        BarSetting: state.barSetting.value,
        LineSetting: state.lineSetting.value,
        AreaSetting: state.areaSetting.value,
      };
      chartOtherSetting = state.chartSetting.value.Recharts;
    }

    return {
      dataDetail: targetPanel[0]?.data[0]?.dataDetail, // data[0] 這邊之後可能不會是0 會是以selected query來選
      chartType: chartType,
      chartSetting: { style: chartStyleSetting, other: chartOtherSetting },
    };
  });
  /////////////////////////////////////////
  /*******************************/
  const { dataArray, defaultTable } = useSelector((state) => {
    const panelArray = state.widget.widgetArray;
    const targetPanel = panelArray.filter((panel) => panel.i === panelID);
    return {
      dataArray: targetPanel[0]?.data,
      defaultTable: targetPanel[0]?.data[0].dataName,
    };
  });
  /*******************************/

  let chart_data = dataArray[0].dataTable;
  let keysArry = []
  if (chart_data && chart_data.length > 0) {
    keysArry = Object.keys(chart_data[0]);
  }
  /*******************************/
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const [table, setTable] = useState(defaultTable);

  const handleChangeTable = (event) => {
    setTable(event.target.value);
  };
  /*******************************/
  return (
    <>      
      
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <FormControlLabel
            sx={{ marginLeft: "0.2rem", marginBottom: "2rem" }}
            control={
              <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Table View"
          />

          {checked ? (
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
                label="Table"
                onChange={handleChangeTable}
              >
                {dataArray.map((data, idx) => (
                  <MenuItem value={data.dataName}>
                    {data.datasource_url}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            ""
          )}
        </Box>

        {checked ? (
            dataArray.map((data) => {
              if (data.dataName === table)
                return (
                  <>
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
                  </>
                );
              
            })
          
        ) : (
          <Box
            component="div"
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              width: "100%",
              // border: 1
            }}
            p={2}
            // m={2}
            >
              <ChartNameField panelID={panelID} />
              <GraphTypeSwitcher
              type={chartType}
              // data={dataDetail}
              data={chart_data}
              width={500}
              height={300}
              dataKey={keysArry.slice(1,) || "name"} // 這邊之後應該要換成chartData的yKey
              chartSetting={chartSetting}
              XaxisName={keysArry[0] || "hi"} // 這邊之後應該要換成chartData的xKey
              panelID={panelID}
            />
            
          </Box>
        )}
    
      
    </>
  );
};

export default GraphBolck;
