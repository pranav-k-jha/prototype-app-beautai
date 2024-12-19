import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useMutation, gql } from "@apollo/client";
import * as SecureStore from "expo-secure-store";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(loginUserInput: { email: $email, password: $password }) {
      access_token
      user {
        user_id
        name
        email
      }
    }
  }
`;

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async () => {
    try {
      const { data } = await login({ variables: { email, password } });
      if (data) {
        await SecureStore.setItemAsync("access_token", data.login.access_token);
        alert("Login Successful");
        // Navigate to the next screen or perform another action
      }
    } catch (err) {
      console.error(err);
      alert("Login Failed");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
      {loading && <ActivityIndicator />}
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});

export default LoginScreen;

// import { StyleSheet, Text, TextInput, View } from "react-native";
// import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { Image } from "react-native-reanimated/lib/typescript/Animated";

// const login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [onLogin, onRegister] = useAuth();

//   const login = async () => {
//     const result = await onLogin!(email, password);
//     if (result && result.error) {
//       alert(result.msg);
//     }
//   };

//   //We automatically call the login after a successful registration
//   const register = async () => {
//     const result = onRegister!(email, password);
//     if (result && result.error) {
//       alert(result.msg);
//     } else {
//       login();
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image
//         source={{ uri: "https://galaxies.dev/img/logos/logo--blue.png" }}
//         style={styles.image}
//       />
//       <View style={styles.form}>
//         <TextInput style={styles.input} placeholder="Email" onChangeText={(text: string)}/>
//       </View>
//     </View>
//   );
// };

// export default login;

// const styles = StyleSheet.create({
//   container: {},
//   image: {},
//   form: {},
//   input: {},
// });

// export const Layout = () => {
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
