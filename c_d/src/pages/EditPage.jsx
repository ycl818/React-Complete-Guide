import { Box } from "@mui/material";
import Leftbar from "../components/EditComponents/Leftbar";
import Rightbar from "../components/EditComponents/Rightbar";
import { useState } from "react";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SplitPane, { Pane, SashContent } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";

const EditPage = () => {
  const locationPath = window.location.href;
  const panelID = locationPath.split("/")[4];

  const [sizes, setSizes] = useState([1200]);

  return (
    <Box
      style={{ height: "calc(100vh - 48px)" }}
      display="flex"
      overflow="auto"
      flexDirection="column"
    >
      <Box
        component="div"
        className="demo-wrap"
        flex={1}
        overflow="hidden"
        // style={{ margin: 0 }}
      >
        <SplitPane
          sizes={sizes}
          onChange={setSizes}
          resizerSize={10}
          sashRender={(index, active) => (
            <SashContent className="action-sash-wrap">
              <span
                className="action"
                // onClick={() => {
                //   setSizes([sizes[0] === 0 ? 250 : 0]);
                // }}
              >
                {sizes[0] > 1000 ? (
                  <NavigateBeforeIcon />
                ) : (
                  <NavigateNextIcon />
                )}
              </span>
            </SashContent>
          )}
        >
          <Pane>
            <Leftbar panelID={panelID} />
          </Pane>
          <Pane maxSize="40%" minSize="0%">
            <Rightbar panelID={panelID} />
          </Pane>
        </SplitPane>
      </Box>
    </Box>
  );
};

export default EditPage;
