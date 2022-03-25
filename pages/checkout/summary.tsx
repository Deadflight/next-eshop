
import { ShopLayout } from '../../components/layouts'
import { Card, CardContent, Grid, Typography, Divider, Box, Button, Link } from '@mui/material';
import { CartList } from '../../components/cart';
import { OrderSummary } from '../../components/cart';
import NextLink from 'next/link';

const SummaryPage = () => {
  return (
    <ShopLayout title='Order Summary' pageDescription={'Order Summary'}>
      <Typography variant='h1' component='h1'>Cart</Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>Summary (3 products)</Typography>
              <Divider sx={{ my: 1 }} />

              <Box display='flex' justifyContent={'space-between'}>
                <Typography variant='subtitle1'>Delivery Address</Typography>
                <NextLink href={'/checkout/address'} passHref>
                  <Link underline='always'>
                    Edit
                  </Link>
                </NextLink>
              </Box>


              <Typography>Carlos Correa</Typography>
              <Typography>123 Any Place</Typography>
              <Typography> Cumana, 6101</Typography>
              <Typography>Venzuela</Typography>
              <Typography>+1 Phone</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display='flex' justifyContent={'end'}>
                <NextLink href={'/cart'} passHref>
                  <Link underline='always'>
                    Edit
                  </Link>
                </NextLink>
              </Box>

              <OrderSummary />
              <Box sx={{ mt: 3 }}>
                <Button color={'secondary'} className='circular-btn' fullWidth>
                  Confirm Order
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default SummaryPage