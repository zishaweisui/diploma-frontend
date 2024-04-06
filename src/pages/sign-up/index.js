import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import serviceAuth from 'services/auth';

const SignUp = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [nickname, setNickname] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [passwordError, setPasswordError] = useState("");

  const isAbleSignUp = email.length && password.length && confirmPassword.length && nickname.length && firstName.length && lastName.length && !passwordError;

  const handleSignUp = () => {
    if (!isAbleSignUp) {
      return;
    }
    serviceAuth.signUp(email, password, nickname, firstName, lastName);
  }

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    if (confirmPassword && value !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  }

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
    if (value !== password) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            label="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            label="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            error={!!passwordError}
            helperText={passwordError}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Nickname"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            label="First name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            label="Last name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSignUp}
            disabled={!isAbleSignUp}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link component={RouterLink} to="/sign-in" variant="body2">
                Already have an account? Sign In
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
