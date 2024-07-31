import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import Video from 'react-native-video';
import Carousel from 'react-native-reanimated-carousel';
import Button from '../../../components/common/Button';
import theme from '../../../theme';

const {width} = Dimensions.get('window');
const squareSize = width * 0.4;

const ProductItem = ({item}) => {
  const [activeSlide, setActiveSlide] = useState(0);

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

  const renderIndicator = () => {
    if (item.media.length > 1) {
      return (
        <View style={styles.indicatorContainer}>
          {item.media.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                activeSlide === index && styles.activeIndicator,
              ]}
            />
          ))}
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.productContainer}>
      <View style={styles.mediaContainer}>
        <Carousel
          width={squareSize}
          height={squareSize}
          data={item.media}
          renderItem={renderMedia}
          loop={item.media.length > 1}
          onSnapToItem={index => setActiveSlide(index)}
        />
        {renderIndicator()}
      </View>
      <View style={styles.detailsContainer}>
        {item.name && (
          <Text style={styles.productName}>{item.name || 'No Name'}</Text>
        )}
        {item.narration && (
          <Text style={styles.productNarration}>
            {item.narration || 'No Narration'}
          </Text>
        )}
        <Text style={styles.productDetail}>
          Gross: {item.grossWeight || 'N/A'}
        </Text>
        <Text style={styles.productDetail}>Net: {item.netWeight || 'N/A'}</Text>
        {item.isStone && (
          <Text style={styles.productDetail}>
            Stone: {item.stoneWeight || 'N/A'}
          </Text>
        )}
        {item.isStone && (
          <Text style={styles.productDetail}>
            Charges: {item.stoneCharges || 'N/A'}
          </Text>
        )}
        <View style={styles.cartControls}>
          <Button
            title="-"
            onPress={() => console.log('Decrease quantity')}
            variant="primary"
            size="xsm"
            type="contained"
            style={styles.cartButton}
          />
          <Text style={styles.quantityLabel}>1</Text>
          <Button
            title="+"
            onPress={() => console.log('Increase quantity')}
            variant="primary"
            size="xsm"
            type="contained"
            style={styles.cartButton}
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
  },
  media: {
    width: '100%',
    height: '100%',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.spacing.xsmall,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.text.disabled,
    marginHorizontal: 2,
  },
  activeIndicator: {
    backgroundColor: theme.colors.primary.main,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    ...theme.typography.h4,
    marginBottom: theme.spacing.xsmall,
  },
  productNarration: {
    ...theme.typography.body2,
    marginBottom: theme.spacing.small,
  },
  productDetail: {
    ...theme.typography.body1,
    fontSize: theme.typography.body2.fontSize,
    marginBottom: theme.spacing.xsmall,
  },
  cartControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.small,
    justifyContent: 'space-between',
  },
  cartButton: {
    flex: 1,
    marginHorizontal: theme.spacing.xsmall,
  },
  quantityLabel: {
    ...theme.typography.body1,
    marginHorizontal: theme.spacing.small,
  },
});

export default ProductItem;
