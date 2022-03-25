import { ShopLayout } from '../../components/layouts/ShopLayout';
import { initialData } from '../../database/productsTest';
import { Grid, Box, Typography, Button, Chip } from '@mui/material';
import { ItemCounter, ProductSlideShow, SizeSelector } from '../../components/products';

const product = initialData.products[0]

const ProductPage = () => {
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid spacing={3} container>
        <Grid item xs={12} sm={7}>
          <ProductSlideShow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>
            <Typography variant='h1' component='h1'>{product.title}</Typography>
            <Typography variant='subtitle1' component='h2'>{`$${product.price}`}</Typography>
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'>Quantity</Typography>
              <ItemCounter />
              <SizeSelector 
                sizes={product.sizes} 
                selectedSize={product.sizes[0]} 
              />
            </Box>

            {/* Add to cart */}
            <Button color='secondary' className='circular-btn'>Add to cart</Button>

            {/* <Chip label='Not available' color='error' variant='outlined'/> */}

            <Box sx={{ mt: 3 }}>
              <Typography variant='subtitle2'>Description</Typography>
              <Typography variant='body2'>{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default ProductPage
