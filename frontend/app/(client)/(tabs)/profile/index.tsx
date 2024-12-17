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

const Profile = () => {
  // Static profile data
  const profile = {
    name: "NAOMI HAYNES",
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

  return (
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
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: PADDING_LAYOUT,
    marginBottom: TAB_BAR_HEIGHT,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 40,
    height: 50,
    marginTop: 40,
  },
  profileContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
  },
  profileImage: {
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: "#CCC",
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  profileName: {
    fontFamily: "InstrumentSansSemiBold",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 27,
    lineHeight: 33,
    letterSpacing: -0.02,
    textTransform: "uppercase",
  },
  profileEmail: {
    fontFamily: "InstrumentSans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15,
    letterSpacing: -0.02,
    opacity: 0.4,
  },
});

export default Profile;
