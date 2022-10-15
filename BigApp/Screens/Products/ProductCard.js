import React from 'react';
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';

var { width } = Dimensions.get("window");

const ProductCard = (props) => {
    const { name, image } = props;
    return (
        <View style={styles.container}>
            <Image source={{ uri: `http://10.0.2.2:3005/${image}` }} style={styles.image} />
            <View style={styles.card}>
                <Text style={styles.title}>
                    {name.length > 15 ? name.substring(0, 15 - 3)
                        + '...' : name}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width / 2 - 20,
        height: width / 1.7,
        paddig: 10,
        borderRadius: 10,
        marginTop: 35,
        marginBottom: 5,
        marginLeft: 10,
        alignItems: 'center',
        elevation: 3,
        backgroundColor: 'white',
    },
    image: {
        width: width / 2 - 20 - 10,
        height: width / 2 - 20 - 30,
        backgroundColor: 'transparent',
    },
    card: {
        marginBottom: 10,
        height: width / 2 - 20 - 90,
        backgroundColor: 'transparent',
        width: width / 2 - 20 - 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',
        backgroundColor: '#FE8102',
        marginTop: 50,
        padding: 5,
        color: '#fff'
    }
})

export default ProductCard
