import React from "react";
// import { ChartTypeSwitcher } from "../ChartTypeSwitcher";
import { Box } from "@mui/material";
import BarChartDisplay from "./EditComponents/ChartDisplayComponent/BarChartDisplay";
import AreaChartDisplay from './EditComponents/ChartDisplayComponent/AreaChartDisplay'
import PieChartDisplay from './EditComponents/ChartDisplayComponent/PieChartDisplay'
import LineChartDisplay from "./EditComponents/ChartDisplayComponent/LineChartDisplay";
import ComposeDisplay from "./EditComponents/ChartDisplayComponent/ComposeDisplay";

const GraphTypeSwitcher = ({
  type,
  data,
  // width,
  // height,
  XaxisName,
  dataKey,
  // panelID,
  chartSetting
}) => {

  const chart_switcher = () => {
    switch (type) {
      case 'Bar Chart':
        return <BarChartDisplay data={data} xKey={XaxisName} yKey={dataKey} styleSetting={chartSetting.style} otherSetting={chartSetting.other} />
      case 'Line Chart':
        return <LineChartDisplay data={data} xKey={XaxisName} yKey={dataKey} styleSetting={chartSetting.style} otherSetting={chartSetting.other} />
      case 'Area Chart':
        return <AreaChartDisplay data={data} xKey={XaxisName} yKey={dataKey} styleSetting={chartSetting.style} otherSetting={chartSetting.other} />
      case 'Pie Chart':
        return <PieChartDisplay data={data} xKey={XaxisName} yKey={dataKey} styleSetting={chartSetting.style} otherSetting={chartSetting.other} />
      case 'Compose Chart':
        return <ComposeDisplay data={data} xKey={XaxisName} styleSetting={chartSetting.style} otherSetting={chartSetting.other} />
      default:
        break;
    }
  }

  return (
    // <ChartTypeSwitcher
    //   type={type}
    //   data={data}
    //   width={width}
    //   height={height}
    //   XaxisName={XaxisName}
    //   dataKey={dataKey}
    //   panelID={panelID}
    // />

    <Box
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        // borderColor: '#333333'
      }}
    >
      {/* {chart_switcher()} */}
      {data?.length ? chart_switcher() : null}
    </Box>
  );
};

export default GraphTypeSwitcher;
