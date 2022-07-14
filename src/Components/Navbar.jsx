import {
  CurrencyExchange,
  CurrencyPoundTwoTone,
  Home,
  Newspaper,
} from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const Navigate = useNavigate();

  const StyleBox = styled(Box)({
    height: "100vh",
    backgroundColor: "#1b1b73",
    fontWeight: "bold",
    color: "white",
    position: "sticky",
    top: 0,
  });

  const StyleBoxMobile = styled(Box)({
    width: "100vw",
    backgroundColor: "#1b1b73",
    position: "fixed",
    display: "flex",
    justifyContent: "space-around",
    bottom: 0,
  });
  return (
    <>
      <StyleBox flex={2} sx={{ display: { xs: "none", sm: "block" } }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" onClick={() => Navigate("/")}>
              <ListItemIcon>
                <Home sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Homepage" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component="a"
              onClick={() => Navigate("/Cryptocurrencies")}
            >
              <ListItemIcon>
                <CurrencyPoundTwoTone sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Cryptocurrencies" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component="a"
              onClick={() => Navigate("/Exchanges")}
            >
              <ListItemIcon>
                <CurrencyExchange sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Exchanges" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" onClick={() => Navigate("/News")}>
              <ListItemIcon>
                <Newspaper sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="News" />
            </ListItemButton>
          </ListItem>
        </List>
      </StyleBox>

      <StyleBoxMobile
        flex={2}
        sx={{ display: { xs: "block", sm: "none" }, zIndex: "333" }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" onClick={() => Navigate("/")}>
              <ListItemIcon>
                <Home sx={{ color: "white" }} />
              </ListItemIcon>
            </ListItemButton>

            <ListItemButton
              component="a"
              onClick={() => Navigate("/Cryptocurrencies")}
            >
              <ListItemIcon>
                <CurrencyPoundTwoTone sx={{ color: "white" }} />
              </ListItemIcon>
            </ListItemButton>

            <ListItemButton
              component="a"
              onClick={() => Navigate("/Exchanges")}
            >
              <ListItemIcon>
                <CurrencyExchange sx={{ color: "white" }} />
              </ListItemIcon>
            </ListItemButton>

            <ListItemButton component="a" onClick={() => Navigate("/News")}>
              <ListItemIcon>
                <Newspaper sx={{ color: "white" }} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      </StyleBoxMobile>
    </>
  );
}
