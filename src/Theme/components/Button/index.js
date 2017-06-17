import React from 'react';
import styles from './index.module.css'

class Button extends React.Component {
  state={hover:false}
 
  render() {
    let {mainColor, hoverTextColor, ...rest} = {...this.props}
    return (
   <div 
    {...rest}
   className={styles.wrapper + (this.props.white ? " " + styles.white : "") }
   >
     <div className={styles.hover}></div>
     <button
       
        className={styles.button}
        onMouseEnter={()=>{
          this.setState({hover:true})
          this.props.onMouseEnter && this.props.onMouseEnter()
        }}
        onMouseLeave={()=>{
          this.setState({hover:false})
          this.props.onMouseLeave && this.props.onMouseLeave()
        }}
          >
          {this.props.href ? 
          <a
          href={this.props.href}
          target={this.props.target}
          style={null}
          className={null}
          >
          {this.props.children}
          </a>
          :   
          this.props.children
          }
        
        </button>
      </div>
    );
  }
}

export default Button
