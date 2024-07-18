import {Platform} from 'react-native';

// Local
// const appConfig = {
//   BASE_URL:
//     Platform.OS === 'ios'
//       ? 'http://localhost:4400/api'
//       : 'http://192.168.29.135:4400/api',
//   SERVER_URL:
//     Platform.OS === 'ios'
//       ? 'http://localhost:4400'
//       : 'http://192.168.29.135:4400',
// };

// Dev
const appConfig = {
  BASE_URL: 'https://jms-api-f9249b4e5d36.herokuapp.com/api/v1',
  SERVER_URL: 'https://jms-api-f9249b4e5d36.herokuapp.com/',
};

// Prod
// const appConfig = {
//   BASE_URL: 'https://reddi-api-prod.vercel.app/api',
//   SERVER_URL: 'https://reddi-api-prod.vercel.app',
// };

export default appConfig;
