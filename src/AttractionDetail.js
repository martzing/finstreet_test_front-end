import React, { Component } from 'react'
import { Layout, Row, Col, Rate } from 'antd'
import axios from 'axios'
import Gallery from './components/Gallery'
import MyMapComponent from './components/MyMapComponent'
import TextDescription from './components/TextDescription'
import CommentList from './components/CommentList'

const { Content } = Layout

class AttractionDetail extends Component {

  constructor(props) {
    super(props)
    this.state = { data: {} }
  }

  componentDidMount(){

    this.loadData(this.props.match.params.placeId)
  }

  loadData = (id) => {
    axios.get(`http://localhost:4000/api/attractionPlace/${id}`)
        .then((response) => {
          response.status?this.setState( () => ({data: response.data.result}) ):console.log(response.error)

        }).catch((error) => {
            console.log(error)
        })
  }

  render() {
    return (
      <Layout>
        <Content style={{ padding: '0 10%', marginTop: 0 }}>
          <div style={{ background: '#fff', padding: 24, minHeight: "100vh" }}>
            <h2 style={{marginBottom:0}}>{this.state.data.placeName}</h2>
            <hr/>
            {this.state.data.imageGallery && <Gallery images={this.state.data.imageGallery} placeId={this.state.data.placeId} />}
            <hr />
            <Row>
              <Col span={16}>
              <h3>{this.state.data.placeName}</h3>
              <h5>{this.state.data.engPlaceName}</h5>
              {this.state.data.paceType && <TextDescription topic="ประเภทสถานที่:" text={this.state.data.placeType} />}
              {this.state.data.address && <TextDescription topic="ที่อยู่:" text={this.state.data.address} />}
              {this.state.data.tel && <TextDescription topic="โทรศัพท์:" text={this.state.data.tel} />}
              {this.state.data.website && <div style={{marginBottom:10}}><label style={{fontWeight:"bold", margin:0}}>เว็บไซต์:</label><a href={this.state.data.website} style={{display:"inline", paddingLeft:10}}>{this.state.data.website}</a></div>}
              {this.state.data.workingTime && <TextDescription topic="เวลาทำการ:" text={this.state.data.workingTime} />}
              {this.state.data.rate && <div style={{marginBottom:10}}><label style={{fontWeight:"bold", margin:0}}>คะแนน:</label><Rate style={{display:"inline", paddingLeft:10}} disabled defaultValue={this.state.data.rate} /></div>}
              {this.state.data.description && <TextDescription topic="รายละเอียด:" text={this.state.data.description} />}
              {this.state.data.itinerary && <TextDescription topic="การเดินทาง:" text={this.state.data.itinerary} />}
              {this.state.data.carPark && <TextDescription topic="ที่จอดรถ:" text={this.state.data.carPark} />}
              </Col>
              <Col span={8}>{ this.state.data.coordinates && <MyMapComponent coordinates={this.state.data.coordinates} />}</Col>   
            </Row>
            <br /><br/>
            <h5>ความคิดเห็นจากเพื่อนๆ</h5>
            {this.state.data.comments && <CommentList comments={this.state.data.comments} placeId={this.state.data.placeId} />}
          </div>
        </Content>
      </Layout>
    )
  }
}

export default AttractionDetail
