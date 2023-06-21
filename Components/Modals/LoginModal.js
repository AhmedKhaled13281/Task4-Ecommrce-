import React, { useRef, useState } from "react";
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  Typography,
  TextField,
  InputAdornment,
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';
import {
  FormStyle,
  FormTitle,
  FormInput,
  FormButton,
} from "../../styles/modalStyle";

import { signIn  , useSession} from "next-auth/react";
import Link from "next/link";



const LoginModal = ({ open, handleModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;



  };
  const handleSignInWithGitHub = async () => {

   const res = signIn("github" , {callbackUrl : "http://localhost:3000"})
   if (res?.error) {
    // Handle login error
    console.log(res.error);
  } else {
    // Login successful
    console.log(res);
  }
  };
  
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={FormStyle}
          >
            <h2
              style={{ textAlign: "right", cursor: "pointer" }}
              onClick={() => handleModal()}
            >
              <CloseIcon />
            </h2>
            <Typography
              id="transition-modal-title"
              variant="h4"
              component="h2"
              sx={FormTitle}
            >
              Sign In
            </Typography>
            <TextField
              required
              sx={FormInput}
              type="email"
              id="email"
              label="Email"
              fullWidth
              inputRef={emailRef}
            />
            <TextField
              sx={FormInput}
              required
              label="Password"
              fullWidth
              inputRef={passwordRef}
              type={showPassword ? "text" : "password"}
              id="password"
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={handleClickShowPassword}
                    sx={{ cursor: "pointer" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </InputAdornment>
                ),
              }}
            />

            <Button sx={FormButton} type="submit" variant="contained">
              Submit
            </Button>

            <p>OR</p>
            <Divider style={{ marginBottom: "15px" }} />

              <Button
                variant="contained"
                style={{ backgroundColor: "black" }}
                onClick={handleSignInWithGitHub}
              >
                {" "}
                <GitHubIcon
                  style={{ paddingRight: "15px", fontSize: "40px" }}
                />{" "}
                Login With GitHub
              </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default LoginModal;
