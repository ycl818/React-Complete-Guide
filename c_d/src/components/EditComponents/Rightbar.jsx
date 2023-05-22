import { Box } from "@mui/material";
import AxisSelector from "./ChartSettingComponent/AxisSelector";
import ChartSettingOption from "./ChartSettingComponent/ChartSettingOption";

import ComboBox from "./ComboBox";
// import styled from 'styled-components'

const Rightbar = ({ panelID }) => {
  // const ref = useRef()
  // const options = {
  //   step: 40,
  //   axis: 'horizontal'
  // }
  // const { initResize, size, cursor } = useResize(ref, options)

  // const Handle = styled.div((props) => ({
  //   borderBottom: '0 solid transparent',
  //   borderRight: '15px solid black',
  //   borderTop: '15px solid transparent',
  //   bottom: 0,
  //   cursor: props.cursor,
  //   display: 'inline-block',
  //   height: 0,
  //   position: 'absolute',
  //   right: 0,
  //   width: 0
  // }))

  // const Resizable = muiStyled(Box)(() => ({
  //   backgroundColor: 'pink',
  //   padding: '20px',
  //   position: 'relative'
  // }))

  // Rightbar
  // <Resizable component="div" ref={ref} flex={1} p={2} sx={{display: {xs: "none", sm:"block"},}}>
  //   <p>
  //     I’m resizable, my size is: {size.width} x {size.height}
  //   </p>
  //   <pre>
  //     <code>{JSON.stringify(options, null, 2)}</code>
  //   </pre>

  //   <Handle cursor={cursor} onMouseDown={initResize} />
  // </Resizable>

  return (
    <Box
      component="div"
      bgcolor={`rgba(0,0,0,0.2)`}
      className="Block"
      flex={1}
      p={2}
      style={{ height: "calc(100vh - 100px)" }}
      sx={{ display: { xs: "none", sm: "block" }, overflowY: "scroll" }}
      overflow="hidden"
    >
      <ComboBox panelID={panelID} />
      <AxisSelector panelID={panelID} />
      <ChartSettingOption />
    </Box>
  );
};

export default Rightbar;
