import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Button from '../../components/common/Button';
import theme from '../../theme';

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
  quantity = 10,
  onIncrement,
  onDecrement,
  onSliderChange,
  max = 100,
  labelsCount = 5,
  snapThreshold = 5, // Threshold for snapping
  showSlider = true,
  size = 'sm',
  style,
}) => {
  const [snapValues, setSnapValues] = useState([]);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    setSnapValues(generateSnapValues(max, labelsCount));
  }, [max, labelsCount]);

  const handleSliderChangeComplete = value => {
    const snappedValue = getClosestSnapValue(value, snapValues);
    onSliderChange(snappedValue);
  };

  const handleInputChange = value => {
    const intValue = parseInt(value, 10);
    if (!isNaN(intValue)) {
      onSliderChange(intValue);
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
              onValueChange={onSliderChange} // Keep updating value as it changes
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
              onPress={onDecrement}
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
              onPress={onIncrement}
              variant="primary"
              size={size}
              type="contained"
              style={styles.button}
            />
          </>
        ) : (
          <Button
            title="Add To Cart"
            onPress={onIncrement}
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
