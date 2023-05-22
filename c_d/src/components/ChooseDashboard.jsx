import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import React from "react";
import { useDispatch } from "react-redux";
import { cleanUpAllPanel, loadUploadData, loadUploadVariable } from "../store";

const ChooseDashboard = ({ selectDashboard, setSelectDashboard }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    setSelectDashboard(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(e);
  };

  const data1 = {
    widget: {
      widgetArray: [
        {
          i: "1vuQx7WENiCPDr3xByfTk",
          x: 4,
          y: 0,
          w: 2,
          h: 2,
          panelName: "fake_data",
          data: {
            datasource: "link",
            datasource_url: "http://localhost:5001/test/fake_data",
            dataType: "Line Chart",
            dataDetail: [
              {
                name: "test1",
                x: -50,
                y: -50,
              },
              {
                name: "test2",
                x: 0,
                y: 0,
              },
              {
                name: "test3",
                x: 50,
                y: 50,
              },
              {
                name: "test4",
                x: 100,
                y: 100,
              },
              {
                name: "test5",
                x: 150,
                y: 150,
              },
              {
                name: "test6",
                x: 200,
                y: 200,
              },
              {
                name: "test7",
                x: 250,
                y: 250,
              },
              {
                name: "test8",
                x: 350,
                y: 350,
              },
              {
                name: "test9",
                x: 400,
                y: 400,
              },
              {
                name: "test10",
                x: 450,
                y: 450,
              },
              {
                name: "test11",
                x: 500,
                y: 500,
              },
            ],
          },
          fetchError: false,
          fetchErrorMessage: "",
        },
        {
          i: "CdScqlflFiy1Mc0nCvwmI",
          x: 6,
          y: 2,
          w: 2,
          h: 2,
          panelName: "fake_data/$project",
          data: {
            datasource: "link",
            datasource_url: "http://localhost:5001/test/fake_data/$project",
            dataType: "Bar Chart",
            dataDetail: [
              {
                name: "Page A",
                uv: 4000,
                pv: 2400,
                amt: 2400,
              },
              {
                name: "Page B",
                uv: 3000,
                pv: 1398,
                amt: 2210,
              },
              {
                name: "Page C",
                uv: 2000,
                pv: 9800,
                amt: 2290,
              },
              {
                name: "Page D",
                uv: 2780,
                pv: 3908,
                amt: 2000,
              },
              {
                name: "Page E",
                uv: 1890,
                pv: 4800,
                amt: 2181,
              },
              {
                name: "Page F",
                uv: 2390,
                pv: 3800,
                amt: 2500,
              },
              {
                name: "Page G",
                uv: 3490,
                pv: 4300,
                amt: 2100,
              },
            ],
          },
          fetchError: false,
          fetchErrorMessage: "",
        },
        {
          i: "oT5_zh2y49xueASEPyau5",
          x: 3,
          y: 2,
          w: 3,
          h: 2,
          panelName: "/fake_data/$project/$factory",
          data: {
            datasource: "link",
            datasource_url:
              "http://localhost:5001/test/fake_data/$project/$factory",
            dataType: "Bar Chart",
            dataDetail: [
              {
                name: "test1",
                x: -50,
                y: -50,
              },
              {
                name: "test2",
                x: 0,
                y: 0,
              },
              {
                name: "test3",
                x: 50,
                y: 50,
              },
              {
                name: "test4",
                x: 100,
                y: 100,
              },
              {
                name: "test5",
                x: 150,
                y: 150,
              },
              {
                name: "test6",
                x: 200,
                y: 200,
              },
              {
                name: "test7",
                x: 250,
                y: 250,
              },
              {
                name: "test8",
                x: 350,
                y: 350,
              },
              {
                name: "test9",
                x: 400,
                y: 400,
              },
              {
                name: "test10",
                x: 450,
                y: 450,
              },
              {
                name: "test11",
                x: 500,
                y: 500,
              },
            ],
          },
          fetchError: false,
          fetchErrorMessage: "",
        },
        {
          i: "npAtNsgz9yB36RaanFG7C",
          x: 0,
          y: 2,
          w: 3,
          h: 2,
          panelName: "panel1",
          data: {
            datasource: "link",
            datasource_url: "http://localhost:5001/test/fake_data/$project",
            dataType: "Line Chart",
            dataDetail: [
              {
                name: "Page A",
                uv: 4000,
                pv: 2400,
                amt: 2400,
              },
              {
                name: "Page B",
                uv: 3000,
                pv: 1398,
                amt: 2210,
              },
              {
                name: "Page C",
                uv: 2000,
                pv: 9800,
                amt: 2290,
              },
              {
                name: "Page D",
                uv: 2780,
                pv: 3908,
                amt: 2000,
              },
              {
                name: "Page E",
                uv: 1890,
                pv: 4800,
                amt: 2181,
              },
              {
                name: "Page F",
                uv: 2390,
                pv: 3800,
                amt: 2500,
              },
              {
                name: "Page G",
                uv: 3490,
                pv: 4300,
                amt: 2100,
              },
            ],
          },
          fetchError: false,
          fetchErrorMessage: "",
        },
        {
          i: "Xgujrms7GZ60LaMwKBaRe",
          x: 6,
          y: 0,
          w: 2,
          h: 2,
          panelName: "panel2",
          data: {
            datasource: "link",
            datasource_url: "http://localhost:5001/test/fake_data",
            dataType: "Pie Chart",
            dataDetail: [
              {
                name: "test1",
                x: -50,
                y: -50,
              },
              {
                name: "test2",
                x: 0,
                y: 0,
              },
              {
                name: "test3",
                x: 50,
                y: 50,
              },
              {
                name: "test4",
                x: 100,
                y: 100,
              },
              {
                name: "test5",
                x: 150,
                y: 150,
              },
              {
                name: "test6",
                x: 200,
                y: 200,
              },
              {
                name: "test7",
                x: 250,
                y: 250,
              },
              {
                name: "test8",
                x: 350,
                y: 350,
              },
              {
                name: "test9",
                x: 400,
                y: 400,
              },
              {
                name: "test10",
                x: 450,
                y: 450,
              },
              {
                name: "test11",
                x: 500,
                y: 500,
              },
            ],
          },
          fetchError: false,
          fetchErrorMessage: "",
        },
        {
          i: "UFi6UG63DHLJkS-3QZJwg",
          x: 0,
          y: 4,
          w: 4,
          h: 2,
          panelName: "Panel4",
          data: {
            datasource: "link",
            datasource_url: "http://localhost:5001/test/fake_data",
            dataType: "Area Chart",
            dataDetail: [
              {
                name: "test1",
                x: -50,
                y: -50,
              },
              {
                name: "test2",
                x: 0,
                y: 0,
              },
              {
                name: "test3",
                x: 50,
                y: 50,
              },
              {
                name: "test4",
                x: 100,
                y: 100,
              },
              {
                name: "test5",
                x: 150,
                y: 150,
              },
              {
                name: "test6",
                x: 200,
                y: 200,
              },
              {
                name: "test7",
                x: 250,
                y: 250,
              },
              {
                name: "test8",
                x: 350,
                y: 350,
              },
              {
                name: "test9",
                x: 400,
                y: 400,
              },
              {
                name: "test10",
                x: 450,
                y: 450,
              },
              {
                name: "test11",
                x: 500,
                y: 500,
              },
            ],
          },
          fetchError: false,
          fetchErrorMessage: "",
        },
        {
          i: "LKzScZlmLFFYZzVb7GtKA",
          x: 0,
          y: 0,
          w: 4,
          h: 2,
          panelName: "Panel3",
          data: {
            datasource: "link",
            datasource_url: "http://localhost:5001/test/fake_data2",
            dataType: "Area Chart",
            dataDetail: [
              {
                name: "Page A",
                uv: 4000,
                pv: 2400,
                amt: 2400,
              },
              {
                name: "Page B",
                uv: 3000,
                pv: 1398,
                amt: 2210,
              },
              {
                name: "Page C",
                uv: 2000,
                pv: 9800,
                amt: 2290,
              },
              {
                name: "Page D",
                uv: 2780,
                pv: 3908,
                amt: 2000,
              },
              {
                name: "Page E",
                uv: 1890,
                pv: 4800,
                amt: 2181,
              },
              {
                name: "Page F",
                uv: 2390,
                pv: 3800,
                amt: 2500,
              },
              {
                name: "Page G",
                uv: 3490,
                pv: 4300,
                amt: 2100,
              },
            ],
          },
          fetchError: false,
          fetchErrorMessage: "",
        },
        {
          i: "pX5JyYZ9LeBZd7xppvN-Q",
          x: 4,
          y: 4,
          w: 2,
          h: 2,
          panelName: "",
          data: {
            datasource: "link",
            datasource_url: "http://localhost:5001/test/fake_data2",
            dataType: "Line Chart",
            dataDetail: [
              {
                name: "Page A",
                uv: 4000,
                pv: 2400,
                amt: 2400,
              },
              {
                name: "Page B",
                uv: 3000,
                pv: 1398,
                amt: 2210,
              },
              {
                name: "Page C",
                uv: 2000,
                pv: 9800,
                amt: 2290,
              },
              {
                name: "Page D",
                uv: 2780,
                pv: 3908,
                amt: 2000,
              },
              {
                name: "Page E",
                uv: 1890,
                pv: 4800,
                amt: 2181,
              },
              {
                name: "Page F",
                uv: 2390,
                pv: 3800,
                amt: 2500,
              },
              {
                name: "Page G",
                uv: 3490,
                pv: 4300,
                amt: 2100,
              },
            ],
          },
          fetchError: false,
          fetchErrorMessage: "",
        },
        {
          i: "OHv04E5mCIrBC6u-q42z1",
          x: 6,
          y: 4,
          w: 2,
          h: 2,
          panelName: "",
          data: {
            datasource: "link",
            datasource_url: "http://localhost:5001/test/fake_data",
            dataType: "Area Chart",
            dataDetail: [
              {
                name: "test1",
                x: -50,
                y: -50,
              },
              {
                name: "test2",
                x: 0,
                y: 0,
              },
              {
                name: "test3",
                x: 50,
                y: 50,
              },
              {
                name: "test4",
                x: 100,
                y: 100,
              },
              {
                name: "test5",
                x: 150,
                y: 150,
              },
              {
                name: "test6",
                x: 200,
                y: 200,
              },
              {
                name: "test7",
                x: 250,
                y: 250,
              },
              {
                name: "test8",
                x: 350,
                y: 350,
              },
              {
                name: "test9",
                x: 400,
                y: 400,
              },
              {
                name: "test10",
                x: 450,
                y: 450,
              },
              {
                name: "test11",
                x: 500,
                y: 500,
              },
            ],
          },
          fetchError: false,
          fetchErrorMessage: "",
        },
      ],
    },
    variable: {
      variableArray: [
        {
          variableName: "project",
          defaultValue: "Test",
          id: "NG88ufb1mm94ylU94wIub",
        },
        {
          variableName: "factory",
          defaultValue: "A12",
          id: "r-LHvotmfjFg8Ij7pnpoH",
        },
      ],
    },
    fetchFromDataBase: {
      queries: {},
      mutations: {},
      provided: {},
      subscriptions: {},
      config: {
        online: true,
        focused: true,
        middlewareRegistered: true,
        refetchOnFocus: false,
        refetchOnReconnect: false,
        refetchOnMountOrArgChange: false,
        keepUnusedDataFor: 60,
        reducerPath: "fetchFromDataBase",
      },
    },
  };

  const data2 = {
    widget: {
      widgetArray: [
        {
          i: "ZYafjgMq69FHAjQvwhV87",
          x: 0,
          y: 0,
          w: 3,
          h: 2,
          panelName: "",
          data: {
            datasource: "link",
            datasource_url: "http://localhost:5001/test/fake_data",
            dataType: "Line Chart",
            dataDetail: [
              {
                name: "test1",
                x: -50,
                y: -50,
              },
              {
                name: "test2",
                x: 0,
                y: 0,
              },
              {
                name: "test3",
                x: 50,
                y: 50,
              },
              {
                name: "test4",
                x: 100,
                y: 100,
              },
              {
                name: "test5",
                x: 150,
                y: 150,
              },
              {
                name: "test6",
                x: 200,
                y: 200,
              },
              {
                name: "test7",
                x: 250,
                y: 250,
              },
              {
                name: "test8",
                x: 350,
                y: 350,
              },
              {
                name: "test9",
                x: 400,
                y: 400,
              },
              {
                name: "test10",
                x: 450,
                y: 450,
              },
              {
                name: "test11",
                x: 500,
                y: 500,
              },
            ],
          },
          fetchError: false,
          fetchErrorMessage: "",
        },
        {
          i: "FglTIIdNu4COKuWhYNtl6",
          x: 3,
          y: 0,
          w: 3,
          h: 2,
          panelName: "",
          data: {
            datasource: "link",
            datasource_url: "http://localhost:5001/test/fake_data2",
            dataType: "Bar Chart",
            dataDetail: [
              {
                name: "Page A",
                uv: 4000,
                pv: 2400,
                amt: 2400,
              },
              {
                name: "Page B",
                uv: 3000,
                pv: 1398,
                amt: 2210,
              },
              {
                name: "Page C",
                uv: 2000,
                pv: 9800,
                amt: 2290,
              },
              {
                name: "Page D",
                uv: 2780,
                pv: 3908,
                amt: 2000,
              },
              {
                name: "Page E",
                uv: 1890,
                pv: 4800,
                amt: 2181,
              },
              {
                name: "Page F",
                uv: 2390,
                pv: 3800,
                amt: 2500,
              },
              {
                name: "Page G",
                uv: 3490,
                pv: 4300,
                amt: 2100,
              },
            ],
          },
          fetchError: false,
          fetchErrorMessage: "",
        },
        {
          i: "QMWbl7Vr9KwfWQFIY_g6T",
          x: 6,
          y: 0,
          w: 2,
          h: 2,
          panelName: "",
          data: {
            datasource: "link",
            datasource_url: "http://localhost:5001/test/fake_data",
            dataType: "Area Chart",
            dataDetail: [
              {
                name: "test1",
                x: -50,
                y: -50,
              },
              {
                name: "test2",
                x: 0,
                y: 0,
              },
              {
                name: "test3",
                x: 50,
                y: 50,
              },
              {
                name: "test4",
                x: 100,
                y: 100,
              },
              {
                name: "test5",
                x: 150,
                y: 150,
              },
              {
                name: "test6",
                x: 200,
                y: 200,
              },
              {
                name: "test7",
                x: 250,
                y: 250,
              },
              {
                name: "test8",
                x: 350,
                y: 350,
              },
              {
                name: "test9",
                x: 400,
                y: 400,
              },
              {
                name: "test10",
                x: 450,
                y: 450,
              },
              {
                name: "test11",
                x: 500,
                y: 500,
              },
            ],
          },
          fetchError: false,
          fetchErrorMessage: "",
        },
      ],
    },
    variable: {
      variableArray: [],
    },
    fetchFromDataBase: {
      queries: {},
      mutations: {},
      provided: {},
      subscriptions: {},
      config: {
        online: true,
        focused: true,
        middlewareRegistered: true,
        refetchOnFocus: false,
        refetchOnReconnect: false,
        refetchOnMountOrArgChange: false,
        keepUnusedDataFor: 60,
        reducerPath: "fetchFromDataBase",
      },
    },
  };

  const handleOnclick = (name) => {
    console.log("file: ChooseDashboard.jsx:1304 ~ handleOnclick ~ name:", name);

    if (name === "20230419_114006_DashboardConfig.josn") {
      const widgetArray = data1.widget?.widgetArray;
      const variableArray = data1.variable?.variableArray;

      dispatch(cleanUpAllPanel());

      dispatch(loadUploadData({ widgetArray }));
      dispatch(loadUploadVariable({ variableArray }));
    } else if (name === "20230419_100048_DashboardConfig.json") {
      const widgetArray = data2.widget?.widgetArray;
      const variableArray = data2.variable?.variableArray;

      dispatch(cleanUpAllPanel());
      dispatch(loadUploadData({ widgetArray }));
      dispatch(loadUploadVariable({ variableArray }));
    }

    handleClose();
  };

  const jsonList = [
    { fileName: "20230419_114006_DashboardConfig.josn" },
    { fileName: "20230419_100048_DashboardConfig.json" },
    { fileName: "20230419_094507_DashboardConfig.json" },
  ];

  return (
    <Dialog open={selectDashboard} onClose={handleClose}>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        Select Dashboard{" "}
        <CloseIcon
          onClick={handleClose}
          sx={{ "&:hover": { cursor: "pointer" } }}
        />
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            Select the one of following dashboard configurations
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <List>
            {jsonList.map((listElement) => (
              <ListItem
                key={listElement.fileName}
                onClick={() => {
                  handleOnclick(listElement.fileName);
                }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <InsertDriveFileIcon />
                  </ListItemIcon>
                  <ListItemText>{listElement.fileName}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ChooseDashboard;
