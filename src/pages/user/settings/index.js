import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import serviceUsers from 'services/users';

const UserSettings = () => {
  const { userId } = useParams();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleUpdatePassword = () => {
    if (newPassword !== confirmNewPassword) {
      setPasswordError("New passwords do not match");
      return;
    }
    console.log(userId)
    serviceUsers.updatePassword(password, newPassword, userId)
      .then(() => {
        setUpdateSuccess(true);
        setPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setPasswordError("");
      })
      .catch(error => {
        console.error("Error updating password:", error);
        setPasswordError("Failed to update password. Please try again.");
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <Box noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            label="Current Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            label="Confirm New Password"
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
            error={!!passwordError}
            helperText={passwordError}
          />
          {updateSuccess && (
            <Typography variant="body2" color="success">
              Password updated successfully.
            </Typography>
          )}
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleUpdatePassword}
          >
            Update Password
          </Button>
          <Grid container justifyContent="flex-end">
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default UserSettings;
