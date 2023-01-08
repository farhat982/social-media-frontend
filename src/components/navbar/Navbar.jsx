import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import './navbar.scss';
import { useContext } from 'react';
import { DarkModeContext } from '../../context/darkModeContext';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';

const Navbar = () => {
  const { darkMode, toggle } = useContext(DarkModeContext);
  const { currentUser, logout } = useContext(AuthContext);

  // const logout = async (inputs) => {
  //   await axios.post('http://localhost:8000/api/auth/logout');
  //   setCurrentUser(null);
  // };

  return (
    <div className='navbar'>
      <div className='left'>
        <Link
          to='/'
          style={{ textDecoration: 'none' }}
        >
          <span>Social Media</span>
        </Link>

        <HomeOutlinedIcon style={{ cursor: 'pointer' }} />

        {darkMode ? (
          <WbSunnyOutlinedIcon
            onClick={toggle}
            style={{ cursor: 'pointer' }}
          />
        ) : (
          <DarkModeOutlinedIcon
            onClick={toggle}
            style={{ cursor: 'pointer' }}
          />
        )}
        <AppsOutlinedIcon style={{ cursor: 'pointer' }} />
        <div className='search'>
          <SearchOutlinedIcon style={{ cursor: 'pointer' }} />
          <input
            type='text'
            placeholder='Search...'
          />
        </div>
      </div>

      <div className='right'>
        <PersonOutlinedIcon style={{ cursor: 'pointer' }} />
        <EmailOutlinedIcon style={{ cursor: 'pointer' }} />
        <NotificationsOutlinedIcon style={{ cursor: 'pointer' }} />
        <LogoutIcon
          onClick={logout}
          style={{ cursor: 'pointer' }}
        />
        <div className='user'>
          <img
            src={currentUser.profilePic}
            alt=''
          />
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
