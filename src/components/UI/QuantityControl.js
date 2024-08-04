import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Slider from '@react-native-community/slider';
import Button from '../../components/common/Button';
import theme from '../../theme';
import {
  modifyCartRequest,
  getCartRequest,
} from '../../store/actions/cartActions';

const generateSnapValues = (max, labelsCount) => {
  const step = max / (labelsCount - 1); // Adjusted to account for the zero index
  const snapValues = [];
  for (let i = 0; i < labelsCount; i++) {
    snapValues.push(step * i);
  }
  return snapValues;
};

const getClosestSnapValue = (value, snapValues) => {
  const closestValue = snapValues.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev,
  );
  return closestValue;
};

const QuantityControl = ({
  productId,
  initialQuantity = 0,
  max = 100,
  labelsCount = 5,
  snapThreshold = 5, // Threshold for snapping
  showSlider = true,
  size = 'sm',
  style,
}) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [snapValues, setSnapValues] = useState([]);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    setSnapValues(generateSnapValues(max, labelsCount));
    dispatch(getCartRequest()); // Fetch cart when component mounts
  }, [max, labelsCount, dispatch]);

  console.log({cart});
  useEffect(() => {
    if (cart) {
      const cartItem = cart.items.find(item => item.product === productId);
      if (cartItem) {
        setQuantity(cartItem.quantity);
      }
    }
  }, [cart, productId]);

  const handleSliderChangeComplete = value => {
    const snappedValue = getClosestSnapValue(value, snapValues);
    handleQuantityChange(snappedValue);
  };

  const handleQuantityChange = newQuantity => {
    const quantityChange = newQuantity - quantity;
    console.log({quantityChange, newQuantity, productId});
    if (quantityChange !== 0) {
      dispatch(modifyCartRequest({productId, quantityChange}));
      setQuantity(newQuantity);
    }
  };

  const handleInputChange = value => {
    const intValue = parseInt(value, 10);
    if (!isNaN(intValue)) {
      handleQuantityChange(intValue);
    }
  };

  return (
    <View style={[styles.container, style]}>
      {showSlider && (
        <>
          <View style={styles.labelsContainer}>
            {snapValues.map((value, index) => (
              <Text
                key={index}
                style={[
                  styles.label,
                  {
                    left:
                      (sliderWidth - 20) * (index / (snapValues.length - 1)) +
                      10, // Adjusting the position to fit within the slider's width
                  },
                ]}>
                {value}
              </Text>
            ))}
          </View>
          <View
            onLayout={event => {
              const {width} = event.nativeEvent.layout;
              setSliderWidth(width);
            }}
            style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={max}
              step={1} // Keep it 1 for smooth sliding
              value={quantity}
              onSlidingComplete={handleSliderChangeComplete}
              onValueChange={handleQuantityChange} // Keep updating value as it changes
              minimumTrackTintColor={theme.colors.primary.main}
              maximumTrackTintColor={theme.colors.background.subtle}
              thumbTintColor={theme.colors.primary.main}
            />
          </View>
        </>
      )}
      <View style={styles.buttonContainer}>
        {quantity > 0 ? (
          <>
            <Button
              title="-"
              onPress={() => handleQuantityChange(quantity - 1)}
              variant="primary"
              size={size}
              type="contained"
              style={styles.button}
            />
            <TouchableOpacity
              onPress={() => setIsInputFocused(true)}
              style={styles.inputWrapper}>
              <TextInput
                style={[
                  styles.quantityInput,
                  size === 'xsm' && styles.xsmQuantityInput,
                ]}
                value={String(quantity)}
                onChangeText={handleInputChange}
                keyboardType="numeric"
                editable={isInputFocused}
                onBlur={() => setIsInputFocused(false)}
              />
            </TouchableOpacity>
            <Button
              title="+"
              onPress={() => handleQuantityChange(quantity + 1)}
              variant="primary"
              size={size}
              type="contained"
              style={styles.button}
            />
          </>
        ) : (
          <Button
            title="Add To Cart"
            onPress={() => handleQuantityChange(1)}
            variant="primary"
            size={size}
            type="contained"
            style={styles.button}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  labelsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    marginBottom: theme.spacing.xsmall,
  },
  label: {
    position: 'absolute',
    top: 0,
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.text.primary,
    transform: [{translateX: -10}],
  },
  sliderContainer: {
    width: '100%',
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: theme.spacing.small,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
  },
  inputWrapper: {
    borderColor: theme.colors.border.main,
    borderWidth: 1,
    borderRadius: theme.shape.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityInput: {
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.small, // Add default vertical padding
    textAlign: 'center',
    fontSize: theme.typography.h4.fontSize,
    color: theme.colors.primary.main,
  },
  xsmQuantityInput: {
    fontSize: theme.typography.body1.fontSize,
    paddingHorizontal: theme.spacing.small,
    paddingVertical: theme.spacing.xsmall, // Reduce vertical padding for xsm
  },
});

export default QuantityControl;
