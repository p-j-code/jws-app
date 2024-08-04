// SliderWithLabels.js

import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
import theme from '../../theme';

const generateSnapValues = (max, labelsCount) => {
  if (labelsCount > max) {
    labelsCount = max + 1;
  }
  const step = max / (labelsCount - 1);
  const snapValues = Array.from({length: labelsCount}, (_, i) =>
    Math.round(step * i),
  );
  snapValues[labelsCount - 1] = max; // Ensure the last value is exactly the max value
  return snapValues;
};

const getClosestSnapValue = (value, snapValues) => {
  return snapValues.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev,
  );
};

const SliderWithLabels = ({
  value,
  max,
  labelsCount,
  onSlidingComplete,
  onValueChange,
}) => {
  const [sliderWidth, setSliderWidth] = useState(0);

  const snapValues = useMemo(
    () => generateSnapValues(max, labelsCount),
    [max, labelsCount],
  );

  const handleSliderChangeComplete = useCallback(
    value => {
      const snappedValue = getClosestSnapValue(Math.round(value), snapValues);
      onSlidingComplete(snappedValue);
    },
    [snapValues, onSlidingComplete],
  );

  return (
    <View style={styles.sliderAndLabelsContainer}>
      <View style={styles.labelsContainer}>
        {snapValues.map((value, index) => (
          <Text
            key={index}
            style={[
              styles.label,
              {
                left:
                  (sliderWidth - 10) * (index / (snapValues.length - 1)) + 10,
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
          step={1}
          value={value}
          onSlidingComplete={handleSliderChangeComplete}
          onValueChange={onValueChange}
          minimumTrackTintColor={theme.colors.primary.main}
          maximumTrackTintColor={theme.colors.background.subtle}
          thumbTintColor={theme.colors.primary.main}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderAndLabelsContainer: {
    width: '100%',
    paddingHorizontal: theme.spacing.medium,
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
});

export default React.memo(SliderWithLabels);
