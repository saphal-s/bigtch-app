import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';


const AdminPage = (props) => {
    const [complains, setComplain] = useState([]);
    useEffect(() => {
        axios.get(`http://10.0.2.2:3005/api/complains`)
            .then((res) => {
                setComplain(res.data);
            })
            .catch((error) => {
                console.log("Api call error");
                alert(error.message);
            });
    }, []);

    return (
        <View>
            <Text style={{
                textAlign: 'center', paddingTop: 20,
                paddingBottom: 15,
                fontSize: 18, color: '#000', fontWeight: 'bold'
            }}>Unsolved Reports</Text>
            <View>
                <FlatList
                    data={complains}
                    renderItem={({ item }, i) => (
                        <View>
                            <View key={item._id} style={{ backgroundColor: '#fff', margin: 15, marginTop: 5 }}>
                                {(item.complainStatus != 'Solved') ? (
                                    <View style={styles.complaincontainer} >
                                        <View>
                                            <Text style={styles.complain}>Name: {item.name}</Text>
                                            <Text style={styles.complain}>Contact: {item.phone}</Text>
                                        </View>
                                        <TouchableOpacity key={item._id}
                                            style={{
                                                position: 'absolute',
                                                right: 0,
                                            }}
                                            onPress={() =>
                                                props.navigation.navigate("Complain", { item: item })
                                            }
                                        ><Text style={styles.viewbutton}>View</Text></TouchableOpacity>
                                    </View>
                                ) : null}
                            </View>
                        </View>
                    )}
                    keyExtractor={item => item.name} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    complaincontainer: {
        display: 'flex',
        flexDirection: 'row',
        margin: 10
    },
    complain: {
        color: '#000',
        fontSize: 15,
        paddingRight: 15,
    },
    viewbutton: {
        backgroundColor: 'red',
        padding: 2,
        width: 60,
        textAlign: 'center',
        fontSize: 15,
        color: '#fff',
        fontWeight: 'bold',
        top: 5
    }
})

export default AdminPage
