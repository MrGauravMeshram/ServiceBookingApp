import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RecentBookingCard from '../Home/Component/RecentBooking';
import { RecentBookingServices } from '../../Data/RecentBookingData';
import { Colours } from '../../Theme/Colours/Color';

import { styles } from '../../Style/BookingStyle'

const BookingsScreen = () => {
  const [activeTab, setActiveTab] = useState('All');

  const filteredBookings = RecentBookingServices.filter(booking => {
    if (activeTab === 'All') return true;
    return booking.status === activeTab;
  });

  const renderBookingItem = ({ item }: any) => (
    <View style={styles.cardContainer}>
      <RecentBookingCard
        image={item.image}
        title={item.title}
        provider={item.provider}
        bookedOn={item.bookedOn}
        status={item.status}
        price={item.price}
        rating={item.rating}
      />
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No bookings found in this category.</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colours.BoneWhite} />


      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
      </View>


      <View style={styles.tabContainer}>
        {(['All', 'Upcoming', 'Completed'] as const).map(tab => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tabButton, isActive && styles.activeTabButton]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <FlatList
        data={filteredBookings}
        keyExtractor={item => item.id.toString()}
        renderItem={renderBookingItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default BookingsScreen;

