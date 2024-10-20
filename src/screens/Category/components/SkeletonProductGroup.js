// components/ProductGroup/SkeletonProductGroup.js

import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, Dimensions, Animated} from 'react-native';
import theme from '../../../theme';

const {width} = Dimensions.get('window');
const cardWidth = width * 0.35;
const reducedCardHeight = width * 0.3; // Adjust the height to make it smaller

const SkeletonProductGroup = () => {
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
    <View style={styles.container}>
      {/* Header Skeleton */}
      <View style={styles.headerContainer}>
        <View style={styles.headerLine} />
        <View style={styles.headerButton} />
      </View>

      {/* Product Card Skeletons */}
      <View style={styles.productCardContainer}>
        {Array.from({length: 4}).map((_, index) => (
          <View
            key={`skeleton-product-card-${index}`}
            style={styles.productCard}>
            <View style={styles.imagePlaceholder} />
            <View style={styles.detailsContainer}>
              <View style={styles.detailLine} />
            </View>
            <Animated.View
              style={[
                styles.shimmer,
                {
                  transform: [{translateX: shimmerTranslate}],
                },
              ]}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.medium,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.medium,
  },
  headerLine: {
    width: '60%',
    height: 20,
    backgroundColor: theme.colors.skeleton.primary, // Primary skeleton color
    borderRadius: theme.shape.borderRadius,
  },
  headerButton: {
    width: 50,
    height: 20,
    backgroundColor: theme.colors.skeleton.primary,
    borderRadius: theme.shape.borderRadius,
  },
  productCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productCard: {
    width: cardWidth,
    height: reducedCardHeight, // Reduced height for the product card
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.colors.skeleton.primary, // Primary skeleton color
    marginRight: theme.spacing.small,
    overflow: 'hidden',
    position: 'relative',
  },
  imagePlaceholder: {
    width: '100%',
    height: reducedCardHeight * 0.75, // Adjust height for image placeholder
    backgroundColor: theme.colors.skeleton.secondary, // Secondary skeleton color
  },
  detailsContainer: {
    padding: theme.spacing.small,
  },
  detailLine: {
    width: '90%',
    height: 14,
    backgroundColor: theme.colors.skeleton.secondary,
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing.xsmall,
  },
  shimmer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.skeleton.shimmer,
    opacity: 0.5,
  },
});

export default SkeletonProductGroup;
