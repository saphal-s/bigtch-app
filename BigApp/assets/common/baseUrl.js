import { Platform } from 'react-native';

let baseURL = '';

{
    Platform.OS == 'android'
        ? baseURL = 'http://10.0.2.2:3005/api/'
        : baseURL = 'http://localhost:3005/api/'
}

export default baseURL;