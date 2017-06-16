import React from 'react';
import styles from './index.module.css'
import ReactSlider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Slider extends React.Component {
    
    render() {
        var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    console.log(this.props)
        return (
            <div className={styles.sliderWrapper}>  
                <ReactSlider {...settings}>
                    {
                     this.props.images && this.props.images.map((img,idx)=>{
                        return <img key={"sliderimage-"+idx} src={img.secure_url} alt="food"/>
                    })}
                </ReactSlider>
            </div>
        );
    }   
}


export default (Slider)
