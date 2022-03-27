import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from '@mui/icons-material';
import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { UiContext } from '../../context';



export const SideMenu = () => {

    const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('')


    const navigateTo = (path: string) => {
        toggleSideMenu()
        router.push(path);
    }

    const onSearchTerm = () => {
        if(searchTerm.trim().length === 0) return
        
        navigateTo(`/search/${searchTerm}`)
    }

    return (
        <Drawer
            open={ isMenuOpen }
            anchor='right'
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
            onClose={ toggleSideMenu }
        >
            <Box sx={{ width: 250, paddingTop: 5 }}>
                
                <List>

                    <ListItem>
                        <Input
                            type='text'
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={ (e) => setSearchTerm(e.target.value) }
                            onKeyPress={ (e) => e.key === 'Enter' && onSearchTerm() }
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={ onSearchTerm }
                                    >
                                    <SearchOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <AccountCircleOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Profile'} />
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <ConfirmationNumberOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'My orders'} />
                    </ListItem>


                    <ListItem 
                        button sx={{ display: { xs: '', sm: 'none' } }}
                        onClick={() => navigateTo('/category/men')}
                    >
                        <ListItemIcon>
                            <MaleOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Men'} />
                    </ListItem>

                    <ListItem 
                        button sx={{ display: { xs: '', sm: 'none' } }}
                        onClick={() => navigateTo('/category/women')}
                    >
                        <ListItemIcon>
                            <FemaleOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Women'} />
                    </ListItem>

                    <ListItem 
                        button sx={{ display: { xs: '', sm: 'none' } }}
                        onClick={() => navigateTo('/category/kid')}
                    >
                        <ListItemIcon>
                            <EscalatorWarningOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Kids'} />
                    </ListItem>


                    <ListItem button>
                        <ListItemIcon>
                            <VpnKeyOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Sign in'} />
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <LoginOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Sign out'} />
                    </ListItem>


                    {/* Admin */}
                    <Divider />
                    <ListSubheader>Admin Panel</ListSubheader>

                    <ListItem button>
                        <ListItemIcon>
                            <CategoryOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Products'} />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <ConfirmationNumberOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Orders'} />
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <AdminPanelSettings/>
                        </ListItemIcon>
                        <ListItemText primary={'Users'} />
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    )
}
