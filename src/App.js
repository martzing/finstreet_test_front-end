import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Home from './Home'
import AttractionDetail from './AttractionDetail'
import './App.css'

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={Home} />
        <Route path='/home' component={Home} />
        <Route path='/attraction/:placeId' component={AttractionDetail} />
      </div>
    )
  }
}

export default App
