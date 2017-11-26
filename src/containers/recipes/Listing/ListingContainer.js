/**
 * List of Recipes for a Meal Container
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Actions
import * as RecipeActions from '@redux/recipes/actions';

// Components
import Loading from '@components/general/Loading';
import RecipeListingRender from './ListingView';

/* Redux ==================================================================== */
// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  recipes: state.recipe.recipes || [],
  user: state.user,
  favourites: (state.recipe && state.recipe.favourites) ? state.recipe.favourites : null,
});

// Any actions to map to the component?
const mapDispatchToProps = {
  getRecipes: RecipeActions.getRecipes,
};

/* Component ==================================================================== */
class MealListing extends Component {
  static componentName = 'MealListing';

  static propTypes = {
    recipes: PropTypes.arrayOf(PropTypes.object),
    meal: PropTypes.string.isRequired,
    getRecipes: PropTypes.func.isRequired,
    user: PropTypes.shape({
      uid: PropTypes.string,
    }),
    favourites: PropTypes.arrayOf(PropTypes.string),
  }

  static defaultProps = {
    recipes: [],
    user: null,
    favourites: null,
  }

  state = {
    loading: false,
    recipes: [],
  }

  componentDidMount = () => this.getItemsForTab(this.props.recipes);
  componentWillReceiveProps = props => this.getItemsForTab(props.recipes);

  /**
    * Pick out recipes that are in the current meal
    * And hide loading state
    */
  // getThisMealsRecipes = (allRecipes) => {
  //   console.log('meal recipes called');
  //   if (allRecipes.length > 0) {
  //     const recipes = allRecipes.filter(recipe =>
  //       recipe.category.toString() === this.props.meal.toString(),
  //     );
  //
  //     this.setState({
  //       recipes,
  //       loading: false,
  //     });
  //   }
  // }

  getItemsForTab = (allRecipes) => {
    if (allRecipes.length > 0) {
      let recipes = allRecipes.slice(0);
      if (this.props.meal === '1') {
        // popular
        recipes.sort((item1, item2) =>
          item2.numFavorites - item1.numFavorites,
        );
      } else if (this.props.meal === '2') {
        // latest
        recipes.sort((item1, item2) =>
          item2.createdOn - item1.createdOn,
        );
      } else if (this.props.meal === 'myIdeas') {
        recipes = allRecipes.filter(recipe =>
          this.props.user && this.props.user.uid === recipe.user,
        );
      } else if (this.props.meal === 'myFavs') {
        recipes = allRecipes.filter(recipe =>
          // true,
          this.props.favourites && this.props.favourites.indexOf(recipe.id) > -1,
        );
      } else {
        throw new Error('invalid tab');
      }

      this.setState({
        recipes,
        loading: false,
      });
    }
  }

  /**
    * Fetch Data from API
    */
  fetchRecipes = () => this.props.getRecipes()
    .then(() => this.setState({ error: null, loading: false }))
    .catch(err => this.setState({ error: err.message, loading: false }))

  render = () => {
    if (this.state.loading) return <Loading />;

    return (
      <RecipeListingRender
        recipes={this.state.recipes}
        reFetch={this.fetchRecipes}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MealListing);
