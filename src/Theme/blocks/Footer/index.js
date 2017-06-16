import React from 'react';
import styles from './index.module.css'
import { Grid, Row, Col } from 'react-flexbox-grid';
import DBText from '../../../CMS/components/DBText'


class Footer extends React.Component {
  render(){
    return(
      <footer>
        <Grid className="container" fluid>
            <Row center="xs" className="full-width">
              <Col xs={6} >
              <h2>
                <DBText dbKey="footer-contact">
                  contact
                </DBText>
              </h2>
              <div className="manchet">
                <DBText dbKey="footer-contact-manchet">
                  Please contact us if you have any questions
                </DBText>
              </div>
              <div className={styles.contact}>
                <a href={this.props.email}>{this.props.email}</a>
                <a href={this.props.telephone}>{this.props.telephone}</a>
                <p>{this.props.street}</p>
                <p>{this.props.city}</p>
                <p>{this.props.country}</p>
                <br />
                <DBText dbKey="footer-contact-open-hours">
                  Open all days
                </DBText>
              </div>
              </Col>
            </ Row>
        </Grid>
      </footer>
  )}
}

export default Footer

