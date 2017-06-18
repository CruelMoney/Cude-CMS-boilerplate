import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import styles from './index.module.css'
import Logo from '../../components/Logo/index'

class Navigation extends React.Component {
  render() {
    return (
        <nav >
            <Grid fluid className="container">           
                <Row between="xs">
                    <Col xs={12}>
                        <div className={styles.menuWrapper}>
                            <div className={styles.menu}>
                                <ul>
                                    <li>
                                        <a href="#about">ABOUT</a>
                                    </li>
                                    <li>
                                        <a href="#menu">MENU</a>
                                    </li>
                                    <li>
                                        <a href="#contact">CONTACT</a>
                                    </li>
                                    <li>
                                        <a href="#order">ORDER</a>
                                    </li>
                                </ul>
                            </div>
                            <div className={styles.logo}>
                                <Logo />
                            </div>   
                            <div>
                                <a className="faded" href="#instagram">FOLLOW US</a>          
                            </div>                  
                            
                        </div>
                    </Col>
                </Row>
             </Grid>
        </nav>
        );
        }
    }


export default (Navigation)
