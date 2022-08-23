import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

// import Wisata screens
import HomeMesinAbsen from '../screens/MesinAbsen/Home';
import LoginMesinAbsen from '../screens/MesinAbsen/Login';
import RFIDMesinAbsen from '../screens/MesinAbsen/RFID';

const Stack = createStackNavigator();
import {horizontalTransition} from '../utils';

export default function MesinAbsenNavigator() {
  // call accesscode stored in mmkv storage
  const {mesinAbsen, isLoginMesinModalSuccessOpen} = useSelector(
    state => state.auth,
  );

  if (mesinAbsen?.status === 'berhasil' && !isLoginMesinModalSuccessOpen) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{
            ...horizontalTransition,
            headerTitle: '',
            headerTransparent: true,
            headerTintColor: 'white',
          }}
          name="HomeMesinAbsen"
          component={HomeMesinAbsen}
          lazy={true}
        />
        <Stack.Screen
          options={{
            ...horizontalTransition,
            headerShown: false,
          }}
          name="RFID"
          component={RFIDMesinAbsen}
          lazy={true}
        />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{...horizontalTransition, headerShown: false}}
          name="LoginMesinAbsen"
          component={LoginMesinAbsen}
          lazy={true}
        />
      </Stack.Navigator>
    );
  }
}
