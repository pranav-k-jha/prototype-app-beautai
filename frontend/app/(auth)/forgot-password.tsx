import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../(api)/graphql/users/users.hooks"; // Ensure this hook integrates Apollo Client

const ForgotPassword = () => {
  const [identifier, setIdentifier] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState<"email" | "reset">("email");
  const [error, setError] = useState("");

  const router = useRouter();
  const { resetPassword } = useAuth();

  const handleIdentifierSubmit = async () => {
    if (!identifier) {
      setError("Please enter an email or username");
      return;
    }

    // Move to reset password step
    // Note: Actual user validation will happen during password reset
    setStep("reset");
    setError("");
  };

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      const success = await resetPassword(identifier, newPassword);
      if (success) {
        Alert.alert("Success", "Your password has been reset successfully", [
          { text: "OK", onPress: () => router.replace("/(auth)/sign-in") },
        ]);
      } else {
        setError("Failed to reset password. Please try again.");
        Alert.alert("Error", "Unable to reset password. Please try again.");
      }
    } catch (err: any) {
      setError(
        err.message || "An error occurred while resetting your password."
      );
      Alert.alert("Error", "Unable to reset password. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {step === "email" ? "Forgot Password" : "Reset Password"}
      </Text>

      {step === "email" && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter email or username"
            value={identifier}
            onChangeText={setIdentifier}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleIdentifierSubmit}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </>
      )}

      {step === "reset" && (
        <>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </>
      )}

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
  backToSignIn: {
    color: "#007bff",
    textAlign: "center",
    marginTop: 15,
  },
});

export default ForgotPassword;
