import React, {useState} from 'react';
import {StyleSheet, View, Text, Button, Image} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export default class RetriveLocation extends React.Component {
  constructor() {
    super();
    this.state = {
      ready: false,
      where: {lat: null, lng: null},
      error: null,
    };
  }
  componentDidMount() {
    let geoOptions = {
      enableHighAccuracy: true,
      timeOut: 20000,
      maximumAge: 60 * 60 * 24,
    };
    Geolocation.getCurrentPosition(
      this.geoSuccess,
      this.geoFailure,
      geoOptions,
    );
  }
  geoSuccess = position => {
    console.log(position);
    this.setState({
      ready: true,
      where: {lat: position.coords.latitude, lng: position.coords.longitude},
    });
  };
  geoFailure = err => {
    this.setState({error: err.message});
  };
  render() {
    return (
      <View>
        {!this.state.ready && <Text>Using Geolocation in React Native. </Text>}
        {this.state.error && <Text>{this.state.error} </Text>}
        {this.state.ready && (
          <Text>
            Lat : {this.state.where.lat} Long : {this.state.where.lng}
          </Text>
        )}
        {this.state.ready && (
          <Text>
            latitude={this.state.where.lat}
            longitude={this.state.where.lng}
          </Text>
        )}
      </View>
    );
  }
}
