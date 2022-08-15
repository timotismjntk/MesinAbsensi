import React from 'react';
import {Dimensions} from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

module.exports = {
  windowHeight,
  windowWidth,
};
