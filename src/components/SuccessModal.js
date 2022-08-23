import React from 'react';
import {StyleSheet, StatusBar, Modal as ReactModal, View} from 'react-native';
import Lottie from 'lottie-react-native';

import {windowWidth} from '../utils';

export default function SuccessModal({open, close}) {
  return (
    <ReactModal animationType="fade" transparent={true} visible={open}>
      <StatusBar animated={true} backgroundColor="white" translucent />
      <View style={styles.container}>
        <Lottie
          style={{height: windowWidth * 0.9, width: windowWidth * 0.9}}
          source={require('../assets/success.json')}
          autoPlay
          speed={0.7}
        />
      </View>
    </ReactModal>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  modal: {
    width: '40%',
    height: '20%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
});
