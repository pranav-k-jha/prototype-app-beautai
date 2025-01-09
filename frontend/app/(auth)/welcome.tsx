import React from "react";
import { Text, Image, StyleSheet, ImageBackground, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import RoundedButton from "@/components/buttons/RoundedButton";

const Welcome = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={require("@/assets/images/background-auth.png")} // Replace with your background image path
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Overlay Blur */}
        <View style={styles.overlay}>
          {/* Backdrop Filter Container */}
          <BlurView intensity={80} style={styles.backdrop}>
            {/* Company Logo */}
            <Image
              source={require("@/assets/images/BeautAI.png")} // Replace with your logo path
              style={styles.logo}
            />

            {/* Welcome Message */}
            <Text style={styles.welcomeText}>WELCOME TO BEAUT-AI</Text>

            {/* Buttons */}
            <RoundedButton
              text="GET STARTED"
              backgroundColor="#1e90ff"
              textColor="white"
              width="90%"
              height={50}
              onPress={() => router.replace("/")}
            />

            <RoundedButton
              text="SIGN IN"
              backgroundColor="black"
              textColor="white"
              width="90%"
              height={50}
              onPress={() => router.replace("/(auth)/sign-in")}
            />

            <RoundedButton
              text="SIGN UP"
              backgroundColor="black"
              textColor="white"
              width="90%"
              height={50}
              onPress={() => router.replace("/(auth)/sign-up")}
            />
          </BlurView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adds a dark translucent overlay
  },
  backdrop: {
    flex: 1,
    margin: "5%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Slightly transparent white
    overflow: "hidden",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  logo: {
    width: "40%",
    aspectRatio: 1,
    marginBottom: 20,
    resizeMode: "contain",
  },
  welcomeText: {
    fontSize: 28, // Larger font for emphasis
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff", // White text to contrast the background
    marginBottom: 40,
  },
});

export default Welcome;
