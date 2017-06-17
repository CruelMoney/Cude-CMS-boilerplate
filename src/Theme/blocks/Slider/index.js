import React from 'react';
import styles from './index.module.css'
import ReactSlider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Slider extends React.Component {
    
    render() {
        var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyLoad: true
    };
        return (
            <div className={styles.sliderWrapper}>  
                <ReactSlider {...settings}>
                    {
                     this.props.images && this.props.images.map((img,idx)=>{
                        return <img 
                        draggable="false"
                        key={"sliderimage-"+idx} src={img.secure_url} alt="food"/>
                    })}
                </ReactSlider>
                {this.props.children}
            </div>
        );
    }   
}


export default (Slider)
