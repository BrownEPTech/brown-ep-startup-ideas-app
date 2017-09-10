/**
 * Recipe Reducer
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import Store from './store';

// Set initial state
export const initialState = Store;

export default function recipeReducer(state = initialState, action) {
  switch (action.type) {
    case 'FAVOURITES_REPLACE': {
      return {
        ...state,
        favourites: action.data || [],
      };
    }
    case 'MEALS_REPLACE': {
      return {
        ...state,
        meals: action.data,
      };
    }
    case 'RECIPES_REPLACE': {
      let recipes = [];

      // Pick out the props I need
      if (action.data && typeof action.data === 'object') {
        recipes = Object.values(action.data).map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          body: item.body,
          user: item.user,
          contactEmail: item.contactEmail,
          contactPhone: item.contactPhone,
          contactWebsite: item.contactWebsite,
          image: item.image,
          createdOn: item.createdOn,
          numFavorites: item.numFavorites,
        }));
      }

      return {
        ...state,
        recipes,
      };
    }
    default:
      return state;
  }
}
