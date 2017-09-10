import { connect } from 'react-redux';

import StyleGuideRender from './StyleGuideView';

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(StyleGuideRender);
