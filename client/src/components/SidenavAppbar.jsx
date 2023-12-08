import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import MuiDrawer from "@mui/material/Drawer";
import MenuItem from "@mui/material/MenuItem";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ImHome3 } from "react-icons/im";
import { FaCode } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { IoMenuSharp } from "react-icons/io5";
import { IoChatbubble } from "react-icons/io5";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const X = createTheme({
  typography: {
    fontFamily: ["Bungee Shade", "sans-serif"].join(","),
  },
});

const drawerWidth = 180;

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
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SidenavAppBar() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    fetchUserName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [open_p, setOpen_p] = useState(false);

  const PopOpen = (event) => {
    setOpen_p(event.currentTarget);
  };

  const handleCloseP = () => {
    setOpen_p(null);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#fff",
          boxShadow: "none",
          color: "#707070",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => {
              setOpen(!open);
            }}
            edge="start"
          >
            <IoMenuSharp />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <IconButton
            onClick={PopOpen}
            sx={{
              width: 40,
              height: 40,
              background: (theme) => alpha(theme.palette.grey[500], 0.08),
              ...(open_p && {
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
              }),
            }}
          >
            <Avatar
              src={user?.photoURL}
              alt={name.charAt(0).toUpperCase()}
              sx={{
                width: 36,
                height: 36,
                border: (theme) =>
                  `solid 2px ${theme.palette.background.default}`,
              }}
            />
          </IconButton>
          <Popover
            open={!!open_p}
            anchorEl={open_p}
            onClose={handleCloseP}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Box sx={{ my: 1.5, px: 2 }}>
              <Typography variant="subtitle2" noWrap>
                {name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary" }}
                noWrap
              >
                {user?.email}
              </Typography>
            </Box>

            <Divider sx={{ borderStyle: "dashed" }} />

            <MenuItem
              disableRipple
              disableTouchRipple
              onClick={logout}
              sx={{ typography: "body2", color: "error.main", py: 1.5 }}
            >
              Logout
            </MenuItem>
          </Popover>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <ThemeProvider theme={X}>
          <List>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate("/home");
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <ImHome3 />
                </ListItemIcon>
                <ListItemText
                  primary="Home"
                  sx={{ opacity: open ? 1 : 0, color: "#0718C4" }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate("/chat");
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <IoChatbubble />
                </ListItemIcon>
                <ListItemText
                  primary="Chat"
                  sx={{ opacity: open ? 1 : 0, color: "#0718C4" }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate("/editor");
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <FaCode />
                </ListItemIcon>
                <ListItemText
                  primary="Editor"
                  sx={{ opacity: open ? 1 : 0, color: "#0718C4" }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate("/meeting");
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <FaUserGroup />
                </ListItemIcon>
                <ListItemText
                  primary="Meeting"
                  sx={{ opacity: open ? 1 : 0, color: "#0718C4" }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </ThemeProvider>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
}
