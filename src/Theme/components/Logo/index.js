import React from 'react';
import styles from './index.module.css'
import { NavLink } from 'react-router-dom';
import LogoSVG from '../../assets/icons/logo.svg'

class Logo extends React.Component {
  render() {
    return (
      <NavLink to="/">
        <div className={styles.logo}>
          <LogoSVG />
        </div>
      </NavLink>
    );
  }
}

export default Logo
