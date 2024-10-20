// components/ProductItem/SkeletonProductItem.js

import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import theme from '../../../theme';

const {width} = Dimensions.get('window');
const squareSize = width * 0.4;
const carouselHeight = squareSize * 1;

const SkeletonProductItem = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.productContainer}>
        <View style={styles.mediaContainer}>
          {/* Placeholder for Carousel */}
          <View style={styles.carouselPlaceholder} />
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.textPlaceholderContainer}>
            <View style={styles.lineShort} />
            <View style={styles.lineMedium} />
            <View style={styles.lineLong} />
            <View style={styles.lineShort} />
            <View style={styles.lineShort} />
          </View>
          <View style={styles.quantityPlaceholder} />
        </View>
      </View>
    </SkeletonPlaceholder>
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
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textPlaceholderContainer: {
    flex: 1,
  },
  lineShort: {
    width: '60%',
    height: 20,
    borderRadius: theme.spacing.xsmall,
    marginBottom: theme.spacing.xsmall,
  },
  lineMedium: {
    width: '80%',
    height: 20,
    borderRadius: theme.spacing.xsmall,
    marginBottom: theme.spacing.xsmall,
  },
  lineLong: {
    width: '90%',
    height: 20,
    borderRadius: theme.spacing.xsmall,
    marginBottom: theme.spacing.xsmall,
  },
  quantityPlaceholder: {
    width: 80,
    height: 30,
    borderRadius: theme.spacing.xsmall,
  },
});

export default SkeletonProductItem;
