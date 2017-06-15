import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import fetcher from '../../../CMS/higher-order-components/Fetcher/index'
import styles from './index.scss'
import DocumentMeta from 'react-document-meta';

class HomePage extends React.Component {

  render() {
    const meta = {
      title: 'California kitchen',
      description: 'Feel that cali vibe.',
      meta: {
        charSet: 'utf-8',
        name: {
          keywords: 'food, california, takeaway, copenhagen'
        }
      }
    };
    return (
        <Grid   
        fluid className={"container " + styles.container}>
         <DocumentMeta {...meta} extend />
          <Row>
            <Col xs={12} >
                Hello world
              </Col>
            </Row>
        </Grid>
    );
  }
}

export default fetcher(HomePage, '/api/configuration')
  