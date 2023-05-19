import { Add, AddCircle, Delete, ExpandMore, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, RemoveCircle } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Button, IconButton, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setColumnName, setColumnSelect, setDefaultColumnSelect } from '../../../store'

const ColumnSelectAccordion = ({ panelID, data }) => {
  const dispatch = useDispatch()
  const [isTextFocused, setIsTextFocused] = useState(Array(data.columnName.length).fill(false))
  const [columnNameText, setColumnNameText] = useState(data.columnName)

  useEffect(() => {
    setColumnNameText(data.columnName)
  }, [data.columnName])
  
  const getValueFromKeys = (obj, keys) => {
    if (keys.length === 1) {
      return obj[keys[0]]
    }
    const current_key = keys[0]
    const current_obj = obj[current_key]
    if (current_obj === undefined) {
      return undefined
    }
    return getValueFromKeys(current_obj, keys.slice(1))
  }

  const onChangeColName = (e, col_index) => {
    let tmp = [...data.columnName]
    tmp[col_index] = e.target.value
    setColumnNameText(tmp)
  }

  return data.dataDetail?.length > 0 && data.acceptType ? (
    <Accordion disableGutters={true} sx={{ mt: 2, overflow: 'auto' }} >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Columns Selector</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction='column' spacing={2}>
          {data.columnSelect.map((colKeys, colIdx) => {
            const firstLayerKeys = Object.keys(data.dataDetail[0])
            const firstLayerCol = colKeys[0]
            const selectValue = getValueFromKeys(data.dataDetail[0], colKeys)
            const colName = columnNameText[colIdx]
            const colName_count = columnNameText.filter(n => n === colName).length

            return (
              <Stack direction='row' spacing={1} key={colIdx}>
                <IconButton
                  size='small'
                  color='secondary'
                  onClick={() => {
                    dispatch(setColumnSelect(
                      {
                        panelID: panelID,
                        dataPanelID: data.dataName,
                        colIdx: colIdx,
                        keyIdx: null,
                        action: 'delete_col',
                        value: null
                      }
                    ))
                  }}
                >
                  <Delete />
                </IconButton>
                <Button
                  disableRipple
                  disableFocusRipple
                  disableElevation
                  sx={{
                    color: "#5B9AFF",
                    backgroundColor: "#181B1F",
                    marginRight: "1rem",
                    "&:hover": { backgroundColor: "#181B1F" },
                  }}
                  variant="contained"
                >
                  {`${colIdx + 1}`}
                </Button>

                <Select
                  error={!firstLayerKeys.includes(firstLayerCol)}
                  renderValue= {(value) => value}
                  value={firstLayerCol}
                  onChange={(e) => {
                    dispatch(setColumnSelect(
                      {
                        panelID: panelID,
                        dataPanelID: data.dataName,
                        colIdx: colIdx,
                        keyIdx: 0,
                        action: 'update_key',
                        value: e.target.value
                      }
                    ))
                  }}
                  size='small'
                >
                  {firstLayerKeys.map((k) => <MenuItem key={`${colIdx}_0_${k}`} value={k}>{k}</MenuItem>)}
                </Select>

                {colKeys.length > 1 ? (
                  colKeys.slice(1,).map((key, keyIdx) => {
                    const keys = colKeys.slice(0, keyIdx + 1)
                    let selectKeys = getValueFromKeys(data.dataDetail[0], keys)
                    if (typeof selectKeys === 'object') {
                      selectKeys = Object.keys(selectKeys)
                    } else {
                      selectKeys = []
                    }
                    
                    return (
                      <Select
                        key={`${colIdx}_${keyIdx+1}`}
                        value={key}
                        onChange={(e) => {
                          dispatch(setColumnSelect(
                            {
                              panelID: panelID,
                              dataPanelID: data.dataName,
                              colIdx: colIdx,
                              keyIdx: keyIdx + 1,
                              action: 'update_key',
                              value: e.target.value
                            }
                          ))
                        }}
                        size='small'
                      >
                        {selectKeys.map((k) => <MenuItem key={`${colIdx}_${keyIdx+1}_${k}`} value={k}>{k}</MenuItem>)} 
                      </Select>
                    )
                  })
                ) : null}

                {typeof selectValue === 'object' ? (
                  <IconButton
                    color='primary'
                    size='small'
                    onClick={() => {
                      dispatch(setColumnSelect(
                        {
                          panelID: panelID,
                          dataPanelID: data.dataName,
                          colIdx: colIdx,
                          keyIdx: null,
                          action: 'add_key',
                          value: Object.keys(selectValue)[0]
                        }
                      ))
                    }}
                  >
                    <KeyboardDoubleArrowRight />
                  </IconButton>
                ) : null}
                
                {colKeys.length <= 1 ? null : (
                  <IconButton
                    size='small'
                    color='secondary'
                    onClick={() => {
                      dispatch(setColumnSelect(
                        {
                          panelID: panelID,
                          dataPanelID: data.dataName,
                          colIdx: colIdx,
                          keyIdx: colKeys.length-1,
                          action: 'delete_key',
                          value: null
                        }
                      ))
                    }}
                  >
                    <KeyboardDoubleArrowLeft />
                  </IconButton>
                )}
                <Button
                  disableRipple
                  disableFocusRipple
                  disableElevation
                  sx={{
                    color: "white",
                    backgroundColor: "#181B1F",
                    marginRight: "1rem",
                    "&:hover": { backgroundColor: "#181B1F" },
                    textTransform: 'none'
                  }}
                  variant="contained"
                >
                  as
                </Button>

                <TextField
                  sx={{width: '10%', minWidth: '10%'}}
                  size='small'
                  focused={isTextFocused[colIdx]}
                  multiline={isTextFocused[colIdx]}
                  maxRows={3}
                  error={colName_count > 1 || colName === '' }
                  label={colName_count > 1 || colName === '' ? 'error' : colName}
                  value={colName || ""}
                  onFocus={() => {
                    let tmp = Array(data.columnName.length).fill(false)
                    tmp[colIdx] = true
                    setIsTextFocused(tmp)
                  }}
                  onBlur={() => {
                    setIsTextFocused(Array(data.columnName.length).fill(false))
                    dispatch(setColumnName(
                      {
                        panelID: panelID,
                        dataPanelID: data.dataName,
                        colIdx: colIdx,
                        value: colName
                      }
                    ))
                  }}
                  onChange={(e) => onChangeColName(e, colIdx)}
                />

              </Stack>
            )
          })}
          <Stack direction='row' spacing={2}>
            <Button
              variant="outlined"
              size='small'
              onClick={() => {
                dispatch(setColumnSelect(
                  {
                    panelID: panelID,
                    dataPanelID: data.dataName,
                    colIdx: null,
                    keyIdx: null,
                    action: 'add_col',
                    value: [Object.keys(data.dataDetail[0])[0]]
                  }
                ))
              }}
              sx={{textTransform: 'none'}}
              // fullWidth
            >
              <Add/>
              Add Column
            </Button>
            <Button
              variant="outlined"
              size='small'
              onClick={() => {
                dispatch(setDefaultColumnSelect({ panelID: panelID, dataPanelID: data.dataName }))
              }}
              sx={{textTransform: 'none'}}
            >
              Set Default Column
            </Button>
          </Stack>
          
        </Stack>
      </AccordionDetails>
    </Accordion>
  ) : null
}

export default React.memo(ColumnSelectAccordion)
