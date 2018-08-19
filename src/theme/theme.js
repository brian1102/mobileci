import { createTheme } from 'react-native-theming'
import Config from '../config/index'

const themes = {
  yojee: createTheme(
    {
      brand: '#80c939',
      gradStart: '#69ad3c',
      gradEnd: '#80c939',
      background: '#E1E5E0',
      lightBackground: 'white',
      title: '#ffffff',
      directionColor: '#4899ED',
      progressBackground: '#c9c9c9',
      link: '#3498db', // bluelink
      disabled: '#d6d7d7',
      separator: '#d6d7d7',
      inactive: '#a4a4a7',
      pickup: 'rgb(45,59,75)',
      dropoff: 'rgb(54,134,231)',
      tabActiveColor: 'white',
      alert: '#ff0000',
      lightGray: '#888888',
      midGray: '#737373',
      logoSplash: require('./assets/images/yojee/logo_splash.png'),
      logoLicense: require('./assets/images/yojee/logo_license.png')
    },
    'yojee'
  ),
  ups: createTheme(
    {
      brand: '#301506',
      gradStart: '#5b280b',
      gradEnd: '#301506',
      background: '#E1E5E0',
      lightBackground: 'white',
      title: '#ffffff',
      directionColor: '#4899ED',
      progressBackground: '#c9c9c9',
      link: '#3498db', // bluelink
      disabled: '#d6d7d7',
      separator: '#d6d7d7',
      inactive: '#a4a4a7',
      pickup: 'rgb(45,59,75)',
      dropoff: 'rgb(54,134,231)',
      tabActiveColor: 'white',
      alert: '#ff0000',
      lightGray: '#888888',
      midGray: '#737373',
      logoSplash: require('./assets/images/ups/logo_splash.png'),
      logoLicense: require('./assets/images/ups/logo_license.png')
    },
    'ups'
  ),
  tasman: createTheme(
    {
      brand: '#054875',
      gradStart: '#075d96',
      gradEnd: '#054875',
      background: '#E1E5E0',
      lightBackground: 'white',
      title: '#ffffff',
      directionColor: '#4899ED',
      progressBackground: '#c9c9c9',
      link: '#3498db', // bluelink
      disabled: '#d6d7d7',
      separator: '#d6d7d7',
      inactive: '#a4a4a7',
      pickup: 'rgb(45,59,75)',
      dropoff: 'rgb(54,134,231)',
      tabActiveColor: 'white',
      alert: '#ff0000',
      lightGray: '#888888',
      midGray: '#737373',
      logoSplash: require('./assets/images/tasman/logo_splash.png'),
      logoLicense: require('./assets/images/tasman/logo_license.png')
    },
    'tasman'
  ),
  scharff: createTheme(
    {
      brand: '#ff7177',
      gradStart: '#fc999d',
      gradEnd: '#ff7177',
      background: '#E1E5E0',
      lightBackground: 'white',
      title: '#ffffff',
      directionColor: '#4899ED',
      progressBackground: '#c9c9c9',
      link: '#3498db', // bluelink
      disabled: '#d6d7d7',
      separator: '#d6d7d7',
      inactive: '#a4a4a7',
      pickup: 'rgb(45,59,75)',
      dropoff: 'rgb(54,134,231)',
      tabActiveColor: 'white',
      alert: '#ff0000',
      lightGray: '#888888',
      midGray: '#737373',
      logoSplash: require('./assets/images/scharff/logo_splash.png'),
      logoLicense: require('./assets/images/scharff/logo_license.png')
    },
    'scharff'
  )
}

if (themes[Config().THEME]) themes[Config().THEME].apply()

export default themes
