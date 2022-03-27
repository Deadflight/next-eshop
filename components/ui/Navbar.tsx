import { SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material"
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from "@mui/material"
import NextLink from "next/link"
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UiContext } from '../../context';

export const Navbar = () => {
  const { toggleSideMenu } = useContext(UiContext)
  const router = useRouter()
  const { gender = '' } = router.query

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link display='flex' alignItems='center'>
            <Typography variant='h6'>Next |</Typography>
            <Typography sx={{ ml: 0.5 }}>Eshop</Typography>
          </Link>
        </NextLink>
        <Box flex={1} />
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <NextLink href="/category/men" passHref>
            <Link>
              <Button color={ gender === 'men' ? 'primary' : 'info'}>
                Men
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/women" passHref>
            <Link>
              <Button color={ gender === 'women' ? 'primary' : 'info'}>
                Women
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/kid" passHref>
            <Link>
              <Button color={ gender === 'kid' ? 'primary' : 'info'}>
                Kid
              </Button>
            </Link>
          </NextLink>
        </Box>
        <Box flex={1} />
        <IconButton>
          <SearchOutlined />
        </IconButton>
        <NextLink href='/cart' passHref>
          <Link>
            <IconButton>
              <Badge badgeContent={4} color="secondary">
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>
        <Button onClick={toggleSideMenu}>
          Home
        </Button>
      </Toolbar>
    </AppBar>
  )
}
