import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { between, useVector } from "react-native-redash";

import { Offset, Word } from "../../../types";

import {
  calculateLayout,
  lastOrder,
  MARGIN_LEFT,
  MARGIN_TOP,
  remove,
  reorder,
  SENTENCE_HEIGHT,
  WORD_HEIGHT,
} from "../../../constants";

import { Placeholder } from "../../atoms/Placeholder";

type SortableWordProps = {
  children: React.ReactElement<Word>;
  offsets: Offset[];
  index: number;
  containerWidth: number;
  wordsSelected: string[];
  onSelect: (word: string, position: number) => void;
  onDeselect: (position: number) => void;
  onChangePosition: (from: number, to: number) => void;
};

export function SortableWord({
  children,
  offsets,
  index,
  containerWidth,
  wordsSelected,
  onSelect,
  onDeselect,
  onChangePosition,
}: SortableWordProps) {
  // console.log(JSON.stringify(offsets, null, 2))

  const offset = offsets[index]!;
  const isGestureActive = useSharedValue(false);
  const isAnimating = useSharedValue(false);
  const translation = useVector();
  const isInBank = useDerivedValue(() => offset.order.value === -1);
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
    onStart: (_, ctx) => {
      if (isInBank.value) {
        translation.x.value = offset.originalX.value - MARGIN_LEFT;
        translation.y.value = offset.originalY.value + MARGIN_TOP;
      } else {
        translation.x.value = offset.x.value;
        translation.y.value = offset.y.value;
      }

      ctx.x = translation.x.value;
      ctx.y = translation.y.value;

      isGestureActive.value = true;
    },
    onActive: ({ translationX, translationY }, ctx) => {
      translation.x.value = ctx.x + translationX;
      translation.y.value = ctx.y + translationY;

      if (isInBank.value && translation.y.value < SENTENCE_HEIGHT) {
        offset.order.value = lastOrder(offsets);
        calculateLayout(offsets, containerWidth);
      } else if (!isInBank.value && translation.y.value > SENTENCE_HEIGHT) {
        offset.order.value = -1;
        remove(offsets, index);
        calculateLayout(offsets, containerWidth);
      }

      for (let i = 0; i < offsets.length; i++) {
        const o = offsets[i]!;

        if (i === index && o.order.value !== -1) {
          // console.log("Area de arrastar 01");

          // runOnJS(setWord)({
          //   id: o.id,
          //   word: o.word,
          // });

          continue;
        }

        if (
          between(translation.x.value, o.x.value, o.x.value + o.width.value) &&
          between(translation.y.value, o.y.value, o.y.value + WORD_HEIGHT)
        ) {
          reorder(offsets, offset.order.value, o.order.value);
          calculateLayout(offsets, containerWidth);

          // console.log("02");

          // console.log(JSON.stringify(offsets, null, 2));

          break;
        }
      }
    },
    onEnd: ({ velocityX, velocityY }, ctx) => {
      isAnimating.value = true;
      translation.x.value = withSpring(
        offset.x.value,
        { velocity: velocityX },
        () => {
          isAnimating.value = false;
        },
      );
      translation.y.value = withSpring(offset.y.value, { velocity: velocityY });
      isGestureActive.value = false;

      if (offset.order.value !== -1) {
        if (wordsSelected.includes(offset.word)) {
          runOnJS(onChangePosition)(
            wordsSelected.indexOf(offset.word),
            offset.order.value,
          );
        } else {
          runOnJS(onSelect)(offset.word, offset.order.value);
        }
      } else if (wordsSelected.includes(offset.word)) {
        runOnJS(onDeselect)(wordsSelected.indexOf(offset.word));
      }
    },
  });
  const translateX = useDerivedValue(() => {
    if (isGestureActive.value) {
      return translation.x.value;
    }
    return withSpring(
      isInBank.value ? offset.originalX.value - MARGIN_LEFT : offset.x.value,
    );
  });
  const translateY = useDerivedValue(() => {
    if (isGestureActive.value) {
      return translation.y.value;
    }
    return withSpring(
      isInBank.value ? offset.originalY.value + MARGIN_TOP : offset.y.value,
    );
  });
  const style = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: isGestureActive.value || isAnimating.value ? 100 : 0,
      width: offset.width.value,
      height: WORD_HEIGHT,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <>
      <Placeholder offset={offset} />
      <Animated.View style={style}>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={StyleSheet.absoluteFill}>
            {children}
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </>
  );
}
