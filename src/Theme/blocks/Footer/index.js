import React from 'react';
import styles from './index.module.css'
import { Grid, Row, Col } from 'react-flexbox-grid';
import DBText from '../../../CMS/components/DBText'


class Footer extends React.Component {


  
  render(){
    const contact = this.props.data.general ? this.props.data.general.contact : {}
    const address = contact ? contact.address : {}
    const email = contact ? contact.email : null
    const telephone = contact ? contact.phone : null
    const street = address ? address.street1 : null
    const city = address ? address.suburb : null
    const country = address ? address.country : null
    const postcode = address ? address.postcode : null

    return(
      <footer>
        <Grid className="container" fluid>
            <Row center="xs">
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
                <p>
                 <span className="text-icon">E </span> <a href={email}>{email}</a>
                </p>
                <p>
                  <span className="text-icon">T </span> <a href={telephone}>{telephone}</a>
                </p>
                <br />
                <p>{street}</p>
                <p>{postcode}, {city}</p>
                <p>{country}</p>
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

