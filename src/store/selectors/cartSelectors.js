import {createSelector} from 'reselect';

const selectCart = state => state.cart.cart;

export const selectCartItems = createSelector([selectCart], cart => cart.items);

export const selectCartTotals = createSelector([selectCart], cart => ({
  totalItems: cart.totalItems,
  totalGrossWeight: parseFloat(cart.totalGrossWeight).toFixed(2),
  totalNetWeight: parseFloat(cart.totalNetWeight).toFixed(2),
  totalStoneCharges: parseFloat(cart.totalStoneCharges).toFixed(2),
}));
