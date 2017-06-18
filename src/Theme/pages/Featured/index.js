import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import styles from './index.module.css'


class Featured extends React.Component {
  
  render() {
    return (
        <Row className={styles.bowls}>
          {this.props.bowls.map(bowl=>{
            return(
              <Col sm={6} >
              <div className={styles.bowl}>
                <div className={styles.info}>
                  <h3
                  className="manchet"
                  >
                  {bowl.name}
                  <span>
                  {bowl.highlights}
                  </span>
                  </h3>

                  <p className={styles.ingredients}>
                    {bowl.ingredients}
                  </p>
                  <p className={styles.price}>
                    {bowl.price}
                  </p>
                </div>
                {bowl.image ? <img src={"/uploads/bowls/"+bowl.image.filename} alt="bowl"/> : null}
              </div>
              </Col>
            )
          })}
        </Row>
    );
  }
}

export default Featured
  