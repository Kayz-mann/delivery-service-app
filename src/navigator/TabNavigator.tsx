import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Customer from '../screens/Customer';
import Orders from '../screens/Orders';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';


export type TabStackParamList = {
    Customer: undefined;
    Orders: undefined;

}

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigator = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, []);


    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarActiveTintColor: '#59C1CC',
            tabBarInactiveTintColor: 'gray',
            tabBarIcon: ({ focused, color, size }) => {
                if (route.name === 'Customer') {
                    return (
                        <Icon
                            name='users'
                            type='entypo'
                            color={focused ? '#59C1CC' : 'gray'}
                        />

                    );
                } else if (route.name === 'Orders') {
                    return (
                        <Icon
                            name='box'
                            type='entypo'
                            color={focused ? '#EB6A7C' : 'gray'}
                        />
                    )
                }
            }
        })}>
            <Tab.Screen name="Customer" component={Customer} />
            <Tab.Screen name="Orders" component={Orders} />
        </Tab.Navigator>
    )

}

export default TabNavigator