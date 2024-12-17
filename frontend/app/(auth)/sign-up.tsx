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
import ToggleButton from "@/components/buttons/ToggleButton";
import AntDesign from "@expo/vector-icons/AntDesign";

const SignUp = () => {
  const [userType, setUserType] = useState("client");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState("");

  // Modal visibility state
  const [modalVisible, setModalVisible] = useState(false);

  const handleToggle = (state: boolean) => {
    setUserType(state ? "business" : "client");
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    if (state) {
      setBusinessName("");
      setAddress("");
    }
  };

  // Function to open the modal
  const openTermsModal = () => {
    setModalVisible(true);
  };

  // Function to close the modal
  const closeTermsModal = () => {
    setModalVisible(false);
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

            <View style={styles.userTypeContainer}>
              <ToggleButton
                onToggle={handleToggle}
                width="60%"
                height={30}
                activeColor="#FFD7E7"
                passiveColor="#ccc"
              />
              <Text style={styles.userTypeText}>
                {userType === "client" ? "Client Account" : "Business Account"}
              </Text>
            </View>

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

              {userType === "business" && (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Business Name"
                    value={businessName}
                    onChangeText={setBusinessName}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Business Address"
                    value={address}
                    onChangeText={setAddress}
                  />
                </>
              )}
            </View>

            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                By continuing, I am accepting all the{" "}
                <Text
                  style={styles.termsLink}
                  onPress={openTermsModal} // Open modal when clicked
                >
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
                onPress={() => router.replace("/(client)/(tabs)")}
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

      {/* Modal for Terms and Policies */}

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
                {/* Add your terms and policy text here */}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus imperdiet, nulla et dictum interdum, nisi lorem
                egestas odio, vitae scelerisque enim ligula venenatis dolor.
                Maecenas nisl est, ultrices nec congue eget, auctor vitae massa.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus imperdiet, nulla et dictum interdum, nisi lorem
                egestas odio, vitae scelerisque enim ligula venenatis dolor.
                Maecenas nisl est, ultrices nec congue eget, auctor vitae massa.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus imperdiet, nulla et dictum interdum, nisi lorem
                egestas odio, vitae scelerisque enim ligula venenatis dolor.
                Maecenas nisl est, ultrices nec congue eget, auctor vitae massa.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus imperdiet, nulla et dictum interdum, nisi lorem
                egestas odio, vitae scelerisque enim ligula venenatis dolor.
                Maecenas nisl est, ultrices nec congue eget, auctor vitae massa.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus imperdiet, nulla et dictum interdum, nisi lorem
                egestas odio, vitae scelerisque enim ligula venenatis dolor.
                Maecenas nisl est, ultrices nec congue eget, auctor vitae massa.
                {/* More text... */}
              </Text>
            </ScrollView>

            {/* Centered Button */}
            <View style={styles.modalButtonContainer}>
              <RoundedButton text={"Close"} onPress={closeTermsModal} />
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
    fontFamily: "Instrument Sans",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 32,
    lineHeight: 39,
    textTransform: "uppercase",
    color: "white",
    marginBottom: "5%",
    alignSelf: "flex-start",
    paddingTop: "13%",
  },
  userTypeContainer: {
    marginBottom: "5%",
    alignSelf: "flex-start",
  },
  userTypeText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "500",
    marginTop: 10,
    textAlign: "left",
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

  // Modal styles
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
    color: "#333",
    textAlign: "justify", // Justify the text
  },
  modalButtonContainer: {
    marginTop: 20,
    alignItems: "center", // Center the button horizontally
  },
});

export default SignUp;
