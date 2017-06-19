import React from 'react';
import { Grid, Row, Col } from 'react-styled-flexboxgrid';
import styles from './index.module.css'
import LoadingImage from '../../../CMS/components/LoadingImage'
import { Watch } from 'scrollmonitor-react';


export default  class Featured extends React.Component {
  
  render() {
    return (
        <Row className={styles.bowls}>
          {this.props.bowls && this.props.bowls.map(bowl=>{
            return(
              <WatchBowl  key={bowl._id} bowl={bowl} />
            )
          })}
        </Row>
   
    );
  }
}

var WatchBowl = Watch(class Bowl extends React.Component{
  state={reveal:false}

  componentWillReceiveProps(nextprops){
    if(nextprops.isInViewport){
      this.setState({reveal:true})
    }
  }

  render(){
    return(
      <Col 
      className={styles.animateReveal + " " + (this.state.reveal ? styles.reveal : "")}
      xs={12} sm={6} >
        <div className={styles.bowl}>
          <div className={styles.info}>
            <h3
            className="manchet"
            >
            {this.props.bowl.name}
            <span>
            {this.props.bowl.highlights}
            </span>
            </h3>

            <p className={styles.ingredients}>
              {this.props.bowl.ingredients}
            </p>
            <p className={styles.price}>
              {this.props.bowl.price}
            </p>
          </div>
          {this.props.bowl.image ? <LoadingImage src={"/uploads/bowls/"+this.props.bowl.image.filename} alt="bowl"/> : null}
        </div>
      </Col>
    )
  }
})


  