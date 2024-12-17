import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

type UserDateSignatureProps = {
  message: string;
  userName: string;
  Icon1: JSX.Element;
  Icon2: JSX.Element;
  onButton1Press: () => void;
  onButton2Press: () => void;
};

const UserDateSignature: React.FC<UserDateSignatureProps> = ({
  message,
  userName,
  Icon1,
  Icon2,
  onButton1Press,
  onButton2Press,
}) => {
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <View style={styles.container}>
      {/* Company Logo Section */}
      <View style={styles.companySection}>
        <Image
          source={require("@/assets/images/BeautAI.png")} // Replace with your actual company logo path
          style={styles.companyLogo}
        />
      </View>

      {/* Message Section */}
      <View style={styles.messageSection}>
        <View style={styles.inlineRow}>
          <Text style={styles.message}>{message}</Text>
          <Text style={styles.userName}>{userName}!</Text>
        </View>
        <Text style={styles.date}>{currentDate}</Text>
      </View>

      {/* Button Section */}
      <View style={styles.buttonSection}>
        <TouchableOpacity style={styles.button} onPress={onButton1Press}>
          {Icon1}
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onButton2Press}>
          {Icon2}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserDateSignature;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f8f8f8", // Background color for the component
    borderRadius: 8,
  },
  companySection: {
    marginRight: 8, // Spacing between company logo and message section
  },
  companyLogo: {
    width: 30, // Adjust the size of the logo
    height: 30,
  },
  messageSection: {
    flex: 1,
    justifyContent: "center",
  },
  inlineRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontFamily: "Instrument Sans",
    fontWeight: "500",
    fontSize: 12,
    color: "#040404",
    marginRight: 8, // Spacing between username and message
    textTransform: "uppercase",
  },
  message: {
    fontFamily: "Instrument Sans",
    fontWeight: "400",
    fontSize: 12,
    color: "#040404",
    opacity: 0.8,
  },
  date: {
    fontFamily: "Instrument Sans",
    fontWeight: "400",
    fontSize: 12,
    color: "#040404",
    opacity: 0.5,
    marginTop: 4,
  },
  buttonSection: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    marginLeft: 8,
    padding: 8,
    borderRadius: 50,
    backgroundColor: "#eaeaea", // Background for buttons
  },
});
