import React from 'react';
import {Dimensions} from 'react-native';
import {
  HeaderStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const horizontalTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({current, layouts, next}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.9],
                })
              : 1,
          },
        ],
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.1],
        }),
      },
    };
  },
};

module.exports = {
  windowHeight,
  windowWidth,
  horizontalTransition,
};
