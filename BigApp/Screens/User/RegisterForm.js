import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, StatusBar, TouchableOpacity, ScrollView } from 'react-native'
import Error from '../../shared/Error';
import Toast from 'react-native-toast-message';
import axios from 'axios';

const RegisterForm = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (email === "" || password === "" || phone === "") {
            setError("Please fillup all fields !")
        }
        let user = {
            name: name,
            email: email,
            password: password,
            phone: phone
        }

        axios.post(`http://10.0.2.2:3005/api/register`, user)
            .then((res) => {
                if (res.status == 200) {
                    Toast.show({
                        topOffset: 40,
                        type: "success",
                        text1: "Registration Succeeded",
                        text2: "Please login your account"
                    })
                    setTimeout(() => {
                        props.navigation.navigate("Login");
                        setName('');
                        setEmail('');
                        setPhone('');
                        setPassword('');
                        setError('');
                    }, 500)
                }
            })
            .catch((error) => {
                Toast.show({
                    topOffset: 40,
                    type: "error",
                    text1: "Something went wrong",
                    text2: "Please try again",
                });
            });

    }

    return (
        <View style={styles.container}>
            {/* <StatusBar backgroundColor='#ffzzf' barStyle="light-content" /> */}
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome !</Text>
            </View>
            <ScrollView style={styles.footer}>
                <Text style={[styles.text_footer]}>Name</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Enter your full name"
                        placeholderTextColor="#666666"
                        style={[styles.textInput]}
                        autoCapitalize="none"
                        id={"name"}
                        name={"name"}
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                </View>
                <Text style={[styles.text_footer]}>Email</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="eg. abc@gmail.com"
                        placeholderTextColor="#666666"
                        style={[styles.textInput]}
                        autoCapitalize="none"
                        id={"email"}
                        name={"email"}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <Text style={[styles.text_footer]}>Phone Number</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Enter your phone number"
                        placeholderTextColor="#666666"
                        style={[styles.textInput]}
                        autoCapitalize="none"
                        id={"phone"}
                        name={"phone"}
                        value={phone}
                        keyboardType={"numeric"}
                        onChangeText={(text) => setPhone(text)}
                    />
                </View>
                <Text style={[styles.text_footer]}>Password</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Enter password"
                        placeholderTextColor="#666666"
                        style={[styles.textInput]}
                        autoCapitalize="none"
                        id={"password"}
                        name={"password"}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />
                </View>
                {error ? <Error message={error} /> : null}
                <View style={styles.button}>
                    <TouchableOpacity
                        key={2}
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                        onPress={() => handleSubmit()}
                    >
                        <Text style={[styles.textSign, {
                            color: '#009387'
                        }]}>Sign Up</Text>
                    </TouchableOpacity>
                    <View>
                        <Text style={{
                            paddingTop: 10, paddingBottom: 10, fontWeight: 'bold',
                            fontSize: 15
                        }}>Already have an account? </Text>
                        <TouchableOpacity
                            onPress={() =>
                                props.navigation.navigate("Login")}
                        >
                            <Text style={{
                                color: '#009387', paddingBottom: 10, fontWeight: 'bold',
                                fontSize: 15
                            }}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FE8102'
        // backgroundColor: '#009387'
    },
    header: {

        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 40,
        textAlign: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
        marginTop: 10
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: -16,
        paddingLeft: 10,
        color: '#05375a',
        borderBottomColor: '#FE8102',
        borderBottomWidth: 1,
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 100
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default RegisterForm
