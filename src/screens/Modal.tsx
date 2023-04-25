import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed'
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { TabStackParamList } from '../navigator/TabNavigator'

import { RootStackParamList } from '../navigator'
import { useTailwind } from 'tailwind-rn/dist'
import useCustomerOrders from '../hooks/useCustomerOrders'
import DeliveryCard from '../components/DeliveryCard'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type ModalScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList>,
    NativeStackNavigationProp<RootStackParamList, 'MyModal'>>

//pass route params to another screen by inheritting from parent
type ModalScreenRouteProp = RouteProp<RootStackParamList, 'MyModal'>

const ModalScreen = () => {
    const tw = useTailwind();
    const { 
        params: { name, userId },
     } = useRoute<ModalScreenRouteProp>();
    const navigation = useNavigation<ModalScreenNavigationProp>();

    const { loading, error, orders } = useCustomerOrders(userId);

    console.log('Orders', name)



    return (
        <View>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={tw('absolute right-5 top-5 z-10')}
            >
                <Icon name='closecircle' type='antdesign' />
            </TouchableOpacity>

            <View style={{ marginTop: 10 }}>
                <View style={[tw('py-5 border-b'), { borderColor: '#59C1CC' }]}>
                    <Text style={[tw('text-center text-xl font-bold'), { color: '#59C1CC' }]}>{name}</Text>
                    <Text style={[tw('text-center italic text-sm')]}>deliveries</Text>
                </View>
            </View>

            <FlatList
                data={orders}
                keyExtractor={order => order.trackingId}
                renderItem={({ item: order }) => (
                    <DeliveryCard order={order} />
                )}
            />
        </View>
    )
}

export default ModalScreen