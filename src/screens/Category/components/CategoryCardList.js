import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import theme from '../../../theme';
import {useNavigation} from '@react-navigation/native';
import {
  PRODUCT_LISTING_SCREEN,
  ROOT_PRODUCT_STACK_NAME,
} from '../../../navigation/routeConfigurations/productRoutes';
import withScreenshotProtection from '../../../HOC/withScreenshotProtection';
import SkeletonCategoryCard from './SkeletonCategoryCard';

const CategoryCard = ({category, onPress}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(category)}>
      <Text style={styles.categoryName}>{category.name}</Text>
    </TouchableOpacity>
  );
};

const CategoryCardList = ({categories = [], clearSearch, loading = false}) => {
  const navigation = useNavigation();

  const handleCategoryPress = category => {
    clearSearch && clearSearch();
    navigation.navigate(ROOT_PRODUCT_STACK_NAME, {
      screen: PRODUCT_LISTING_SCREEN,
      params: {category: category},
    });
  };

  const renderCategories = () => {
    if (loading) {
      // Show 4 skeleton cards when loading
      return Array.from({length: 4}).map((_, idx) => (
        <SkeletonCategoryCard key={`skeleton-CategoryCard-${idx}`} />
      ));
    } else {
      // Render categories when not loading
      return categories.map((category, idx) => (
        <CategoryCard
          key={category._id + idx}
          category={category}
          onPress={handleCategoryPress}
        />
      ));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.cardListContainer}>
      {renderCategories()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.small,
  },
  card: {
    backgroundColor: theme.colors.background.interactive,
    padding: theme.spacing.medium,
    marginVertical: theme.spacing.small,
    borderRadius: theme.shape.borderRadius,
    elevation: 2, // for shadow on Android
    shadowColor: '#000', // for shadow on iOS
    shadowOffset: {width: 0, height: 2}, // for shadow on iOS
    shadowOpacity: 0.1, // for shadow on iOS
    shadowRadius: 4, // for shadow on iOS
    flexBasis: '48%',
  },
  categoryName: {
    ...theme.typography.body1,
    color: theme.colors.text.light,
  },
});

export default withScreenshotProtection(CategoryCardList);
