import React from 'react';
import {StyleSheet, View} from 'react-native';
import RetrieveWeather from './components/RetrieveWeather';
export default function App() {
  return (
    <View style={styles.backgroundStyle}>
      <RetrieveWeather />
    </View>
  );
}
const styles = StyleSheet.create({
  backgroundStyle: {
    width: '100%',
    height: '100%',
  },
  tinyLogo: {
    width: 50,
    height: 50,
    backgroundColor: '#313745',
  },
});
