import { connect } from 'react-redux';

import * as RecipeActions from '@redux/recipes/actions';

import RecipeRender from './RecipeView';

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = {
  deleteIdea: RecipeActions.deleteIdea,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeRender);
