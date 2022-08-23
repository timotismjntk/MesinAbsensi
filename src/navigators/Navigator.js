import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
import {horizontalTransition} from '../utils';

// import navigators
import MesinAbsenNavigator from './MesinAbsenNavigator';

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{...horizontalTransition, headerShown: false}}
          name="MesinAbsenNavigator"
          component={MesinAbsenNavigator}
          lazy={true}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
