import React, { useState, useEffect } from 'react'
import { Text, Dimensions, Image, View, StyleSheet, ScrollView } from 'react-native'
import Swiper from 'react-native-swiper'

var { width } = Dimensions.get('window');

const Banner = () => {
    const [bannerData, setBannerData] = useState([])
    useEffect(() => {
        setBannerData([
            "https://www.bigtech.com.np/images/backend_images/My%20Images/Slider/1585492729.jpg",
            "https://www.bigtech.com.np/images/backend_images/My%20Images/Slider/1585492475.png"
        ])
        return () => {
            setBannerData([])
        }
    }, [])
    return (
        <ScrollView style={{ height: 116 }}>
            <View style={styles.container}>
                <View style={styles.swiper}>
                    <Swiper
                        showButtons={false}
                        autoplay={true}
                        autoplayTimeout={4}>
                        {bannerData.map((item) => {
                            return (
                                <Image key={item}
                                    style={styles.imageBanner}
                                    resizeMode="contain"
                                    source={{ uri: item }} />
                            )
                        })}

                    </Swiper>
                    <View style={{ height: 20 }}></View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    swiper: {
        width: width,
        alignItems: 'center',
        height: 185
    },
    imageBanner: {
        height: 185,
        width: width,
        borderRadious: 10,
        marginTop: -35
    },
    container: {
        flex: 1,
        height: 114,
        backgroundColor: '#ccc'
    }
})

export default Banner
