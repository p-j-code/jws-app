import {createSelector} from 'reselect';

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
    totalGrossWeight: parseFloat(cart.totalGrossWeight).toFixed(2),
    totalNetWeight: parseFloat(cart.totalNetWeight).toFixed(2),
    totalStoneCharges: parseFloat(cart.totalStoneCharges).toFixed(2),
  };
});
