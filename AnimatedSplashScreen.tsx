import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import * as SplashScreen from "expo-splash-screen";

interface AnimatedSplashScreenProps {
  onAnimationFinish: () => void;
}

export default function AnimatedSplashScreen({
  onAnimationFinish,
}: AnimatedSplashScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    async function prepare() {
      try {
        // Esconde a splash nativa assim que este componente montar
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      }

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start(() => onAnimationFinish());
    }

    prepare();
  }, [fadeAnim, scaleAnim, onAnimationFinish]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("./assets/splash-icon4.png")}
        style={[
          styles.image,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
