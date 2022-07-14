import { Stack } from "@mui/material";
import React from "react";
import Navbar from "../Components/Navbar";
import SideBar from "../Components/SideBar";
import "../App.css";

export default function Home() {
  return (
    <>
      <Stack direction="row">
        <Navbar />
        <SideBar />
      </Stack>
    </>
  );
}
