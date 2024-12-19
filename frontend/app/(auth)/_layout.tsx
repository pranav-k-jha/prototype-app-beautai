import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;

// import { NavigationContainer } from "@react-navigation/native";
// import { useAuth } from "../context/AuthContext";

// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import { Button } from "react-native";

// const Stack = createNativeStackNavigator();
// const Layout = () => {
//   const { authState, onLogout } = useAuth();

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Home"
//           component={home}
//           options={{
//             headerRight: () => <Button onPress={onLogout} title="Sign Out" />,
//           }}
//         />
//         <Stack.Screen name="Login" component={login} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default Layout;
