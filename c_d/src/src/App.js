import { Routes, Route } from "react-router-dom";
import { Dashboard, EditPage, ViewPage } from "./pages";
import Navbar from "./components/Navbar";
import { Container } from "@mui/system";
import { useReducer } from "react";
import { ChartContext, chartReducer, initChartState } from "./store/chartStore";

import MyComponent from "./components/testComponents/MyComponent";
import SettingsPage from "./pages/SettingsPage";
import SettingGeneral from "./components/SettingsComponents/SettingGeneral";
import SettingVariables from "./components/SettingsComponents/SettingVariables";

function App() {
  const reducerChart = useReducer(chartReducer, initChartState);

  return (
    <ChartContext.Provider value={reducerChart}>
      <Navbar />

      <Container
        maxWidth={false}
        disableGutters
        sx={{
          overflow: "hidden",
          backgroundColor: "#19233C",
        }}
        style={{
          minHeight: "calc(100vh - 660px)",
        }}
      >
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/settings" element={<SettingsPage />}>
            <Route index element={<SettingGeneral />}></Route>
            <Route path="general" element={<SettingGeneral />}></Route>
            <Route path="variables" element={<SettingVariables />}></Route>
          </Route>
          <Route path="/test" element={<MyComponent />}></Route>
          <Route path="/:title/edit" element={<EditPage />}></Route>
          <Route path="/:title/view" element={<ViewPage />}></Route>
        </Routes>
      </Container>
    </ChartContext.Provider>
  );
}

export default App;
