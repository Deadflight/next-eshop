import { SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material"
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from "@mui/material"
import NextLink from "next/link"


export const Navbar = () => {
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
              <Button>
                Men
              </Button>
            </Link>
          </NextLink>
                    <NextLink href="/category/women" passHref>
            <Link>
              <Button>
                Women
              </Button>
            </Link>
          </NextLink>
                    <NextLink href="/category/kid" passHref>
            <Link>
              <Button>
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
        <Button>
          Home
        </Button>
      </Toolbar>
    </AppBar>
  )
}
