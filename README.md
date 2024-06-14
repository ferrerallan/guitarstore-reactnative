
# Guitar Store React Native Example

## Description

This repository provides an example of a Guitar Store application built with React Native. It demonstrates how to set up and use various features of React Native to build a cross-platform mobile application, including navigation, state management, and API integration, which is useful for developers looking to create mobile applications with a modern tech stack.

## Requirements

- Node.js
- React Native CLI
- Yarn or npm for package management

## Mode of Use

1. Clone the repository:
   ```bash
   git clone https://github.com/ferrerallan/guitarstore-reactnative.git
   ```
2. Navigate to the project directory:
   ```bash
   cd guitarstore-reactnative
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the application:
   ```bash
   react-native run-android
   # or
   react-native run-ios
   ```

## Implementation Details

- **src/**: Contains the React Native application source code.
- **navigation/**: Contains the navigation setup for the application.
- **store/**: Contains the state management setup (e.g., Redux).
- **api/**: Contains the API integration code.
- **package.json**: Configuration file for the Node.js project, including dependencies.

### Example of Use

Here is an example of how to set up navigation in a React Native application:

```javascript
import 'react-native-gesture-handler';
import * as React from 'react';
import {{ NavigationContainer }} from '@react-navigation/native';
import {{ createStackNavigator }} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';

const Stack = createStackNavigator();

function App() {{
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}}

export default App;
```

This code sets up a basic stack navigator using React Navigation, with two screens: HomeScreen and DetailsScreen.

## License

This project is licensed under the MIT License.

You can access the repository [here](https://github.com/ferrerallan/guitarstore-reactnative).
