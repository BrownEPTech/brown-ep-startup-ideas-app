import { connect } from 'react-redux';

import * as RecipeActions from '@redux/recipes/actions';

import AddItemFormRender from './AddView';

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = {
  submit: RecipeActions.addIdea,
  uploadImage: RecipeActions.uploadImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddItemFormRender);
