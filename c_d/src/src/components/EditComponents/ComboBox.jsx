import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { setChartType, updateDataType } from "../../store";

const ComboBox = ({ panelID }) => {
  ////////////////////////////////
  const chartData = useSelector((state) => state.chartData)
  ////////////////////////////////

  // const charts = [
  //   "Line Chart",
  //   "Bar Chart",
  //   "Area Chart",
  //   "Pie Chart",
  //   "Time Series",
  // ];

  const dispatch1 = useDispatch();

  return (
    <Autocomplete
      disablePortal
      id="combo-box"
      // options={charts}
      //////////////////////////////////////
      options={chartData.allChartType}
      value={chartData.value.chartType}
      //////////////////////////////////////
      
      sx={{ width: "100%" }}
      renderInput={(params) => <TextField {...params} label="Charts" />}
      onChange={(e) => {
        console.log(typeof e.target.textContent);
        // dispatch({
        //   type: "CHANGE_CHART_TYPE",
        //   payload: e.target.textContent,
        // });
        const selectedType = e.target.textContent;
        console.log(
          "file: ComboBox.jsx:35 ~ ComboBox ~ selectedType:",
          selectedType
        );

        //////////////////////////////////////
        dispatch1(setChartType(selectedType))
        //////////////////////////////////////

        // dispatch1(updateDataType({ selectedType, panelID }));
      }}
    />
  );
};

export default ComboBox;
