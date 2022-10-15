import React from 'react'
import { Image, SafeAreaView, StyleSheet } from 'react-native';

const Header = () => {

    return (
        <SafeAreaView style={styles.header}>
            <Image style={{ width: 110, height: 70 }}
                source={require("./assets/bigtech.png")}
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        paddingTop: 5,
        marginTop: 0
    }
})
export default Header
