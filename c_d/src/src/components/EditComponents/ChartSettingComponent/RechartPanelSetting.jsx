import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, FormControl, FormControlLabel, FormLabel, Input, Slider, Stack, Switch, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setRechartPanel } from '../../../store'

const RechartPanelSetting = () => {
  const dispatch = useDispatch()
  const panelSetting = useSelector((state) => state.chartSetting.value.Recharts.RechartPanel)

  const [accordionExpand, setAccordionExpand] = useState(false)

  // panel dash setting
  const [isDash, setIsDash] = useState(panelSetting.stroke === '3 3')
  useEffect(() => {
    isDash ? dispatch(setRechartPanel({type: 'stroke', value: '3 3'})) : dispatch(setRechartPanel({type: 'stroke', value: '0'}))
    // isDash ? dispatch(setRechartPanelStroke('3 3')) : dispatch(setRechartPanelStroke('0'))
  }, [isDash])

  // panel opacity setting
  const [opacityValue, setOpacityValue] = useState(panelSetting.strokeOpacity * 100)
  useEffect(() => {
    dispatch(setRechartPanel({type: 'strokeOpacity', value: opacityValue / 100}))
    // dispatch(setRechartPanelStrokeOpacity(opacityValue / 100))
  }, [opacityValue])

  return (
    <Accordion expanded={accordionExpand} onChange={() => setAccordionExpand(!accordionExpand)} disableGutters={true}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Panel</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{p: 1.5, border: 1, borderColor: '#333333', borderRadius: 1}}>
          {/* Panel Dash setting */}
          <Stack spacing={2} direction="row" sx={{ mb: 3 }} alignItems="left">
            <Typography variant="body2">Dash</Typography>
            <Switch checked={isDash}/* color="secondary"*/ size="small" onChange={() => setIsDash(!isDash)} />
          </Stack>
            
          {/* Panel Opacity Setting */}
          <Stack spacing={0} direction="column" sx={{ mb: 3 }} alignItems="left">
            <Typography variant="body2" id="input-slider">Opacity</Typography>
            <Stack spacing={1} direction='row' alignItems='left'>
              <Slider
                size="small"
                // color="secondary"
                value={opacityValue}
                onChange={(_, value) => setOpacityValue(value)} //dispatch(setPanelStrokeOpacity(newValue))
                aria-labelledby="input-slider"
              />
              <Input
                value={opacityValue}
                size="small"
                onChange={(e) => setOpacityValue(e.target.value === '' ? 0 : Number(e.target.value))}
                onBlur={() => {
                  if (opacityValue < 0) {
                    setOpacityValue(0)
                  } else if (opacityValue > 100) {
                    setOpacityValue(100)
                  }
                }}
                inputProps={{
                  step: 10,
                  min: 0,
                  max: 100,
                  type: 'number',
                  'aria-labelledby': 'input-slider',
                }}
              />
            </Stack>
          </Stack>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default React.memo(RechartPanelSetting)
