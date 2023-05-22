import { Add, Close, DeleteForever } from "@mui/icons-material";
import { Autocomplete, Box, Button, IconButton, ListItemButton, ListItemText, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransformRules } from "../../store";
import Merge from "./TransformComponent/Merge";

const TransformBlock = ({panelID}) => {
  const [showCombo, setShowCombo] = useState(false)

  const dispatch = useDispatch()
  const { transformRules } = useSelector((state) => {
    const panelArray = state.widget.widgetArray;
    const targetPanel = panelArray.filter((panel) => panel.i === panelID);

    return {
      transformRules: targetPanel[0]?.transform_rules,
    };
  });

  const tranform_options = [
    { id: 'concatenate_fields', title: 'Concatenate fields', detail: 'detail...' },
    { id: 'merge', title: 'Merge', detail: 'detail...' },
  ]

  const rule_switcher = (rule, index) => {
    const ruleId = rule.id
    const ruleOption = rule.options

    switch (ruleId) {
      case 'merge':
        return <Merge panelID={panelID} index={index} name='Merge' key={index} />
      case 'concatenate_fields':
        return <Merge panelID={panelID} index={index} name='Concatenate fields' key={index} />
      
      default:
        break;
    }
  }


  return (
    <Box paddingTop={2}>
      {transformRules.map((rule, index) => rule_switcher(rule, index))}

      {showCombo ? (
        <Autocomplete
          id="combo-box"
          options={tranform_options}
          getOptionLabel={(option) => option.title}
          renderOption={(props, option) => (
            <ListItemButton
              key={option.id}
              sx={{ borderBottom: 1, borderColor: "#333333" }}
              onClick={(e) => {
                setShowCombo(false)
                dispatch(addTransformRules({ panelID: panelID, rule: { id: option.id, options: {} } }))
              }}
            >
              <ListItemText primary={option.title} secondary={option.detail} />
            </ListItemButton>
          )}
          renderInput={(params) => <TextField {...params} />}
          open={showCombo}
          onClose={() => setShowCombo(false)}
          popupIcon={<Close />}
          disablePortal={true} 
          size='small'
          sx={{ width: "100%", paddingTop: 2}}
        />
      ) : null}

      {showCombo ? null : (
        <Box paddingTop={2}>
          <Button
            onClick={() => setShowCombo(!showCombo)}
            sx={{ textTransform: 'none' }}
          >
            <Add />
            Add transformation
          </Button>
        </Box>
      )}

    </Box>
  )
};

export default TransformBlock;
