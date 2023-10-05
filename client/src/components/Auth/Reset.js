import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, sendPasswordReset } from "../../firebase";

import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
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
         Reset Password
       </Typography>

       <Box component="form" sx={{ mt: 3 }}>
        
        <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
        />
        
        <Button
        fullWidth
        variant="contained"
        sx={{mt: 3, mb: 2}}
        onClick = {() => sendPasswordReset(email)}>
          Send password reset email
        </Button>

        <Grid container>
            <Grid item xs>
              <Link href="/" variant="body2">Already have an account?</Link>
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

export default Reset;
