import React, { useState } from "react";

import { useSelector } from "react-redux";

import { Drawer, Tab, Tabs, Box } from "@mui/material";

import AceEditor from "react-ace";
import { JSONTree } from "react-json-tree";
// import "ace-builds/webpack-resolver"
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-twilight";

import "ace-builds/src-noconflict/ext-language_tools";

const InspectDrawer = ({ panelID, setDrawerOpen, drawerOpen, dataPanelID }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  const { dataDetail, data } = useSelector((state) => {
    const panelArray = state.widget.widgetArray;
    const targetPanel = panelArray.filter((panel) => panel.i === panelID);
    const dataIndex = targetPanel[0]?.data.findIndex(
      (data) => data.dataName === dataPanelID
    );

    return {
      dataDetail: targetPanel[0]?.data[dataIndex]?.dataDetail,
      data: targetPanel[0]?.data,
    };
  });

  // const [editorData, setEditorData] = useState(dataDetail || []);

  return (
    <div>
      <Drawer
        anchor="right"
        open={drawerOpen}
        style={{ zIndex: 1250 }}
        PaperProps={{
          sx: { width: "50%", backgroundColor: "#181B1F" },
        }}
        onClose={() => setDrawerOpen(false)}
      >
        <Box>
          <Tabs value={tabIndex} onChange={handleTabChange}>
            <Tab label="Raw" sx={{ color: "white" }} />
            <Tab label="Tree" sx={{ color: "white" }} />
            <Tab label="Panel" sx={{ color: "white" }} />
          </Tabs>
        </Box>

        <Box sx={{ padding: 2 }}>
          {tabIndex === 0 && (
            <Box>
              <AceEditor
                mode="json"
                theme="twilight"
                name="layouteditor"
                width="100%"
                height="90vh"
                wrapEnabled
                readOnly={true}
                editorProps={{ $blockScrolling: true }}
                onChange={() => {}}
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={false}
                value={JSON.stringify(dataDetail, null, 2)}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                }}
              />
            </Box>
          )}
          {tabIndex === 1 && (
            <Box>
              <Box
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  height: "90vh",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    overflowY: "scroll",
                    position: "absolute",
                    height: "90vh",
                    width: "100%",
                  }}
                >
                  <JSONTree
                    data={dataDetail}
                    theme={{
                      // switch key for objects to uppercase when object is expanded.
                      // `nestedNodeLabel` receives additional argument `expandable`
                      tree: ({ style }) => ({
                        style: {
                          ...style,
                          backgroundColor: "#141414",
                          margin: 0,
                        }, // removing default background color from styles
                        className: "myTreeClassName",
                      }),
                      nestedNodeLabel: (
                        { style },
                        keyPath,
                        nodeType,
                        expanded
                      ) => ({
                        style: {
                          ...style,
                          textTransform: expanded
                            ? "uppercase"
                            : style.textTransform,
                        },
                      }),
                    }}
                  />
                </Box>
              </Box>
            </Box>
          )}
          {tabIndex === 2 && (
            <Box>
              <AceEditor
                mode="json"
                theme="twilight"
                name="layouteditor"
                width="100%"
                height="90vh"
                wrapEnabled
                readOnly={true}
                editorProps={{ $blockScrolling: true }}
                onChange={() => {}}
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={false}
                value={JSON.stringify(data, null, 2)}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                }}
              />
            </Box>
          )}
        </Box>
      </Drawer>
    </div>
  );
};

export default InspectDrawer;
