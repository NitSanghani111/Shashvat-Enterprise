"use client";

import React from "react";
import PropTypes from "prop-types";
import { AppBar, Toolbar, Box, Button, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Collapse, Divider, CssBaseline, Popper, Paper, MenuItem, ClickAwayListener, Grow, MenuList, CircularProgress, useMediaQuery, useTheme, Typography, Badge } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useRecoilValue } from "recoil";
import { userAtom } from "../Atoms/userAtom";
import { allCategoriesAtom } from "../Atoms/categories";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { isNewRequrimentRequestAtom } from "../Atoms/isNewRequrimentRequestAtom";
import logo from "../img/image.png";

const DRAWER_WIDTH = 300;

export default function NavBar({ window: windowProp }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [productMenuOpen, setProductMenuOpen] = React.useState(false);
  const [submenuOpen, setSubmenuOpen] = React.useState({});
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = React.useState({});
  const [scrolled, setScrolled] = React.useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  const user = useRecoilValue(userAtom);
  const allCategories = useRecoilValue(allCategoriesAtom) || [];
  const isNewReq = useRecoilValue(isNewRequrimentRequestAtom);

  const productButtonRef = React.useRef(null);
  const submenuAnchors = React.useRef({});

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Products', path: '/products', hasDropdown: true },
    { label: 'Services', path: '/services' },
    { label: 'Catalog', path: '/catalog' },
    { label: 'Contact Us', path: '/contact' }
  ];

  const adminItems = user?.isAdmin ? [
    { label: 'Manage Products', path: '/admin/manage-products' },
    { label: 'Reviews', path: '/admin/customer-reviews' },
    { label: 'Requests', path: '/admin/client-requirements', badge: isNewReq }
  ] : [];

  const productCategories = React.useMemo(() => {
    return allCategories.filter(Boolean).map(c => ({
      id: c.id || c._id || c.name,
      label: c.name,
      path: `/products/${(c.name || '').toLowerCase().replace(/\s+/g, '-')}`,
      sub: Array.isArray(c.subcategories) ? c.subcategories.map(s => ({ id: s.id || s._id || s.name, label: s.name, path: `/products/${(c.name || '').toLowerCase().replace(/\s+/g, '-')}/${(s.name || '').toLowerCase().replace(/\s+/g, '-')}` })) : []
    }));
  }, [allCategories]);

  React.useEffect(() => {
    const targetWindow = typeof windowProp === 'function' ? windowProp() : (typeof window !== 'undefined' ? window : undefined);
    if (!targetWindow) return;
    
    const onScroll = () => {
      setScrolled(targetWindow.scrollY > 20);
    };
    
    targetWindow.addEventListener('scroll', onScroll);
    onScroll();
    return () => targetWindow.removeEventListener('scroll', onScroll);
  }, [windowProp]);

  const navigateTo = (p) => { 
    navigate(p); 
    setMobileOpen(false); 
    setProductMenuOpen(false); 
    setSubmenuOpen({});
  };

  const isActiveRoute = (path) => location.pathname === path;
  const isProductsActive = () => location.pathname === '/products' || location.pathname.startsWith('/products/');

  const renderDesktopDropdown = () => (
    <Popper 
      open={productMenuOpen} 
      anchorEl={productButtonRef.current} 
      placement="bottom-start" 
      transition 
      disablePortal 
      onMouseLeave={() => setProductMenuOpen(false)}
      style={{ zIndex: 1300 }}
    >
      {({ TransitionProps }) => (
        <Grow {...TransitionProps} style={{ transformOrigin: 'top left' }}>
          <Paper 
            elevation={8}
            sx={{ 
              minWidth: 240, 
              maxHeight: 480, 
              overflowY: 'auto',
              mt: 1,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: '0 12px 48px rgba(0,0,0,0.12)',
              '&::-webkit-scrollbar': { width: '8px' },
              '&::-webkit-scrollbar-thumb': { 
                backgroundColor: 'rgba(0,0,0,0.2)', 
                borderRadius: '4px' 
              }
            }}
          >
            <ClickAwayListener onClickAway={() => setProductMenuOpen(false)}>
              <MenuList sx={{ py: 1 }}>
                {productCategories.length ? productCategories.map(cat => (
                  cat.sub.length ? (
                    <Box 
                      key={cat.id} 
                      onMouseEnter={(e) => { 
                        submenuAnchors.current[cat.id] = e.currentTarget; 
                        setSubmenuOpen(s => ({ ...s, [cat.id]: true })); 
                      }} 
                      onMouseLeave={() => setSubmenuOpen(s => ({ ...s, [cat.id]: false }))}
                    >
                      <MenuItem 
                        onClick={() => navigateTo(cat.path)} 
                        sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          py: 1.5,
                          px: 2.5,
                          fontFamily: "'Inter', 'Roboto', sans-serif",
                          fontSize: '0.95rem',
                          fontWeight: 500,
                          color: '#1a1a1a',
                          transition: 'all 0.2s ease',
                          '&:hover': { 
                            backgroundColor: 'rgba(197, 177, 115, 0.08)',
                            color: '#c5b173',
                            pl: 3
                          }
                        }}
                      >
                        {cat.label}
                        <KeyboardArrowRightIcon fontSize="small" sx={{ ml: 1, color: '#999' }} />
                      </MenuItem>
                      <Popper 
                        open={!!submenuOpen[cat.id]} 
                        anchorEl={submenuAnchors.current[cat.id]} 
                        placement="right-start" 
                        transition
                        style={{ zIndex: 1400 }}
                      >
                        {({ TransitionProps: TP }) => (
                          <Grow {...TP} style={{ transformOrigin: 'left top' }}>
                            <Paper 
                              elevation={8}
                              sx={{ 
                                minWidth: 200,
                                ml: 0.5,
                                borderRadius: 2,
                                border: '1px solid',
                                borderColor: 'divider',
                                boxShadow: '0 12px 48px rgba(0,0,0,0.12)'
                              }}
                            >
                              <MenuList sx={{ py: 1 }}>
                                {cat.sub.map(s => (
                                  <MenuItem 
                                    key={s.id} 
                                    onClick={() => navigateTo(s.path)}
                                    sx={{
                                      py: 1.25,
                                      px: 2.5,
                                      fontFamily: "'Inter', 'Roboto', sans-serif",
                                      fontSize: '0.9rem',
                                      color: '#333',
                                      transition: 'all 0.2s ease',
                                      '&:hover': { 
                                        backgroundColor: 'rgba(197, 177, 115, 0.08)',
                                        color: '#c5b173',
                                        pl: 3
                                      }
                                    }}
                                  >
                                    {s.label}
                                  </MenuItem>
                                ))}
                              </MenuList>
                            </Paper>
                          </Grow>
                        )}
                      </Popper>
                    </Box>
                  ) : (
                    <MenuItem 
                      key={cat.id} 
                      onClick={() => navigateTo(cat.path)}
                      sx={{
                        py: 1.5,
                        px: 2.5,
                        fontFamily: "'Inter', 'Roboto', sans-serif",
                        fontSize: '0.95rem',
                        fontWeight: 500,
                        color: '#1a1a1a',
                        transition: 'all 0.2s ease',
                        '&:hover': { 
                          backgroundColor: 'rgba(197, 177, 115, 0.08)',
                          color: '#c5b173',
                          pl: 3
                        }
                      }}
                    >
                      {cat.label}
                    </MenuItem>
                  )
                )) : (
                  <MenuItem 
                    disabled 
                    sx={{ 
                      py: 1.5, 
                      px: 2.5, 
                      fontFamily: "'Inter', 'Roboto', sans-serif",
                      fontStyle: 'italic',
                      color: '#999'
                    }}
                  >
                    No categories available
                  </MenuItem>
                )}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );

  const renderMobileProducts = () => (
    <>
      <ListItem disablePadding>
        <ListItemButton 
          onClick={() => setMobileSubmenuOpen(s => ({ ...s, products: !s.products }))}
          aria-label="Products menu"
          aria-expanded={!!mobileSubmenuOpen.products}
          aria-haspopup="true"
          sx={{ 
            justifyContent: 'space-between',
            py: 1.75,
            px: 3,
            fontFamily: "'Inter', 'Roboto', sans-serif",
            transition: 'all 0.2s ease',
            '&:hover': { 
              backgroundColor: 'rgba(197, 177, 115, 0.08)',
              pl: 3.5
            }
          }}
        >
          <ListItemText 
            primary="Products" 
            primaryTypographyProps={{ 
              fontWeight: 600,
              fontSize: '1rem',
              fontFamily: "'Inter', 'Roboto', sans-serif"
            }} 
          />
          {mobileSubmenuOpen.products ? 
            <ExpandLessIcon sx={{ color: '#c5b173' }} /> : 
            <ExpandMoreIcon sx={{ color: '#666' }} />
          }
        </ListItemButton>
      </ListItem>
      <Collapse in={!!mobileSubmenuOpen.products} timeout={300}>
        <List component="div" disablePadding>
          {productCategories.map(cat => (
            <React.Fragment key={cat.id}>
              <ListItem disablePadding>
                <ListItemButton 
                  onClick={() => navigateTo(cat.path)} 
                  sx={{ 
                    pl: 5,
                    pr: 3,
                    py: 1.5,
                    transition: 'all 0.2s ease',
                    '&:hover': { 
                      backgroundColor: 'rgba(197, 177, 115, 0.08)',
                      pl: 5.5
                    }
                  }}
                >
                  <ListItemText 
                    primary={cat.label}
                    primaryTypographyProps={{
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      fontFamily: "'Inter', 'Roboto', sans-serif"
                    }}
                  />
                </ListItemButton>
              </ListItem>
              {cat.sub.map(s => (
                <ListItem key={s.id} disablePadding>
                  <ListItemButton 
                    sx={{ 
                      pl: 7,
                      pr: 3,
                      py: 1.25,
                      transition: 'all 0.2s ease',
                      '&:hover': { 
                        backgroundColor: 'rgba(197, 177, 115, 0.06)',
                        pl: 7.5
                      }
                    }} 
                    onClick={() => navigateTo(s.path)}
                  >
                    <ListItemText 
                      primary={s.label}
                      primaryTypographyProps={{
                        fontSize: '0.875rem',
                        color: '#555',
                        fontFamily: "'Inter', 'Roboto', sans-serif"
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </React.Fragment>
          ))}
        </List>
      </Collapse>
    </>
  );

  const drawer = (
    <Box sx={{ width: DRAWER_WIDTH, height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#fafafa' }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        p: 3,
        bgcolor: 'white',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}>
        <Link to="/" onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Shashvat logo" style={{ height: 56 }} />
        </Link>
        <IconButton 
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation menu"
          sx={{ 
            color: '#666',
            '&:hover': { 
              backgroundColor: 'rgba(197, 177, 115, 0.1)',
              color: '#c5b173'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      
      <List sx={{ flex: 1, overflowY: 'auto', py: 2, bgcolor: 'white' }}>
        {navItems.map(item => item.hasDropdown ? (
          <React.Fragment key={item.label}>{renderMobileProducts()}</React.Fragment>
        ) : (
          <ListItem key={item.label} disablePadding>
            <ListItemButton 
              onClick={() => navigateTo(item.path)}
              sx={{
                py: 1.75,
                px: 3,
                transition: 'all 0.2s ease',
                backgroundColor: isActiveRoute(item.path) ? 'rgba(197, 177, 115, 0.08)' : 'transparent',
                borderLeft: isActiveRoute(item.path) ? '4px solid #c5b173' : '4px solid transparent',
                '&:hover': { 
                  backgroundColor: 'rgba(197, 177, 115, 0.08)',
                  pl: 3.5
                }
              }}
            >
              <ListItemText 
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: isActiveRoute(item.path) ? 600 : 500,
                  fontSize: '1rem',
                  color: isActiveRoute(item.path) ? '#c5b173' : '#333',
                  fontFamily: "'Inter', 'Roboto', sans-serif"
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        
        {adminItems.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography 
              variant="overline" 
              sx={{ 
                px: 3, 
                py: 1, 
                color: '#999',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                fontFamily: "'Inter', 'Roboto', sans-serif"
              }}
            >
              Admin
            </Typography>
          </>
        )}
        
        {adminItems.map(it => (
          <ListItem key={it.label} disablePadding>
            <ListItemButton 
              onClick={() => navigateTo(it.path)}
              sx={{
                py: 1.75,
                px: 3,
                transition: 'all 0.2s ease',
                backgroundColor: isActiveRoute(it.path) ? 'rgba(197, 177, 115, 0.08)' : 'transparent',
                borderLeft: isActiveRoute(it.path) ? '4px solid #c5b173' : '4px solid transparent',
                '&:hover': { 
                  backgroundColor: 'rgba(197, 177, 115, 0.08)',
                  pl: 3.5
                }
              }}
            >
              <ListItemText 
                primary={it.label}
                primaryTypographyProps={{
                  fontWeight: isActiveRoute(it.path) ? 600 : 500,
                  fontSize: '1rem',
                  color: isActiveRoute(it.path) ? '#c5b173' : '#333',
                  fontFamily: "'Inter', 'Roboto', sans-serif"
                }}
              />
              {it.badge && (
                <Badge 
                  color="error" 
                  variant="dot" 
                  sx={{ 
                    '& .MuiBadge-badge': { 
                      right: -8, 
                      top: 8 
                    } 
                  }} 
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ p: 3, bgcolor: 'white', borderTop: '1px solid', borderColor: 'divider' }}>
        <Button 
          fullWidth 
          variant="contained" 
          onClick={() => navigateTo('/contact')}
          aria-label="Get a quote - Contact us"
          sx={{ 
            bgcolor: '#c5b173',
            color: 'white',
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 700,
            fontFamily: "'Inter', 'Roboto', sans-serif",
            textTransform: 'none',
            borderRadius: 2,
            boxShadow: '0 4px 14px rgba(197, 177, 115, 0.3)',
            '&:hover': { 
              bgcolor: '#b09a5f',
              boxShadow: '0 6px 20px rgba(197, 177, 115, 0.4)',
              transform: 'translateY(-2px)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          Get A Quote
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box>
      <CssBaseline />
      <AppBar 
        position="fixed" 
        sx={{ 
          bgcolor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'white',
          color: '#111',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.05)',
          borderBottom: '1px solid',
          borderColor: scrolled ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.06)',
          transition: 'all 0.3s ease'
        }}
      >
        <Toolbar sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          py: { xs: 1.5, sm: 2, md: 2.5 },
          px: { xs: 2, sm: 3, md: 4, lg: 6 }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/" onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', lineHeight: 0 }}>
              <img src={logo} alt="Shashvat" style={{ height: isMobile ? 44 : isTablet ? 52 : 64, maxHeight: 64 }} />
            </Link>
          </Box>

          <Box sx={{ 
            display: { xs: 'none', lg: 'flex' }, 
            alignItems: 'center', 
            gap: 1,
            flex: 1,
            justifyContent: 'center',
            ml: 6
          }}>
            {navItems.map(item => item.hasDropdown ? (
              <Box key={item.label}>
                <Button 
                  ref={productButtonRef} 
                  onMouseEnter={() => setProductMenuOpen(true)} 
                  onClick={() => navigateTo(item.path)}
                  aria-label="Products menu"
                  aria-expanded={Boolean(productMenuOpen)}
                  aria-haspopup="true"
                  endIcon={<ExpandMoreIcon sx={{ 
                    transition: 'transform 0.2s ease',
                    transform: productMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                  }} />} 
                  sx={{ 
                    textTransform: 'none', 
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    color: productMenuOpen || isProductsActive() ? '#c5b173' : '#333',
                    fontFamily: "'Inter', 'Roboto', sans-serif",
                    px: 2.5,
                    py: 1.25,
                    position: 'relative',
                    transition: 'all 0.2s ease',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 8,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: productMenuOpen || isProductsActive() ? '60%' : '0%',
                      height: '2px',
                      bgcolor: '#c5b173',
                      transition: 'width 0.3s ease'
                    },
                    '&:hover': {
                      color: '#c5b173',
                      backgroundColor: 'rgba(197, 177, 115, 0.04)',
                      '&::after': { width: '60%' }
                    }
                  }}
                >
                  {item.label}
                </Button>
                {renderDesktopDropdown()}
              </Box>
            ) : (
              <Button 
                key={item.label} 
                onClick={() => navigateTo(item.path)}
                aria-label={`Navigate to ${item.label}`}
                aria-current={isActiveRoute(item.path) ? 'page' : undefined}
                sx={{ 
                  textTransform: 'none', 
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  color: isActiveRoute(item.path) ? '#c5b173' : '#333',
                  fontFamily: "'Inter', 'Roboto', sans-serif",
                  px: 2.5,
                  py: 1.25,
                  position: 'relative',
                  transition: 'all 0.2s ease',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 8,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: isActiveRoute(item.path) ? '60%' : '0%',
                    height: '2px',
                    bgcolor: '#c5b173',
                    transition: 'width 0.3s ease'
                  },
                  '&:hover': {
                    color: '#c5b173',
                    backgroundColor: 'rgba(197, 177, 115, 0.04)',
                    '&::after': { width: '60%' }
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
            {adminItems.map(it => (
              <Button 
                key={it.label} 
                onClick={() => navigateTo(it.path)} 
                sx={{ 
                  textTransform: 'none', 
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  color: isActiveRoute(it.path) ? '#c5b173' : '#333',
                  fontFamily: "'Inter', 'Roboto', sans-serif",
                  px: 2.5,
                  py: 1.25,
                  position: 'relative',
                  transition: 'all 0.2s ease',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 8,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: isActiveRoute(it.path) ? '60%' : '0%',
                    height: '2px',
                    bgcolor: '#c5b173',
                    transition: 'width 0.3s ease'
                  },
                  '&:hover': {
                    color: '#c5b173',
                    backgroundColor: 'rgba(197, 177, 115, 0.04)',
                    '&::after': { width: '60%' }
                  }
                }}
              >
                {it.label}
                {it.badge && <Badge color="error" variant="dot" sx={{ ml: 0.5, '& .MuiBadge-dot': { right: -4, top: 2 } }} />}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
              <Button 
                variant="contained" 
                onClick={() => navigateTo('/contact')}
                aria-label="Get a quote - Contact us"
                sx={{ 
                  bgcolor: '#c5b173',
                  color: 'white',
                  px: 3.5,
                  py: 1.25,
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  fontFamily: "'Inter', 'Roboto', sans-serif",
                  textTransform: 'none',
                  borderRadius: 2,
                  boxShadow: '0 4px 14px rgba(197, 177, 115, 0.3)',
                  '&:hover': { 
                    bgcolor: '#b09a5f',
                    boxShadow: '0 6px 20px rgba(197, 177, 115, 0.4)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Get A Quote
              </Button>
            </Box>
            <IconButton 
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              sx={{ 
                display: { lg: 'none' },
                color: '#333',
                '&:hover': { 
                  backgroundColor: 'rgba(197, 177, 115, 0.1)',
                  color: '#c5b173'
                }
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Drawer 
        anchor="right" 
        open={mobileOpen} 
        onClose={() => setMobileOpen(false)} 
        ModalProps={{ keepMounted: true }} 
        sx={{ 
          '& .MuiDrawer-paper': { 
            width: DRAWER_WIDTH,
            boxShadow: '-8px 0 24px rgba(0,0,0,0.12)'
          } 
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

NavBar.propTypes = { window: PropTypes.func };
