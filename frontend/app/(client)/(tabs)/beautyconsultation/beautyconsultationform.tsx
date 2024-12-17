import { View, Text, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import Form, { Question } from "@/components/form/Form";

export default function BeautyConsultationFormScreen() {
  const router = useRouter();

  const questions: Question[] = [
    {
      id: "q1",
      type: "checkbox",
      text: "What is your primary concern?",
      answers: [
        { id: "a1", label: "Acne and Blemishes" },
        { id: "a2", label: "Wrinkles and Fine Lines" },
        { id: "a3", label: "Hyperpigmentation x Dark Spots" },
        { id: "a4", label: "Dryness and Dehydration" },
        { id: "a5", label: "Dark Circles and Puffiness" },
        { id: "a6", label: "Other:", isOther: true },
      ],
      allowMultiple: false,
    },
    {
      id: "q2",
      type: "checkbox",
      text: "How much would you like to spend?",
      answers: [
        { id: "a7", label: "Under $50" },
        { id: "a8", label: "$50-$100" },
        { id: "a9", label: "$101-$300" },
        { id: "a10", label: "Over $300" },
        { id: "a11", label: "Not sure" },
      ],
      allowMultiple: false,
    },
    {
      id: "q3",
      type: "checkbox",
      text: "How comfortable are you with invasive treatments?",
      answers: [
        { id: "a12", label: "Comfortable/Very Comfortable" },
        { id: "a13", label: "Somewhat comfortable" },
        { id: "a14", label: "Not comfortable" },
      ],
      allowMultiple: false,
    },
  ];

  return (
    <ThemedView style={styles.container}>
      {/* Company Signature */}
      <View style={styles.signature}>
        <Image
          source={require("@/assets/images/BeautAI.png")} // Replace with the path to your logo
          style={styles.logo}
          resizeMode="contain" // Ensure the image is fully visible
        />
        <View style={styles.textContainer}>
          <Text style={styles.heading}>BEAUTY CONSULTATION</Text>
          <Text style={styles.subheading}>
            GET PERSONALIZED RECOMMENDATIONS
          </Text>
        </View>
      </View>

      {/* Form */}

      <View style={styles.formContainer}>
        <Form
          questions={questions}
          onComplete={function (): void {
            router.push(
              "/beautyconsultation/beautyconsultationrecommendations"
            );
          }}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: "5%",
  },
  signature: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "5%",
    marginTop: "15%",
    width: "100%",
  },
  logo: {
    width: "15%", // 15% of the parent container's width
    height: undefined, // Maintain aspect ratio
    aspectRatio: 1, // Square dimensions
    marginRight: "3%",
  },
  textContainer: {
    flexDirection: "column", // Stack heading and subheading vertically
    width: "80%",
    height: "100%",
  },
  heading: {
    fontFamily: "Instrument Sans",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 27,
    color: "black",
  },
  subheading: {
    fontFamily: "Instrument Sans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 10,
    lineHeight: 16,
    color: "black",
    opacity: 0.3,
  },
  formContainer: {
    width: "100%", // Form spans the full width of the container
    height: "70%",
    alignItems: "center", // Center the form within the container
    marginTop: "5%", // Add spacing above the form
  },
});
