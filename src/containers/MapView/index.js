import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View, Image, Text, Modal, TouchableHighlight,
} from 'react-native';
import { debounce } from 'lodash';
import MapView from 'react-native-maps';
import { mapMarker } from '@constants/assets';
import { findPlaceFromLatLng } from '@services/google.service';
import styles from './styles';

const latitudeDelta = 0.025;
const longitudeDelta = 0.025;

class HomeLocator extends Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: 10.780889,
        longitude: 106.629271,
        latitudeDelta,
        longitudeDelta,
      },
      isPanding: false,
      openModal: false,
    };
    this.onPanDrag = debounce(this.onPanDrag, 1000, {
      leading: true,
      trailing: false,
    });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta,
          longitudeDelta,
        };
        this.onRegionChangeComplete(region);
      },
      (error) => {
        console.log(JSON.stringify(error));
      },
      { enableHighAccuracy: false },
    );
  }

  onRegionChangeComplete = async (region) => {
    const { data } = await findPlaceFromLatLng(`${region.latitude},${region.longitude}`);
    const newState = {
      region,
      isPanding: false,
    };
    if (data.status === 'OK') {
      newState.text = data.results[0].formatted_address;
    }
    this.setState(newState);
  };

  onPanDrag = () => {
    const { isPanding } = this.state;
    if (isPanding) {
      return;
    }
    this.setState({
      isPanding: true,
    });
  };

  render() {
    const {
      region, isPanding, text, openModal,
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.mapWrapper}>
          <MapView
            ref={map => (this.map = map)}
            initialRegion={region}
            style={styles.map}
            showsUserLocation={true}
            followUserLocation={true}
            loadingEnabled={true}
            onPanDrag={this.onPanDrag}
            onRegionChangeComplete={this.onRegionChangeComplete}
          />
        </View>
        <View
          style={[styles.markerFixed, isPanding ? styles.isPanding : null]}
          pointerEvents="none"
        >
          <Image style={styles.marker} resizeMode="contain" source={mapMarker} />
        </View>

        <View style={styles.textSearch}>
          <TouchableHighlight
            onPress={() => {
              this.setState({
                openModal: true,
              });
            }}
          >
            <View style={styles.text}>
              <Text>{text}</Text>
            </View>
          </TouchableHighlight>
        </View>

        <Modal
          animationType="slide"
          transparent={false}
          visible={openModal}
          onRequestClose={() => {
            this.setState({
              openModal: false,
            });
          }}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>This is modal search Google Places!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setState({
                    openModal: false,
                  });
                }}
              >
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

const HomeLocatorRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeLocator);

export default HomeLocatorRedux;
