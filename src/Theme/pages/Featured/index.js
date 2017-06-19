import React from 'react';
import { Grid, Row, Col } from 'react-styled-flexboxgrid';
import styles from './index.module.css'
import LoadingImage from '../../../CMS/components/LoadingImage'


class Featured extends React.Component {
  
  render() {
    return (
      
        <Row className={styles.bowls}>
          {this.props.bowls && this.props.bowls.map(bowl=>{
            return(
              <Col key={bowl._id} xs={12} sm={6} >
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
                {bowl.image ? <LoadingImage src={"/uploads/bowls/"+bowl.image.filename} alt="bowl"/> : null}
              </div>
              </Col>
            )
          })}
        </Row>
   
    );
  }
}

export default Featured
  