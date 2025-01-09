import { ThemedItem } from "@/components/ThemedItem";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet } from "react-native";

interface EmptyCardProps {
  message: string;
}

const EmptyCard: React.FC<EmptyCardProps> = ({ message }) => (
  <ThemedItem style={styles.emptyCard}>
    <ThemedText type="sectionHeader" style={styles.emptyMessage}>
      {message}
    </ThemedText>
  </ThemedItem>
);

export default EmptyCard;

const styles = StyleSheet.create({
  emptyCard: {
    width: "100%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
  },
  emptyMessage: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
  },
});
