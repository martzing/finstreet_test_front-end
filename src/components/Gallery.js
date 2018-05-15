import React, { Component } from 'react'
import ImageGallery from 'react-image-gallery';

class Gallery extends Component {
  render(){
    let images = []
    if(this.props.images !== undefined){
        images = this.props.images.map((value, index) => ({
        original: `http://localhost:4000/image_gallery/${this.props.placeId}/${value}`, 
        thumbnail: `http://localhost:4000/image_gallery/${this.props.placeId}/${value}`
      })) 
    }
    return(
      <ImageGallery items={images} />
    )
  }
}

export default Gallery