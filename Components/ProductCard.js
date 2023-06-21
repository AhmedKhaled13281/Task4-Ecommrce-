import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
    Alert,
    Fade,
    AlertTitle,
    Button
  } from "@mui/material";
  import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
  import { styled } from "@mui/material/styles";
  import React , {useState } from "react";
  import { useDispatch , useSelector} from "react-redux";
  import { cartAction } from "@/Store/cartReducer";


  const ActionContainer = styled(CardActions)(() => ({
    display: "flex",
    justifyContent: "space-between",
    marginLeft : '10px'
  }));
  
  const ProductCard = ({ item }) => {
    const [show , setIsShow] = useState(false)

    const dispatch = useDispatch();

  
    const AddProduct = (item) => {
       dispatch(
         cartAction.addToCart(item)
       );
    }
  
    const rednerToast = () => {
      return (
        <Fade
          in={show}
          timeout={{ enter: 1000, exit: 1000 }}
          addEndListener={() => {
            setTimeout(() => {
              setIsShow(false);
            }, 4000);
          }}
        >
          <Alert severity="warning" variant="standard" className="alert">
            <AlertTitle>Warning</AlertTitle>
            Please login first to add item to favorite
          </Alert>
        </Fade>
      );
    }
  
  
    return (
      <Card sx={{ maxWidth : '483px' , borderRadius : '15px' , border : 'none' , userSelect : 'none'}}>

        <CardMedia
          component="img"
          alt="green iguana"
          height="250px"
          image={item?.image}
          sx={{objectFit : "contain" , background : '#F5F5F5'}}
        />

        <CardContent>

          <Typography gutterBottom  sx={{fontSize : '24px' , fontWeight : '700' , textTransform : 'capitalize'}} component="div">
            {item.title}
          </Typography>

        </CardContent>
        <ActionContainer>
          <Typography variant="h5" color="black" style={{fontWeight : 'bold' , textAlign : 'center' , }}>
            {item.price}$
          </Typography>
  
          {/* <IconButton aria-label="add to favorites" sx={{"&:hover" : {color : 'red'} }} onClick={userData ? () => AddProduct(item._id) : () => setIsShow(true)}>
            <FavoriteIcon sx={{fontSize : '30px'}}/>
          </IconButton> */}
          <Button color="success" variant="contained" onClick={() => AddProduct(item)}>
            <AddShoppingCartIcon />
            Add to cart
          </Button>
        </ActionContainer>
        {show && rednerToast()}
      </Card>
    );
  };
  
  export default ProductCard;