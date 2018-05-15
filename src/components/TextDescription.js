import React from 'react';

const TextDescription = (props) => (
  <div style={{marginBottom:10}}><label style={{fontWeight:"bold", margin:0}}>{props.topic}</label><p style={{display:"inline", paddingLeft:10}}>{props.text}</p></div>
)

export default TextDescription