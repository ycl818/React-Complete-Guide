import { Grid } from "@mui/material";
import Sidebar from "../components/SettingsComponents/Sidebar";
import { Outlet } from "react-router-dom";

const SettingsPage = () => {
  return (
    <>
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default SettingsPage;
