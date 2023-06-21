import React from 'react'
import { Container , Grid} from '@mui/material'
import ProductCard from '@/Components/ProductCard'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Products = () => {
    const { data, error, isLoading } = useSWR('https://fakestoreapi.com/products' , fetcher)
    if(isLoading){
      return <h1>Loading</h1>
    }

  return (
    <>
      <Container>
        <h1 style={{textAlign : "center" , textTransform : 'capitalize' , padding : "15px"}}>Our Products</h1>
        <Grid
          container
          spacing={{ xs: 2, md: 5 }}
          columns={{ xs: 12, sm: 12, md: 12 }}
        >
          {data.map((item) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={item?.id}>
                <ProductCard item={item} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  )
}

Products.layout = "L1"

export default Products

