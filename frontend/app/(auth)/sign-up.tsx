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
import { router } from "expo-router";
import RoundedButton from "@/components/buttons/RoundedButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useMutation } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { SIGN_UP_MUTATION } from "../mutations/mutations";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [signUp] = useMutation(SIGN_UP_MUTATION);

  const handleToggle = () => {
    setName("");
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
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const { data } = await signUp({
        variables: {
          signupUserInput: {
            name,
            email,
            password,
          },
        },
      });

      if (data?.signUp?.token) {
        const { token } = data.signUp;

        // Store the token securely
        if (Platform.OS === "web") {
          await AsyncStorage.setItem("access_token", token);
        } else {
          await SecureStore.setItemAsync("access_token", token);
        }
        console.log("Token used for auth:", token);
        alert("Sign-up and login successful!");
        router.replace("/(client)/(tabs)");
        handleToggle();
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      alert("Error during sign-up.");
    }
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
                onChangeText={setName}
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
                onPress={() => router.replace("/(client)/(tabs)")}
                backgroundColor="white"
                icon={<AntDesign name="google" size={24} color="black" />}
                textColor="black"
                width="90%"
                height={50}
              />
            </View>

            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>
                Already have an account?{" "}
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
            <Text style={styles.modalTitle}>Terms and Policies</Text>
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
    width: "95%",
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
    fontSize: 32,
    fontWeight: "500",
    color: "white",
    marginBottom: "5%",
    alignSelf: "flex-start",
  },
  inputContainer: {
    width: "100%",
    marginBottom: "5%",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: "2.5%",
    fontSize: 16,
  },
  termsContainer: {
    marginBottom: "5%",
  },
  termsText: {
    color: "#FFFFFF",
    fontSize: 13,
    textAlign: "center",
  },
  termsLink: {
    color: "#FFD7E7",
    textDecorationLine: "underline",
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: "5%",
  },
  signInContainer: {
    marginTop: "5%",
    alignItems: "center",
  },
  signInText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  signInLink: {
    color: "#FFD7E7",
    fontSize: 16,
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
  },
  modalText: {
    fontSize: 16,
    lineHeight: 24,
  },
  modalButtonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default SignUp;
