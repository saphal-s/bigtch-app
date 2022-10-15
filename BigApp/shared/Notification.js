import React, { useContext, useState, useEffect } from 'react'
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AuthGlobal from '../Context/store/AuthGlobal';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Notification = () => {
    const context = useContext(AuthGlobal);

    const navigation = useNavigation();

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
    // console.log(lengths)
    var j = 0;
    return (
        <View>
            {context.stateUser.user.isAdmin === true ? (
                <View style={{ position: 'absolute', right: 20 }}>
                    <View>
                        {
                            complains.map((c, i) => {
                                if (c.length == (i + 1)) {
                                    if (c.isView == false) {
                                        j = j + 1
                                    }
                                    return j
                                }
                                else {
                                    if (c.isView == false) {
                                        j = j + 1
                                    }
                                }
                            }

                            )
                        }
                    </View>
                    <View style={{ marginTop: 7 }}>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("Notification")}
                        >
                            <Text style={{
                                marginLeft: 20, marginBottom: -10, fontWeight: 'bold',
                                fontSize: 17,
                                color: '#FE8102'
                            }}>{j}</Text>
                            <Icon name='bell'
                                style={{ position: 'relative', color: '#009387' }}
                                size={22} />
                        </TouchableOpacity>
                    </View>
                </View>
            ) : null}
        </View>
    )
}

export default Notification
