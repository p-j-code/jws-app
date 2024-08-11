import React, {useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import Button from '../../../components/common/Button';
import theme from '../../../theme';

const SingleItemCartControl = ({
  initialQuantity = 0,
  onQuantityChange,
  size = 'sm',
  style,
}) => {
  const [isAdded, setIsAdded] = useState(initialQuantity > 0);
  const {width} = useWindowDimensions(); // Get screen width for responsiveness

  const handleAddToCart = () => {
    if (!isAdded) {
      onQuantityChange(1);
      setIsAdded(true);
    }
  };

  const handleRemoveFromCart = () => {
    if (isAdded) {
      onQuantityChange(0);
      setIsAdded(false);
    }
  };

  return (
    <View style={[styles.container, style]}>
      {isAdded ? (
        <View
          style={[
            styles.addedContainer,
            {flexDirection: width < 400 ? 'column' : 'row'},
          ]}>
          <Text style={styles.addedMessage}>Added to Cart</Text>
          {width < 400 ? (
            <TouchableOpacity
              onPress={handleRemoveFromCart}
              style={styles.removeButton}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleRemoveFromCart}
              style={styles.removeTextContainer}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <Button
          title="Add To Cart"
          onPress={handleAddToCart}
          variant="secondary"
          size={size}
          type="contained"
          style={styles.addButton}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  addButton: {
    width: '100%', // Make the Add To Cart button take the full width
    marginHorizontal: 10,
  },
  addedContainer: {
    flexDirection: 'row', // Default to row layout
    alignItems: 'center',
    justifyContent: 'center', // Center items
    width: '100%',
  },
  removeTextContainer: {
    marginLeft: theme.spacing.small,
  },
  removeText: {
    fontSize: theme.typography.body1.fontSize,
    color: theme.colors.status.error, // You can choose a color that stands out
    marginVertical: theme.spacing.small,
    textDecorationLine: 'underline', // Add underline
  },
  addedMessage: {
    fontSize: theme.typography.body1.fontSize,
    color: theme.colors.status.success,
    marginVertical: theme.spacing.small,
    textAlign: 'center',
  },
  removeButton: {
    marginVertical: theme.spacing.small,
    alignItems: 'center',
  },
});

export default React.memo(SingleItemCartControl);
