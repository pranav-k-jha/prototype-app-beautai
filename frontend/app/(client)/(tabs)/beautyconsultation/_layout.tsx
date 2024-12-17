import { ThemedView } from "@/components/ThemedView";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Link, Stack, router } from "expo-router";
import { Pressable } from "react-native";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="beautyconsultationform"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="beautyconsultationrecommendations"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="providers/[id]"
        options={{
          headerTitle: "PROVIDER DETAILS",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 16, // Adjust the size of the title
            color: "black", // Change the color if needed
          },

          // Dynamically styled header using ThemedView
          headerStyle: {
            backgroundColor: "transparent", // Ensure it's transparent to layer ThemedView
          },
          headerBackground: () => (
            <ThemedView
              style={{
                flex: 1,
              }}
            />
          ),

          headerRight: () => (
            <BlurView
              intensity={10}
              tint="light"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                borderRadius: 100,
                padding: 8,
              }}
            >
              <MaterialCommunityIcons
                name="dots-vertical"
                size={24}
                color="black"
                onPress={() => alert("Settings")}
              />
            </BlurView>
          ),
          headerLeft: () => (
            <Pressable
              onPress={() =>
                router.replace(
                  "/beautyconsultation/beautyconsultationrecommendations"
                )
              }
            >
              <BlurView
                intensity={10}
                tint="light"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.4)",
                  borderRadius: 100,
                  padding: 8,
                }}
              >
                <Ionicons name="arrow-back-outline" size={24} color="black" />
              </BlurView>
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
