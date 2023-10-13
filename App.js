import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';


export default function App() {
  const [speed, setSpeed] = useState(-1);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      setInterval(async () => {
        let loc = await Location.getCurrentPositionAsync({ accuracy: 6 });
        let s = (loc.coords.speed * 3.6).toFixed(1)
        setSpeed(s);
      }, 1000)
      /*
      let loc = await Location.getCurrentPositionAsync();
      if (loc) {
        setLocation(loc)
        setSpeed(loc.coords.speed)
      }
      */
    })();
  });

  return (
    <View style={styles.container}>
      <View style={styles.speedBox}>
        <Text style={styles.speed}>{speed}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'black'
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
  speed: {
    fontSize: 200,
    color: 'lightblue',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  speedBox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '30%',
    width: '100%',
    transform: [{ rotateX: '0deg' }, { rotateY: '180deg' }, { rotateZ: '90deg' }],
    backgroundColor: 'black',
  }
});
