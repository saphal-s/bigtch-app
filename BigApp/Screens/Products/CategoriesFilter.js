import React from 'react'
import { FlatList, Text, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'

const CategoriesFilter = (props) => {
    return (
        <ScrollView bounces={true}
            horizontal={true}
            style={{ backgroundColor: '#f2f2f2' }}>
            <View style={{ display: 'flex', flexDirection: 'row', padding: 10 }}>
                <TouchableOpacity
                    key={1}
                    onPress={() => {
                        props.categoryFilter('all'), props.setActive(-1)
                    }}>
                    <View style={styles.center}>
                        <Text style={[styles.categoryname, props.active == -1 ? styles.active : styles.inactive]}>
                            All
                        </Text>
                    </View>
                </TouchableOpacity>
                <FlatList
                    data={props.categories}
                    horizontal
                    renderItem={({ item }) => (
                        <View>

                            <TouchableOpacity key={item._id}
                                onPress={() => {
                                    props.categoryFilter(item._id),
                                        props.setActive(props.categories.indexOf(item))
                                }}>
                                <View style={styles.center}>
                                    <Text style={[styles.categoryname, props.active == props.categories.indexOf(item) ? styles.active : styles.inactive]}>
                                        {item.title}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={item => item.name} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    center: {
        // justifyContent: 'center',
        // alignItems: 'center',
        margin: 5
    },
    categoryname: {
        borderRadius: 50,
        paddingLeft: 12,
        paddingRight: 12,
        color: '#fff',
        paddingTop: 4,
        paddingBottom: 4,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    active: {
        backgroundColor: '#eb7d07'
    },
    inactive: {
        backgroundColor: '#f5b776',
    }
})

export default CategoriesFilter
