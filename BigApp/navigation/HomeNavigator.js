import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductContainer from '../Screens/Products/ProductContainer';
import SingleProduct from '../Screens/Products/SingleProduct';
import 'react-native-gesture-handler';


const Stack = createStackNavigator();

const HomeNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home"
                component={ProductContainer}
                options={{
                    headerShown: false,
                }} />
            <Stack.Screen name="Product Detail"
                component={SingleProduct}
                options={{
                    headerShown: false,
                }} />
        </Stack.Navigator>
    )
}

export default HomeNavigator
