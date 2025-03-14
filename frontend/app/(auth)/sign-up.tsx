import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  ScrollView,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";

import RoundedButton from "@/components/buttons/RoundedButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useMutation } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { SIGNUP_USER } from "../(api)/graphql/users/users.mutations";
import { useRouter } from "expo-router";

const SignUp = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const [signUp] = useMutation(SIGNUP_USER);

  const generateUsername = (name: string) => {
    // Remove spaces and convert to lowercase
    const cleanedName = name.replace(/\s+/g, "").toLowerCase();
    // Add random number to ensure uniqueness
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `${cleanedName}${randomNum}`;
  };

  const handleToggle = () => {
    setName("");
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const openTermsModal = () => {
    setModalVisible(true);
  };

  const closeTermsModal = () => {
    setModalVisible(false);
  };

  const handleSignUp = async () => {
    const generatedUsername = username || generateUsername(name);

    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const { data } = await signUp({
        variables: {
          signupUserInput: {
            name,
            username: generatedUsername,
            email,
            password,
          },
        },
      });

      const token = data?.signup?.access_token;
      if (token) {
        if (Platform.OS === "web") {
          await AsyncStorage.setItem("access_token", token);
          console.log("Token stored in AsyncStorage for web");
        } else {
          await SecureStore.setItemAsync("access_token", token);
          console.log("Token stored in SecureStore for mobile");
        }

        router.replace("/(client)/(tabs)");
        console.log("Navigation successful.");
      } else {
        console.error("Token not found in response.");
        alert("Token not returned from server.");
      }
    } catch (error: any) {
      console.error("Sign-up error:", error.message || error);
      alert(error.message || "Error during sign-up.");
    }

    handleToggle();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/background-auth.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <BlurView intensity={100} style={styles.backdrop}>
            <Text style={styles.title}>Create your account</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  // Automatically generate username if not manually set
                  if (!username) {
                    setUsername(generateUsername(text));
                  }
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
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
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>

            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                By continuing, I am accepting all the{" "}
                <Text style={styles.termsLink} onPress={openTermsModal}>
                  terms and policies
                </Text>
              </Text>
            </View>

            <View style={styles.buttonsContainer}>
              <RoundedButton
                text="SIGN UP"
                backgroundColor="black"
                textColor="white"
                width="90%"
                height={50}
                onPress={handleSignUp}
              />
              <RoundedButton
                text="SIGN UP WITH GOOGLE"
                onPress={() => alert("OAuth feature is not available yet!")}
                backgroundColor="white"
                icon={<AntDesign name="google" size={24} color="black" />}
                textColor="black"
                width="90%"
                height={50}
              />
            </View>

            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>
                ALREADY HAVE AN ACCOUNT?{" "}
                <Text
                  style={styles.signInLink}
                  onPress={() => router.replace("/(auth)/sign-in")}
                >
                  SIGN IN
                </Text>
              </Text>
            </View>
          </BlurView>
        </ScrollView>
      </ImageBackground>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeTermsModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>TERMS AND POLICIES</Text>
            <ScrollView>
              <Text style={styles.modalText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                {/*BEAUT terms and consitions*/}
              </Text>
            </ScrollView>
            <View style={styles.modalButtonContainer}>
              <RoundedButton text="Close" onPress={closeTermsModal} />
            </View>
          </View>
        </View>
      </Modal>
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
  scrollContent: {
    paddingBottom: 20,
  },
  backdrop: {
    width: "90%",
    top: "5%",
    left: "5%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    padding: "6%",
    backgroundColor: "rgba(255, 255, 255, 0.22)",
    overflow: "hidden",
  },
  title: {
    fontFamily: "Instrument Sans",
    fontWeight: "500",
    fontSize: 32,
    lineHeight: 39,
    letterSpacing: -0.02,
    textTransform: "uppercase",
    color: "#FFFFFF",
    marginBottom: "6%",
    alignSelf: "flex-start",
  },
  inputContainer: {
    width: "100%",
    marginBottom: "6%",
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#555", // Subtle border color for better contrast
    marginBottom: 15,
    fontSize: 16,
    paddingLeft: 10,
    color: "#000",
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Keep semi-transparent white background
    borderRadius: 8,
  },
  termsContainer: {
    marginBottom: "6%",
  },
  termsText: {
    color: "#000",
    fontSize: 14,
    textAlign: "center",
  },
  termsLink: {
    color: "#000",
    textDecorationLine: "underline",
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: "6%",
  },
  signInContainer: {
    marginTop: "6%",
    alignItems: "center",
  },
  signInText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  signInLink: {
    fontSize: 16,
    textAlign: "center",
    textTransform: "uppercase",
    color: "#000", // Gold color for visibility
    fontWeight: "600", // Bold to make it stand out
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333333",
  },
  modalText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333333",
  },
  modalButtonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default SignUp;
