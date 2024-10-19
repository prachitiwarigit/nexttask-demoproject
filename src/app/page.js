"use client";
import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SignUP from "./sign-up/SignUP";
import Login from "./login/Login";
import ApartmentIcon from "@mui/icons-material/Apartment";
import VideoIcon from "@mui/icons-material/VideoLibrary";
import AdminIcon from "@mui/icons-material/AdminPanelSettings"; // Admin icon
import Avatar from "@mui/material/Avatar";
import ListCrypto from "./dashboard/ListCrypto";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Page() {
  const theme = useTheme();
  const [dynamicname, setDynamicName] = useState("");
  const [open, setOpen] = useState(false);
  const [currentView, setCurrentView] = useState("Login"); // Default view is "Login"

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDynamicName(localStorage.getItem("name"));
     
    }
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const renderComponent = () => {
    switch (currentView.toLowerCase()) {
      case "login":
        return <Login />;
      case "signup":
        return <SignUP />;
      case "dashboard":
        return <ListCrypto />;
      default:
        return <SignUP />; // This should always show SignUP by default
    }
  };

  return (
    <Box sx={{ display: "flex", }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        style={{ backgroundColor: "#7EC2DE" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton
              color="inherit"
              aria-label="video tutorial"
              onClick={() => console.log("Video tutorial clicked!")}
            >
              <VideoIcon />
            </IconButton>
            <Typography variant="body1" color="inherit" style={{}}>
              Video Tutorial
            </Typography>
          </div>{" "}
          &nbsp;
          <IconButton
            color="inherit"
            aria-label="admin"
            onClick={() => console.log("Admin clicked!")}
          >
            <AdminIcon />
          </IconButton>
          <Typography
            variant="body1"
            color="inherit"
            style={{ marginLeft: "0px" }}
          >
            Admin
          </Typography>{" "}
          &nbsp; &nbsp;
          <Avatar
            src="https://example.com/path/to/avatar.jpg"
            alt="User Name"
            size={20}
          />
          &nbsp;
          <p>{dynamicname}</p>
          
        </Toolbar>
      </AppBar>
      <Drawer
        style={{ backgroundColor: "#7EC2DE" }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "#7EC2DE",
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader style={{ backgroundColor: "#7EC2DE" }}>
          <IconButton
            onClick={handleDrawerClose}
            style={{ color: "#fff", backgroundColor: "#0095E7" }}
          >
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List style={{ color: "#fff", }}>
          {["Dashboard", "Login", "Signup"].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => setCurrentView(text.toLowerCase())}
              >
                {" "}
                {/* Ensure lowercase */}
                <ListItemIcon>
                  <ApartmentIcon style={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />
      </Drawer>
      <Main open={open} >
        <DrawerHeader />
        {renderComponent()}
      </Main>
    </Box>
  );
}
