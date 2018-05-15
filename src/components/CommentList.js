import React, { Component } from 'react'
import { List, Input, Button } from 'antd'
import axios from 'axios'

const { TextArea } = Input

class CommentList extends Component {

  constructor(props) {
    super(props)
    this.state = { comments: props.comments, newComment: '' }
  }

  handleOnTextChange = (event) => { this.setState({newComment: event.target.value}) }

  handleOnClickButton = () => {
    axios({
      method: 'put',
      url: `http://localhost:4000/api/attractionPlace/${this.props.placeId}`,
      data: { comments: this.state.newComment }
    }).then((response) => {
      if(response.status){
        this.setState(() => ({comments: this.state.comments.concat(this.state.newComment), newComment:''}))
      }else{
        console.log(response.error)
      }
    }).catch((error) => {console.log(error)})
  }

  render() {
    return (
      <List
        header={<div style={{display:"inline-block", width:"100%"}}>
                  <TextArea placeholder="บรรยายความคิดเห็นที่คุณมีต่อสถานที่นี้" value={this.state.newComment} autosize={{minRows:3, maxRows:6}} onChange={this.handleOnTextChange} />
                  <Button style={{marginTop:5, float:"right"}} onClick={this.handleOnClickButton} >บันทึก</Button>
                </div>}
        className="demo-loadmore-list"
        itemLayout="horizontal"
        bordered
        dataSource={this.state.comments}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              title={<label>{`ความคิดเห็นที่ ${index+1}`}</label>}
              description={item}
            />
          </List.Item>
        )}
      />
    )
  }
}

export default CommentList