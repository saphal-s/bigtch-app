import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import HTML from "react-native-render-html";

const SingleProduct = (props) => {
    const [item, setItem] = useState(props.route.params.item);

    return (
        <ScrollView>
            <View>
                <View style={styles.imagecontainer}>
                    <Image
                        source={{ uri: `http://10.0.2.2:3005/${item.image}` }}
                        style={styles.image} />
                </View>
                <View style={styles.description}>
                    <Text style={styles.nbr}>{item.name}</Text>
                    <Text style={styles.buttons}>Introduction</Text>
                    <HTML style={styles.intro} source={{ html: item.introduction }} />
                    <Text style={styles.buttons}>Specification</Text>
                    <HTML style={styles.intro} source={{ html: item.specification }} />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 150,
    },
    imagecontainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'

    },
    intro: {
        margin: 20,
        fontSize: 16,
        paddingLeft: 10
    },
    nbr: {
        fontWeight: "bold",
        fontSize: 17,
        textAlign: 'center',
        paddingTop: 10
    },
    buttons: {
        backgroundColor: '#FE8102',
        width: 120,
        fontSize: 17,
        textAlign: 'center',
        paddingTop: 4,
        paddingBottom: 4,
        marginTop: 15,
        color: '#fff',
        fontWeight: 'bold'
    },
    description: {
        backgroundColor: '#fff',
        paddingTop: 30,
        paddingBottom: 100,
        paddingLeft: 20,
    }
})

export default SingleProduct
