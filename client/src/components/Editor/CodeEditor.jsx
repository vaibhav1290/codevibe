import React from "react";
import Box from "@mui/material/Box";
import SidenavAppBar from "../SidenavAppbar";
import ExportEditor from "./ExportEditor";

const CodeEditor = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <SidenavAppBar />
      <Box component="main" sx={{ flexGrow: 1, p: 7, margin: 1, height: 650 }}>
        <ExportEditor />
      </Box>
    </Box>
  );
};

export default CodeEditor;
