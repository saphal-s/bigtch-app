import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeNavigator from './HomeNavigator';
import ReportForm from '../Screens/forms/ReportForm';
import { StyleSheet } from 'react-native';
import UserNavigator from '../Screens/User/UserNavigator';
import AdminNavigator from './AdminNavigator';
import AuthGlobal from '../Context/store/AuthGlobal';

const Tab = createBottomTabNavigator();

const Main = () => {
    const context = useContext(AuthGlobal)
    // console.log(context.stateUser)
    return (
        <Tab.Navigator
            initialRouteName='Home'
            tabBarOptions={{
                keyboardHidesTabBar: true,
                showLabel: false,
                activeTintColor: '#FE8102',
            }}
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    ...styles.navbottom
                }
            }}>
            <Tab.Screen name="Home" component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name='home'
                            style={{ position: 'relative' }}
                            color={color}
                            size={30} />
                    )
                }} />
            <Tab.Screen name="report" component={ReportForm}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name='document-text-sharp'
                            style={{ position: 'relative' }}
                            color={color}
                            size={30} />
                    )
                }} />
            {context.stateUser.user.isAdmin === true ? (
                <Tab.Screen name="admin" component={AdminNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Ionicons name='settings-sharp'
                                style={{ position: 'relative' }}
                                color={color}
                                size={30} />
                        )
                    }} />
            ) : null}
            <Tab.Screen name="profile" component={UserNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name='user'
                            style={{ position: 'relative' }}
                            color={color}
                            size={30} />
                    )
                }} />

        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    navbottom: {
        flex: 1,
        position: 'absolute',
        backgroundColor: '#fff',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        height: 60,
        elevation: 1,
        borderTopColor: '#f2f2f2',
        borderTopWidth: 1,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15
    }
})

export default Main
