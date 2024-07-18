import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import BusinessTwoToneIcon from "@mui/icons-material/BusinessTwoTone";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import WorkTwoToneIcon from "@mui/icons-material/WorkTwoTone";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/userActions";
import Avatar from "@mui/material/Avatar";

const drawerWidth = 230;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    backgroundColor: "#282828",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    ...(open && openedMixin(theme)),
    ...(!open && closedMixin(theme)),
  },
}));

export default function Sidenav() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant="permanent" open={open}>
        {open && user && (
          <div className="d-flex justify-content-center align-items-center mt-5">
            <Typography>
              <Container className="text-center">
                <Avatar></Avatar>
              </Container>
            </Typography>
          </div>
        )}
        <DrawerHeader>
          <IconButton onClick={handleDrawerToggle}>
            {open ? (
              <ChevronLeftIcon sx={{ color: "white" }} />
            ) : (
              <MenuOutlinedIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            {
              text: "Dashboard",
              icon: <GridViewOutlinedIcon sx={{ color: "white" }} />,
              route: "/home",
            },
            {
              text: "Manage Company",
              icon: <BusinessTwoToneIcon sx={{ color: "white" }} />,
              route: "/manageCompany",
            },

            {
              text: "Manage Jobs",
              icon: <WorkTwoToneIcon sx={{ color: "white" }} />,
              route: "/manageJobs",
            },
          ]
            .filter((item) => item)
            .map((item, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{ display: "block" }}
                onClick={
                  item.onClick ? item.onClick : () => navigate(item.route)
                }
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    backgroundColor: "#282828",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      backgroundColor: "#282828",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{ opacity: open ? 1 : 0, color: "white" }}
                  />
                  {item.chevron && (
                    <ChevronRightIcon
                      sx={{
                        opacity: open ? 1 : 0,
                        marginLeft: "auto",
                        color: "white",
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
        </List>
        <Divider />
      </Drawer>
      <AppBar position="fixed" open={open}>
        <Toolbar className="Toolbar">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          ></IconButton>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "auto",
              marginRight: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "auto",
                marginRight: "20px",
                cursor: "pointer",
                color: "white",
              }}
              onClick={handleLogout}
            >
              <p>Logout</p>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <DrawerHeader />
    </Box>
  );
}
