import React from "react";
import { ScrollView, View, Image, StyleSheet, Text } from "react-native";
import { ThemedView } from "@/components/ThemedView"; // Import your custom ThemedView component

const Community = () => {
  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>Community Posts</Text>

        <ThemedView style={styles.postContainer}>
          <Image
            style={styles.postimage}
            source={require("@/assets/images/community_post_1.png")}
          />
        </ThemedView>

        <ThemedView style={styles.postContainer}>
          <Image
            style={styles.postimage}
            source={require("@/assets/images/community_post_2.png")}
          />
        </ThemedView>

        <ThemedView style={styles.postContainer}>
          <Image
            style={styles.postimage}
            source={require("@/assets/images/community_post_3.png")}
          />
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  postContainer: {
    // Applying theme-aware background color (or other properties) using ThemedView
    elevation: 3, // Adds a shadow effect (only visible on Android)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4, // Shadow settings for iOS
  },
  postimage: {
    width: "100%", // Image should take up the full width of the container
    resizeMode: "contain", // Scale image to cover the container while maintaining aspect ratio
  },
});

export default Community;
