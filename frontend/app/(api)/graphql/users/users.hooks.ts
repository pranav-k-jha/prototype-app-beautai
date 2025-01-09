import { useState, useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

import {
  LOGIN_USER,
  RESET_PASSWORD_MUTATION,
  SIGNUP_USER,
} from "./users.mutations";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const [resetPasswordMutation] = useMutation(RESET_PASSWORD_MUTATION);

  const [loginMutation] = useMutation(LOGIN_USER);
  const [signupMutation] = useMutation(SIGNUP_USER);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await getToken(); // Abstracted function
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error(
        "Auth Status Error:",
        error instanceof Error ? error.message : "Unknown error"
      );
    } finally {
      setLoading(false);
    }
  };

  const getToken = async () => {
    return Platform.OS === "web"
      ? AsyncStorage.getItem("access_token")
      : SecureStore.getItemAsync("access_token");
  };

  const login = async (identifier: string, password: string) => {
    console.log("Frontend Login Attempt:", {
      identifier,
      passwordLength: password.length,
    });

    try {
      const { data, errors } = await loginMutation({
        variables: {
          emailOrUsername: identifier,
          password,
        },
        errorPolicy: "all", // Capture both data and errors
      });

      // Log full response for debugging
      console.log("Login Mutation Full Response:", {
        data,
        errors,
      });

      // Check for GraphQL errors
      if (errors && errors.length > 0) {
        console.error("GraphQL Login Errors:", errors);
        throw new Error(errors[0].message || "Login failed");
      }

      // Check for successful login
      const loginResult = data?.login;
      console.log("Login Result:", loginResult);

      if (loginResult) {
        console.log("Login Successful:", {
          userId: loginResult.user?.user_id,
        });

        await storeTokens(loginResult.access_token, loginResult.refresh_token);
        setIsAuthenticated(true);
        return loginResult.user;
      }

      // If no data or login object
      console.error("No login data received");
      throw new Error("Login failed: No user data");
    } catch (error: unknown) {
      // Enhanced error logging
      if (error instanceof Error) {
        console.error("Detailed Login Error:", {
          name: error.name,
          message: error.message,
          stack: error.stack,
          // If it's an Apollo error, log additional details
          ...((error as any).networkError
            ? { networkError: (error as any).networkError }
            : {}),
          ...((error as any).graphQLErrors
            ? { graphQLErrors: (error as any).graphQLErrors }
            : {}),
        });
      } else {
        console.error("An unknown error occurred:", error);
      }

      // Rethrow to be caught by caller
      throw error;
    }
  };
  const signup = async (signupData: any) => {
    try {
      const { data } = await signupMutation({
        variables: { signupUserInput: signupData },
      });

      if (data?.signup) {
        await storeTokens(data.signup.access_token, data.signup.refresh_token);

        // Store user ID in AsyncStorage
        await AsyncStorage.setItem(
          "user_id",
          String(data.signup.user?.user_id || "")
        );

        setIsAuthenticated(true);
        return data.signup.user;
      }
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Remove tokens and user ID
      await SecureStore.deleteItemAsync("access_token");
      await SecureStore.deleteItemAsync("refresh_token");
      await AsyncStorage.removeItem("access_token");
      await AsyncStorage.removeItem("refresh_token");
      await AsyncStorage.removeItem("user_id");

      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const storeTokens = async (accessToken: string, refreshToken: string) => {
    try {
      if (Platform.OS === "web") {
        await AsyncStorage.setItem("access_token", accessToken);
        await AsyncStorage.setItem("refresh_token", refreshToken);
      } else {
        await SecureStore.setItemAsync("access_token", accessToken);
        await SecureStore.setItemAsync("refresh_token", refreshToken);
      }
    } catch (error) {
      console.error("Error storing tokens:", error);
    }
  };

  const resetPassword = async (identifier: string, newPassword: string) => {
    try {
      const { data, errors } = await resetPasswordMutation({
        variables: { identifier, newPassword },
        errorPolicy: "all",
      });

      if (errors && errors.length > 0) {
        console.error("Reset Password Errors:", errors);
        throw new Error(errors[0].message || "Failed to reset password");
      }

      return data?.resetPassword ?? false;
    } catch (error) {
      console.error("Reset Password Error:", error);
      throw error;
    }
  };

  return {
    login,
    signup,
    checkAuthStatus,
    logout,
    isAuthenticated,
    loading,
    resetPassword,
  };
};
export default function useDefaultHook() {
  return {};
}
