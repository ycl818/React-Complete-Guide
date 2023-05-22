import { Box, Button, Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Dialoag from "./Dialoag";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchErrorShowBorder,
  removeVariable,
  updateData,
  updateDataByURL,
  updateTargetVariable,
} from "../../store";
import axios from "axios";

// const rows = [
//   { id: 1, variable: "product", Definition: "Test" },
//   { id: 2, variable: "project", Definition: "all" },
// ];

const SettingVariables = () => {
  const [open, setOpen] = useState(false);

  const rows = useSelector((state) => {
    return state.variable.variableArray;
  });

  const { panelURLs, variableArray } = useSelector((state) => {
    const panelURLs = state.widget.widgetArray.map((panel) => {
      return { id: panel.i, url: panel.data.datasource_url };
    });

    const variableArray = state.variable.variableArray;
    return { panelURLs, variableArray };
  });

  const { allPanelURLs } = useSelector((state) => {
    const panelArray = state.widget.widgetArray;
    const allPanelURLs = panelArray.map((panel) => {
      const siglePanelURLs = panel.data.map((dataPanel) => {
        return {
          dataPanelID: dataPanel.dataName,
          dataPanelURL: dataPanel.datasource_url,
        };
      });
      return { id: panel.i, url: siglePanelURLs };
    });
    return {
      allPanelURLs,
    };
  });

  const dispatch = useDispatch();

  const columns = [
    //{ field: "id", headerName: "ID", width: 200, hidden: true, editable: true },
    {
      field: "variableName",
      headerName: "Variable",
      width: 150,
      editable: true,
    },
    {
      field: "defaultValue",
      headerName: "Default Value",
      width: 150,
      editable: true,
    },
    {
      field: "remove",
      headerName: "",
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      disableColumnSelector: true,
      disableColumnFilter: true,
      renderCell: (params) => {
        const handleClick = (e) => {
          e.stopPropagation();
          const target = params.row.variableName;
          dispatch(removeVariable({ target }));
          const targetURLs = panelURLs.filter((panel) =>
            panel.url.includes(target)
          );
          const newTargetURLs = targetURLs?.map((panel) => {
            let panelURL = panel.url;
            const filteredVariableArray = variableArray.filter(
              (variable) => variable.variableName !== target
            );
            // eslint-disable-next-line
            filteredVariableArray.map((variable) => {
              if (panelURL.includes(`@${variable.variableName}`)) {
                panelURL = panelURL.replace(
                  new RegExp(`@${variable.variableName}`, "g"),
                  variable.defaultValue
                );
              }
            });
            return { id: panel.id, url: panelURL };
          });

          Promise.all(
            newTargetURLs.map(async (panel) => {
              try {
                const response = await axios.get(panel.url);
                const id = panel.id;
                let result = response?.data;
                const res = false;
                const message = "";
                // find url is in which panel then update
                dispatch(updateDataByURL({ result, id }));
                dispatch(fetchErrorShowBorder({ res, id, message }));
              } catch (error) {
                const id = panel.id;
                const res = true;
                const message = error.message;
                dispatch(fetchErrorShowBorder({ res, id, message }));
              }
            })
          )
            .then((responses) => {
              console.log(responses);
            })
            .catch((error) => {
              console.error(error);
            });
        };
        return (
          <Button onClick={handleClick}>
            <DeleteIcon style={{ fontSize: "16px", marginRight: "0.5rem" }} />
          </Button>
        );
      },
    },
  ];

  const handleProcessRowUpdate = (newRow, oldRow) => {
    dispatch(updateTargetVariable({ newRow }));

    const filteredArray = allPanelURLs
      .flatMap((panel) => panel.url.map((url) => ({ id: panel.id, ...url })))
      .filter(({ dataPanelURL }) => dataPanelURL.includes(newRow.variableName));

    const newFilteredArray = filteredArray
      .map((item) => {
        let newUrl = item.dataPanelURL;
        if (newUrl.includes(newRow.variableName)) {
          newUrl = newUrl.replace(
            new RegExp(`@${newRow.variableName}`, "g"),
            newRow.defaultValue
          );
        }
        return {
          id: item.id,
          dataPanelID: item.dataPanelID,
          dataPanelURL: newUrl,
        };
      })
      .map((item) => {
        let newUrl = item.dataPanelURL;
        variableArray.forEach((variable) => {
          if (newUrl?.includes(`@${variable.variableName}`)) {
            newUrl = newUrl.replace(
              new RegExp(`@${variable.variableName}`, "g"),
              variable.defaultValue
            );
          }
        });
        return {
          id: item.id,
          dataPanelID: item.dataPanelID,
          dataPanelURL: newUrl,
        };
      });
    console.log(
      "file: SettingVariables.jsx:182 ~ newFilteredArray ~ newFilteredArray:",
      newFilteredArray
    );

    const filterFirstPanelsURL = allPanelURLs.map((panel) => {
      const newSigleDataPanelURLs = panel.url.map((dataPanel) => {
        let newUrl = dataPanel.dataPanelURL;
        if (newUrl.includes(newRow.variableName)) {
          newUrl = newUrl.replace(
            new RegExp(`@${newRow.variableName}`, "g"),
            newRow.defaultValue
          );
        }
        return { dataPanelID: dataPanel.dataPanelID, dataPanelURL: newUrl };
      });
      return { id: panel.id, url: newSigleDataPanelURLs };
    });
    console.log(
      "file: SettingVariables.jsx:157 ~ filterFirstPanelsURL ~ filterFirstPanelsURL:",
      filterFirstPanelsURL
    );

    const filterTwicePanelsURL = filterFirstPanelsURL.map((panel) => {
      const newSigleDataPanelURLs = panel.url.map((dataPanel) => {
        let newUrl = dataPanel?.dataPanelURL;
        variableArray.forEach((variable) => {
          if (newUrl?.includes(`@${variable.variableName}`)) {
            newUrl = newUrl.replace(
              new RegExp(`@${variable.variableName}`, "g"),
              variable.defaultValue
            );
          }
        });
        return { dataPanelID: dataPanel.dataPanelID, dataPanelURL: newUrl };
      });
      return { id: panel.id, url: newSigleDataPanelURLs };
    });

    console.log(
      "file: SettingVariables.jsx:177 ~ filterTwicePanelsURL ~ filterTwicePanelsURL:",
      filterTwicePanelsURL
    );

    Promise.all(
      filterTwicePanelsURL.map((panel) => {
        panel.url.forEach(async (dataPanel) => {
          try {
            if (!dataPanel.dataPanelURL) return;
            const response = await axios.get(dataPanel.dataPanelURL);
            const panelID = panel.id;
            const id = panel.id;
            const data = response.data;
            const dataPanelID = dataPanel.dataPanelID;
            const res = false;
            const message = "";
            dispatch(updateData({ data, panelID, dataPanelID }));
            dispatch(fetchErrorShowBorder({ id, res, message, dataPanelID }));
          } catch (error) {
            const id = panel.id;
            const dataPanelID = dataPanel.dataPanelID;
            const res = true;
            const message = error.message;

            console.log(
              "file: VariableAccordion.jsx:84 ~ filteredURLs.map ~ panel.url:",
              panel.url
            );
            dispatch(fetchErrorShowBorder({ res, id, message, dataPanelID }));
          }
        });
      })
    )
      .then((responses) => {
        console.log(responses);
      })
      .catch((error) => {
        console.error(error);
      });

    // const targetURLs = panelURLs.filter((panel) =>
    //   panel.url.includes(newRow.variableName)
    // );

    // const newTargetURLs = targetURLs?.map((panel) => {
    //   let panelURL = panel.url;
    //   console.log(
    //     "file: SettingVariables.jsx:79 ~ newTargetURLs ~ panelURL:",
    //     panelURL
    //   );

    //   if (panelURL.includes(newRow.variableName)) {
    //     panelURL = panelURL.replace(
    //       new RegExp(`@${newRow.variableName}`, "g"),
    //       newRow.defaultValue
    //     );
    //   }
    //   // eslint-disable-next-line
    //   variableArray.map((variable) => {
    //     if (panelURL.includes(`@${variable.variableName}`)) {
    //       panelURL = panelURL.replace(
    //         new RegExp(`@${variable.variableName}`, "g"),
    //         variable.defaultValue
    //       );
    //     }
    //   });

    //   console.log("file: NEW~ newTargetURLs ~ panelURL:", panelURL);
    //   return { id: panel.id, url: panelURL };
    // });

    // Promise.all(
    //   newTargetURLs.map(async (panel) => {
    //     try {
    //       const response = await axios.get(panel.url);
    //       const id = panel.id;
    //       let result = response?.data;
    //       const res = false;
    //       const message = "";
    //       // find url is in which panel then update
    //       dispatch(updateDataByURL({ result, id }));
    //       dispatch(fetchErrorShowBorder({ res, id, message }));
    //     } catch (error) {
    //       const id = panel.id;
    //       const res = true;
    //       const message = error.message;
    //       dispatch(fetchErrorShowBorder({ res, id, message }));
    //     }
    //   })
    // )
    //   .then((responses) => {
    //     console.log(responses);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  return (
    <Box bgcolor="#181B1F" className="fullHeightBox">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          style={{ color: "white", padding: "2rem", fontSize: "1.5rem" }}
        >
          Variables
        </Typography>
        <Button
          variant="contained"
          sx={{ marginRight: "5rem" }}
          onClick={() => {
            setOpen(true);
          }}
        >
          New
        </Button>
      </Box>
      <Divider
        sx={{
          backgroundColor: "white",
          borderBottomWidth: 1,
          width: "100%",
          textAlign: "center",
        }}
      />
      <Box
        sx={{
          height: "80%",
          width: "100%",
          padding: "2rem",
          "& .MuiDataGrid-root": {
            color: "white",
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: `1px solid #48494e !important`,
          },
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: `1px solid pink !important`,
          },
          "& .MuiDataGrid-columnSeparator": {
            visibility: "hidden",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          //hideFooter={true}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
          processRowUpdate={handleProcessRowUpdate}
          onProcessRowUpdateError={(error) => console.log(error)}
        />
      </Box>

      <Dialoag open={open} setOpen={setOpen} />
    </Box>
  );
};

export default SettingVariables;
