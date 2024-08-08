import React, {useState, useCallback, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import Button from '../../components/common/Button';
import theme from '../../theme';
import SliderWithLabels from './SliderWithLabels';

const QuantityControlPure = ({
  initialQuantity = 0,
  max = 100,
  labelsCount = 2,
  snapThreshold = 5,
  showSlider = true,
  size = 'sm',
  style,
  onQuantityChange,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [tempQuantity, setTempQuantity] = useState(String(initialQuantity));
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [timer, setTimer] = useState(null);

  const handleQuantityChange = useCallback(
    newQuantity => {
      if (newQuantity > max) {
        newQuantity = max;
      }
      setQuantity(prevQuantity => {
        const quantityChange = newQuantity - prevQuantity;
        if (quantityChange !== 0) {
          onQuantityChange(newQuantity);
        }
        return newQuantity;
      });
      setTempQuantity(String(newQuantity));
    },
    [onQuantityChange, max],
  );

  const handleInputChange = useCallback(
    value => {
      setTempQuantity(value);
      const intValue = parseInt(value, 10);
      if (!isNaN(intValue)) {
        clearTimeout(timer);
        setTimer(
          setTimeout(() => {
            handleQuantityChange(intValue);
          }, 1000),
        );
      }
    },
    [handleQuantityChange, timer],
  );

  const handleInputBlur = useCallback(() => {
    const intValue = parseInt(tempQuantity, 10);
    if (!isNaN(intValue)) {
      handleQuantityChange(intValue);
    } else {
      setTempQuantity(String(quantity));
    }
    setIsInputFocused(false);
  }, [tempQuantity, handleQuantityChange, quantity]);

  useEffect(() => {
    return () => clearTimeout(timer);
  }, [timer]);

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
              variant="secondary"
              size={size}
              type="contained"
              style={styles.button}
            />
            <QuantityInput
              tempQuantity={tempQuantity}
              isInputFocused={isInputFocused}
              setIsInputFocused={setIsInputFocused}
              handleInputChange={handleInputChange}
              handleInputBlur={handleInputBlur}
              size={size}
            />
            <Button
              title="+"
              onPress={() => handleQuantityChange(quantity + 1)}
              variant="secondary"
              size={size}
              type="contained"
              style={styles.button}
              disabled={quantity === max}
            />
          </>
        ) : (
          <Button
            title="Add To Cart"
            onPress={() => handleQuantityChange(1)}
            variant="secondary"
            size={size}
            type="contained"
            style={styles.button}
          />
        )}
      </View>
    </View>
  );
};

const QuantityInput = React.memo(
  ({
    tempQuantity,
    isInputFocused,
    setIsInputFocused,
    handleInputChange,
    handleInputBlur,
    size,
  }) => (
    <TouchableOpacity
      onPress={() => setIsInputFocused(true)}
      style={styles.inputWrapper}>
      <TextInput
        style={[
          styles.quantityInput,
          size === 'xsm' && styles.xsmQuantityInput,
        ]}
        value={tempQuantity}
        onChangeText={handleInputChange}
        keyboardType="numeric"
        editable={true}
        onBlur={handleInputBlur}
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

export default React.memo(QuantityControlPure);
