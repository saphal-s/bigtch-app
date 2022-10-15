import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';


const ComplainView = (props) => {
    const [item, setItem] = useState(props.route.params.item);

    return (
        <View style={{ marginTop: 20 }}>
            <View style={styles.singlecomplain}>
                <Text style={styles.complaintext}>Name:</Text>
                <Text style={styles.complaintext}>{item.name}</Text>
            </View>
            <View style={styles.singlecomplain}>
                <Text style={styles.complaintext}>Contact:</Text>
                <Text style={styles.complaintext}>{item.phone}</Text>
            </View>
            <View style={styles.singlecomplain}>
                <Text style={styles.complaintext}>Email:</Text>
                <Text style={styles.complaintext}>{item.email}</Text>
            </View>
            <View style={styles.singlecomplain}>
                <Text style={styles.complaintext}>Address:</Text>
                <Text style={styles.complaintext}>{item.address}</Text>
            </View>
            <View style={styles.singlecomplain}>
                <Text style={styles.complaintext}>Product:</Text>
                <Text style={styles.complaintext}>{item.product}</Text>
            </View>
            <View style={styles.singlecomplain}>
                <Text style={styles.complaintext}>Branch:</Text>
                <Text style={styles.complaintext}>{item.branch}</Text>
            </View>
            <View style={styles.singlecomplain}>
                <Text style={styles.complaintext}>Complain Status:</Text>
                <Text style={styles.complaintext}>{item.complainStatus}</Text>
            </View>
            <View style={styles.singlecomplain}>
                <Text style={styles.complaintext}>Problem:</Text>
                <Text style={styles.complaintext}>{item.message}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    singlecomplain: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20
    },
    complaintext: {
        padding: 3,
        fontSize: 15,
        fontWeight: '600'
    }
})

export default ComplainView
