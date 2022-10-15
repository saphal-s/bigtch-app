
import React, { useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { logoutUser } from '../../Context/actions/Auth.action';
import AuthGlobal from '../../Context/store/AuthGlobal';
import Notification from '../../shared/Notification';
import NotificationContainer from '../Admin/NotificationContainer';


const UserProfile = (props) => {
    const context = useContext(AuthGlobal);
    // console.log(context.stateUser.user.userId)
    const [userProfile, setUserProfile] = useState();
    useEffect(() => {
        if (
            context.stateUser.isAuthenticated === false ||
            context.stateUser.isAuthenticated === null
        ) {
            props.navigation.navigate("Login")
        }
        AsyncStorage.getItem("jwt")
            .then((res) => {
                axios
                    .get(`http://10.0.2.2:3005/api/user/${context.stateUser.user.userId}`,
                        {
                            headers: { Authorization: `Bearer ${res}` }
                        })
                    .then((user) => setUserProfile(user.data))
            })
            .catch((error) => console.log(error))

        return () => {
            setUserProfile();
        }
    }, [context.stateUser.isAuthenticated])


    return (
        <View style={styles.profile}>
            <ScrollView>
                <Text style={styles.username}>{userProfile ? userProfile.name : ""}</Text>
                <View>
                    <Text style={{ fontSize: 16, paddingBottom: 5 }}>Email: {userProfile ? userProfile.email : ""}</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 16, paddingBottom: 20 }}>Phone: {userProfile ? userProfile.phone : ""}</Text>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => [
                            AsyncStorage.removeItem("jwt"),
                            logoutUser(context.dispatch)]}
                    >
                        <Text style={{
                            color: '#fff', paddingBottom: 5, fontWeight: 'bold',
                            fontSize: 15,
                            backgroundColor: '#009387',
                            width: 90,
                            textAlign: 'center',
                            paddingTop: 5
                        }}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={{ marginTop: -150 }}>
                <Notification />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    profile: {
        padding: 10,
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 10
    }
})

export default UserProfile;
