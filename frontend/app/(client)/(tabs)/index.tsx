import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import PastServiceCard from "@/components/PastServiceCard";
import { ThemedView } from "@/components/ThemedView";
import {
  PADDING_LAYOUT,
  SECTION_DISTANCE,
  TAB_BAR_HEIGHT,
} from "@/constants/Layout";
import { ThemedText } from "@/components/ThemedText";
import UserLogoSignature from "@/components/UserSignature/UserLogoSignature";
import UpcomingAppointment from "@/components/cards/client/UpcomingAppointmentCard";
import SavedProviderCard from "@/components/cards/client/SavedProviderCard";

const App = () => {
  const userData = {
    id: "1",
    username: "Naomi Haynes",
    image: require("@/assets/images/image-profile-2.png"),
  };

  const upcomingAppointments = [
    {
      id: "1", // url link id for dynamic routing
      professionals: "Estheticians",
      serviceType: "Chemical Peeling",
      time: "09:30 PM",
      date: "Thursday, 12 June 2025",
      companyLogo: require("@/assets/images/companyLogo1.png"),
      companyTitle: "Derma Skin Care Clinic",
      backgroundImage: require("@/assets/images/image-upcomingappointment1bg.png"),
    },

    {
      id: "2", // url link id for dynamic routing
      professionals: "Estheticians",
      serviceType: "Chemical Peeling",
      time: "09:30 PM",
      date: "Thursday, 12 June 2025",
      companyLogo: require("@/assets/images/companyLogo1.png"),
      companyTitle: "Derma Skin Care Clinic",
      backgroundImage: require("@/assets/images/image-search-1.png"),
    },
  ];

  const savedProviders = [
    {
      id: "1",
      companyLogo: require("@/assets/images/companyLogo1.png"),
      companyTitle: "Rejuvenises Day Clinic",
      backgroundImage: require("@/assets/images/image-savedprovider1bg.png"),
    },
    {
      id: "2",
      image: require("@/assets/images/image-provider1.png"),
      companyLogo: require("@/assets/images/companyLogo1.png"),
      companyTitle: "Echo Beauty",
      backgroundImage: require("@/assets/images/image-savedprovider2bg.png"),
    },
    {
      id: "3",
      image: require("@/assets/images/image-provider1.png"),
      companyLogo: require("@/assets/images/companyLogo1.png"),
      companyTitle: "Echo Beauty",
      backgroundImage: require("@/assets/images/image-savedprovider3bg.png"),
    },
  ];

  const pastServices = [
    {
      id: 1,
      service: "Laser Hair Removal",
      date: "12 June 2024",
      rating: 4.5,
      image: require("@/assets/images/image-saved-1.png"),
    },
    {
      id: 2,
      service: "Manicures",
      date: "12 June 2024",
      rating: 4.5,
      image: require("@/assets/images/image-provider2.png"),
    },
    {
      id: 3,
      service: "Skin Treatment",
      date: "10 June 2024",
      rating: 4.5,
      image: require("@/assets/images/image-provider2.png"),
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={["header", "appointments", "providers", "pastServices"]}
        renderItem={({ item }) => {
          switch (item) {
            case "header":
              return (
                <View style={styles.header}>
                  <UserLogoSignature
                    imageSource={userData.image}
                    username={userData.username}
                    onPress={() => {}}
                    iconType="notifications"
                  />
                </View>
              );
            case "appointments":
              return (
                <View style={styles.section}>
                  <ThemedText type="sectionHeader">
                    Upcoming Appointments
                  </ThemedText>
                  <FlatList
                    data={upcomingAppointments}
                    horizontal
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <UpcomingAppointment
                        professionals={item.professionals}
                        id={item.id}
                        serviceType={item.serviceType}
                        time={item.time}
                        date={item.date}
                        companyLogo={item.companyLogo}
                        companyTitle={item.companyTitle}
                        backgroundImage={item.backgroundImage}
                        width="352"
                        height="192"
                      />
                    )}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalListContent}
                    ItemSeparatorComponent={() => (
                      <View style={{ width: 10 }} />
                    )}
                  />
                </View>
              );
            case "providers":
              return (
                <View style={styles.section}>
                  <ThemedText type="sectionHeader">Saved Providers</ThemedText>
                  <FlatList
                    horizontal
                    data={savedProviders}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <SavedProviderCard
                        id={item.id}
                        onBookmarkPress={function (): void {}}
                        companyLogo={item.companyLogo}
                        companyTitle={item.companyTitle}
                        backgroundImage={item.backgroundImage}
                        width={169}
                        height={192}
                      />
                    )}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalListContent}
                    ItemSeparatorComponent={() => (
                      <View style={{ width: 10 }} />
                    )}
                  />
                </View>
              );
            case "pastServices":
              return (
                <View style={styles.section}>
                  <ThemedText type="sectionHeader">Past Services</ThemedText>
                  <FlatList
                    data={pastServices}
                    horizontal
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <PastServiceCard
                        service={item.service}
                        date={item.date}
                        rating={item.rating}
                        image={item.image}
                      />
                    )}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalListContent}
                  />
                </View>
              );
            default:
              return null;
          }
        }}
        contentContainerStyle={styles.listContent}
        keyExtractor={(item, index) => index.toString()}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: PADDING_LAYOUT,
    marginBottom: TAB_BAR_HEIGHT,
  },
  header: {
    marginTop: SECTION_DISTANCE,
    marginBottom: 30,
  },
  section: {
    marginBottom: SECTION_DISTANCE,
  },
  horizontalListContent: {
    // paddingHorizontal: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  textContainer: {
    flex: 1,
  },
});

export default App;
