import React , {useEffect, useState} from 'react'
import {AppBar , Box , Toolbar , IconButton , Typography , Button} from '@mui/material'
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginModal from './Modals/LoginModal';
import SignUpModal from './Modals/SignUpModal';
import Badge from '@mui/material/Badge';
import { signOut } from 'next-auth/react';
import { useSession, getSession, getToken } from 'next-auth/react';
import Link from 'next/link';
import { useSelector } from 'react-redux';


const Header = () => {

  const [openLoginModal, setOpenLoginModal] = useState(false);
  const handleLoginModal = () => setOpenLoginModal((prev) => !prev)

  const [openSignUpModal, setOpenSignUpModal] = useState(false);
  const handleSignUpModal = () => setOpenSignUpModal((prev) => !prev)

  const session = useSession()
  console.log(session)
  const {cart} = useSelector(state => state.cart)
  let cartLength = cart?.length

  return (
    <Box sx={{ flexGrow: 1, marginBottom: "80px" }}>
      <AppBar position="fixed" style={{ backgroundColor: "black" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">E-Commerce</Link>
          </Typography>
          <Link href={session?.data ? "/UserSettings" : "/"}>
            <Button color="inherit">
              User Settings
            </Button>
          </Link>
          <Link href="/Products">
            <Button color="inherit">
              Products
            </Button>
          </Link>
          {!session?.data?.user ? (
            <>
              {" "}
              <Button color="inherit" onClick={() => handleLoginModal()}>
                <LoginIcon />
                Login
              </Button>
              <Button color="inherit" onClick={() => handleSignUpModal()}>
                <HowToRegIcon />
                Sign Up
              </Button>
            </>
          ) : (
            <Button
              color="inherit"
              onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}
            >
              SignOut
            </Button>
          )}
          <Link href={session?.data ? "/Cart" : "/"}>
            <Button color="inherit">
              <Badge badgeContent={cartLength} color="primary">
                <ShoppingCartIcon />
              </Badge>
              Cart
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      {openLoginModal && (
        <LoginModal open={openLoginModal} handleModal={handleLoginModal} />
      )}
      {openSignUpModal && (
        <SignUpModal open={openSignUpModal} handleModal={handleSignUpModal} />
      )}
    </Box>
  );
}

export default Header