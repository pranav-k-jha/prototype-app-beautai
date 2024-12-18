import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import RoundedButton from "@/components/buttons/RoundedButton";
import ToggleButton from "@/components/buttons/ToggleButton";
import AntDesign from "@expo/vector-icons/AntDesign";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={require("@/assets/images/background-auth.png")} // Replace with your background image path
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Backdrop Filter Container */}
        {/* Backdrop Filter Container */}
        <BlurView intensity={100} style={styles.backdrop}>
          {/* 1. Title Section */}
          <Text style={styles.title}>Log into your account</Text>

          {/* 2. Email and Password Section */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            {/* "Forgot?" Link */}
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.forgotText}>FORGOT?</Text>
            </TouchableOpacity>
          </View>

          {/* 3. Remember Me Section */}
          <View style={styles.rememberMeContainer}>
            <ToggleButton
              onToggle={(state) => {
                setRememberMe(state);
                console.log(rememberMe);
              }}
              width="60%"
              height={30}
              activeColor="#FFD7E7"
              passiveColor="#ccc"
            />
            <Text style={styles.rememberMeText}>Remember Me</Text>
          </View>

          {/* 4. Buttons Section */}
          <View style={styles.buttonsContainer}>
            <RoundedButton
              text="LOG IN"
              onPress={() => router.replace("/(client)/(tabs)")}
              backgroundColor="black"
              textColor="white"
              width="85%"
              height={50}
            />
            <RoundedButton
              text="LOG IN WITH GOOGLE"
              onPress={() => router.replace("/(business)/(tabs)")}
              backgroundColor="white"
              icon={<AntDesign name="google" size={24} color="black" />}
              textColor="black"
              width="85%"
              height={50}
            />
          </View>

          {/* 5. Sign Up Section */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>
              Don't have an account?{" "}
              <Text
                style={styles.signUpLink}
                onPress={() => router.replace("/(auth)/sign-up")}
              >
                SIGN UP
              </Text>
            </Text>
          </View>
        </BlurView>
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
  backdrop: {
    width: "95%",
    height: "95%",
    top: "2.5%",
    left: "2.5%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    padding: "5%",
    backgroundColor: "rgba(255, 255, 255, 0.22)",
    overflow: "hidden",
  },
  title: {
    fontFamily: "Instrument Sans",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 32,
    lineHeight: 39,
    letterSpacing: -0.02,
    textTransform: "uppercase",
    color: "#FFFFFF",
    alignSelf: "flex-start", // Align the title to the left
    marginBottom: "5%", // Add spacing below the title
  },
  inputContainer: {
    width: "100%",
    marginBottom: "5%",
  },
  input: {
    height: "auto",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: "2.5%",
    fontSize: 16,
    opacity: 0.7,
  },
  forgotText: {
    color: "#FFD7E7",
    textAlign: "right",
    fontSize: 14,
  },
  rememberMeContainer: {
    flexDirection: "row", // Keep items in a row
    alignItems: "center", // Align items vertically
    justifyContent: "flex-start", // Align items to the left
    width: "100%", // Make sure it spans the full width
    marginBottom: "5%",
  },
  rememberMeText: {
    fontSize: 14,
    marginLeft: 10, // Add space between the toggle and the text
    textTransform: "uppercase",
    color: "white",
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center", // Center buttons horizontally
    marginBottom: "5%",
  },
  signUpContainer: {
    marginTop: "5%",
  },
  signUpText: {
    fontSize: 16,
    textAlign: "center",
    textTransform: "uppercase", // Capitalize all text
  },
  signUpLink: {
    fontSize: 16,
    textAlign: "center",
    textTransform: "uppercase", // Capitalize all text
    color: "#FFD7E7",
  },
});

export default SignIn;
