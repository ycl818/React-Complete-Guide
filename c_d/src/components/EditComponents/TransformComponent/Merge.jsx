import { Delete, ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionSummary, Autocomplete, Box, IconButton, ListItem, ListItemButton, ListItemText, TextField, Typography } from "@mui/material";
import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { deleteTransformRule } from "../../../store";

const Merge = ({ panelID, index, name }) => {
  const [expand, setExpand] = useState(false)
  const dispatch = useDispatch()
  return (
    <Box paddingTop={1}>
      <Accordion>
        <AccordionSummary
          expandIcon={
            <IconButton size='small' color='secondary' onClick={() => setExpand(!expand)}>
              <ExpandMore />
            </IconButton>
          }
          sx={{ display: 'flex', height: '50px' }}
        >
          <Typography variant='body2' sx={{ flexGrow: 1, p: 1 }}>{name}</Typography>
          <IconButton color='secondary' size='small' onClick={() => dispatch(deleteTransformRule({panelID, index}))}> <Delete /> </IconButton>
        </AccordionSummary>
      </Accordion>
    </Box>
  )
}

export default Merge
