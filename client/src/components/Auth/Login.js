import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
      sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          autoFocus
          />
          
          <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />

          <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => logInWithEmailAndPassword(email, password)}
          >
            Login
          </Button>

          <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={signInWithGoogle}>
            Login with Google
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="/reset" variant="body2">Forgot password?</Link>
            </Grid>

            <Grid item>
              <Link href="/register" variant="body2">Don't have an account?</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
