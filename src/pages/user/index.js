import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import serviceUsers from "services/users";
import UserSettings from './settings';

const User = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const navigate = useNavigate()
  
  const pages = [{ title: "Recommendation", path: "/recommendation" }];
  const handleOpenNavMenu = () => setIsOpenMenu(true);
  const handleCloseNavMenu = () => setIsOpenMenu(false);
  const handleClickMenuItem = page => {
    setIsOpenMenu(false)
    navigate(page.path)
  }

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userId, setUserId] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    serviceUsers
    .getMe()
      .then(userInfo => {
        setEmail(userInfo.email);
        setNickname(userInfo.nickname);
        setFirstName(userInfo.profile.first_name);
        setLastName(userInfo.profile.last_name);
        setUserId(userInfo.id)
      })
      .catch(error => {
        console.error("Error fetching user info:", error);
      });
  }, []);

  const handleUpdateUserInfo = () => {
    if (!nickname || !firstName || !lastName) {
        alert("Please fill in all fields.");
        return;
      }

    serviceUsers.update(email, nickname, firstName, lastName, userId)
      .then(() => {
        setUpdateSuccess(true);
      })
      .catch(error => {
        console.error("Error updating user info:", error);
      });
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      serviceUsers.delete(userId)
        .then(() => {
          navigate("/");
        })
        .catch(error => {
          console.error("Error deleting account:", error);
        });
    }
  };

  const [open, setOpenDialog] = useState(false);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div
        style={{
          marginTop: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          {/* You can display user initials or profile picture here */}
        </Avatar>
        <Typography component="h1" variant="h5">
          User Information
        </Typography>
        {
          <div>
            <TextField
              margin="normal"
              fullWidth
              label="Email Address"
              value={email}
              disabled
            />
            <TextField
              margin="normal"
              fullWidth
              label="Nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            {updateSuccess && (
              <Typography variant="body2" color="success">
                Information updated successfully.
              </Typography>
            )}
            <Button
              fullWidth
              variant="contained"
              style={{ marginTop: '24px' }}
              onClick={handleUpdateUserInfo}
            >
              Update Information
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
            <Button
              fullWidth
              variant="contained"
              style={{ marginTop: '24px' }}
              onClick={handleOpenDialog}
            >
              Password Settings
            </Button>
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>X</Button>
                </DialogActions>
                <DialogContent>
                    <UserSettings userId={userId} />
                </DialogContent>
            </Dialog>
          </div>
        }
      </div>
    </Container>
    </>
  );
};

export default User;
