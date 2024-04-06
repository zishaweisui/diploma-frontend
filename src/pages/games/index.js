import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { DataGrid } from "@mui/x-data-grid";
import serviceGames from "services/games";

const columns = [
  {
    field: "header_image",
    headerName: "Image",
    renderCell: (params) => (
      <img src={params.row.header_image} alt="Game" style={{ width: 100, height: 50 }} />
    ),
    sortable: false,
    width: 150,
  },
  { field: "name", headerName: "Name", width: 300 },
  { field: "developer", headerName: "Developer", width: 200 },
  { field: "publisher", headerName: "Publisher", width: 200 },
  { field: "genres", headerName: "Genres", width: 150 },
];

const Games = () => {

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const navigate = useNavigate()

  const pages = [{ title: "Recommendation", path: "/recommendation" }];
  const handleOpenNavMenu = () => setIsOpenMenu(true);
  const handleCloseNavMenu = () => setIsOpenMenu(false);
  const handleClickMenuItem = page => {
    setIsOpenMenu(false)
    navigate(page.path)
  }

  const [games, setGames] = useState([]);

  useEffect(() => {
    serviceGames
      .all()
      .then((data) => {
        setGames(data);
      })
      .catch((error) => {
        console.error("Error fetching games:", error);
      });
  }, []);

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
                onClick={() => navigate("/sign-in")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Sign In
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container component="main" maxWidth="lg" sx={{ marginTop: 5 }}>
        <DataGrid
        rows={games}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 50 },
          },
        }}
        pageSizeOptions={[50, 100]}
        autoHeight
      />
      </Container>
    </>
  );
};

export default Games;
