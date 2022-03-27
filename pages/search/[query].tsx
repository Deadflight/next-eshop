import { Typography, Box } from '@mui/material';
import type { NextPage, GetServerSideProps } from 'next'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products';
import { FullScreenLoading } from '../../components/ui';
import { dbProducts } from '../../database';
import { useProducts } from '../../hooks/useProducts';
import { IProduct } from '../../interfaces';

interface Props {
  products: IProduct[],
  foundProducts: boolean,
  query: string
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
  return (
    <ShopLayout title={'Next-Eshop - Search'} pageDescription={'Next-Eshop search page'}>
      <Typography variant="h1" component={'h1'}>Search Products</Typography>

      {
        foundProducts
          ? <Typography variant="h2" sx={{mb: 1}}>Term: {query}</Typography>
          : (
              <Box display='flex'>
                <Typography variant="h2" sx={{mb: 1}}>No products found</Typography>
                <Typography variant="h2" sx={{ml: 1}} color='secondary'>{query}</Typography>
              </Box>
          )
      }
      
      
      <ProductList products={products} />
    </ShopLayout>

  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  const { query = '' } = params as { query: string }

  if( query.length === 0 ) {
    return { 
      redirect: { 
        destination: '/',
        permanent: true
      } 
    }
  }

  // if no products?
  let products = await dbProducts.getProductByTerm(query)
  const foundProducts = products.length > 0 
  
  if ( !foundProducts ) {
    products = await dbProducts.getAllProducts()
    products = JSON.parse(JSON.stringify(products))
  }


  return {
    props: {
      products,
      foundProducts,
      query
    }
  }
}

export default SearchPage
