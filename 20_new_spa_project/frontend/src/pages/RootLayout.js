import React from "react";
import MainNavigation from "../components/MainNavigation";
import { Outlet, useNavigation } from "react-router-dom";

const RootLayout = () => {
  // const navigation = useNavigation();

  return (
    <div>
      <MainNavigation />
      <main>
        {/* {navigation.state === "loading" && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
