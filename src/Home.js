import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { activeIndex: 0, data: [] }
    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this.goToIndex = this.goToIndex.bind(this)
    this.onExiting = this.onExiting.bind(this)
    this.onExited = this.onExited.bind(this)
  }

  componentDidMount(){
    this.loadData()
  }

  loadData = () => {
    axios.get('http://localhost:4000/api/attractionPlace')
        .then((response) => {
          response.status?this.setState( () => ({data: response.data.result}) ):console.log(response.error)
        }).catch((error) => {
            console.log(error)
        })
  }

  onExiting() {
    this.animating = true
  }

  onExited() {
    this.animating = false
  }

  next() {
    if (this.animating) return
    const nextIndex = this.state.activeIndex === this.state.data.length - 1 ? 0 : this.state.activeIndex + 1
    this.setState({ activeIndex: nextIndex })
  }

  previous() {
    if (this.animating) return
    const nextIndex = this.state.activeIndex === 0 ? this.state.data.length - 1 : this.state.activeIndex - 1
    this.setState({ activeIndex: nextIndex })
  }

  goToIndex(newIndex) {
    if (this.animating) return
    this.setState({ activeIndex: newIndex })
  }

  render() {

    const { activeIndex } = this.state;

    const slides = this.state.data.map((item, index) => {
      return (
        <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={index} >
          <img src={`http://localhost:4000/image_gallery/${item.placeId}/${item.mainImage}`} alt={item.engPlaceName} style={{width:"100%", maxHeight:"100vh"}} />
          <Link to={`/attraction/${item.placeId}`}><CarouselCaption captionHeader={`Let's go to`} captionText={item.engPlaceName} /></Link>
        </CarouselItem>
      )
    })

    return (
      <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous} interval={3000} pause={false}>
        <CarouselIndicators items={this.state.data} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    )
  }
}


export default Home;