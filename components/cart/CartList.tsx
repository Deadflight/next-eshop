import { Grid, Link, Typography, CardActionArea, CardMedia, Box, Button } from '@mui/material';
import NextLink from 'next/link';
import { FC } from 'react';
import { initialData } from '../../database/products';
import { ItemCounter } from '../products';


const productInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

interface Props {
  editable?: boolean;
}

export const CartList: FC<Props> = ({ editable }) => {
  return (
    <>
      {
        productInCart.map(product => (
          <Grid container key={product.slug} spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={3}>
              <NextLink href={`/products/${product.slug}`} passHref>
                <Link>
                  <CardActionArea>
                    <CardMedia
                      image={`/products/${product.images[0]}`}
                      component="img"
                      sx={{ borderRadius: '5px' }}
                    />
                  </CardActionArea>
                </Link>
              </NextLink>
            </Grid>
            <Grid item xs={7}>
              <Box display='flex' flexDirection='column'>
                <Typography variant='body1'>{product.title}</Typography>
                <Typography variant='body1'>Size: <strong>M</strong></Typography>

              {
                editable 
                  ? <ItemCounter />
                  : <Typography variant='h5'>3 items</Typography>
              }
              </Box>
            </Grid>
            <Grid item xs={2} display='flex' alignItems={'center'} flexDirection='column'>
              <Typography variant='subtitle1'>{`$${product.price}`}</Typography>
              {/* Editable */}
              {
                editable && (
                  <Button variant='text' color='secondary'>
                    Remove
                  </Button>
                )
              }

            </Grid>
          </Grid>
        ))
      }
    </>
  )
}