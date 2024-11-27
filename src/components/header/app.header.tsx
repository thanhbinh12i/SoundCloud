'use client'
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';


//styled-component
const Search = styled('div')(({ theme }) => ({
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
      },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
      color: 'inherit',
      '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                  width: '400px',
            },
      },
}));

export default function AppHeader() {
      const { data: session } = useSession()
      const router = useRouter();
      const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
      const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
            React.useState<null | HTMLElement>(null);

      const isMenuOpen = Boolean(anchorEl);
      const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

      const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(event.currentTarget);
      };

      const handleMobileMenuClose = () => {
            setMobileMoreAnchorEl(null);
      };

      const handleMenuClose = () => {
            setAnchorEl(null);
            handleMobileMenuClose();
      };

      const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
            setMobileMoreAnchorEl(event.currentTarget);
      };
      const menuId = 'primary-search-account-menu';
      const renderMenu = (
            <Menu
                  anchorEl={anchorEl}
                  id={menuId}
                  keepMounted
                  open={isMenuOpen}
                  onClose={handleMenuClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                  <MenuItem>
                        <Link href='/profile' style={{ color: "unset", textDecoration: "unset" }}>
                              Profile
                        </Link>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            </Menu>
      );

      const mobileMenuId = 'primary-search-account-menu-mobile';
      const renderMobileMenu = (
            <Menu
                  anchorEl={mobileMoreAnchorEl}
                  anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                  }}
                  id={mobileMenuId}
                  keepMounted
                  transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                  }}
                  open={isMobileMenuOpen}
                  onClose={handleMobileMenuClose}
            >
                  <MenuItem><Link href='/profile'>Profile</Link></MenuItem>
                  <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
            </Menu>
      );
      const handleRedirectHome = () => {
            router.push('/')
      }

      return (
            <Box sx={{ flexGrow: 1 }}>
                  <AppBar
                        position="static"
                        sx={{ background: '#333' }}
                  >
                        <Container>
                              <Toolbar>
                                    <img onClick={() => handleRedirectHome()} src='assest/logo.png' style={{ background: 'linear-gradient(#f70,#f30)', padding: '10px', marginRight: '10px', cursor: 'pointer' }} />
                                    <Typography
                                          variant="h6"
                                          noWrap
                                          component="div"
                                          sx={{ display: { xs: 'none', sm: 'block', cursor: 'pointer' } }}
                                          onClick={() => handleRedirectHome()}
                                    >
                                          Binhdaynee
                                    </Typography>
                                    <Search>
                                          <SearchIconWrapper>
                                                <SearchIcon />
                                          </SearchIconWrapper>
                                          <StyledInputBase
                                                placeholder="Search…"
                                                inputProps={{ 'aria-label': 'search' }}
                                          />
                                    </Search>
                                    <Box sx={{ flexGrow: 1 }} />
                                    {
                                          session ?
                                                <>
                                                      <Box sx={{
                                                            display: { xs: 'none', md: 'flex' },
                                                            gap: "20px",
                                                            alignItems: "center",
                                                            cursor: "pointer",
                                                            "> a": {
                                                                  color: "unset",
                                                                  textDecoration: "unset"
                                                            }
                                                      }}>
                                                            <Link href='/playlist'>Playlist</Link>
                                                            <Link href='/like'>Likes</Link>
                                                            <span>Upload</span>
                                                            <Avatar alt="Remy Sharp" src='assest/avatar.jpg' onClick={handleProfileMenuOpen} />
                                                      </Box>
                                                </>
                                                :
                                                <>
                                                      <Link href='/api/auth/signin'>Login</Link>
                                                </>
                                    }
                                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                          <IconButton
                                                size="large"
                                                aria-label="show more"
                                                aria-controls={mobileMenuId}
                                                aria-haspopup="true"
                                                onClick={handleMobileMenuOpen}
                                                color="inherit"
                                          >
                                                <MoreIcon />
                                          </IconButton>
                                    </Box>
                              </Toolbar>
                        </Container>
                  </AppBar>
                  {renderMobileMenu}
                  {renderMenu}
            </Box>
      );
}