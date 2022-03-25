import { ShopLayout } from "../../components/layouts"
import { Box, Link, Typography } from '@mui/material';
import { RemoveShoppingCartOutlined } from "@mui/icons-material";
import NextLink from "next/link";

const EmptyPage = () => {
  return (
    <ShopLayout title="Empty Cart" pageDescription="No products in the shopping cart">
      <Box
        display='flex' 
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }} 
        alignItems='center' 
        justifyContent='center' 
        height='calc(100vh - 200px)'
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
        <Box display='flex' flexDirection='column' alignItems='center'>
          <Typography variant='h1' component='h1' color='textPrimary'>Empty Cart</Typography>
          <NextLink href="/" passHref>
            <Link typography={'h4'} color='secondary'>
              Back to Home
            </Link>
          </NextLink>
        </Box>
      </Box>
    </ShopLayout>
  )
}

export default EmptyPage
