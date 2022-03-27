import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products';
import { FullScreenLoading } from '../../components/ui';
import { useProducts } from '../../hooks/useProducts';



const SearchPage: NextPage = () => {

  const { products, isLoading } = useProducts('products')

  return (
    <ShopLayout title={'Next-Eshop - Search'} pageDescription={'Find the best Next products here'}>
      <Typography variant="h1" component={'h1'}>Search Product</Typography>
      <Typography variant="h2" sx={{mb: 1}}>ABC - 123</Typography>
      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={products} />
      }
    </ShopLayout>

  )
}

export default SearchPage
