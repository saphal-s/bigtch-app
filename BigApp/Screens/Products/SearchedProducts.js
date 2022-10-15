import React from 'react'
import { View, Image, StyleSheet, Dimensions, Text, FlatList, TouchableOpacity } from 'react-native';

var { width } = Dimensions.get("window");


const SearchedProducts = (props) => {

    const { productsFiltered } = props;

    return (
        <View style={{ width: width }}>

            {
                productsFiltered.length > 0 ? (
                    <FlatList
                        data={productsFiltered}
                        renderItem={({ item }) => (<TouchableOpacity key={item._id} onPress={() =>
                            props.navigation.navigate("Product Detail", { item: item })
                        }>
                            <View >
                                <View style={styles.thumbnail}>
                                    <Image
                                        source={{ uri: `http://10.0.2.2:3005/${item.image}` }}
                                        style={styles.thumbimage} />
                                    <View>
                                        <Text style={styles.productname}>{item.name}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>)}
                        keyExtractor={item => item.name} />
                ) : (
                    <View>
                        <Text style={styles.center} >
                            No products match the selected criteria
                        </Text>
                    </View>
                )
            }
        </View>
    )
}
const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    thumbnail: {
        marginBottom: 3,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingBottom: 10,
        paddingRight: 10,
        marginLeft: 20,
        marginRight: 20,
        paddingRight: 70
    },
    thumbimage: {
        height: 80,
        width: 80,
        borderRadius: 50,
    },
    productname: {
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 27,
        paddingLeft: 20,
    }
})

export default SearchedProducts
