import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Button";
import ProgressDots from "@/components/ProgressDots";
import { onboardingSlides } from "@/constants/mockData";
import { useTheme } from "@/components/ThemeProvider";
import genasLogo from "../../assets/images/genas logo-1.png";

const { width } = Dimensions.get("window");

export default function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { colors } = useTheme();

  const handleContinue = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      router.replace("/onboarding/source");
    }
  };

  const currentSlideData = onboardingSlides[currentSlide];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View
        style={[
          styles.slideContainer,
          { backgroundColor: currentSlideData.color },
        ]}
      >
        <Image source={genasLogo} style={styles.logo} resizeMode="contain" />
        <Image
          source={currentSlideData.image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={[styles.title, { color: colors.text }]}>
          {currentSlideData.title}
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {currentSlideData.subtitle}
        </Text>
        <ProgressDots total={onboardingSlides.length} current={currentSlide} />
        <Button
          title="Continue"
          onPress={handleContinue}
          icon
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slideContainer: {
    height: "60%",
    width: width,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: "80%",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    justifyContent: "space-between",
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  button: {
    marginTop: 20,
  },
  logo: {
    width: 120,
    height: 60,
    marginTop: 32,
    marginBottom: 16,
    alignSelf: "center",
  },
});
