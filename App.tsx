import { View, Text } from 'react-native'
import React from 'react'
import StuckNavigation from './src/Navigations/StuckNavigation'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { store } from './src/State/Store'
import NoInternetScreen from './src/Screens/NoInternetScreen/NoInternetScreen'
import { ToastProvider } from './src/Component/Toast'
import useInternet from './src/utility/NoInternet';

const App = () => {
  const isConnected = useInternet();
  return (
    isConnected ? <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ToastProvider>
          <StuckNavigation />

        </ToastProvider>
      </GestureHandlerRootView>
    </Provider> : <NoInternetScreen />
  )

}

export default App