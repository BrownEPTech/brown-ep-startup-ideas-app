import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

// Consts and Libs
import { AppColors } from '@theme/';

// Containers
import MealListing from '@containers/recipes/Listing/ListingContainer';

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  // Tab Styles
  tabContainer: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: AppColors.brand.primary,
  },
  tabbarIndicator: {
    backgroundColor: '#FFF',
  },
  tabbarText: {
    color: '#FFF',
  },
});

/* Component ==================================================================== */
class MyFavorites extends Component {
  static componentName = 'MyFavorites';

  render = () => (
    <View style={styles.tabContainer}>
      <MealListing
        meal={'myFavs'}
      />
    </View>
    );
}

/* Export Component ==================================================================== */
export default MyFavorites;
