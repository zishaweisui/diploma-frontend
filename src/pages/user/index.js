import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import UserMe from './id';
import Games from 'pages/games';
import Releases from "pages/releases";

const User = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const navigate = useNavigate()
  
  const pages = [
    { title: "Releases", path: "/user/releases" },
    { title: "Games", path: "/user/games" },
    { title: "Profile", path: "/user/me" },
    { title: "Recommendation", path: "/user/recommendation" }
  ];
  const handleOpenNavMenu = () => setIsOpenMenu(true);
  const handleCloseNavMenu = () => setIsOpenMenu(false);
  const handleClickMenuItem = page => {
    setIsOpenMenu(false)
    navigate(page.path)
  }

  return (
    <>
    <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Dashboard
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                open={isOpenMenu}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    onClick={() => handleClickMenuItem(page)}
                    key={page.path} 
                  >
                    <Typography textAlign="center">{page.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Dashboard
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  onClick={() => handleClickMenuItem(page)}
                  sx={{ my: 2, color: "white", display: "block" }}
                  key={page.path}
                >
                  {page.title}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Button
                onClick={() => navigate("/sign-out")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Sign Out
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Routes>
        <Route path="/releases" element={<Releases />} />
        <Route path="/games" element={<Games />} />
        <Route path="/me" element={<UserMe />} />
        <Route path="*" element={<Navigate to="/user/me" />} />
      </Routes>
    </>
  );
};

export default User;
