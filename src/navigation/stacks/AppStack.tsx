import React from 'react';
import { View } from 'react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {
  FeedScreen,
  ChatScreen,
  ProfileScreen,
  AddPostScreen,
  MessagesScreen,
  EditProfileScreen,
} from '@screens/index';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export enum FEED_ROUTES {
  ADD_POST = 'AddPost',
  FEED = 'Feed',
}

export enum MESSAGES_ROUTES {
  MESSAGES = 'Messages',
  CHAT = 'Chat',
}

export enum PROFILE_ROUTES {
  PROFILE = 'Profile',
  EDIT_PROFILE = 'EditProfile',
}

export enum TAB_ROUTES {
  FEED = 'Feed',
  MESSAGES = 'Messages',
  PROFILE = 'Profile',
}

const FeedStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name={FEED_ROUTES.FEED}
      component={FeedScreen}
      options={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#2e64e5',
          fontFamily: 'Kufam-SemiBoldItalic',
          fontSize: 18,
        },
        headerStyle: {
          shadowColor: '#fff',
          elevation: 0,
        },
        headerRight: () => (
          <View style={{ marginRight: 10 }}>
            <FontAwesome5.Button
              name="plus"
              size={22}
              backgroundColor="#fff"
              color="#2e64e5"
              onPress={() => navigation.navigate('AddPost')}
            />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name={FEED_ROUTES.ADD_POST}
      component={AddPostScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#2e64e515',
          shadowColor: '#2e64e515',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{ marginLeft: 15 }}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
      }}
    />
  </Stack.Navigator>
);

const MessageStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen name={MESSAGES_ROUTES.MESSAGES} component={MessagesScreen} />
    <Stack.Screen
      name={MESSAGES_ROUTES.CHAT}
      component={ChatScreen}
      options={({ route }) => ({
        title: route.params.userName,
        headerBackTitleVisible: false,
      })}
    />
  </Stack.Navigator>
);

const ProfileStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name={PROFILE_ROUTES.PROFILE}
      component={ProfileScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name={PROFILE_ROUTES.EDIT_PROFILE}
      component={EditProfileScreen}
      options={{
        headerTitle: 'Edit Profile',
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
  </Stack.Navigator>
);

const AppStack = () => {
  const getTabBarVisibility = route => {
    const routeName = getFocusedRouteNameFromRoute(route)
      ? getFocusedRouteNameFromRoute(route).state.routes[route.state.index]
      : '';

    if (routeName === MESSAGES_ROUTES.CHAT) {
      return false;
    }
    return true;
  };

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#2e64e5',
        keyboardHidesTabBar: true,
      }}>
      <Tab.Screen
        name={TAB_ROUTES.FEED}
        component={FeedStack}
        options={({ route }) => ({
          tabBarLabel: 'Home',
          // tabBarVisible: getTabBarVisibility(route),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name={TAB_ROUTES.MESSAGES}
        component={MessageStack}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="chatbox-ellipses-outline"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name={TAB_ROUTES.PROFILE}
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
