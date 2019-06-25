import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

export default class CookieButton extends React.Component {

  spinValue = new Animated.Value(0)

  // First set up animation 
  Animated.timing(
      this.spinValue,
    {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear
    }
  ).start()

  // Second interpolate beginning and end values (in this case 0 and 1)
  const spin = this.spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  render() {
    return (
      <View>
        <TouchableOpacity
          style={styles.container}
          onPress={() => this.props.addCookies(1)}>
          <Image style={styles.cookie} source={require('assets/cookie.png')} />
          <Text style={styles.number}>Cookies: {Math.round(this.props.cookies * 100) / 100}</Text>
          <Text style={styles.number}>CPS: {Math.round(this.props.cps * 100) / 100}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
  },
  number: {
    textAlign: 'center',
    fontSize: 30,
  },
  cookie: {
    width: '100%',
    height: 300,
    transform: [{rotate: spin}]
  },
});
