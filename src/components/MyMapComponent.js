import React from 'react'
import { compose, withProps } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyD0MJUGp853pzmfbCJug57icWo7lQbX5uM&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `300px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }), withScriptjs, withGoogleMap)((props) => 
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: props.coordinates.lat, lng: props.coordinates.long }}>
      <Marker position={{ lat: props.coordinates.lat, lng: props.coordinates.long }} />
    </GoogleMap>
)
export default MyMapComponent