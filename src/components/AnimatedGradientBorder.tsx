import React, { ReactNode } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  Easing,
  interpolateColor,
} from 'react-native-reanimated';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

type AnimatedGradientBorderProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  borderRadius?: number;
};

export default function AnimatedGradientBorder({
  children,
  style,
  borderRadius = 16,
}: AnimatedGradientBorderProps) {
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 3000, easing: Easing.linear }),
      -1,
      true
    );
  }, []);

  const animatedProps = useAnimatedProps<LinearGradientProps>(() => {
    const c0 = interpolateColor(progress.value, [0, 0.5, 1], ['#60a5fa', '#7c3aed', '#60a5fa']);
    const c1 = interpolateColor(progress.value, [0, 0.5, 1], ['#7c3aed', '#60a5fa', '#7c3aed']);

    return {
      colors: [c0, c1] as [string, string],
    };
  });

  return (
    <AnimatedLinearGradient
      colors={['#60a5fa', '#7c3aed']} // Static fallback
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.gradient, style, { borderRadius }]}
      animatedProps={animatedProps}
    >
      <View style={[styles.inner, { borderRadius }]}>{children}</View>
    </AnimatedLinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    padding: 2,
  },
  inner: {
    backgroundColor: '#1f2937',
    flex: 1,
  },
});
