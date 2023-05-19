import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import GraphBolck from "../GraphBolck";
import DataSourceBlock from "./DataSourceBlock";
import { BsDatabase } from "react-icons/bs";
import { TbTransform } from "react-icons/tb";
import { useState } from "react";
import SplitPane, { Pane, SashContent } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TransformBlock from "./TransformBlock";

const Leftbar = ({ panelID }) => {
  const [sizes, setSizes] = useState([400]);

  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  return (
    <Box
      display="flex"
      style={{ height: "calc(100vh - 100px)" }}
      flexDirection="column"
    >
      <Box
        component="div"
        className="demo-wrap"
        bgcolor={`rgba(0,0,0,0.2 )`}
        flex={1}
        color={"text.primary"}
        overflow="hidden"
        //sx={{ marginBottom: 0 }}
      >
        <SplitPane
          split="horizontal"
          sizes={sizes}
          onChange={setSizes}
          sashRender={(index, active) => (
            <SashContent className="action-sash-wrap">
              <span className="action">
                {sizes[0] !== 0 ? (
                  <ExpandLessIcon />
                ) : (
                  // <div style={{ transform: `rotate(180deg)` }}>^</div>
                  <ExpandMoreIcon />
                )}
              </span>
            </SashContent>
          )}
        >
          <Pane
            maxSize="100%"
            style={{ overflowY: "auto", scrollPadding: "20px" }}
          >
            <GraphBolck panelID={panelID} />
          </Pane>
          <Pane
            style={{ overflowY: "auto", scrollPadding: "20px" }}
            minSize="0%"
          >
            <Box
              sx={{
                marginTop: "1rem",
                "& .MuiTabs-scroller": {
                  height: "50px",
                },
                "& .MuiTabs-indecator": {
                  color: "orange",
                },

                "& .MuiButtonBase-root": {
                  textTransform: "none",
                  color: "#92806E",
                  padding: "0 9px",
                },
                "& .MuiTabs-flexContainer": {
                  height: "30px",
                },
              }}
            >
              <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                TabIndicatorProps={{
                  style: {
                    background:
                      "linear-gradient(90deg, rgba(254,133,51,1) 0%, rgba(245,96,61,1) 70%)",
                    height: "3px",
                  },
                }}
                sx={{
                  "& .Mui-selected": {
                    color: "white !important",
                  },
                }}
              >
                <Tab
                  icon={<BsDatabase />}
                  iconPosition="start"
                  label="Query"
                  sx={{
                    color: "white",
                  }}
                />
                <Tab
                  label="Transform"
                  icon={<TbTransform />}
                  iconPosition="start"
                  sx={{ color: "white" }}
                />
              </Tabs>
            </Box>
            <Box>{tabIndex === 0 && <DataSourceBlock panelID={panelID} />}</Box>
            <Box>{tabIndex === 1 && <TransformBlock panelID={panelID}/>}</Box>
          </Pane>
        </SplitPane>
      </Box>
    </Box>
  );
};

export default Leftbar;
