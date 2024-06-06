import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Grid, Container, Box } from "@material-ui/core";
import videoImg from "../../assets/videoImg.jpg";
import codingImg from "../../assets/codingImg.jpg";
import boardImg from "../../assets/boardImg.jpg";
import logo from "../../assets/logo.jpg";
import "./index.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(2),
  },
  content: {
    maxWidth: 700,
  },
  imgBox: {
    backgroundColor: "#ffffff",
    height: 500,
  },
}));

function LandingPage() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const classes = useStyles();
  const valRef = useRef();
  const imgContainerRef = useRef();

  useEffect(() => {
    let i = 0;
    setInterval(() => {
      imgContainerRef.current.scrollTo({
        left: i * 600,
        behavior: "smooth",
      });
      i = (i + 1) % 3;
    }, 2000);
  }, []);

  useEffect(() => {
    const values = ["Code", "Connect", "Brainstorm"];
    const valContainer = valRef.current;

    let i = 0,
      j = 0,
      dir = 1;

    let str = "";

    setInterval(() => {
      if (j == values[i].length) {
        dir = -1;
      } else if (j == -1) {
        i = (i + 1) % 3;
        j = 0;
        dir = 1;
      }

      if (dir == 1) {
        str += values[i][j];
      } else {
        str = str.slice(0, -1);
      }

      valContainer.innerHTML = str + "<span>|<span/>";

      j += dir;
    }, 250);

    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/chat");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  return (
    <div className={classes.root}>
      <div style={{ height: "55px" }}>
        <img className="logo" src={logo} alt="logo" width="250px" />
      </div>
      <header className={classes.header}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Box className={classes.content}>
                <Typography
                  variant="h3"
                  gutterBottom
                  style={{
                    fontWeight: "600",
                    color: "rgb(56, 56, 56)",
                    lineHeight: "1.1",
                  }}
                >
                  One place to{" "}
                  <span
                    style={{ color: "rgb(4, 92, 150)" }}
                    ref={valRef}
                  ></span>{" "}
                  <div>in real-time</div>
                </Typography>
                <Typography
                  variant="body1"
                  paragraph
                  style={{ color: "gray", lineHeight: "1.1" }}
                >
                  Empowering collaboration, creativity, and connection in
                  real-time coding: Welcome to the vibrant world of Codevibe.
                </Typography>
                <Button
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  color="primary"
                  onClick={signInWithGoogle}
                >
                  Login with Google
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box
                className={classes.imgBox}
                id="imgContainer"
                style={{
                  overflow: "auto",
                  display: "flex",
                }}
                ref={imgContainerRef}
              >
                <img
                  src={boardImg}
                  alt="codingImg"
                  style={{
                    maxWidth: "90%",
                    height: "100%",
                    marginLeft: "30px",
                    marginRight: "30px",
                  }}
                />
                <img
                  src={videoImg}
                  alt="codingImg"
                  style={{ marginLeft: "60px", marginRight: "60px" }}
                />
                <img
                  src={codingImg}
                  alt="codingImg"
                  style={{ marginLeft: "30px", marginRight: "40px" }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </header>
    </div>
  );
}

export default LandingPage;
