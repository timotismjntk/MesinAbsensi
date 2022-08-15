/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback} from 'react';
import {StatusBar, StyleSheet, Text, TextInput, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';

import {windowWidth} from '../utils';

import {setAccessCode} from '../store/reducer/auth';

export default function Login() {
  const dispatch = useDispatch();
  const [accessCode, setAccesCode] = useState('');

  const login = useCallback(() => {
    if (accessCode === '1234567890') {
      dispatch(setAccessCode(accessCode));
    } else {
      console.log('Kode akses salah');
    }
  }, [accessCode]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} translucent backgroundColor="transparent" />
      <View style={styles.wrapper}>
        <Text style={styles.headerTitle}>
          Sistem Informasi Absensi{'\n'}Elektronik Sekolah
        </Text>
        <View style={styles.form}>
          <Text style={styles.inputTitle}>Kode Akses</Text>
          <TextInput
            autoFocus
            style={styles.input}
            // placeholder="Masukkan Kode Akses"
            secureTextEntry
            value={accessCode}
            onChangeText={setAccesCode}
            onSubmitEditing={login}
          />
          <RectButton onPress={login} style={styles.login}>
            <Text style={styles.loginTitle}>Masuk</Text>
          </RectButton>
        </View>
        <Text style={styles.version}>Versi 1.0{'\n'}@ sim-sekolah.com</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#172B36',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    width: '100%',
  },
  headerTitle: {
    fontSize: windowWidth * 0.055,
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    textAlign: 'center',
  },
  form: {
    paddingHorizontal: windowWidth * 0.08,
    alignItems: 'center',
    marginTop: '5%',
  },
  inputTitle: {
    fontSize: windowWidth * 0.04,
    color: 'white',
    fontFamily: 'OpenSans-Bold',
  },
  input: {
    fontSize: windowWidth * 0.045,
    color: 'black',
    backgroundColor: 'white',
    width: '100%',
    borderRadius: windowWidth * 0.02,
    textAlign: 'center',
    marginTop: '3%',
    fontFamily: 'OpenSans-Regular',
  },
  login: {
    backgroundColor: '#E3A400',
    padding: '3.5%',
    width: '100%',
    borderRadius: windowWidth * 0.02,
    alignItems: 'center',
    marginTop: '4%',
  },
  loginTitle: {
    color: 'white',
    fontSize: windowWidth * 0.034,
    fontFamily: 'OpenSans-SemiBold',
  },
  version: {
    color: 'white',
    fontSize: windowWidth * 0.035,
    textAlign: 'center',
    fontFamily: 'OpenSans-Regular',
    marginTop: '4%',
  },
});
