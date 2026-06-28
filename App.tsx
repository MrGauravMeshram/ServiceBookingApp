import { View, Text } from 'react-native'
import React from 'react'
import StuckNavigation from './src/Navigations/StackNavigation'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { store } from './src/State/Store'
import NoInternetScreen from './src/Screens/NoInternetScreen/NoInternetScreen'
import Toast from 'react-native-toast-message';
import useInternet from './src/utility/NoInternet';

const App = () => {
  const isConnected = useInternet();
  return (
    isConnected ? <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StuckNavigation />
        <Toast position="bottom" />
      </GestureHandlerRootView>
    </Provider> : <NoInternetScreen />
  )

}

export default App