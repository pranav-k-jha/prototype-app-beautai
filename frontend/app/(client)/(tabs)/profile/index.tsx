import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import KeyValueTable from "@/components/Table";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { PADDING_LAYOUT, TAB_BAR_HEIGHT } from "@/constants/Layout";
import { ThemedText } from "@/components/ThemedText";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  // Static profile data
  const profile = {
    name: "Naomi Haynes",
    email: "nayomi.hanes@outlook.com",
    profileImage: require("@/assets/images/image-profile-2.png"),
    beautyGoals: "Clear Acne",
    skinType: "Dry",
    treatmentPreferences: "Chemical Peels",
    productPreferences: "Fragrant",
  };

  // Transform profile data into a label-value array for KeyValueTable
  const preferences = [
    { label: "Beauty Goals", value: profile.beautyGoals },
    { label: "Skin Type", value: profile.skinType },
    { label: "Treatment Preferences", value: profile.treatmentPreferences },
    { label: "Product Preferences", value: profile.productPreferences },
  ];

  const router = useRouter();
  const highlightedColor = useThemeColor(
    { light: undefined, dark: undefined },
    "highlighted"
  );

  const handleSignOut = async () => {
    console.log("Signing out...");

    // Remove from AsyncStorage
    await AsyncStorage.removeItem("authToken");

    // Remove from SecureStore
    await SecureStore.deleteItemAsync("authToken");

    // Verify removal (optional)
    const asyncToken = await AsyncStorage.getItem("authToken");
    const secureStoreToken = await SecureStore.getItemAsync("authToken");
    console.log("AsyncStorage token after sign-out:", asyncToken); // Should be null
    console.log("SecureStore token after sign-out:", secureStoreToken); // Should be null

    router.replace("/(auth)/welcome");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("@/assets/images/BeautAI.png")}
            />
          </View>

          <View style={styles.profileContainer}>
            <Image style={styles.profileImage} source={profile.profileImage} />
            <View style={styles.nameContainer}>
              <ThemedText style={styles.profileName}>{profile.name}</ThemedText>
              <TouchableOpacity
                onPress={() => router.push("/profile/EditPreferences")}
              >
                <Ionicons name="pencil" size={24} color={highlightedColor} />
              </TouchableOpacity>
            </View>
            <ThemedText style={styles.profileEmail}>{profile.email}</ThemedText>
          </View>

          <View>
            <KeyValueTable data={preferences} />
          </View>

          <View style={styles.signOutContainer}>
            <TouchableOpacity
              style={styles.signOutButton}
              onPress={handleSignOut}
            >
              <ThemedText style={styles.signOutText}>Sign Out</ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F8F8", // Light background for better contrast
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: PADDING_LAYOUT,
    paddingBottom: TAB_BAR_HEIGHT + 20, // Added padding for spacing
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20, // Added spacing for better visual separation
  },
  logo: {
    width: 50,
    height: 60,
    marginTop: 30, // Reduced top margin for balanced spacing
  },
  profileContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20, // Slightly reduced margin for balance
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#E0E0E0", // Neutral placeholder background
    borderWidth: 2,
    borderColor: "#CCC", // Subtle border for definition
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  profileName: {
    fontFamily: "InstrumentSansSemiBold",
    fontSize: 24,
    lineHeight: 32,
    textTransform: "uppercase",
    paddingRight: 8, // Spacing between name and pencil icon
    color: "#333", // Darker text for better readability
  },
  profileEmail: {
    fontFamily: "InstrumentSans",
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.6, // Softer text for email
    marginTop: 5,
    color: "#555", // Subtle color for email
  },
  signOutContainer: {
    marginTop: 15, // Added spacing for separation
    alignItems: "center",
  },
  signOutButton: {
    backgroundColor: "#000",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // Shadow for Android
  },
  signOutText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
    textTransform: "uppercase",
  },
});

export default Profile;
