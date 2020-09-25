import React, { useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Main from './src/components/Main';
import Profile from './src/components/Profile';
import MapPoints from './src/components/MapPoints';
import PointCard from './src/components/PointCard';
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();

export default function App() {
  const getHeaderTitle = route => {
    const routeName = route.state ? route.state.routes[route.state.index].name : 'Все обращения'
    switch (routeName) {
      case 'Main':
        return 'Все обращения'
      case 'MapPoints':
        return 'Карта обращений'
      case 'Profile':
        return 'Профиль'
      case 'Все обращения':
        return 'Все обращения'
    }
  }


  function navTab({ navigation, route }) {
    navigation.setOptions({
      headerTitle: getHeaderTitle(route)
    })
    //00185c
    return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#2cd978',
          inactiveTintColor: 'gray',
          labelStyle: {
            fontSize: 10,
            margin: 0,
            padding: 0,
            paddingLeft: 0,
            // fontWeight: "bold",
          },
          labelPosition: 'below-icon'
        }}
      >
        <Tab.Screen
          options={{
            tabBarLabel: 'Обращения',
            tabBarIcon: ({ focused }) => (
              <FontAwesome5 name="newspaper" size={24} color={focused ? '#2cd978' : 'gray'} />
            ),
          }}
          name="Main"
          component={Main}
        />
        <Tab.Screen
          options={{
            tabBarLabel: 'Карта',
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons name="map-marker-multiple" size={24} color={focused ? '#2cd978' : 'gray'} />
            )
          }}
          name="MapPoints"
          component={MapPoints}
        />

        <Tab.Screen
          options={{
            tabBarLabel: 'Профиль',
            tabBarIcon: ({ focused }) => (
              <MaterialIcons name="people" size={24} color={focused ? '#2cd978' : 'gray'} />
            ),
            // tabBarButton: (e) => <View><Text>sasa</Text></View>
          }}
          name="Profile"
          component={Profile}

        />
      </Tab.Navigator>
    )
  }


  return (
    <NavigationContainer>
      <StatusBar barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'} backgroundColor={Platform.OS === 'android' ? '#2cd978' : 'white'} />
      <Stack.Navigator>
        <Stack.Screen name="navtab" component={navTab}
          options={
            ({ route }) => ({
              title: getHeaderTitle(route)
            }),
            {
              headerStyle: {
                backgroundColor: Platform.OS === 'android' ? '#2cd978' : 'white',
              },
              headerTintColor: Platform.OS === 'android' ? 'white' : '#2cd978',
              headerTruncatedBackTitle: false
            }
          }
        />
        <Stack.Screen name="PointCard" component={PointCard}
          options={{
            headerStyle: {
              backgroundColor: Platform.OS === 'android' ? '#2cd978' : 'white'
            },
            headerTintColor: Platform.OS === 'android' ? 'white' : '#2cd978',
            headerTitle: 'PointCard',
            headerTruncatedBackTitle: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
