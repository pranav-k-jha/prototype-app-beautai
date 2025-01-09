import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import MappedServiceProviderCard from "@/components/cards/client/MappedServiceProviderCard";
import { TAB_BAR_HEIGHT } from "@/constants/Layout";
import CircularButton from "@/components/buttons/CircularButton";

const screenWidth = Dimensions.get("window").width;

const SearchPage = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const providers = [
    {
      id: "1",
      professionals: "injectors",
      companyTitle: "Derma Skin Care Clinic",
      companyLogo: require("@/assets/images/companyLogo1.png"),
      rating: 4.5,
      reviews: 980,
      openingTimes: {
        Monday: { openingTime: "09:00", closingTime: "17:00" },
        Tuesday: { openingTime: "09:00", closingTime: "17:00" },
        Wednesday: { openingTime: "10:00", closingTime: "17:00" },
        Thursday: { openingTime: "09:00", closingTime: "17:00" },
        Friday: { openingTime: "09:00", closingTime: "17:00" },
        Saturday: { openingTime: "10:00", closingTime: "14:00" },
        Sunday: null, // Closed all day
      },
      address: "123 Sainte-Catherine St W, Montreal, QC, Canada",
      coords: { latitude: 45.5048, longitude: -73.5743 },
      backgroundImage: require("@/assets/images/image-search-1.png"),
    },
    {
      id: "2",
      professionals: "Medispas",
      companyTitle: "Echo Beauty Clinic",
      companyLogo: require("@/assets/images/companyLogo3.png"),
      rating: 4.0,
      reviews: 650,
      openingTimes: {
        Monday: { openingTime: "09:00", closingTime: "17:00" },
        Tuesday: { openingTime: "09:00", closingTime: "17:00" },
        Wednesday: { openingTime: "10:00", closingTime: "17:00" },
        Thursday: { openingTime: "09:00", closingTime: "17:00" },
        Friday: { openingTime: "09:00", closingTime: "17:00" },
        Saturday: { openingTime: "10:00", closingTime: "14:00" },
        Sunday: null, // Closed all day
      },
      address: "456 Peel St, Montreal, QC, Canada",
      coords: { latitude: 45.5078, longitude: -73.5675 },
      backgroundImage: require("@/assets/images/image2.png"),
    },
    {
      id: "3",
      professionals: "Medispas",
      companyTitle: "Villa's Beauty Spa",
      companyLogo: require("@/assets/images/companyLogo2.png"),
      rating: 4.7,
      reviews: 1200,
      openingTimes: {
        Monday: { openingTime: "09:00", closingTime: "17:00" },
        Tuesday: { openingTime: "09:00", closingTime: "17:00" },
        Wednesday: { openingTime: "10:00", closingTime: "17:00" },
        Thursday: { openingTime: "09:00", closingTime: "17:00" },
        Friday: { openingTime: "09:00", closingTime: "17:00" },
        Saturday: { openingTime: "10:00", closingTime: "14:00" },
        Sunday: null, // Closed all day
      },
      address: "789 Saint-Denis St, Montreal, QC, Canada",
      coords: { latitude: 45.5065, longitude: -73.5618 },
      backgroundImage: require("@/assets/images/image1.png"),
    },
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let userLocation: any = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
    })();
  }, []);

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const toRadians = (deg: number) => (deg * Math.PI) / 180;
    const R = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1);
  };

  if (!location) {
    return (
      <View style={styles.loadingContainer}>
        <Text>{errorMsg || "Fetching location..."}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <CircularButton
          size={60}
          iconType={"search"}
          onPress={function (): void {}}
          backgroundColor="white"
        />
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="Your Location"
        />
        {providers.map((provider) => (
          <Marker
            key={provider.id}
            coordinate={provider.coords}
            title={provider.service}
            description={`${provider.location} (${calculateDistance(
              location.latitude,
              location.longitude,
              provider.coords.latitude,
              provider.coords.longitude
            )} km away)`}
          />
        ))}
      </MapView>

      <View style={styles.horizontalScroll}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {providers.map((provider) => (
            <MappedServiceProviderCard
              key={provider.id}
              id={provider.id}
              professionals={provider.professionals}
              onBookmarkPress={function (): void {}}
              companyLogo={provider.companyLogo}
              companyTitle={provider.companyTitle}
              starRating={provider.rating}
              numberOfReviews={provider.reviews}
              address={provider.address}
              distance={calculateDistance(
                location.latitude,
                location.longitude,
                provider.coords.latitude,
                provider.coords.longitude
              )}
              backgroundImage={provider.backgroundImage}
              openingTimes={provider.openingTimes}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  horizontalScroll: {
    position: "absolute",
    bottom: TAB_BAR_HEIGHT,
    left: 0,
    right: 0,
    backgroundColor: "none",
    paddingVertical: 16,
  },
  scrollContainer: {
    paddingHorizontal: 16,
  },
  card: {
    width: screenWidth * 0.7,
    marginRight: 16,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    overflow: "hidden",
    elevation: 3,
    marginBottom: "15%",
    height: "75%",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  textContainer: {
    flex: 1,
    padding: 12,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  cardLocation: {
    fontSize: 14,
    color: "#fff",
  },
  cardRating: {
    fontSize: 14,
    color: "#fff",
  },
  cardStatus: {
    fontSize: 14,
    color: "red",
  },
  cardOpeningHours: {
    fontSize: 14,
    color: "#fff",
  },
  cardAddress: {
    fontSize: 14,
    color: "#fff",
  },
  cardDistance: {
    fontSize: 14,
    color: "#fff",
  },
  button: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    zIndex: 100,
    opacity: 1,
    marginTop: "10%",
    height: 40,
    width: "100%",
    backgroundColor: "transparent",
    position: "absolute",
    top: 10,
    paddingHorizontal: 10,
  },
  backButton: {
    marginLeft: 10,
  },
  searchButton: {
    marginRight: 10,
  },
});

export default SearchPage;
