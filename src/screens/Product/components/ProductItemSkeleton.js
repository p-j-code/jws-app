import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, Dimensions, Animated} from 'react-native';
import theme from '../../../theme';

const {width} = Dimensions.get('window');
const squareSize = width * 0.4;
const carouselHeight = squareSize * 1;

const SkeletonProductItem = () => {
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
    outputRange: [-squareSize, squareSize],
  });

  return (
    <View style={styles.productContainer}>
      <View style={styles.mediaContainer}>
        <View style={styles.carouselPlaceholder}>
          <Animated.View
            style={[
              styles.shimmerOverlay,
              {transform: [{translateX: shimmerTranslate}]},
            ]}
          />
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.textPlaceholderContainer}>
          <View style={styles.lineShort}>
            <Animated.View
              style={[
                styles.shimmerOverlay,
                {transform: [{translateX: shimmerTranslate}]},
              ]}
            />
          </View>
          <View style={styles.lineMedium}>
            <Animated.View
              style={[
                styles.shimmerOverlay,
                {transform: [{translateX: shimmerTranslate}]},
              ]}
            />
          </View>
          <View style={styles.lineLong}>
            <Animated.View
              style={[
                styles.shimmerOverlay,
                {transform: [{translateX: shimmerTranslate}]},
              ]}
            />
          </View>
        </View>
        <View style={styles.quantityPlaceholder}>
          <Animated.View
            style={[
              styles.shimmerOverlay,
              {transform: [{translateX: shimmerTranslate}]},
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'row',
    paddingVertical: theme.spacing.medium,
    borderBottomColor: theme.colors.border.main,
    borderBottomWidth: 0.5,
  },
  mediaContainer: {
    width: squareSize,
    marginRight: theme.spacing.medium,
    position: 'relative',
  },
  carouselPlaceholder: {
    width: squareSize,
    height: carouselHeight,
    borderRadius: theme.spacing.small,
    marginTop: theme.spacing.small,
    backgroundColor: theme.colors.skeleton.primary,
    overflow: 'hidden', // Ensures shimmer effect stays within the bounds
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: theme.spacing.small,
  },
  textPlaceholderContainer: {
    flex: 1,
  },
  lineShort: {
    width: '60%',
    height: 20,
    borderRadius: theme.spacing.xsmall,
    marginBottom: theme.spacing.xsmall,
    backgroundColor: theme.colors.skeleton.secondary,
    overflow: 'hidden',
  },
  lineMedium: {
    width: '80%',
    height: 20,
    borderRadius: theme.spacing.xsmall,
    marginBottom: theme.spacing.xsmall,
    backgroundColor: theme.colors.skeleton.secondary,
    overflow: 'hidden',
  },
  lineLong: {
    width: '90%',
    height: 20,
    borderRadius: theme.spacing.xsmall,
    marginBottom: theme.spacing.xsmall,
    backgroundColor: theme.colors.skeleton.secondary,
    overflow: 'hidden',
  },
  quantityPlaceholder: {
    width: 80,
    height: 30,
    borderRadius: theme.spacing.xsmall,
    backgroundColor: theme.colors.skeleton.primary,
    overflow: 'hidden',
  },
  shimmerOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.skeleton.shimmer, // Shimmer color from theme
    opacity: 0.5,
  },
});

export default SkeletonProductItem;
