import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  NativeModules,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';

import {windowWidth, windowHeight} from '../utils';

// import {setAccessCode} from '../store/reducer/auth';

export default function RFID({route}) {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [disabledInput, setDisabledInput] = useState(false);
  const [rfidCode, setRfidCode] = useState('');
  const [clock, setClock] = useState('');
  const sendRfidCode = useCallback(() => {
    inputRef?.current?.clear();
    setDisabledInput(true);
    setTimeout(() => {
      setDisabledInput(false);
      setTimeout(() => {
        inputRef?.current?.focus();
      }, 200);
    }, 400);
  }, [inputRef]);

  const customJam = useCallback(() => {
    const detik = new Date().getSeconds();
    const menit = new Date().getMinutes();
    const jam = new Date().getHours();
    setClock(
      `${jam < 10 ? '0' + jam : jam}:${menit < 10 ? '0' + menit : menit}:${
        detik < 10 ? '0' + detik : detik
      }`,
    );
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      customJam();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <SafeAreaView edges={['bottom', 'right', 'left']} style={styles.container}>
      <View style={styles.wrapper}>
        <StatusBar animated={true} translucent backgroundColor="transparent" />
        <Text style={styles.jam}>{clock || '00:00:00'}</Text>
        <Text style={styles.inputTitle}>{route.params?.jenis_absen}</Text>
        <TextInput
          ref={inputRef}
          autoFocus
          onFocus={() => {
            NativeModules.KeyboardFunctionalities.hideKeyboard();
          }}
          editable={!disabledInput}
          showSoftInputOnFocus={false}
          style={styles.input}
          textAlign="center"
          secureTextEntry
          value={rfidCode}
          onChangeText={setRfidCode}
          onSubmitEditing={sendRfidCode}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#172B36',
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#172B36',
    minHeight: windowHeight,
    paddingHorizontal: windowWidth * 0.08,
  },
  jam: {
    fontSize: windowWidth * 0.1,
    color: 'white',
    fontFamily: 'OpenSans-SemiBold',
  },
  inputTitle: {
    fontSize: windowWidth * 0.055,
    color: 'white',
    fontFamily: 'OpenSans-SemiBold',
  },
  input: {
    fontSize: windowWidth * 0.045,
    color: 'black',
    backgroundColor: 'white',
    width: '100%',
    borderRadius: windowWidth * 0.02,
    marginTop: '3%',
    fontFamily: 'OpenSans-Regular',
  },
});
