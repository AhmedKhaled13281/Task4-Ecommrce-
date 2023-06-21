import React from 'react'
import { Container , Button , Box} from '@mui/material'
import { useDispatch , useSelector } from 'react-redux'
import { cartAction } from '@/Store/cartReducer'
import Image from 'next/image'
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const Cart = () => {
  const {cart} = useSelector(state => state.cart)
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch()

  const removeItem = (item) => {
      dispatch(cartAction.removeFromCart(item))
  }

  return (
    <div>
      <Container>
        {cart.length === 0 ? (
          <h1 style={{ textAlign: "center" }}>Your Cart Is Empty</h1>
        ) : (
          <>
            <div style={{ marginTop: "45px" }}>
              {cart?.map((item) => {
                return (
                  <div
                    key={item._id}
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <div style={{ width: "30%" }}>
                      <img
                        style={{
                          aspectRatio: "3/2",
                          objectFit: "contain",
                          width: `${match ? "100% " : "50%"}`,
                        }}
                        src={item.image}
                        alt={item.title}
                      />
                    </div>
                    <div
                      style={{
                        width: "100%",
                        fontSize: `${match ? "13px" : "20px"}`,
                      }}
                    >
                      <h2 style={{ textTransform: "capitalize" }}>
                        {item.title}
                      </h2>
                      <h3>{item.price}$</h3>
                    </div>
                    <div>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => removeItem(item)}
                      >
                        <DeleteIcon />
                        {item?.amount}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </Container>
    </div>
  );
}

Cart.layout = "L1"

export default Cart
