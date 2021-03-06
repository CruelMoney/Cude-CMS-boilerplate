import React from 'react';
import { Grid, Row, Col } from 'react-styled-flexboxgrid';
import styles from './index.module.css'
import DocumentMeta from 'react-document-meta';
import Slider from '../../blocks/Slider'
import DBText from '../../../CMS/components/DBText'
import DBImage from '../../../CMS/components/DBImage'
import Featured from '../Featured'
import Button from '../../components/Button'
import fetcher from '../../../CMS/higher-order-components/Fetcher'
import ScrollableAnchor from 'react-scrollable-anchor'


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
    const sliderImages = this.props.data.slider && this.props.data.slider.images

    return (
        <div id="homepage">
          <DocumentMeta {...meta} extend />
          <Grid fluid className={"container"}>
            <section>
              <Row>
                <Col xs={12} >
                  <Slider images={sliderImages}>
                    <Row middle="xs" center="xs" className={styles.sliderContent}>
                      <Col xs={10} sm={5} md={5} lg={5}  >
                        <div className="display">
                            <DBText dbKey="homepage-slider-welcome">
                              Welcome to California Kitchen
                            </DBText>
                        </div>
                          <Button white>
                              <a href="http://californiakitchen.orderyoyo.com">ORDER FOOD</a>
                          </Button>
                      </Col>
                    </Row>
                  </Slider> 
                </Col>
              </Row>
            </section>
          </Grid>
           
          <section className="full-width">
            <Grid fluid className={"container"}>
            <Row center="xs">
              <Col  xs={12} sm={6} >
                <h2>
                  <DBText dbKey="homepage-welcome">
                    welcome
                  </DBText>
                </h2>
                <div className="manchet">
                  <DBText dbKey="homepage-welcome-text">
                    California Kitchen is a fast-casual healthy lifestyle restaurant that provides a unique and distinguishable California experience by way of taste, education, hospitality and design.
                  </DBText>
                </div>
              </Col>
            </ Row>
             </Grid>
          </section>

            <Grid fluid className={"container"}>
              <ScrollableAnchor id={"menu"}>
              <div>
            <section>
            <Row center="xs" >
              <Col xs={12} sm={10} >
              <h2>
                <DBText dbKey="homepage-our-favorites">
                  our favorites
                </DBText>
              </h2>
              <Featured 
                bowls={this.props.data.favoriteBowls}
              />
              <Button>
                  <a href="http://californiakitchen.orderyoyo.com">FULL MENU</a>
              </Button>
              </Col>
            </ Row>
            </section>
                  </ div>
              </ ScrollableAnchor>
        

            <section>
            <ScrollableAnchor id={"about"}>
              <div>
            <Row  center="xs">
              <Col xs={12} sm={8} >
              <h2>
                <DBText dbKey="homepage-about-us">
                  about us
                </DBText>
              </h2>
              <Row center="xs" className={styles.aboutUs}>
                <Col xs={12} sm={6}  >
                <div className={styles.aboutImage}>
                  <DBImage dbKey="homepage-about-us-image" />
                </div>
                </Col>
                <Col  xs={12} sm={6}>
                  <div className="manchet">
                    <DBText dbKey="homepage-about-us-manchet">
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </DBText>
                  </div>
                  <DBText dbKey="homepage-about-us-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 

                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.                  
                  </DBText>
                </Col>
              </Row>
              </Col>
            </ Row>
            </div>
            </ ScrollableAnchor>
            </section>

          </Grid>
      </div>
        
    );
  }
}

export default fetcher(HomePage, "/api/homepage")
  