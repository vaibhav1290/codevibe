import React from "react";
import Box from "@mui/material/Box";
import SidenavAppBar from "../SidenavAppbar";

const Home = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <SidenavAppBar />
      <Box component="main" sx={{ flexGrow: 1, p: 7, margin: 1, height: 650 }}>
        <h1>Home</h1>
      </Box>
    </Box>
  );
};

export default Home;
