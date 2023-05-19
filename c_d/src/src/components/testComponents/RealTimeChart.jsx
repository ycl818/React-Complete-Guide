// import React, { useState, useEffect } from "react";
// import {
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   LineChart,
//   Line,
//   ResponsiveContainer,
// } from "recharts";
// import { fetchEventSource } from "@microsoft/fetch-event-source";
// import { useDispatch, useSelector } from "react-redux";
// import { updateData } from "../../store";

// function formatTime(timestamp) {
//   const date = new Date(timestamp);
//   return `${date.toLocaleTimeString("en-US", { hour12: false })}`;
// }

export default function RealTimeChart({ panelID }) {
  // let { serverURL } = useSelector((state) => {
  //   const panelArray = state.widget.widgetArray;
  //   const targetPanel = panelArray.filter((panel) => panel.i === panelID);
  //   return {
  //     serverURL: targetPanel[0]?.data?.datasource_url,
  //     dataDetail: targetPanel[0]?.data?.dataDetail,
  //   };
  // });
  // console.log(
  //   "file: RealTimeChart.jsx:34 ~ let{serverURL}=useSelector ~ serverURL:",
  //   serverURL
  // );
  // const dispatch = useDispatch();

  // const [domain] = useState([null, null]);

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   const controller = new AbortController();
  //   const fetchData = async () => {
  //     if (serverURL) {
  //       await fetchEventSource(serverURL, {
  //         signal: controller.signal,
  //         onmessage(ev) {
  //           const newData = JSON.parse(ev.data);
  //           console.log(
  //             " file: RealTimeChart.jsx:58 ~ onmessage ~ newData:",
  //             newData
  //           );
  //           setData((prevData) => [...prevData, newData]); // update newDataArray
  //         },
  //         onclose() {
  //           console.log("Connection Closed by the Server");
  //         },
  //         onerror(err) {
  //           console.log("There was an error from the Server!", err);
  //         },
  //       });
  //     }
  //   };

  //   fetchData();

  //   return () => {
  //     controller.abort();
  //   };
  // }, [serverURL]);

  // useEffect(() => {
  //   if (data.length > 0) {
  //     dispatch(updateData({ data, panelID }));
  //   }
  // }, [data, dispatch, panelID]);

  // useEffect(() => {
  //   setData([]); // clear data array when serverURL changes
  // }, [serverURL]);

  // // calculate domain of XAxis based on current time
  // const now = new Date();
  // const defaultDomain = [now.getTime() - 60000, now.getTime()];

  // // filter data to show only the past 10 seconds
  // const filteredData = data.filter((d) => d.timestamp > now.getTime() - 60000);

  // handle chart domain change on brush change event
  // const handleBrushChange = (event) => {
  //   if (event.startIndex === 0 && event.endIndex === filteredData.length - 1) {
  //     setDomain(null);
  //   } else {
  //     setDomain([
  //       filteredData[event.startIndex].timestamp,
  //       filteredData[event.endIndex].timestamp,
  //     ]);
  //   }
  // };
  // calculate the YAxis domain to center the line chart
  // const yValues = filteredData.map((d) => d.value);
  // const minValue = Math.min(...yValues);
  // const maxValue = Math.max(...yValues);
  // const range = maxValue - minValue;
  // const middleValue = minValue + range / 2;
  // const yDomain = [middleValue - range / 2, middleValue + range / 2];

  return (
    // <ResponsiveContainer>
    //   <LineChart data={filteredData}>
    //     <CartesianGrid strokeDasharray="3 3" />
    //     <XAxis
    //       dataKey="timestamp"
    //       domain={domain || defaultDomain}
    //       tickFormatter={formatTime}
    //       type="number"
    //     />
    //     <YAxis />
    //     <Tooltip labelFormatter={formatTime} />
    //     <Legend />
    //     <Line dataKey="value" stroke="#8884d8" />
    //     {/* <Brush
    //         stroke="#8884d8"
    //         dataKey="timestamp"
    //         startIndex={filteredData.length - 1000}
    //         endIndex={filteredData.length - 1}
    //         onChange={handleBrushChange}
    //       /> */}
    //   </LineChart>
    // </ResponsiveContainer>
    <h1>hi</h1>
  );
}
