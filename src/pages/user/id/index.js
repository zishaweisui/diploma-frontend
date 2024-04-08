import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Dialog, DialogContent, DialogActions } from '@mui/material';
import serviceUsers from "services/users";
import UserSettings from 'pages/user/settings';

const UserMe = () => {
  const navigate = useNavigate()

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
          navigate("/public/games");
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
  );
};

export default UserMe;
