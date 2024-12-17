import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Slide from "@/components/slides/Slide";
import { ThemedView } from "@/components/ThemedView";
import KeyValueTable, { Entry } from "@/components/Table";
import SwipeCarousel from "@/components/slides/SwipeCarousel";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import {
  PADDING_LAYOUT,
  SECTION_DISTANCE,
  TAB_BAR_HEIGHT,
} from "@/constants/Layout";
import CircularButton from "@/components/buttons/CircularButton";
import RoundedButton from "@/components/buttons/RoundedButton";

type ServiceDetails = {
  service_type: string;
  service_price: string;
  service_duration: string;
};

type ServiceDetailsTableProps = {
  serviceDetails: ServiceDetails;
  itemThemeColor: string;
  borderThemeColor: string;
  textThemeColor: string;
  highlightThemeColor: string;
};

const ServiceDetailsTable: React.FC<ServiceDetailsTableProps> = ({
  serviceDetails,
  itemThemeColor,
  borderThemeColor,
  textThemeColor,
  highlightThemeColor,
}) => {
  return (
    <View
      style={[
        serviceDetailsStyles.tableContainer,
        {
          backgroundColor: itemThemeColor,
          borderColor: borderThemeColor,
        },
      ]}
    >
      {/* First Row */}
      <View style={serviceDetailsStyles.row}>
        {/* Left: Category Title and Value */}
        <View style={serviceDetailsStyles.leftSide}>
          <Text
            style={[
              serviceDetailsStyles.categoryTitle,
              { color: textThemeColor },
            ]}
          >
            Service Details
          </Text>
          <Text style={[serviceDetailsStyles.value, { color: textThemeColor }]}>
            {serviceDetails.service_type}
          </Text>
        </View>

        {/* Right: Category Title and Pink Value (if available) */}
        <View style={serviceDetailsStyles.rightSide}>
          <Text
            style={[
              serviceDetailsStyles.categoryTitle,
              { color: textThemeColor },
            ]}
          >
            Service Price
          </Text>
          <Text
            style={[
              serviceDetailsStyles.pinkValue,
              { color: highlightThemeColor },
            ]}
          >
            {serviceDetails.service_price}
          </Text>
        </View>
      </View>

      {/* Partial Line */}
      <View
        style={[
          serviceDetailsStyles.partialLine,
          { backgroundColor: borderThemeColor },
        ]}
      />

      {/* Second Row */}
      <View style={serviceDetailsStyles.row}>
        {/* Left: Category Title and Value */}
        <View style={serviceDetailsStyles.leftSide}>
          <Text
            style={[
              serviceDetailsStyles.categoryTitle,
              { color: textThemeColor },
            ]}
          >
            Approximate Duration
          </Text>
          <Text style={[serviceDetailsStyles.value, { color: textThemeColor }]}>
            {serviceDetails.service_duration}
          </Text>
        </View>
      </View>
    </View>
  );
};

const imageMap: Record<string, any> = {
  "/assets/images/recommendation1.png": require("@/assets/images/recommendation1.png"),
  "/assets/images/recommendation2.png": require("@/assets/images/recommendation2.png"),
  "/assets/images/recommendation3.png": require("@/assets/images/recommendation3.png"),
};

const ProviderDetails: React.FC = () => {
  const { url } = useLocalSearchParams(); // Access the 'url' query parameter

  // Ensure `url` is a string (not an array)
  const imageSource =
    typeof url === "string" && imageMap[url] ? imageMap[url] : null;

  const businessData: Entry[] = [
    { label: "MINIMUM BOOKING NOTICE", value: "2 HOURS" },
    { label: "MAXIMUM BOOKING NOTICE", value: "30 DAYS" },
    { label: "CANCELLATION FEE", value: "$50" },
  ];

  const serviceDetails = {
    service_type: "Chemical Peeling",
    service_price: "$300",
    service_duration: "15 minutes",
  };

  const reviewData = [
    <Slide
      id={2}
      image={require("@/assets/images/review1.png")}
      url={""}
      width={353}
      height={120}
    />,
    <Slide
      id={3}
      image={require("@/assets/images/review1.png")}
      url={""}
      width={353}
      height={120}
    />,
  ];

  const highlightThemeColor = useThemeColor({}, "highlighted");
  const borderThemeColor = useThemeColor({}, "border");
  const itemThemeColor = useThemeColor({}, "item");
  const textThemeColor = useThemeColor({}, "text");

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {/* Slide Section with added margin */}
        <View style={styles.centeredSlides}>
          <Slide id={1} image={imageSource} url={""} width={353} height={264} />
        </View>

        {/* Service Details Section */}
        <View style={styles.section}>
          <ThemedText type="sectionHeader">Service Details</ThemedText>

          <ServiceDetailsTable
            serviceDetails={serviceDetails}
            itemThemeColor={itemThemeColor}
            borderThemeColor={borderThemeColor}
            textThemeColor={textThemeColor}
            highlightThemeColor={highlightThemeColor}
          />
        </View>

        {/* Booking Rules & Policies Section */}
        <View style={styles.section}>
          <ThemedText type="sectionHeader">Booking Rules & Policies</ThemedText>
          <KeyValueTable data={businessData} />
        </View>

        {/* Reviews Section */}
        <View style={styles.section}>
          <ThemedText type="sectionHeader">Reviews</ThemedText>
          <SwipeCarousel
            slides={reviewData}
            slideWidth={353}
            slideHeight={120}
            spacing={10}
          />
        </View>

        {/* Buttons Section */}
        <View style={styles.buttonsSection}>
          {/* Circular Button 1 */}
          <CircularButton
            size={50}
            iconType={"phone"} // Replace "add" with the actual icon type
            onPress={() => console.log("call")}
            iconColor="black"
          />

          {/* Circular Button 2 */}
          <CircularButton
            size={50}
            iconType={"mail"} // Replace "share" with the actual icon type
            onPress={() => console.log("mail")}
            iconColor="black"
          />

          {/* Rounded Button */}
          <RoundedButton
            backgroundColor="black"
            textColor="white"
            onPress={() => console.log("Rounded Button Pressed")}
            text="Book Now"
          />
        </View>
      </ScrollView>
    </ThemedView>
  );
};

export default ProviderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: PADDING_LAYOUT,
    marginBottom: TAB_BAR_HEIGHT,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "space-evenly",
  },
  section: {
    marginBottom: SECTION_DISTANCE,
  },

  centeredSlides: {
    flex: 1, // Ensure the section takes up the available space
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    marginBottom: SECTION_DISTANCE,
  },

  buttonsSection: {
    flexDirection: "row",
    justifyContent: "space-between", // Distribute buttons evenly
    alignItems: "center", // Align buttons vertically
    marginBottom: SECTION_DISTANCE,
  },
});

const serviceDetailsStyles = StyleSheet.create({
  tableContainer: {
    borderWidth: 1,
    borderRadius: 19,
    padding: 15,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftSide: {
    alignItems: "flex-start",
  },
  rightSide: {
    alignItems: "flex-end",
  },
  categoryTitle: {
    fontFamily: "InstrumentSansBold",
    fontWeight: "600",
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: -0.02,
    textTransform: "uppercase",
    opacity: 0.6,
    marginBottom: 4,
  },
  value: {
    fontFamily: "InstrumentSans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 18,
    lineHeight: 23,
    letterSpacing: -0.02,
    textTransform: "uppercase",
  },
  pinkValue: {
    fontFamily: "Source Sans Pro",
    fontStyle: "normal",
    fontWeight: "400", // Numeric value for fontWeight
    fontSize: 18,
    lineHeight: 23,
    letterSpacing: -0.02, // React Native uses `letterSpacing` in units of density-independent pixels
    textTransform: "uppercase", // React Native supports 'uppercase', 'lowercase', and 'capitalize'
  },
  partialLine: {
    height: 1,
    marginVertical: 15,
  },
});
