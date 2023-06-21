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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import {
  FormStyle,
  FormTitle,
  FormInput,
  FormButton,
} from "../../styles/modalStyle";
import { signIn } from "next-auth/react";

const SignUpModal = ({ open, handleModal }) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const emailRef = useRef();
    const passwordRef = useRef();
    const userNameRef = useRef();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const emailValue = emailRef.current.value;
      const passwordValue = passwordRef.current.value;
      const userNameValue = userNameRef.current.value;

      if (emailValue && passwordValue && userNameValue) {
        const res = await signIn("credentials", {
          userName: userNameValue,
          email: emailValue,
          password: passwordValue,
          redirect: false,
          callbackUrl : "http://localhost:3000"
        });
        if (res?.error) {
          // Handle login error
          console.log(res.error);
        } else {
          // Login successful
          console.log(res);
          handleModal();
        }
        console.log(res);
      };
    }
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
            Sign Up
          </Typography>
          <TextField
            required
            sx={FormInput}
            type="text"
            id="username"
            label="User Name"
            fullWidth
            inputRef={userNameRef}
          />
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
        </Box>
      </Fade>
    </Modal>
  </div>
  )
}

export default SignUpModal