import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLayout } from '../components/layouts'
import { initialData } from '../database/productsTest'
import { ProductList } from '../components/products';

const Home: NextPage = () => {
  return (
    <ShopLayout title={'Next-Eshop - Home'} pageDescription={'Find the best Next products here'}>
      <Typography variant="h1" component={'h1'}>Store</Typography>
      <Typography variant="h2" sx={{mb: 1}}>All Products</Typography>

      <ProductList 
        products={initialData.products as any} 
      />
    </ShopLayout>

  )
}

export default Home
