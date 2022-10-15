import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Complain from '../Screens/Admin/Complain';
import ComplainForm from '../Screens/Admin/ComplainForm';
import AdminPage from '../Screens/Admin/AdminPage';
import NotificationContainer from '../Screens/Admin/NotificationContainer';


const Stack = createStackNavigator();

const AdminNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Admin page"
                component={AdminPage}
                options={{
                    headerShown: false,
                }} />
            <Stack.Screen name="Complain"
                component={Complain}
                options={{
                    headerShown: false,
                }} />
            <Stack.Screen name="Complain from"
                component={ComplainForm}
                options={{
                    headerShown: false,
                }} />
            <Stack.Screen name="Notification"
                component={NotificationContainer}
                options={{
                    headerShown: false,
                }} />
        </Stack.Navigator>
    )
}

export default AdminNavigator;
