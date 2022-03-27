import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLayout } from '../components/layouts'
import { ProductList } from '../components/products';
import { FullScreenLoading } from '../components/ui';
import { useProducts } from '../hooks/useProducts';



const HomePage: NextPage = () => {

  const { products, isLoading } = useProducts('products')

  return (
    <ShopLayout title={'Next-Eshop - Home'} pageDescription={'Find the best Next products here'}>
      <Typography variant="h1" component={'h1'}>Store</Typography>
      <Typography variant="h2" sx={{mb: 1}}>All Products</Typography>
      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={products} />
      }
    </ShopLayout>

  )
}

export default HomePage
