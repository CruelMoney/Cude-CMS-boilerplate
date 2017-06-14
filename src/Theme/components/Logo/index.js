import React from 'react';
import styles from './index.scss'
import { NavLink } from 'react-router-dom';

class Logo extends React.Component {
  render() {
    return (
      <NavLink to="/">
        <div className={styles.logo}>
          LOGO
        </div>
      </NavLink>
    );
  }
}

export default Logo

