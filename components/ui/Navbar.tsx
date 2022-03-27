import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material"
import { AppBar, Badge, Box, Button, IconButton, InputBase, Link, Toolbar, Typography, Input, InputAdornment } from '@mui/material';
import NextLink from "next/link"
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { UiContext } from '../../context';

export const Navbar = () => {
  const { toggleSideMenu } = useContext(UiContext)
  const {query, push} = useRouter()
  const { gender = '' } = query
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchVisible, setIsSearchVisible] = useState(false)

  const onSearchTerm = () => {
    if(searchTerm.trim().length === 0) return
    push(`/search/${searchTerm}`);
  }

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
        <Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}
          className='fadeIn'
        >
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

        { /* Bigger Screens */ }
        {
          isSearchVisible 
            ? (
                <Input
                  type='text'
                  placeholder="Search..."
                  value={searchTerm}
                  sx={{ display:  { xs: 'none', sm: 'flex' } }}
                  autoFocus
                  className="fadeIn"
                  onChange={ (e) => setSearchTerm(e.target.value) }
                  onKeyPress={ (e) => e.key === 'Enter' && onSearchTerm() }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={ () => setIsSearchVisible(false) }
                      >
                        <ClearOutlined />
                      </IconButton>
                    </InputAdornment>
                  }
                />        
            )
            : (
                <IconButton 
                  onClick={() => setIsSearchVisible(true)}
                  className="fadeIn"
                  sx={{ display:  { xs: 'none', sm: 'flex' } }}
                >
                  <SearchOutlined />
                </IconButton>
            )
        }

        { /* Lower Screens */ }
        <IconButton
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={toggleSideMenu}
        >
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
