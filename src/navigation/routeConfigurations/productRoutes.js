import ProductListingScreen from '../../screens/Product/ProductListingScreen.js';
import ProductDetailsScreen from '../../screens/Product/ProductDetailsScreen.js';
import CategoryListingScreen from '../../screens/Product/CategoryListingScreen.js';
import CustomHeaderWithCart from '../../components/common/CustomHeaderWithCart';

export const ROOT_PRODUCT_STACK_NAME = 'ProductRoutes';
// Screen name constants
export const PRODUCT_LISTING_SCREEN = 'ProductListing';
export const PRODUCT_DETAILS_SCREEN = 'ProductDetails';
export const CATEGORY_LISTING_SCREEN = 'CategoryListing';

/**
 * Product route configurations.
 */
export const productRoutes = {
  [PRODUCT_LISTING_SCREEN]: {
    screen: ProductListingScreen,
    navigationOptions: {
      header: () => <CustomHeaderWithCart title="Products" />,
    },
  },
  [PRODUCT_DETAILS_SCREEN]: {
    screen: ProductDetailsScreen,
    navigationOptions: {
      header: () => <CustomHeaderWithCart title="Product Details" />,
    },
  },
  [CATEGORY_LISTING_SCREEN]: {
    screen: CategoryListingScreen,
    navigationOptions: {headerShown: false},
  },
};
