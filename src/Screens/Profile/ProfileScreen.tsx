import { View, Text, StyleSheet, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import Button from '../../Component/Button'
import { Colours } from '../../Theme/Colours/Color'
import { Fonts, FontSize } from '../../Theme/FontsSize'
import { scale, verticalScale } from '../../Theme/Normalization'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const navigation = useNavigation<any>();

  const handleLogout = async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'false');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colours.BoneWhite} />

      <View style={styles.content}>


        <View style={{ flex: 1 }} />

        <View style={styles.buttonContainer}>
          <Button
            title="Logout"
            onPress={handleLogout}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.BoneWhite,
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(100),
  },
  profileCard: {
    backgroundColor: Colours.white,
    borderRadius: scale(20),
    padding: scale(24),
    alignItems: 'center',
    shadowColor: Colours.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginTop: verticalScale(20),
  },
  avatarContainer: {
    marginBottom: verticalScale(16),
  },
  userName: {
    fontFamily: Fonts.MontserrateSemiBold,
    fontSize: FontSize.lg,
    color: Colours.Black,
    marginBottom: verticalScale(6),
  },
  userEmail: {
    fontFamily: Fonts.MontserrateRegular,
    fontSize: FontSize.md,
    color: Colours.mediumGray,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: verticalScale(10),
  },
})