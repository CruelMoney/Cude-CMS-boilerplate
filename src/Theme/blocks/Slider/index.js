import React from 'react';
import styles from './index.module.css'
import ReactSlider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoadingImage from '../../../CMS/components/LoadingImage'

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
                { this.props.images ?
                <ReactSlider {...settings}>
                    {
                    this.props.images.map((img,idx)=>{
                        return <LoadingImage 
                        draggable="false"
                        key={"sliderimage-"+idx} src={img.secure_url} alt="food"/>
                    })}
                </ReactSlider>
                  : null}
                
                {this.props.children}
            </div>
        );
    }   
}


export default (Slider)
