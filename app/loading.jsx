import React, { useEffect } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { hp, wp } from "../constants/fontSize";

const LoadingScreen = () => {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);
  const birdTranslateX = useSharedValue(0);
  const birdRotate = useSharedValue(0);
  const progressBarWidth = useSharedValue(0);
  const progressBarOpacity = useSharedValue(1);
  const buttonOpacity = useSharedValue(0);

  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    birdTranslateX.value = 0;
    birdRotate.value = 0;
    progressBarWidth.value = 0;

    setTimeout(() => {
      ring1padding.value = withSpring(ring1padding.value + hp(3));
    }, 1000);
    setTimeout(() => {
      ring2padding.value = withSpring(ring2padding.value + hp(3.5));
    }, 1500);
    setTimeout(() => {
      birdTranslateX.value = withTiming(wp(80), {
        duration: 4000,
        easing: Easing.linear,
      });
      birdRotate.value = withTiming(360, {
        duration: 4000,
        easing: Easing.linear,
      });
      progressBarWidth.value = withTiming(wp(90), {
        duration: 4000,
        easing: Easing.linear,
        onFinish: () => {
          console.log("Progress bar animation finished"); // Debug log
          progressBarOpacity.value = withTiming(0, { duration: 500 }, () => {
            console.log("Progress bar opacity set to 0"); // Debug log
            buttonOpacity.value = withTiming(1, { duration: 500 });
            console.log("Button opacity set to 1"); // Debug log
          });
        },
      });
    }, 500);
  }, []);

  const ring1Style = useAnimatedStyle(() => {
    return {
      padding: ring1padding.value,
    };
  });

  const ring2Style = useAnimatedStyle(() => {
    return {
      padding: ring2padding.value,
    };
  });

  const birdStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: birdTranslateX.value },
        { rotate: `${birdRotate.value}deg` },
      ],
    };
  });

  const progressBarStyle = useAnimatedStyle(() => {
    return {
      width: progressBarWidth.value,
      opacity: progressBarOpacity.value,
    };
  });

  const buttonStyle = useAnimatedStyle(() => {
    return {
      opacity: buttonOpacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      {/* logo image with rings */}
      <Animated.View style={[styles.ring, ring2Style]}>
        <Animated.View style={[styles.ring, ring1Style]}>
          <Image
            source={require("../assets/images/Game/angry-bluebird.png")}
            style={styles.logoImage}
          />
        </Animated.View>
      </Animated.View>
      {/* title and punchline */}
      <View style={styles.titleContainer}>
        <Image
          source={require("../assets/images/name2.png")}
          style={styles.nameStyle}
          resizeMode="contain"
        />
      </View>
      <View style={styles.animationContainer}>
        {/* obstacle image */}
        <View style={styles.obstacleContainer}>
          <Image
            source={require("../assets/images/Game/obstacle.png")}
            style={styles.obstacleImage}
          />
        </View>
        {/* progress bar */}
        <Animated.View style={[styles.progressBarBackground]}>
          <Animated.View style={[styles.progressBarFill, progressBarStyle]} />
        </Animated.View>
        {/* bird moving animation */}
        <Animated.View style={[styles.birdContainer, birdStyle]}>
          <Image
            source={require("../assets/images/Game/bird.png")}
            style={styles.birdImage}
          />
        </Animated.View>
        {/* start game button */}
        <Animated.View style={[styles.startButtonContainer, buttonStyle]}>
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>Start Game</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: hp(4),
    backgroundColor: "#FDAD12",
  },
  ring: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 9999,
  },
  logoImage: {
    width: wp(20),
    height: wp(20),
  },
  birdContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  birdImage: {
    width: wp(8),
    height: wp(8),
  },
  nameStyle: {
    width: wp(90),
    height: wp(90),
    marginBottom: 20,
  },
  obstacleContainer: {
    position: "absolute",
    bottom: 0,
    right: 5,
  },
  obstacleImage: {
    width: wp(10),
    height: wp(10),
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: hp(2),
  },
  title: {
    fontSize: wp(8),
    fontWeight: "bold",
    color: "#fff",
  },
  animationContainer: {
    position: "relative",
    width: wp(90),
    height: hp(10),
  },
  progressBarBackground: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: hp(2),
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 99,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 5,
  },
  startButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    width: "100%",
    height: hp(10),
    justifyContent: "center",
    alignItems: "center",
  },
  startButton: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 5,
    paddingVertical: hp(2),
    paddingHorizontal: wp(10),
  },
  startButtonText: {
    color: "#FDAD12",
    fontSize: wp(4),
    fontWeight: "bold",
  },
});

export default LoadingScreen;
