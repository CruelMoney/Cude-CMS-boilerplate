import React from 'react';
import { Grid, Row, Col } from 'react-styled-flexboxgrid';
import styles from './index.module.css'
import Logo from '../../components/Logo/index'
import Facebook from '../../../CMS/assets/icons/facebook.svg'
import Instagram from '../../../CMS/assets/icons/instagram.svg'
import { configureAnchors } from 'react-scrollable-anchor'
configureAnchors({offset: -60, scrollDuration: 600})

var last_known_scroll_position = 0;
var ticking = false;

class Navigation extends React.Component {
    state={fixed:false}

    scrollToBottom = () =>{
        const scrollTo = document.body.scrollHeight
        window.scroll({top: scrollTo-800, behavior: "smooth"})
    }

    logoText = null
  componentDidMount() {
      window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

    openOrder=()=>{
        window.iwaiterPopup()
    }

  handleScroll=(e)=>{
        last_known_scroll_position = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(()=> {
            this.animate(last_known_scroll_position);
            ticking = false;
            });
        }
        ticking = true;
  }

  animate=(position)=>{
    if(position > 50 && !this.state.fixed) {
        this.setState({fixed:true})
    }else if(position < 50 && this.state.fixed){
        this.setState({fixed:false})
    }
  }

    logo = null
  render() {
    const instagram = this.props.data && this.props.data.social && this.props.data.social.social.instagram
    const facebook = this.props.data && this.props.data.social && this.props.data.social.social.facebook

    return (
        <nav>
            <Grid fluid className={"container " + styles.grid}>           
                <Row between="xs">
                    <Col xs={12}>
                        <div className={styles.menuWrapper + " " + (this.state.fixed ? styles.animated : "")}>
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
                                        <a onClick={this.openOrder} href="#order">ORDER</a>
                                    </li>
                                </ul>
                            </div>
                            <div 
                             ref={r=>this.logo=r}
                            className={styles.logo}>
                                <Logo 
                               
                                />
                            </div>   
                            <div>
                            <div className={styles.social}>
                                <p className="faded">FOLLOW US</p>
                                <ul className={styles.icons}>
                                    <li>
                                        <a className={"faded " + styles.facebook} target="_blank" href={facebook}><Facebook height={20} width={20} /></a>
                                    </li>
                                    <li>
                                        <a className={"faded " + styles.instagram} target="_blank" href={instagram}><Instagram height={20} width={20} /></a>
                                    </li>
                                </ul>         
                            </div>    
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
