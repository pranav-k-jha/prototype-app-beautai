import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../(api)/graphql/users/users.hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import RoundedButton from "@/components/buttons/RoundedButton";
import ToggleButton from "@/components/buttons/ToggleButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

const SignIn = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      setError("");

      // Validate inputs
      if (!identifier || !password) {
        setError("Please enter both email/username and password");
        return;
      }

      // Attempt login
      const user = await login(identifier, password);

      // If login successful, navigate to home or dashboard
      if (user) {
        router.replace("/(client)/(tabs)"); // Adjust this route as needed
      }
    } catch (err) {
      // Handle login errors
      console.error("Login Error:", err);
      setError("Login failed. Please try again.");
    }
  };
  const handleGoogleLogin = () => {
    // Replace with actual Google login implementation
    alert("Google Login Placeholder");
    router.replace("/(business)/(tabs)");
  };

  const handleSignUpNavigation = () => {
    router.replace("/(auth)/sign-up");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={require("@/assets/images/background-auth.png")} // Replace with your background image path
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Backdrop Filter Container */}
        <BlurView intensity={100} style={styles.backdrop}>
          {/* 1. Title Section */}
          <Text style={styles.title}>LOGIN TO YOUR ACCOUNT</Text>

          {/* 2. Email and Password Section */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username or Email"
              value={identifier}
              onChangeText={setIdentifier}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            {/* "Forgot?" Link */}
            <TouchableOpacity
              style={styles.forgotPasswordLink}
              onPress={() => router.push("/(auth)/forgot-password")}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* 3. Remember Me Section */}
          <View style={styles.rememberMeContainer}>
            <ToggleButton
              value={rememberMe} // Bind to rememberMe state
              onToggle={(state) => setRememberMe(state)} // Update rememberMe state
              width={50} // Adjusted to a fixed width for consistency
              height={30} // Fixed height for better alignment
              activeColor="#1e90ff" // Matches the app's theme color
              passiveColor="#d3d3d3" // Light gray for a softer inactive state
              style={styles.toggleButton} // Optional: Add custom styling for the button
            />
            <Text style={styles.rememberMeText}>Remember Me</Text>
          </View>

          {/* 4. Buttons Section */}
          <View style={styles.buttonsContainer}>
            <RoundedButton
              text="LOG IN"
              onPress={handleSignIn}
              backgroundColor="black"
              textColor="white"
              width="85%"
              height={50}
            />
            <RoundedButton
              text="LOG IN WITH GOOGLE"
              onPress={handleGoogleLogin}
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
              DON't HAVE AN ACCOUNT?{" "}
              <Text style={styles.signUpLink} onPress={handleSignUpNavigation}>
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
    backgroundColor: "#1c1c1c", // Darker background for better contrast
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  backdrop: {
    width: "90%",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    padding: 30,
    backgroundColor: "rgba(40, 40, 40, 0.75)",
    opacity: 0.95,
    overflow: "hidden",
    margin: 0,
    alignSelf: "center",
  },

  title: {
    fontFamily: "Instrument Sans",
    fontWeight: "700",
    fontSize: 34,
    lineHeight: 40,
    letterSpacing: -0.5,
    textTransform: "uppercase",
    color: "#fff", // Light text for contrast
    alignSelf: "flex-start",
    marginBottom: 40,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 30,
    paddingHorizontal: 20,
  },

  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#555",
    marginBottom: 15,
    fontSize: 16,
    paddingLeft: 10,
    color: "#000", // Adjusted for dark theme
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Slightly increased opacity
    borderRadius: 8,
  },
  forgotText: {
    color: "#000",
    textAlign: "right",
    fontSize: 14,
    marginTop: 10, // Added margin for better separation
    fontWeight: "600", // Slightly bolder text for visibility
  },
  forgotPasswordLink: {
    alignSelf: "flex-end",
    marginTop: 10,
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    marginBottom: 30, // Increased bottom margin for separation
  },
  rememberMeText: {
    fontSize: 14,
    marginLeft: 10,
    textTransform: "uppercase",
    color: "#000", // Gold color for consistency with the theme
    fontWeight: "500", // Light but visible text
  },

  toggleButton: {
    borderRadius: 15, // Smooth edges for the toggle button
    shadowColor: "#000", // Shadow for depth effect
    shadowOffset: { width: 0, height: 2 }, // Shadow placement
    shadowOpacity: 0.25, // Slight shadow visibility
    shadowRadius: 3.84, // Smooth shadow blur
    elevation: 5, // Shadow effect for Android
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 40, // Increased margin for better spacing
  },
  signUpContainer: {
    marginTop: 20, // Increased top margin for spacing
  },
  signUpText: {
    fontSize: 16,
    textAlign: "center",
    textTransform: "uppercase",
    color: "#fff", // White text for better readability
  },
  signUpLink: {
    fontSize: 16,
    textAlign: "center",
    textTransform: "uppercase",
    color: "#000", // Gold color for visibility
    fontWeight: "600", // Bold to make it stand out
  },
  button: {
    height: 50,
    width: "85%", // Same width for consistency
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25, // Rounded corners for buttons
    marginBottom: 15, // Spacing between buttons
  },
  loginButton: {
    backgroundColor: "#Fd4545", // Gold background for login button
  },
  googleButton: {
    backgroundColor: "#fff", // White background for Google button
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25, // Rounded corners
    borderWidth: 1, // Border to separate the button from background
    borderColor: "#Fd4545", // Matching gold border for consistency
  },
  googleButtonText: {
    fontSize: 16,
    color: "#333", // Dark text for contrast against white background
    marginLeft: 10, // Spacing between icon and text
  },
});

export default SignIn;
