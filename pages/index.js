import Image from 'next/image'
import { Container , Grid} from '@mui/material'
import ProductCard from '@/Components/ProductCard'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())
export default function Home() {
  const { data, error, isLoading } = useSWR('https://fakestoreapi.com/products' , fetcher)
  if(isLoading){
    return <h1>Loading</h1>
  }
  console.log(data)
  return (
    <>
      <Container>
        <Grid
          container
          spacing={{ xs: 2, md: 5 }}
          columns={{ xs: 12, sm: 12, md: 12 }}
        >
          {data.slice(0, 10).map((item) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={item?.id}>
                <ProductCard item={item} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}

Home.layout = 'L1'

