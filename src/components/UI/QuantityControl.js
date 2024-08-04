// QuantityControl.js

import React, {useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../components/common/Button';
import theme from '../../theme';
import {
  modifyCartRequest,
  getCartRequest,
} from '../../store/actions/cartActions';
import {debounce} from 'lodash';
import SliderWithLabels from './SliderWithLabels';

const QuantityControl = React.memo(
  ({
    productId,
    initialQuantity = 0,
    max = 100,
    labelsCount = 2,
    snapThreshold = 5,
    showSlider = true,
    size = 'sm',
    style,
  }) => {
    const dispatch = useDispatch();
    const cartItem = useSelector(
      state => state.cart.cart?.items.find(item => item.product === productId),
      (left, right) => left?.quantity === right?.quantity,
    );

    const [quantity, setQuantity] = useState(initialQuantity);
    const [isInputFocused, setIsInputFocused] = useState(false);

    useEffect(() => {
      dispatch(getCartRequest());
    }, [dispatch]);

    useEffect(() => {
      if (cartItem) {
        setQuantity(cartItem.quantity);
      }
    }, [cartItem]);

    const debouncedModifyCart = useCallback(
      debounce((productId, quantityChange) => {
        dispatch(modifyCartRequest({productId, quantityChange}));
      }, 300),
      [dispatch],
    );

    const handleQuantityChange = useCallback(
      newQuantity => {
        setQuantity(prevQuantity => {
          const quantityChange = newQuantity - prevQuantity;
          if (quantityChange !== 0) {
            debouncedModifyCart(productId, quantityChange);
          }
          return newQuantity;
        });
      },
      [debouncedModifyCart, productId],
    );

    const handleInputChange = useCallback(
      value => {
        const intValue = parseInt(value, 10);
        if (!isNaN(intValue)) {
          handleQuantityChange(intValue);
        }
      },
      [handleQuantityChange],
    );

    return (
      <View style={[styles.container, style]}>
        {showSlider && (
          <SliderWithLabels
            value={quantity}
            max={max}
            labelsCount={labelsCount}
            onSlidingComplete={handleQuantityChange}
            onValueChange={handleQuantityChange}
          />
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
              <QuantityInput
                quantity={quantity}
                isInputFocused={isInputFocused}
                setIsInputFocused={setIsInputFocused}
                handleInputChange={handleInputChange}
                size={size}
              />
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
  },
);

const QuantityInput = React.memo(
  ({quantity, isInputFocused, setIsInputFocused, handleInputChange, size}) => (
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
  ),
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
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
    paddingVertical: theme.spacing.small,
    textAlign: 'center',
    fontSize: theme.typography.h4.fontSize,
    color: theme.colors.primary.main,
  },
  xsmQuantityInput: {
    fontSize: theme.typography.body1.fontSize,
    paddingHorizontal: theme.spacing.small,
    paddingVertical: theme.spacing.xsmall,
  },
});

export default QuantityControl;
