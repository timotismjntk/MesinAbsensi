/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  ToastAndroid,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

import {windowWidth, windowHeight} from '../../utils';

import {
  clearMulaiAbsen,
  scanRFID,
  saveToDbAbsenFailed,
  clearStatusFailedAbsen,
} from '../../store/reducer/auth';
import LoadingModal from '../../components/LoadingModal';

export default function RFID({route}) {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [rfidCode, setRfidCode] = useState('');
  const [clock, setClock] = useState('');
  const {
    mesinAbsen,
    mulaiAbsen,
    isLoadingMulaiAbsen,
    failedAbsen,
    dataAbsenGagal,
  } = useSelector(state => state.auth);

  const sendRfidCode = useCallback(() => {
    dispatch(
      scanRFID({
        kode_akses: mesinAbsen?.result?.kode_akses,
        jenis_absen: route?.params?.jenis_absen || '',
        rfid: rfidCode,
      }),
    );
    inputRef?.current?.clear();
  }, [mesinAbsen, route?.params, rfidCode, inputRef]);

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

  useEffect(() => {
    if (!isLoadingMulaiAbsen) {
      inputRef?.current?.focus();
    }
  }, [isLoadingMulaiAbsen, inputRef]);

  useEffect(() => {
    if (mulaiAbsen?.pesan?.length > 0) {
      ToastAndroid.showWithGravity(
        mulaiAbsen?.pesan || '',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      dispatch(clearMulaiAbsen());
    }
  }, [mulaiAbsen]);

  useEffect(() => {
    if (failedAbsen && !isLoadingMulaiAbsen) {
      dispatch(clearStatusFailedAbsen());
      dispatch(
        saveToDbAbsenFailed({
          kode_akses: mesinAbsen?.result?.kode_akses,
          jenis_absen: route?.params?.jenis_absen || '',
          rfid: rfidCode,
        }),
      );
      ToastAndroid.showWithGravity(
        'Terjadi kesalahan atau server sedang sibuk...',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  }, [
    failedAbsen,
    mesinAbsen?.result?.kode_akses,
    route?.params?.jenis_absen,
    rfidCode,
    dataAbsenGagal,
    isLoadingMulaiAbsen,
  ]);

  return (
    <SafeAreaView edges={['bottom', 'right', 'left']} style={styles.container}>
      <View style={styles.wrapper}>
        <LoadingModal
          open={isLoadingMulaiAbsen || false}
          close={() => dispatch(clearMulaiAbsen())}
        />
        <StatusBar animated={true} translucent backgroundColor="transparent" />
        <Text style={styles.jam}>{clock || '00:00:00'}</Text>
        <Text style={styles.inputTitle}>{route.params?.jenis_absen}</Text>
        <TextInput
          ref={inputRef}
          autoFocus
          editable={!isLoadingMulaiAbsen}
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
