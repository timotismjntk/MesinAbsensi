import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  HeaderStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

// import screens
import Login from '../screens/Login';
import Home from '../screens/Home';
import RFID from '../screens/RFID';

export default function RootNavigator(props) {
  const horizontalTransition = {
    gestureDirection: 'horizontal',
    transitionSpec: {
      open: TransitionSpecs.TransitionIOSSpec,
      close: TransitionSpecs.TransitionIOSSpec,
    },
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
    cardStyleInterpolator: ({current, layouts}) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
          ],
        },
      };
    },
  };

  // call accesscode stored in mmkv storage
  const {accessCode} = useSelector(state => state.auth);

  return (
    <NavigationContainer>
      {accessCode?.length > 0 ? (
        <Stack.Navigator lazy={true} optimizationsEnabled={true}>
          <Stack.Screen
            options={{...horizontalTransition, headerShown: false}}
            name="Home"
            component={Home}
            lazy={true}
          />
          <Stack.Screen
            options={{
              ...horizontalTransition,
              headerTransparent: true,
              headerTintColor: 'white',
              headerTitle: 'ABSEN RFID',
              headerTitleStyle: {
                fontFamily: 'OpenSans-SemiBold',
              },
            }}
            name="RFID"
            component={RFID}
            lazy={true}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator lazy={true} optimizationsEnabled={true}>
          <Stack.Screen
            options={{...horizontalTransition, headerShown: false}}
            name="Login"
            component={Login}
            lazy={true}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
