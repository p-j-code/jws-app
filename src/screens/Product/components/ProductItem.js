import React, {useCallback} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import Video from 'react-native-video';
import Carousel from 'react-native-reanimated-carousel';
import Slider from '@react-native-community/slider';
import Button from '../../../components/common/Button';
import theme from '../../../theme';

const {width, height} = Dimensions.get('window');

const ProductItem = ({item}) => {
  const renderMedia = useCallback(({item: mediaItem}) => {
    return mediaItem.type === 'image' ? (
      <Image
        key={mediaItem._id}
        source={{uri: mediaItem.url}}
        style={styles.media}
      />
    ) : mediaItem.type === 'video' ? (
      <Video
        key={mediaItem._id}
        source={{uri: mediaItem.url}}
        style={styles.media}
        resizeMode="cover"
        shouldPlay
        isLooping
      />
    ) : null;
  }, []);

  return (
    <View style={styles.productContainer}>
      <View style={styles.mediaContainer}>
        <Carousel
          width={width * 0.4}
          height={height * 0.3}
          data={item.media}
          renderItem={renderMedia}
          loop
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{item.name || 'No Name'}</Text>
        <Text style={styles.productNarration}>
          {item.narration || 'No Narration'}
        </Text>
        <Text style={styles.productDetail}>
          Gross: {item.grossWeight || 'N/A'}, Net: {item.netWeight || 'N/A'}
        </Text>
        {item.isStone && (
          <Text style={styles.productDetail}>
            Stone: {item.stoneWeight || 'N/A'}, Charges:{' '}
            {item.stoneCharges || 'N/A'}
          </Text>
        )}
        <View style={styles.cartControls}>
          <Button
            title="-"
            onPress={() => console.log('Decrease quantity')}
            variant="primary"
            size="sm"
            type="contained"
            style={styles.cartButton}
          />
          <Text style={styles.quantityLabel}>1</Text>
          <Button
            title="+"
            onPress={() => console.log('Increase quantity')}
            variant="primary"
            size="sm"
            type="contained"
            style={styles.cartButton}
          />
        </View>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={item.stock || 1}
          step={1}
          value={1}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.large,
  },
  mediaContainer: {
    width: width * 0.4,
    marginRight: theme.spacing.medium,
  },
  media: {
    width: '100%',
    height: height * 0.3,
    marginBottom: theme.spacing.small,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    ...theme.typography.h4,
    marginBottom: theme.spacing.small,
  },
  productNarration: {
    ...theme.typography.body2,
    marginBottom: theme.spacing.small,
  },
  productDetail: {
    ...theme.typography.body1,
    marginBottom: theme.spacing.small,
  },
  cartControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.medium,
    justifyContent: 'space-between',
  },
  cartButton: {
    flex: 1,
    marginHorizontal: theme.spacing.small,
  },
  quantityLabel: {
    ...theme.typography.body1,
    marginHorizontal: theme.spacing.small,
  },
  slider: {
    marginTop: theme.spacing.small,
  },
});

export default ProductItem;
