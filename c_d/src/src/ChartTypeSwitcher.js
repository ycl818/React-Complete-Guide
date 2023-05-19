import React from "react";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  LineChart,
  AreaChart,
  PieChart,
  Pie,
  Line,
  Area,
} from "recharts";
import RealTimeChart from "./components/testComponents/RealTimeChart";

export const ChartTypeSwitcher = ({
  type,
  data,
  width,
  height,
  XaxisName,
  dataKey,
  panelID,
}) => {
  // console.log(width, height)
  // console.log(data)
  switch (type) {
    case "Pie Chart":
      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={width} height={height}>
            <Pie
              data={data}
              dataKey={`${dataKey}`}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              isAnimationActive={true}
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      );
    case "Line Chart":
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={`${XaxisName}`} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={`${dataKey}`}
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey={`${dataKey}`} stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      );
    case "Bar Chart":
      return (
        <ResponsiveContainer width="100%" height={(height = "100%")}>
          <BarChart
            width={width}
            height={height}
            data={data}
            margin={{
              top: 35,
              right: 20,
              left: 20,
              bottom: 5,
            }}
            padding={5}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={`${XaxisName}`} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={`${dataKey}`} fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      );
    case "Area Chart":
      return (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={`${XaxisName}`} />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey={`${dataKey}`}
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      );
    case "Time Series":
      return <RealTimeChart panelID={panelID} />;
    default:
      return null;
  }
};
