import React, { useRef, useState, useEffect } from "react";
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import LottieView from "lottie-react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

import { useFetchExercices } from "../../../services/firebase/hooks/useFetchExercices";

import { ExerciceContainer } from "../../organisms/ExercicesContainer";
import { ExerciceContent } from "../../molecules/ExerciceContent";
import { Button } from "../../atoms/Button";

const { width: WIDTH_SCREEN } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121214",
  },
  content: {
    flex: 1,
  },
  titleContainer: {
    padding: 20,
  },
  title: {
    fontFamily: "FredokaOne_400Regular",
    fontSize: 28,
    color: "#E8E8E8",
  },
  buttonContainer: {
    padding: 20,
  },
});

export default function Home() {
  const animation = useRef(null);
  const slidesRef = useRef<ScrollView>(null);

  const percentage = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${percentage.value}%`,
    };
  });

  const [wordsSelected, setWordsSelected] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(0);

  const { exercices, isFetching, fetchExercices } = useFetchExercices();

  const fetchExercises = async () => {
    try {
      await fetchExercices();
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      }
    }
  };

  const scrollTo = () => {
    if (currentIndex !== null && currentIndex < exercices.length - 1) {
      slidesRef.current?.scrollTo({
        x: (currentIndex + 1) * WIDTH_SCREEN,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
    } else {
      Alert.alert("Congratulations!", "You have completed the course!");
    }

    percentage.value = ((currentIndex + 1) / exercices.length) * 100;
  };

  const handleSelectWord = (word: string, position: number) => {
    const newWordsSelected = [...wordsSelected];
    newWordsSelected.splice(position, 0, word);

    setWordsSelected(newWordsSelected);
  };

  const handleDeselectWord = (position: number) => {
    const newWordsSelected = [...wordsSelected];
    newWordsSelected.splice(position, 1);

    setWordsSelected(newWordsSelected);
  };

  const handleChangePosition = (from: number, to: number) => {
    const newWordsSelected = [...wordsSelected];
    const word = newWordsSelected[from];
    newWordsSelected.splice(from, 1);
    newWordsSelected.splice(to, 0, word);

    setWordsSelected(newWordsSelected);
  };

  const handleSubmit = () => {
    scrollTo();
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      fetchExercises();
    }

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            paddingVertical: 12,
            marginTop: 12,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 32,
              height: 32,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign name="close" size={24} color="#E8E8E8" />
          </View>
          <View style={{ width: 8 }} />
          <View
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                width: "100%",
                height: 20,
                backgroundColor: "#505059",
                borderRadius: 10,
              }}
            />
            <Animated.View
              style={[
                {
                  position: "absolute",
                  height: 20,
                  backgroundColor: "#FF5733",
                  borderRadius: 10,
                },
                animatedStyle,
              ]}
            />
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Ordene a frase</Text>
        </View>
        <View style={styles.content}>
          {isFetching && <Text>Loading...</Text>}
          {!isFetching && (
            <>
              <View style={{ width: "100%", paddingHorizontal: 20 }}>
                <LottieView
                  autoPlay
                  ref={animation}
                  style={{
                    width: 180,
                    height: 180,
                  }}
                  // Find more Lottie files at https://lottiefiles.com/featured
                  // eslint-disable-next-line global-require
                  source={require("../../../assets/animation/developer.json")}
                />
              </View>
              <ExerciceContainer ref={slidesRef}>
                {exercices.map((item, index) => {
                  const words = item.answer.split(" ");

                  return (
                    <ExerciceContent
                      key={index}
                      wordsSelected={wordsSelected} // default [] when the component is mounted
                      words={words}
                      onSelect={() => handleSelectWord(item.answer, index)}
                      onDeselect={() => handleDeselectWord(index)}
                      onChangePosition={handleChangePosition}
                    />
                  );
                })}
              </ExerciceContainer>
            </>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Button title="CONTINUAR" onPress={handleSubmit} />
        </View>
      </>
    </View>
  );
}
