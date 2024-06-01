import { Avatar, IconButton, Badge, Box } from '@mui/material';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Navbar.css';
import { Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Navbar = () => {
  const { auth, cart } = useSelector((store) => store);
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    if (auth.user.role === 'ROLE_CUSTOMER') {
      navigate('/my-profile');
    } else {
      navigate('/admin/restaurants');
    }
  };

  return (
    <Box className="navbar px-5 sticky z-50 py-[.8rem]">
     <div className='lg:mr-10 cursor-pointer flex items-center space-x-1'>
    <Avatar onClick={()=>navigate("/")} src="/9ossos.ico" alt="9ossos Logo" className="logo-image"></Avatar>  
    <li onClick={()=>navigate("/")} className='logo   font: italic 1.2rem "Fira Sans", serif text-gray-100 text-2xl'>
      Food service
    </li>
  </div>
      <div className="menu">
        <a href="#">Home</a>
        <a href="#">Menu</a>
        <a href="#">About</a>
        <a href="#">Book Table</a>
      </div>
      <div className="actions">
        <IconButton>
          <SearchIcon sx={{ fontSize: '1.5rem' }} />
        </IconButton>
        <IconButton onClick={() => navigate('/cart')}>
          <Badge color="primary" badgeContent={cart.cart?.item.length}>
            <ShoppingCartIcon sx={{ fontSize: '1.5rem' }} />
          </Badge>
        </IconButton>
        {auth.user ? (
          <Avatar onClick={handleAvatarClick} sx={{ bgcolor: 'white', color: 'green' }}>
            {auth.user.fullName ? auth.user.fullName[0].toUpperCase() : ''}
          </Avatar>
        ) : (
          <IconButton onClick={() => navigate('/account/login')}>
            <Person />
          </IconButton>
        )}
        <a href="#" className="order-btn">Order Online</a>
      </div>
    </Box>
  );
};

export default Navbar;