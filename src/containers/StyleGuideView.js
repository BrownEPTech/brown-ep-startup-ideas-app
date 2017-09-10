/**
 * Style Guide
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Alert,
  ListView,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import { SocialIcon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { web as openLink } from 'react-native-communications';

// Consts and Libs
import { AppColors, AppStyles, AppSizes } from '@theme/';

// Components
import {
  Alerts,
  Button,
  Card,
  Spacer,
  Text,
  List,
  ListItem,
  FormInput,
  FormLabel,
} from '@components/ui/';

// Example Data
const rowData = [
  { title: 'My Submissions', icon: 'receipt' },
  { title: 'My Favorites', icon: 'grade' },
];

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  blackText: {
    color: '#000',
  },
  madeByImage: {
    left: 0,
    right: 0,
    height: (AppSizes.screen.width - 30) * 0.1,
    width: '100%',
    resizeMode: 'cover',
    backgroundColor: 'green',
  },
});

/* Component ==================================================================== */
class StyleGuide extends Component {
  static componentName = 'StyleGuide';

  static propTypes = {
    user: PropTypes.shape({
      uid: PropTypes.string,
    }),
  };

  static defaultProps = {
    user: null,
  };

  constructor(props) {
    super(props);

    // Setup ListViews
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: ds.cloneWithRows(rowData),
      imageHeight: 0,
    };
  }

  renderRow = (data, sectionID) => (
    <ListItem
      key={`list-row-${sectionID}`}
      onPress={Actions.comingSoon}
      title={data.title}
      subtitle={data.role || null}
      leftIcon={data.icon ? { name: data.icon } : null}
      avatar={data.avatar ? { uri: data.avatar } : null}
      roundAvatar={!!data.avatar}
    />
  )

  render = () => (this.props.user && this.props.user.uid ? (
    <View style={styles.viewContainer}>
      <ScrollView
        automaticallyAdjustContentInsets={false}
        style={[AppStyles.container]}
      >
        <List>
          <ListView
            renderRow={this.renderRow}
            dataSource={this.state.dataSource}
          />
        </List>
        <Card>
          <Image
            source={require('../images/made-by-brown-ep.png')}
            style={[styles.madeByImage]}
          />
          <Spacer size={10} />
          <View style={[AppStyles.row, AppStyles.centerAligned]}>
            <SocialIcon type={'facebook'} onPress={() => openLink('https://www.facebook.com/BrownuniversityEP')} />
            <SocialIcon type={'instagram'} onPress={() => openLink('https://www.instagram.com/brown_ep/')} />
            <SocialIcon type={'youtube'} onPress={() => openLink('https://www.youtube.com/channel/UCJSsI7OYxz9WxENsN_P0lCw')} />
          </View>
        </Card>
      </ScrollView>
    </View>
  )
  :
  (
    <View style={[AppStyles.container]}>
      <Spacer size={20} />
      <Text h5 style={[AppStyles.textCenterAligned, styles.blackText]}>
        Please login or sign up to view your favorites.
      </Text>

      <Spacer size={10} />

      <View style={[AppStyles.row, AppStyles.paddingHorizontal]}>
        <View style={[AppStyles.flex1]}>
          <Button
            title={'Login'}
            icon={{ name: 'lock' }}
            onPress={Actions.login}
            backgroundColor={AppColors.brownEPTheme.intenseRed}
          />
        </View>
      </View>

      <Spacer size={10} />

      <View style={[AppStyles.row, AppStyles.paddingHorizontal]}>
        <View style={[AppStyles.flex1]}>
          <Button
            title={'Sign Up'}
            icon={{ name: 'face' }}
            onPress={Actions.signUp}
            backgroundColor={AppColors.brownEPTheme.intenseRed}
          />
        </View>
      </View>

      <Spacer size={10} />

      <Card>
        <Image
          source={require('../images/made-by-brown-ep.png')}
          style={[styles.madeByImage]}
        />
        <Spacer size={10} />
        <View style={[AppStyles.row, AppStyles.centerAligned]}>
          <SocialIcon type={'facebook'} onPress={() => openLink('https://www.facebook.com/BrownuniversityEP')} />
          <SocialIcon type={'instagram'} onPress={() => openLink('https://www.instagram.com/brown_ep/')} />
          <SocialIcon type={'youtube'} onPress={() => openLink('https://www.youtube.com/channel/UCJSsI7OYxz9WxENsN_P0lCw')} />
        </View>
      </Card>
    </View>
  ))
}

/* Export Component ==================================================================== */
export default StyleGuide;
