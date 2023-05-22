import React, { useReducer, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Link } from "react-router-dom";
import DropdownTitle from "../DropdownTitle";
import { Box, Button, Typography } from "@mui/material";
import GraphTypeSwitcher from "../GraphTypeSwitcher";
import { v4 as uuidv4 } from "uuid";

const data = [
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
];

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const GridLayout = ({ chartState }) => {
  const title = `${chartState.title}` || "NewTitle";

  //   console.log("title is here:", title)
  const [layouts, setLayouts] = useState(null);
  const [widgetArray, setWidgetArray] = useState([
    { i: uuidv4(), x: 0, y: 0, w: 4, h: 1.5 },
  ]);

  const handleModify = (layouts, layout) => {
    const tempArray = widgetArray;
    setLayouts(layout);
    layouts?.map((position) => {
      tempArray[Number(position.i)].x = position.x;
      tempArray[Number(position.i)].y = position.y;
      tempArray[Number(position.i)].width = position.w;
      tempArray[Number(position.i)].height = position.h;
    });
    setWidgetArray(tempArray);
  };

  const handleAdd = () => {
    setWidgetArray([
      ...widgetArray,
      { i: uuidv4(), x: 0, y: -1, w: 4, h: 1.5 },
      //   { i: "Graph" + (widgetArray.length + 1), x: 0, y: 0, w: 1, h: 1 },
    ]);
    console.log(widgetArray);
  };

  const handleDelete = (key) => {
    const tempArray = widgetArray.slice();
    const index = tempArray.indexOf(tempArray.find((data) => data.i === key));
    tempArray.splice(index, 1);
    setWidgetArray(tempArray);
  };

  console.log(widgetArray);

  return (
    <Box sx={{ height: "100%" }}>
      {/* <button className="btn primary" >Add Widget</button> */}
      <Button variant="contained" onClick={() => handleAdd()}>
        Add Widget
      </Button>
      <ResponsiveReactGridLayout
        style={{ display: "flex" }}
        onLayoutChange={handleModify}
        verticalCompact={true}
        layout={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        preventCollision={false}
        cols={{ lg: 8, md: 8, sm: 6, xs: 4, xxs: 2 }}
        autoSize={true}
        margin={{
          lg: [20, 20],
          md: [20, 20],
          sm: [20, 20],
          xs: [20, 20],
          xxs: [20, 20],
        }}
      >
        {widgetArray?.map((widget, index) => {
          return (
            <Box
              component="div"
              className="reactGridItem"
              key={index}
              data-grid={{
                x: widget?.x,
                y: widget?.y,
                w: widget?.w,
                h: widget?.h,
                i: widget.i,
                minW: 1,
                maxW: Infinity,
                minH: 1,
                maxH: Infinity,
                isDraggable: true,
                isResizable: true,
              }}
            >
              <DropdownTitle title={`${chartState.title}` || "New Title"} />
              <br />
              {/* <Barchart height="100%"/> */}

              {chartState.type !== "" ? (
                <>
                  <Box
                    component="div"
                    sx={{ width: "100%", height: "100%", marginTop: "4rem" }}
                    p={3}
                  >
                    <GraphTypeSwitcher
                      type={`${chartState.type}`}
                      data={data}
                      width={500}
                      height={300}
                    />
                  </Box>
                </>
              ) : (
                <>
                  <Button
                    component={Link}
                    to={`/${title}/edit`}
                    sx={{ width: "100%", height: "100%" }}
                  >
                    <Typography variant="h5" sx={{ marginTop: "1rem" }}>
                      Add a new panel
                    </Typography>
                  </Button>
                  {/* <button
                    className="deleteButton"
                    onClick={() => handleDelete(widget.i)}
                  >
                    x
                  </button> */}
                </>
              )}

              {/* <div>{widget.i}</div> */}
            </Box>
          );
        })}
      </ResponsiveReactGridLayout>
    </Box>
  );
};

export default GridLayout;
