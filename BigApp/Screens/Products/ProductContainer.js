import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, TextInput, View, Text, ScrollView } from 'react-native';
import ProductList from './ProductList';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchedProducts from './SearchedProducts';
import Banner from '../../shared/Banner';
import CategoriesFilter from './CategoriesFilter';
import axios from 'axios';


const ProductContainer = (props) => {
    const [products, setProducts] = useState([]);
    const [productsFiltered, setProductFilter] = useState([]);
    const [focus, setFocus] = useState();
    const [categories, setCategories] = useState([]);
    const [productsCtg, setProductsCtg] = useState([]);
    const [active, setActive] = useState();
    const [initialState, setInitialState] = useState([]);

    useEffect(() => {
        setActive(-1)
        setFocus(false);
        axios
            .get(`http://10.0.2.2:3005/api/products`)
            .then((res) => {
                setProducts(res.data);
                setProductFilter(res.data);
                setProductsCtg(res.data);
                setInitialState(res.data);
            })
            .catch((error) => {
                console.log("Api call error");
                alert(error.message);
            });
        axios.get(`http://10.0.2.2:3005/api/categories`)
            .then((res) => {
                setCategories(res.data);
                // console.log(res.data)
            })
            .catch((error) => {
                console.log("Api call error");
                alert(error.message);
            });
        return () => {
            setProducts([])
            setProductFilter([])
            setFocus()
            setCategories([])
            setActive()
            setInitialState()
        }
    }, []);

    const searchProduct = (text) => {
        setProductFilter(
            products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
        )
    }

    const openList = () => {
        setFocus(true);
    }
    const onBlur = () => {
        setFocus(false);
    }
    // categories

    const changeCtg = (ctg) => {
        {
            ctg === 'all'
                ? [setProductsCtg(initialState), setActive(true)]
                : [setProductsCtg(
                    products.filter((i) => i.category._id === ctg),
                    setActive(true)
                ),];
        }
    }

    return (
        <View style={{ marginBottom: 205 }}>
            <View style={styles.searchview} >
                <Ionicons
                    name="search"
                    size={22}
                    color="black"
                    style={{
                        position: 'absolute',
                        top: 24, left: 30
                    }}
                />
                <TextInput
                    style={styles.inputs}
                    placeholder="Search..."
                    onFocus={openList}
                    onChangeText={(text) => searchProduct(text)}
                />
                {focus == true ? (
                    <Ionicons
                        name="close"
                        size={22}
                        color="black"
                        onPress={onBlur}
                        style={{
                            position: 'absolute',
                            top: 24, right: 30
                        }}
                    />
                ) : <Text style={{ display: 'none' }}>hello</Text>}
            </View>
            <View >
                {focus == true ? (<SearchedProducts
                    navigation={props.navigation}
                    productsFiltered={productsFiltered} />) : (
                    <ScrollView>
                        <View style={{ flex: 1 }}>
                            <Banner />
                            <View>
                                <CategoriesFilter
                                    categories={categories}
                                    categoryFilter={changeCtg}
                                    productsCtg={productsCtg}
                                    active={active}
                                    setActive={setActive} />
                            </View>
                            {
                                productsCtg.length > 0 ? (
                                    <View style={{
                                        display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                                    }}>
                                        {productsCtg.map((item) => {
                                            return (
                                                <ProductList
                                                    navigation={props.navigation}
                                                    key={item._id}
                                                    item={item} />
                                            )
                                        })}
                                    </View>
                                ) : (
                                    <View>
                                        <Text style={styles.noproduct}>No products found</Text>
                                    </View>
                                )
                            }
                        </View>
                    </ScrollView>
                )}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    searchview: {
        position: 'relative',
        padding: 13,
        marginTop: 0,
        // backgroundColor: 'green'
    },
    inputs: {
        height: 45,
        fontSize: 15,
        paddingLeft: 44,
        paddingRight: 20,
        borderWidth: 1,
        borderColor: "thistle",
        borderRadius: 50,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: "thistle",
        borderRadius: 50,
    },
    noproduct: {
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 40,
        fontSize: 16
    }
})
export default ProductContainer
