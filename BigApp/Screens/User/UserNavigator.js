import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';
import NotificationContainer from '../Admin/NotificationContainer';
import ComplainView from '../Admin/ComplainView';

const Stack = createStackNavigator();

const UserNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login"
                component={LoginForm}
                options={{
                    headerShown: false,
                }} />
            <Stack.Screen name="Register"
                component={RegisterForm}
                options={{
                    headerShown: false,
                }} />
            <Stack.Screen name="User Profile"
                component={UserProfile}
                options={{
                    headerShown: false,
                }} />
            <Stack.Screen name="Notification"
                component={NotificationContainer}
                options={{
                    headerShown: false,
                }} />
            <Stack.Screen name="Complain View"
                component={ComplainView}
                options={{
                    headerShown: false,
                }} />
        </Stack.Navigator>
    )
}

export default UserNavigator
