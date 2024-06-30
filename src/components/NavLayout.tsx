import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';

const NavLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/cart');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={()=> navigate('/')}>
            Shopping Cart
          </Typography>
          <Button color="inherit" onClick={handleCartClick}>Cart</Button>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="cart"
            sx={{ ml: 2 }}
            onClick={handleCartClick}
          >
            <ShoppingCartIcon onClick={handleCartClick}/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavLayout;
