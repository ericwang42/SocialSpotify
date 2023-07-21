import React from 'react';
import { Link } from 'react-router-dom';
import './styling/NavBar.css';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';

const NavBar: React.FC = () => {
  return (
    <div className="nav">
      <Link to="/search">
        <div className="nav-item">
          <div className="icon">
          <SearchIcon aria-label="search" />
          </div>
          <div className="label">Search</div>
        </div>
      </Link>
      <Link to="/profile">
        <div className="nav-item">
          <div className="icon">
          <PersonIcon aria-label="profile" />



</div>
          <div className="label">Profile</div>
        </div>
      </Link>
    </div>
  );
};

export default NavBar;
