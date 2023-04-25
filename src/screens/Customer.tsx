import { View, Text, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useTailwind } from 'tailwind-rn/dist';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator';
import { Image, Input } from '@rneui/themed';
import { useQuery } from '@apollo/client';
import { GET_CUSTOMERS, GET_ORDERS } from '../../graphql/queries';
import CustomerCard from '../components/CustomerCard';

//combine all navigation stuff into one navigation

export type CustomerScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList, 'Customer'>,
    NativeStackNavigationProp<RootStackParamList>>

const Customer = () => {
    const tw = useTailwind();
    const navigation = useNavigation<CustomerScreenNavigationProp>();
    const [input, setInput] = useState<string>('')
    const { loading, error, data } = useQuery(GET_CUSTOMERS)

    console.log(data);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, []);

    return (
        <View style={{ backgroundColor: '#59C1CC' }}>
            <Image
                source={{ uri: 'https://links.papareact.com/3jc' }}
                containerStyle={tw('w-full h-64')}
                PlaceholderContent={<ActivityIndicator />}
            />

            <Input
                placeholder='Search by Customer'
                onChangeText={setInput}
                containerStyle={tw('bg-white pt-5 pb-0 px-10')}
            />

            <ScrollView>
                {data?.getCustomers?.filter((customer: CustomerList) =>
                    customer.value.name.includes(input)).map(({ name: ID, value: { email, name } }: CustomerResponse) => (
                        <CustomerCard
                            key={ID}
                            email={email}
                            name={name}
                            userId={ID}

                        />
                    ))}
            </ScrollView>

            {/* <FlatList
                data={data?.getCustomers}
                bounces={false}
                keyExtractor={(item: any) => item.id}
                horizontal
                renderItem={({ item }) => {
                    return (
                        <CustomerCard
                            key={item.ID}
                            email={item.email}
                            name={item.name}
                            userId={item.ID}

                        />
                    )
                }}
            />  */}
        </View>
    )
}

export default Customer