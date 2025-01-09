import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, ViewStyle } from "react-native";

type DimensionValue = number | string;

// Define the props for the ToggleButton component
interface ToggleButtonProps {
  onToggle?: (state: boolean) => void; // Callback function for toggle state
  value?: boolean; // Controlled state for the toggle button
  width?: DimensionValue; // Can be a number or a valid string like "50%"
  height?: DimensionValue;
  activeColor?: string;
  passiveColor?: string;
  style?: ViewStyle; // Allow custom styles to be passed
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  onToggle,
  value,
  width = 50,
  height = 30,
  activeColor = "#FFD7E7",
  passiveColor = "#ccc",
  style,
}) => {
  // Use the value prop for controlled components or local state for uncontrolled components
  const [isActive, setIsActive] = useState(value ?? false);

  const handleToggle = () => {
    const newState = !(value ?? isActive);
    if (onToggle) {
      onToggle(newState); // Call the onToggle callback if provided
    }
    if (value === undefined) {
      setIsActive(newState); // Update local state only if not controlled
    }
  };

  const containerWidth = typeof width === "number" ? width : parseInt(width);
  const containerHeight =
    typeof height === "number" ? height : parseInt(height);

  return (
    <TouchableOpacity
      onPress={handleToggle}
      style={[
        styles.toggleContainer,
        {
          width: containerWidth,
          height: containerHeight,
          backgroundColor: value ?? isActive ? activeColor : passiveColor,
          borderRadius: containerHeight / 2,
        },
        style,
      ]}
    >
      <View
        style={[
          styles.toggleKnob,
          {
            width: containerHeight * 0.8,
            height: containerHeight * 0.8,
            transform: [
              {
                translateX:
                  value ?? isActive ? containerWidth - containerHeight : 0,
              },
            ],
          },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    justifyContent: "center",
    padding: 5,
    position: "relative",
  },
  toggleKnob: {
    backgroundColor: "white",
    borderRadius: 50,
    position: "absolute",
  },
});

export default ToggleButton;
