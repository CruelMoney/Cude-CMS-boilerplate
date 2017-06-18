import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import styles from './index.module.css'
import Logo from '../../components/Logo/index'
import { configureAnchors } from 'react-scrollable-anchor'
configureAnchors({offset: -60, scrollDuration: 600})

class Navigation extends React.Component {
    scrollToBottom = () =>{
        const scrollTo = document.body.scrollHeight
        window.scroll({top: scrollTo-800, behavior: "smooth"})
    }


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
                                        <a 
                                        onClick={this.scrollToBottom}
                                        href="#contact">CONTACT</a>
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
