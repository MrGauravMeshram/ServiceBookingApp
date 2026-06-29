import React from 'react';
import { View, Text, StatusBar, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colours } from '../../Theme/Colours/Color';
import { scale, verticalScale } from '../../Theme/Normalization';
import { styles } from '../../Style/NoInternetScreenStyle';

const NoInternetScreen = () => {


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colours.BoneWhite} />
      <View style={styles.content}>
        <View style={{ height: verticalScale(300), width: scale(300) }}>
          <Image source={require("../../assets/Images/Nointernet.png")}
            style={{ width: "100%", height: "100%", resizeMode: 'contain' }}
          />
        </View>

        <Text style={styles.title}>Connection Lost</Text>
        <Text style={styles.description}>
          Oops! Your device is not connected to the internet. Please check your network connection and try again.
        </Text>

        <View style={styles.button}>
          <Text style={styles.buttonText}>Try Again</Text>
        </View>

      </View>

    </SafeAreaView>
  );
};

export default NoInternetScreen;