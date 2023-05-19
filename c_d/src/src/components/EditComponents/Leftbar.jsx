import { Box } from "@mui/material";
import React from "react";
import GraphBolck from "../GraphBolck";
import DataSourceBlock from "./DataSourceBlock";

import { useState } from "react";
import SplitPane, { Pane, SashContent } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Leftbar = ({ panelID }) => {
  const [sizes, setSizes] = useState([400]);

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
          <Pane maxSize="100%">
            <GraphBolck panelID={panelID} />
          </Pane>
          <Pane style={{ overflowY: "auto", scrollPadding: "20px" }} minSize="0%">
            <DataSourceBlock panelID={panelID} />
          </Pane>
        </SplitPane>
      </Box>
    </Box>
  );
};

export default Leftbar;
