import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { PADDING_LAYOUT, SECTION_DISTANCE } from "@/constants/Layout";
import CircularButton from "@/components/buttons/CircularButton";
import { router } from "expo-router";
import { ThemedItem } from "@/components/ThemedItem";

const index: React.FC = () => {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "Appointment Reminder",
      description: "Your appointment is tomorrow at 10:00 AM.",
    },
    {
      id: "2",
      title: "New Product Launch",
      description: "Check out our new skincare line now available!",
    },
    {
      id: "3",
      title: "Exclusive Discount",
      description: "Enjoy 20% off your next purchase. Offer ends soon!",
    },
  ]);

  const deleteNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const handlePress = (notification: {
    id: string;
    title: string;
    description: string;
  }) => {
    // Navigate to a detailed notification page
    router.replace("/(client)/(tabs)");
  };

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={["header", "notifications"]}
        renderItem={({ item }) => {
          switch (item) {
            case "header":
              return (
                <View style={styles.header}>
                  <CircularButton
                    size={40}
                    iconType={"arrow-left"}
                    onPress={() => router.back()}
                  />
                  <View style={styles.titleWrapper}>
                    <ThemedText style={styles.headerTitle}>
                      Notifications
                    </ThemedText>
                  </View>
                </View>
              );

            case "notifications":
              return (
                <FlatList
                  data={notifications}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => handlePress(item)}
                      onLongPress={() =>
                        Alert.alert(
                          "Delete Notification",
                          "Are you sure you want to delete this notification?",
                          [
                            { text: "Cancel", style: "cancel" },
                            {
                              text: "Delete",
                              onPress: () => deleteNotification(item.id),
                            },
                          ]
                        )
                      }
                    >
                      <ThemedItem style={styles.notificationItem}>
                        <ThemedText style={styles.notificationTitle}>
                          {item.title}
                        </ThemedText>
                        <ThemedText style={styles.notificationDescription}>
                          {item.description}
                        </ThemedText>
                      </ThemedItem>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.id}
                />
              );

            default:
              return null;
          }
        }}
        contentContainerStyle={styles.listContent}
        keyExtractor={(item, index) => index.toString()}
      />
    </ThemedView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: PADDING_LAYOUT,
  },
  listContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SECTION_DISTANCE,
    marginBottom: 30,
    width: "100%",
  },
  titleWrapper: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: "InstrumentSansBold",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 28,
    letterSpacing: -0.02 * 16,
    textTransform: "uppercase",
    textAlign: "center",
  },
  notificationItem: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  notificationTitle: {
    fontFamily: "InstrumentSansBold",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  notificationDescription: {
    fontFamily: "InstrumentSansRegular",
    fontSize: 14,
    opacity: 0.4,
  },
});
