/**
 * Tabs Scenes
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React from 'react';
import { Scene } from 'react-native-router-flux';

// Consts and Libs
import { AppConfig } from '@constants/';
import { AppStyles, AppSizes } from '@theme/';

// Components
import { TabIcon } from '@ui/';
import { NavbarMenuButton } from '@containers/ui/NavbarMenuButton/NavbarMenuButtonContainer';

// Scenes
import Placeholder from '@components/general/Placeholder';
import Error from '@components/general/Error';
import StyleGuide from '@containers/StyleGuideContainer';
import Recipes from '@containers/recipes/Browse/BrowseContainer';
import RecipeView from '@containers/recipes/RecipeContainer';
import AddItemForm from '@containers/recipes/Add/AddContainer';
import MySubmissions from '@containers/recipes/MySubmissions/MySubmissionsView';
import MyFavorites from '@containers/recipes/MyFavorites/MyFavoritesView';

const navbarPropsTabs = {
  ...AppConfig.navbarProps,
  renderLeftButton: () => <NavbarMenuButton />,
  sceneStyle: {
    ...AppConfig.navbarProps.sceneStyle,
    paddingBottom: AppSizes.tabbarHeight,
  },
};

/* Routes ==================================================================== */
const scenes = (
  <Scene key={'tabBar'} tabs tabBarIconContainerStyle={AppStyles.tabbar} pressOpacity={0.95}>
    <Scene
      {...navbarPropsTabs}
      key={'recipes'}
      title={'Explore Projects and Ideas'}
      icon={props => TabIcon({ ...props, icon: 'apps' })}
    >
      <Scene
        {...navbarPropsTabs}
        key={'recipesListing'}
        component={Recipes}
        title={'Explore Projects and Ideas'}
        analyticsDesc={'Recipes: Browse Recipes'}
      />
      <Scene
        {...AppConfig.navbarProps}
        key={'recipeView'}
        component={RecipeView}
        getTitle={props => ((props.title) ? props.title : 'View Idea')}
        analyticsDesc={'RecipeView: View Recipe'}
      />
    </Scene>

    <Scene
      key={'timeline'}
      {...navbarPropsTabs}
      title={'Add a New Project or Idea'}
      component={AddItemForm}
      icon={props => TabIcon({ ...props, icon: 'add' })}
      analyticsDesc={'Placeholder: Coming Soon'}
    />

    {/*<Scene
      key={'error'}
      {...navbarPropsTabs}
      title={'Example Error'}
      component={Error}
      icon={props => TabIcon({ ...props, icon: 'error' })}
      analyticsDesc={'Error: Example Error'}
    />*/}
    <Scene
      {...navbarPropsTabs}
      key={'manageIdeas'}
      title={'My Projects and Ideas'}
      icon={props => TabIcon({ ...props, icon: 'account-circle' })}
    >
      <Scene
        key={'styleGuide'}
        {...navbarPropsTabs}
        title={'My Projects and Ideas'}
        component={StyleGuide}
        analyticsDesc={'My Ideas: Manage Ideas'}
      />
      <Scene
        key={'mySubmissions'}
        {...navbarPropsTabs}
        title={'My Submissions'}
        component={MySubmissions}
        analyticsDesc={'My Submissions: Manage Submissions'}
      />
      <Scene
        key={'myFavorites'}
        {...navbarPropsTabs}
        title={'My Favorites'}
        component={MyFavorites}
        analyticsDesc={'My Favorites: See Favorites'}
      />
    </Scene>
  </Scene>
);

export default scenes;
