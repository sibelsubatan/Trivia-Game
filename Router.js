import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Animated, Platform, Text, TouchableOpacity, View } from 'react-native';
import {
    HomePage,
    SplashScreen,
    ScoreTable,
    StartTheGame,

} from './src/screens';
import { wh, ww } from './src/helpers';
import { HomeIcon, SearchIcon, ProfileIcon, ScoreIcon } from './src/assets/icons';
import { White, AppColorGreen, Black } from './src/helpers/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Router = () => {

    const TabStack = ({ }) => {
        return (
            <Tab.Navigator
                screenOptions={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: '#0a2449',
                        borderTopColor: '#0a2449',
                        shadowColor: '#000',
                        shadowOpacity: 0.06,
                        shadowOffset: {
                            width: 10,
                            height: 10,
                        },
                    },
                }}
                initialRouteName={'HomePage'}>
                <Stack.Screen name="HomePage" component={HomePage}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: 'center' }}>
                                <HomeIcon
                                    color={!focused ? '#c7ccd1' : White}
                                    size={ww(0.06)}
                                />
                                <Text
                                    style={{
                                        fontSize: ww(0.027),
                                        marginTop: wh(0.002),
                                        color: !focused ? '#c7ccd1' : White
                                    }}>
                                    Anasayfa
                                </Text>
                            </View>
                        ),
                    }}
                />
                <Stack.Screen name="ScoreTable" component={ScoreTable} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center' }}>
                            <ScoreIcon
                                color={!focused ? '#c7ccd1' : White}
                                size={ww(0.06)}
                            />
                            <Text
                                style={{
                                    fontSize: ww(0.027),
                                    marginTop: wh(0.002),
                                    color: !focused ? '#c7ccd1' : White
                                }}>
                                Skor Tablosu
                            </Text>
                        </View>
                    ),
                }} />
            </Tab.Navigator>
        );
    }
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SplashScreen">
                <Stack.Screen name={'SplashScreen'} component={SplashScreen} />
                <Stack.Screen name={'TabStack'} component={TabStack} />
                <Stack.Screen name={'HomePage'} component={HomePage} />
                <Stack.Screen name={'ScoreTable'} component={ScoreTable} />
                <Stack.Screen name={'StartTheGame'} component={StartTheGame} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Router;
