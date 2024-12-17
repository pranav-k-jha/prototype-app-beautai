import CircularButton from "@/components/buttons/CircularButton";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ViewStyle,
} from "react-native";

interface SavedProviderCardProps {
  id: string;
  onBookmarkPress: () => void;
  companyLogo: any;
  companyTitle: string;
  backgroundImage: any;
  width?: number | string;
  height?: number | string;
}

const SavedProviderCard: React.FC<SavedProviderCardProps> = ({
  id,
  onBookmarkPress,
  companyLogo,
  companyTitle,
  backgroundImage,
  width = "352",
  height = "192",
}) => {
  return (
    <View
      style={[
        styles.card,
        {
          width,
          height,
        } as ViewStyle,
      ]}
    >
      {/* Background Image */}
      <ImageBackground
        source={backgroundImage}
        style={styles.imageBackground}
        imageStyle={styles.backgroundImage}
      >
        {/* Bookmark Button */}
        <View style={styles.bookmarkButton}>
          <CircularButton
            size={20}
            iconType={"bookmark"}
            onPress={onBookmarkPress}
          />
        </View>

        {/* Company Info */}
        <View style={styles.companyInfo}>
          <Image source={companyLogo} style={styles.companyLogo} />
          <Text style={styles.companyTitle}>{companyTitle}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  imageBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  backgroundImage: {
    resizeMode: "cover",
  },
  bookmarkButton: {
    position: "absolute",
    top: 10,
    right: 10,
    borderRadius: 20,
    padding: 5,
  },
  companyInfo: {
    position: "absolute",
    bottom: 10,
    left: 10,
    alignItems: "center",
  },
  companyLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 5,
  },
  companyTitle: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default SavedProviderCard;
