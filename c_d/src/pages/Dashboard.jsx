import { Box } from "@mui/material";
//import { useEffect } from "react";
import GridLayout from "../components/GridLayout";
import VariablesBlock from "../components/VariablesBlock";
import { useSelector } from "react-redux";

// import { useDispatch } from "react-redux";
// import {
//   fetchExistDashboard,
//   fetchExistDashboardVariable,
//   useFetchWidgetDataQuery,
// } from "../store";

const Dashboard = () => {
  // const dispatch = useDispatch();
  // const { data } = useFetchWidgetDataQuery();
  // console.log(data);
  // const panelArray = data?.widget?.widgetArray;
  // const variableArray = data?.variable?.variableArray;

  // useEffect(() => {
  //   data &&
  //     dispatch(fetchExistDashboard({ panelArray })) &&
  //     dispatch(fetchExistDashboardVariable({ variableArray }));
  // }, [data, panelArray, variableArray, dispatch]);

  const show = useSelector((state) => {
    return state.widget.widgetArray.filter(
      (panel) => panel.data.datasource_url === null
    );
  });

  return (
    <Box height="100%">
      {show.length ? "" : <VariablesBlock />}
      <GridLayout />
    </Box>
  );
};

export default Dashboard;
