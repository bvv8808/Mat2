import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Step1 from './Step1Screen';
import Step2 from './Step2Screen';
import Step3 from './Step3Screen';
import Step4 from './Step4Screen';

const Stack = createStackNavigator();

const UploadTemplate = () => {
  return (
    <Stack.Navigator
      screenOptions={
        {
          // headerShown: false
        }
      }>
      <Stack.Screen
        name="UploadStep1"
        component={Step1}
        options={{
          title: '상품 등록하기',
          // headerTitleStyle: {fontFamily: 'sd_gothic_m'},
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UploadStep2"
        component={Step2}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UploadStep3"
        component={Step3}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UploadStep4"
        component={Step4}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default UploadTemplate;
