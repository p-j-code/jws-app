import {createSelector} from 'reselect';
import {formatValue} from '../../utils/commonUtils';

const selectCart = state => state.cart.cart;

export const selectCartItems = createSelector(
  [selectCart],
  cart => cart?.items,
);

export const selectCartLoading = state => state.cart?.loading;

export const selectCartTotals = createSelector([selectCart], cart => {
  if (!cart) return {};
  return {
    totalItems: cart.totalItems,
    totalGrossWeight: formatValue(cart.totalGrossWeight),
    totalNetWeight: formatValue(cart.totalNetWeight),
    totalStoneCharges: formatValue(cart.totalStoneCharges),
    totalStoneWeight: formatValue(cart.totalStoneWeight),
  };
});
