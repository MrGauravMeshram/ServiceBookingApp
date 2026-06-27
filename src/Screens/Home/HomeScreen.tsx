import {
  View, Text, StatusBar, ScrollView, StyleSheet, ImageBackground, Switch
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colours } from '../../Theme/Colours/Color'
import HomeHeader from './Component/HomeHeader'
import LinearGradient from 'react-native-linear-gradient';
import SearchBar from '../../Component/SearchBar'
import Pill from './Component/Pill'
import { Fonts, FontSize } from '../../Theme/FontsSize'
import requestLocationPermission from '../../utility/LocationPremission'
import { useEffect } from 'react'
import ServiceCard from '../../Component/MostBookCard'
import { MostBookedServices } from '../../Data/MostBookService'
import Animated, { useAnimatedRef, useScrollOffset, useAnimatedStyle, interpolate, Extrapolate, interpolateColor } from 'react-native-reanimated'
import { FlatList } from 'react-native-gesture-handler'
import Carousel from 'react-native-reanimated-carousel';
import ServiceBanner from './Component/ServiceBanner';
import { BannerData } from '../../Data/BannerData';
import { Dimensions } from 'react-native';
import RecentBookingCard from './Component/RecentBooking'
import { RecentBookingServices } from '../../Data/RecentBookingData'
import { CleaningEssentials } from '../../Data/CleaningEssentials'


const { width } = Dimensions.get('window');


const HomeScreen = () => {

  const scrollRef = useAnimatedRef();
  const scrollOffset = useScrollOffset(scrollRef)

  useEffect(() => {
    checkPermission();
  }, []);




  const HeaderAnimationStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      scrollOffset.value,
      [0, 100],
      ['rgba(255,255,255,0)', 'rgba(255,255,255,1)']
    );
    return {
      backgroundColor,
      elevation: scrollOffset.value > 100 ? 4 : 0,
      shadowOpacity: scrollOffset.value > 100 ? 0.15 : 0,
    };
  })
  const checkPermission = async () => {
    const hasPermission = await requestLocationPermission();

    if (hasPermission) {

    }
  };
  return (
    <View style={style.Container}>
      <StatusBar barStyle='light-content' />
      <Animated.ScrollView ref={scrollRef}
        scrollEventThrottle={16}
        stickyHeaderIndices={[2]}
        overScrollMode='never'
      >
        <ImageBackground 
          source={{ uri: "https://i.pinimg.com/1200x/55/fa/03/55fa030c535f28fb1a54f1d87483ddda.jpg" }} 
          style={style.bgim} 
          resizeMode='cover'
        >
          <LinearGradient colors={['#000', 'transparent', 'transparent']} style={style.linearGradient} />
        </ImageBackground>

        <View>
          <HomeHeader />
        </View>

        <Animated.View style={[style.searchHeader, HeaderAnimationStyle]}>
          <SearchBar />
        </Animated.View>

        <View style={{ height: 280 }} />

        <View style={{ backgroundColor: Colours.BoneWhite }}>
          <Pill />
        </View>
        <View >
          <Text style={style.lebel}>Most Book Services</Text>
        </View>
        <View>
          <FlatList
            data={MostBookedServices}
            renderItem={({ item }) => (
              <ServiceCard
                image={item.image}
                title={item.title}
                rating={item.rating}
                reviews={item.reviews}
                price={item.price}
                onPress={() => console.log('Service pressed!')}
              />
            )} keyExtractor={(item) => item.id.toString()} horizontal
            contentContainerStyle={style.serviceCard} />
        </View>
        <View
          style={style.Banner}>
          <Carousel
            loop
            autoPlay
            autoPlayInterval={3000}
            width={width}
            height={330}
            pagingEnabled
            snapEnabled
            data={BannerData}
            scrollAnimationDuration={800}
            renderItem={({ item }) => (
              <ServiceBanner
                image={item.image}
                badge={item.badge}
                title={item.title}
                subtitle={item.subtitle}
                buttonText={item.buttonText}
              />
            )}
          />
        </View>
        <View>
          <Text style={style.lebel}>Recent Booking</Text>
          <FlatList
            data={RecentBookingServices}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            renderItem={({ item }) => (
              <RecentBookingCard
                image={item.image}
                title={item.title}
                provider={item.provider}
                bookedOn={item.bookedOn}
                status={item.status}
                price={item.price}
                rating={item.rating}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View>
          <Text style={style.lebel}>Cleaning Essentials</Text>
          <FlatList
            data={CleaningEssentials}
            renderItem={({ item }) => (
              <ServiceCard
                image={item.image}
                title={item.title}
                rating={item.rating}
                reviews={item.reviews}
                price={item.price}
                onPress={() => console.log('Service pressed!')}
              />
            )} keyExtractor={(item) => item.id.toString()} horizontal
            contentContainerStyle={[style.serviceCard, { paddingBottom: 20 }]} />
        </View>
      </Animated.ScrollView>
    </View>
  )
}

export default HomeScreen

const style = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colours.BoneWhite
  },
  bgim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 450,
  },
  linearGradient: {
    flex: 1,
    borderRadius: 5
  },
  lebel: {
    paddingLeft: 16,
    marginTop: 16,
    fontFamily: Fonts.MontserrateSemiBold,
    fontSize: FontSize.lg,
  },
  searchHeader: { 
    width: "100%", 
    paddingHorizontal: 16, 
    paddingVertical: 10,
    zIndex: 99,
  },
  serviceCard: {
    gap: 10,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  Banner: {
    marginTop: 16,
  }
})