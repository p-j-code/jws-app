import React, {useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {debounce} from 'lodash';
import {
  getCartRequest,
  modifyCartRequest,
} from '../../../store/actions/cartActions';
import QuantityControlPure from './QuantityControlPure';

const QuantityControl = ({
  productId,
  initialQuantity = 0,
  max = 100,
  labelsCount = 2,
  snapThreshold = 5,
  showSlider = true,
  size = 'sm',
  style,
  onlyOne = false, // Add this if using the `onlyOne` feature
  ...restProps
}) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(state =>
    state.cart.cart?.items?.find(item => item.product._id === productId),
  );

  useEffect(() => {
    dispatch(getCartRequest());
  }, [dispatch]);

  const debouncedModifyCart = useCallback(
    debounce((productId, quantityChange) => {
      dispatch(modifyCartRequest({productId, quantityChange}));
    }, 400),
    [dispatch],
  );

  const handleQuantityChange = useCallback(
    newQuantity => {
      if (newQuantity > max) {
        newQuantity = max;
      }
      const currentQuantity = cartItem ? cartItem.quantity : initialQuantity;
      const quantityChange = newQuantity - currentQuantity;
      if (quantityChange !== 0) {
        debouncedModifyCart(productId, quantityChange);
      }
    },
    [debouncedModifyCart, productId, cartItem, initialQuantity, max],
  );

  return (
    <QuantityControlPure
      initialQuantity={cartItem ? cartItem.quantity : initialQuantity}
      max={max}
      labelsCount={labelsCount}
      snapThreshold={snapThreshold}
      showSlider={showSlider}
      size={size}
      style={style}
      onlyOne={onlyOne} // Pass this if using the `onlyOne` feature
      onQuantityChange={handleQuantityChange}
      {...restProps} // Pass any additional props
    />
  );
};

export default React.memo(QuantityControl);
