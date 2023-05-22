import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import * as dfd from "danfojs";
import { useSelector } from "react-redux";

function generateRandom() {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

const adjustData = (data) => {
  return data?.map((item) => {
    return Object.keys(item).reduce((acc, key) => {
      if (typeof item[key] === "object") {
        acc[key] = "[object object]";
      } else {
        acc[key] = item[key];
      }
      return acc;
    }, {});
  });
};

const DataPanelTable = ({ data }) => {
  // console.log("file: DataPanelTable.jsx:17 ~ DataPanelTable ~ data:", data);
  console.log("RUNNNNNNNNN");

  useEffect(() => {
    setSourceData(adjustData(data));
  }, [data]);

  const [sourcedata, setSourceData] = useState(adjustData(data));
  const [selectedColumnName, setSelectedColumnName] = useState("");
  const [modificationValue, setModificationValue] = useState(0);
  const [selectedOperation, setSelectedOperation] = useState("addition");

  const df = new dfd.DataFrame(adjustData(data));

  const columns = df.columns.map((column) => ({
    field: column,
    headerName: column,
    width: 150,
  }));

  const handleColumnNameChange = (event) => {
    setSelectedColumnName(event.target.value);
  };

  const handleModificationValueChange = (event) => {
    setModificationValue(parseFloat(event.target.value));
  };

  const handleOperationChange = (event) => {
    setSelectedOperation(event.target.value);
  };

  const handleModifyColumn = (e) => {
    if (!selectedColumnName) {
      return;
    }
    console.log("i Click");
    let updatedData = [...sourcedata];
    let newdf = new dfd.DataFrame(updatedData);
    // console.log(
    //   "file: DataPanelTable.jsx:49 ~ handleModifyColumn ~ updatedData:",
    //   updatedData
    // );

    // console.log(
    //   "file: DataPanelTable.jsx:82 ~ handleModifyColumn ~ selectedColumnName:",
    //   updatedData[selectedColumnName]
    // );

    if (selectedOperation === "addition") {
      newdf[selectedColumnName] =
        newdf[selectedColumnName].add(modificationValue);
    } else if (selectedOperation === "subtraction") {
      newdf[selectedColumnName] =
        newdf[selectedColumnName].sub(modificationValue);
    } else if (selectedOperation === "multiplication") {
      newdf[selectedColumnName] =
        newdf[selectedColumnName].mul(modificationValue);
    } else if (selectedOperation === "division") {
      newdf[selectedColumnName] =
        newdf[selectedColumnName].div(modificationValue);
    }

    setSourceData(dfd.toJSON(newdf));
  };

  // useEffect(() => {
  //   let data = sourcedata;
  //   dispatch(updateData({ dataPanelID, panelID, data }));
  // }, [dispatch, sourcedata, panelID, dataPanelID]);

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ height: 400, width: "100%", marginBottom: "1rem" }}>
          {data && (
            <DataGrid
              rows={sourcedata}
              columns={columns}
              getRowId={(row) => generateRandom()}
              disableRowSelectionOnClick
            />
          )}
        </div>

        {/* <div style={{ marginLeft: "2rem" }}>
          <p>Modify Column:</p>
          <label htmlFor="column-name">Column Name:</label>
          <input
            type="text"
            id="column-name"
            value={selectedColumnName}
            onChange={handleColumnNameChange}
          />
          <br />
          <label htmlFor="modification-value">Modification Value:</label>
          <input
            type="number"
            id="modification-value"
            value={modificationValue}
            onChange={handleModificationValueChange}
          />
          <div>
            <label>
              <input
                type="radio"
                name="operation"
                value="addition"
                checked={selectedOperation === "addition"}
                onChange={handleOperationChange}
              />
              Add
            </label>
            <label>
              <input
                type="radio"
                name="operation"
                value="subtraction"
                checked={selectedOperation === "subtraction"}
                onChange={handleOperationChange}
              />
              Subtract
            </label>
            <label>
              <input
                type="radio"
                name="operation"
                value="multiplication"
                checked={selectedOperation === "multiplication"}
                onChange={handleOperationChange}
              />
              Multiply
            </label>
            <label>
              <input
                type="radio"
                name="operation"
                value="division"
                checked={selectedOperation === "division"}
                onChange={handleOperationChange}
              />
              Divide
            </label>
          </div>
          <button onClick={handleModifyColumn}>Modify Column</button>
        </div> */}
      </div>
    </>
  );
};

export default React.memo(DataPanelTable);
