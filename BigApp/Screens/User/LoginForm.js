import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native'
import { loginUser } from '../../Context/actions/Auth.action';
import AuthGlobal from '../../Context/store/AuthGlobal';
import Error from '../../shared/Error';

const LoginForm = (props) => {
    const context = useContext(AuthGlobal)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (context.stateUser.isAuthenticated === true) {
            props.navigation.navigate("User Profile")
        }
    }, [context.stateUser.isAuthenticated])

    const handleSubmit = () => {
        const user = {
            email, password
        }
        if (email === "" || password === "") {
            setError("Please fill all fields !")
        } else {
            loginUser(user, context.dispatch)
            setEmail('')
            setPassword('')
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome !</Text>
            </View>
            <ScrollView style={styles.footer}>
                <Text style={[styles.text_footer]}>Email</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="eg. abc@gmail.com"
                        placeholderTextColor="#666666"
                        style={[styles.textInput]}
                        autoCapitalize="none"
                        name={"email"}
                        id={"email"}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>

                <Text style={[styles.text_footer]}>Password</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Enter password"
                        placeholderTextColor="#666666"
                        style={[styles.textInput]}
                        autoCapitalize="none"
                        name={"password"}
                        id={"password"}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />
                </View>
                {error ? <Error message={error} /> : null}
                <View style={styles.button}>
                    <TouchableOpacity
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                        onPress={() => handleSubmit()}
                    >
                        <Text style={[styles.textSign, {
                            color: '#009387'
                        }]}>Sign In</Text>
                    </TouchableOpacity>
                    <View>
                        <Text style={{
                            paddingTop: 10, paddingBottom: 10, fontWeight: 'bold',
                            fontSize: 15
                        }}>Don't have an account? </Text>
                        <TouchableOpacity
                            onPress={() =>
                                props.navigation.navigate("Register")}
                        >
                            <Text style={{
                                color: '#009387', paddingBottom: 10, fontWeight: 'bold',
                                fontSize: 15
                            }}>Register</Text>
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
        marginBottom: 50
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

export default LoginForm
