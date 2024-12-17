import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import Slide from "@/components/slides/Slide";

const beautyconsultationrecommendations = () => {
  const slides = [
    <Slide
      id={1}
      key={1}
      image={require("@/assets/images/recommendation1.png")}
      url="/assets/images/recommendation1.png"
      width={353}
      height={240}
    />,
    <Slide
      id={2}
      key={2}
      image={require("@/assets/images/recommendation2.png")}
      url="/assets/images/recommendation2.png"
      width={353}
      height={240}
    />,

    <Slide
      id={3}
      key={3}
      image={require("@/assets/images/recommendation3.png")}
      url="/assets/images/recommendation3.png"
      width={353}
      height={240}
    />,
  ];

  return (
    <ThemedView style={styles.container}>
      {/* Company Signature */}
      <View style={styles.signature}>
        <Image
          source={require("@/assets/images/BeautAI.png")} // Replace with the path to your logo
          style={styles.logo}
          resizeMode="contain" // Ensure the image is fully visible
        />
        <View style={styles.textContainer}>
          <Text style={styles.heading}>BEAUTY CONSULTATION</Text>
          <Text style={styles.subheading}>
            GET PERSONALIZED RECOMMENDATIONS
          </Text>
        </View>
      </View>

      {/* Providers Section */}
      <View style={styles.providersSection}>
        {/* Header */}
        <Text style={styles.providersHeader}>RECOMMENDED TREATMENTS</Text>

        {/* Scrollable Slide List */}
        <ScrollView
          contentContainerStyle={styles.slidesContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Example slides */}
          {slides.map((slide, index) => (
            <View key={index} style={styles.slide}>
              {slide}
            </View>
          ))}
        </ScrollView>
      </View>
    </ThemedView>
  );
};

export default beautyconsultationrecommendations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: "5%",
  },
  signature: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "5%",
    marginTop: "15%",
    width: "100%",
  },
  logo: {
    width: "15%", // 15% of the parent container's width
    height: undefined, // Maintain aspect ratio
    aspectRatio: 1,
    marginRight: "3%",
  },
  textContainer: {
    flexDirection: "column",
    width: "80%",
    height: "100%",
  },
  heading: {
    fontFamily: "Instrument Sans",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 27,
    color: "black",
  },
  subheading: {
    fontFamily: "Instrument Sans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 10,
    lineHeight: 16,
    color: "black",
    opacity: 0.3,
  },
  providersSection: {
    flex: 1, // Ensures the section takes up available vertical space
    width: "100%",
    marginTop: "10%",
    alignItems: "center",
  },
  providersHeader: {
    width: "100%", // Use a percentage for width
    fontFamily: "Instrument Sans",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 13, // 4.5% of the screen width
    lineHeight: 24, // Approx. 1.3x font size
    textAlign: "left",
    color: "black",
    marginBottom: "5%", // Space between the header and slides
  },
  slidesContainer: {
    width: "100%", // Full width of the container
    alignItems: "center",
    paddingBottom: "5%", // Add spacing at the bottom for better scrolling experience
  },
  slide: {
    width: 353, // Approx. 90% of the screen width
    height: 240, // Fixed height for the slide
    backgroundColor: "#e0e0e0", // Placeholder background
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15, // Space between each slide
  },
});
