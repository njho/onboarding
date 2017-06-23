/* global google */
import {
    default as React,
    Component,
} from "react";

import {
    withGoogleMap,
    GoogleMap,Marker
} from "react-google-maps";

/*
 * Sample From: https://developers.google.com/maps/documentation/javascript/examples/map-simple
 */
const SimpleMapExampleGoogleMap = withGoogleMap(props => (
    <GoogleMap
        defaultZoom={12}
        center={props.position}

    >
        <Marker position={props.position}></Marker>
        </GoogleMap>
));

/*
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class SimpleMapExample extends Component {

    render() {
        console.log(this.props.position);
        return (
            <SimpleMapExampleGoogleMap position={this.props.position}
                containerElement={
          <div style={{ height: `100px` }}/>
        }
                mapElement={
          <div style={{ height: `100px` }}/>
        }
            />
        );
    }
}