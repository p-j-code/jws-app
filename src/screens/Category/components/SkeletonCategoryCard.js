// components/CategoryCardList/SkeletonCategoryCard.js

import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Dimensions, Animated} from 'react-native';
import theme from '../../../theme';

const {width} = Dimensions.get('window');
const cardWidth = width * 0.45; // 45% width for each card

const SkeletonCategoryCard = () => {
  const shimmerAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmerAnimation = () => {
      shimmerAnimatedValue.setValue(0);
      Animated.timing(shimmerAnimatedValue, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start(() => shimmerAnimation());
    };
    shimmerAnimation();
  }, [shimmerAnimatedValue]);

  const shimmerTranslate = shimmerAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-cardWidth, cardWidth],
  });

  return (
    <View style={styles.card}>
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [{translateX: shimmerTranslate}],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.skeleton.primary, // Use skeleton primary color
    borderRadius: theme.shape.borderRadius,
    width: cardWidth,
    height: 50, // Set height to 50px as requested
    marginBottom: theme.spacing.small,
    overflow: 'hidden', // Make sure shimmer doesn't overflow
  },
  shimmer: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.skeleton.shimmer, // Shimmer color
    opacity: 0.5,
  },
});

export default SkeletonCategoryCard;
