import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native'
import Error from '../../shared/Error';
import Toast from 'react-native-toast-message';
import axios from 'axios';
const ReportForm = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [product, setProduct] = useState('');
    const [branch, setBranch] = useState('')
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (name === "" || email === "" || phone === "" || address === "" || product === "" || branch === "" || message === "") {
            setError('Please fill up all fields !');
        }

        let complain = {
            name: name,
            email: email,
            phone: phone,
            address: address,
            product: product,
            branch: branch,
            message: message,
        }

        axios.post(`http://10.0.2.2:3005/api/complain`, complain)
            .then((res) => {
                if (res.status == 200) {
                    Toast.show({
                        topOffset: 40,
                        type: "success",
                        text1: "Your complain has been sent.",
                    })
                    setTimeout(() => {
                        props.navigation.navigate("Home");
                        setName('');
                        setEmail('');
                        setPhone('');
                        setAddress('');
                        setProduct('');
                        setBranch('');
                        setMessage('');
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
            <View style={styles.header}>
                <Text style={styles.text_header}>Report Your Problem!</Text>
            </View>
            <ScrollView style={styles.footer}>
                <Text style={[styles.text_footer]}>Full Name</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Your Full Name"
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
                        onChangeText={(text) => setPhone(text)}
                    />
                </View>
                <Text style={[styles.text_footer]}>Address</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Enter your address"
                        placeholderTextColor="#666666"
                        style={[styles.textInput]}
                        autoCapitalize="none"
                        id={"address"}
                        name={"address"}
                        value={address}
                        onChangeText={(text) => setAddress(text)}
                    />
                </View>
                <Text style={[styles.text_footer]}>Product Name</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Enter product name"
                        placeholderTextColor="#666666"
                        style={[styles.textInput]}
                        autoCapitalize="none"
                        id={"product"}
                        name={"product"}
                        value={product}
                        onChangeText={(text) => setProduct(text)}
                    />
                </View>
                <Text style={[styles.text_footer]}>Branch Name</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Enter branch"
                        placeholderTextColor="#666666"
                        style={[styles.textInput]}
                        autoCapitalize="none"
                        id={"branch"}
                        name={"branch"}
                        value={branch}
                        onChangeText={(text) => setBranch(text)}
                    />
                </View>
                <Text style={[styles.text_footer]}>Your Problem</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Enter your problem"
                        placeholderTextColor="#666666"
                        style={[styles.textInput]}
                        autoCapitalize="none"
                        id={"message"}
                        name={"message"}
                        value={message}
                        onChangeText={(text) => setMessage(text)}
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
                        }]}>Report</Text>
                    </TouchableOpacity>
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
        marginTop: 20,
        marginBottom: 110
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

export default ReportForm
