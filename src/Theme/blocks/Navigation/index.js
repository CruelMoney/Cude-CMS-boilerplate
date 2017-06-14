import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
//import styles from './index.scss'
import Logo from '../../components/Logo/index'

class Navigation extends React.Component {
  render() {
    return (
        <nav >
            <Grid fluid className="container">           
                <Row between="xs">
                    <Col xs={12}>
                      <Logo />      
                    </Col>
                </Row>
             </Grid>
        </nav>
        );
        }
    }


export default (Navigation)
