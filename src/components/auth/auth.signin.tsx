'use client'
import { Avatar, Box, Button, Divider, Grid, TextField, Typography } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import { useState } from "react";

const AuthSignIn = (props: any) => {

      const [showPassword, setShowPassword] = useState<boolean>(false);
      const [username, setUsername] = useState<string>("");
      const [password, setPassword] = useState<string>("");

      const [isErrorUsername, setIsErrorUsername] = useState<boolean>(false);
      const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false);

      const [errorUsername, setErrorUsername] = useState<string>("");
      const [errorPassword, setErrorPassword] = useState<string>("");


      const handleSubmit = () => {
            setIsErrorUsername(false);
            setIsErrorPassword(false);
            setErrorUsername("");
            setErrorPassword("");

            if (!username) {
                  setIsErrorUsername(true);
                  setErrorUsername("Username is not empty.")
                  return;
            }
            if (!password) {
                  setIsErrorPassword(true);
                  setErrorPassword("Password is not empty.")
                  return;
            }
            console.log(">>> check username: ", username, ' pass: ', password)
      }

      return (
            <Box
                  sx={{
                        // backgroundImage: "linear-gradient(to bottom, #ff9aef, #fedac1, #d5e1cf, #b7e6d9)",
                        // backgroundColor: "#b7e6d9",
                        // backgroundRepeat: "no-repeat"
                  }}
            >
                  <Grid container
                        sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              height: "100vh"
                        }}
                  >
                        <Grid
                              item
                              xs={12}
                              sm={8}
                              md={5}
                              lg={4}
                              sx={{
                                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                              }}
                        >
                              <div style={{ margin: "20px" }}>
                                    <Box sx={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          flexDirection: "column",
                                          width: "100%"
                                    }}>

                                          <Avatar>
                                                <LockIcon />
                                          </Avatar>

                                          <Typography component="h1">
                                                Sign in
                                          </Typography>
                                    </Box>

                                    <TextField
                                          onChange={(event) => setUsername(event.target.value)}
                                          variant="outlined"
                                          margin="normal"
                                          required
                                          fullWidth
                                          label="Username"
                                          name="username"
                                          autoFocus
                                          error={isErrorUsername}
                                          helperText={errorUsername}
                                    />
                                    <TextField
                                          onChange={(event) => setPassword(event.target.value)}
                                          variant="outlined"
                                          margin="normal"
                                          required
                                          fullWidth
                                          name="password"
                                          label="Password"
                                          type={showPassword ? "text" : "password"}
                                          error={isErrorPassword}
                                          helperText={errorPassword}

                                          InputProps={{
                                                endAdornment: <InputAdornment position="end">
                                                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                                                            {showPassword === false ? <VisibilityOff /> : <Visibility />}
                                                      </IconButton>
                                                </InputAdornment>,
                                          }}
                                    />
                                    <Button
                                          sx={{
                                                my: 3
                                          }}
                                          type="submit"
                                          fullWidth
                                          variant="contained"
                                          color="primary"
                                          onClick={handleSubmit}
                                    >
                                          Sign In
                                    </Button>
                                    <Divider>Or using</Divider>
                                    <Box
                                          sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                gap: "25px",
                                                mt: 3
                                          }}
                                    >
                                          <Avatar
                                                sx={{
                                                      cursor: "pointer",
                                                      bgcolor: "orange"
                                                }}
                                          >
                                                <GitHubIcon titleAccess="Login with Github" />
                                          </Avatar>

                                          <Avatar
                                                sx={{
                                                      cursor: "pointer",
                                                      bgcolor: "orange"
                                                }}
                                          >
                                                < GoogleIcon titleAccess="Login with Google" />
                                          </Avatar>
                                    </Box>
                              </div>
                        </Grid>
                  </Grid>

            </Box>

      )
}

export default AuthSignIn;