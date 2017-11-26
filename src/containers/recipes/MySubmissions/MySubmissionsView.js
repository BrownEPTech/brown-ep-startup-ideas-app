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
class MySubmissions extends Component {
  static componentName = 'MySubmissions';

  render = () => (
    <View style={styles.tabContainer}>
      <MealListing
        meal={'myIdeas'}
      />
    </View>
    );
}

/* Export Component ==================================================================== */
export default MySubmissions;
