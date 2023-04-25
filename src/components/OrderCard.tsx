import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Card, Icon } from '@rneui/themed'
import { useTailwind } from 'tailwind-rn/dist'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { TabStackParamList } from '../navigator/TabNavigator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigator'


export type OrdersScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList, 'Orders'>,
    NativeStackNavigationProp<RootStackParamList>>

type Props = {
    item: Order
}

const OrderCard: React.FC<Props> = ({ item }) => {
    const tw = useTailwind();
    const navigation = useNavigation<OrdersScreenNavigationProp>();

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Order', { order: item })}>
            <Card containerStyle={tw('px-5 rounded-lg')}>
                <View style={tw('flex-row justify-between')}>
                    <View style={tw('flex-row justify-between items-center')}>
                        <View>
                            <Icon
                                name='truck-delivery'
                                color='#EB6A7C'
                                type='material-community'
                            />
                            <Text style={{ fontSize: 10 }}>
                                {new Date(item.createdAt).toDateString()}
                            </Text>
                        </View>
                    </View>

                    <View>
                        <Text style={[tw('text-gray-400'), { fontSize: 10 }]}>
                            {item.carrier}-{item.trackingId}
                        </Text>
                        <Text style={tw('text-gray-500 text-xl')}>
                            {item.trackingItems.customer.name}
                        </Text>
                    </View>

                    <View style={tw('flex-row items-center')}>
                        <Text style={[tw('text-sm'), { color: '#EB6A7C' }]}>{item.trackingItems.items.length} x</Text>
                        <Icon style={tw('ml-2')} name='box' type='feather' />
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    )
}

export default OrderCard