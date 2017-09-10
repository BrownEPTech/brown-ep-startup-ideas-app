/**
 * Recipe View Screen
 *  - The individual recipe screen
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import {
  email as sendEmail,
  text as sendText,
  web as openLink } from 'react-native-communications';
import {
  Alert,
  View,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';

// Consts and Libs
import { AppColors, AppStyles, AppSizes } from '@theme/';

// Components
import { Button, Card, Spacer, Text } from '@ui/';

/* Component ==================================================================== */
class RecipeView extends Component {
  static componentName = 'RecipeView';

  static propTypes = {
    recipe: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      body: PropTypes.string,
      contactEmail: PropTypes.string,
      contactPhone: PropTypes.string,
      contactWebsite: PropTypes.string,
      image: PropTypes.string,
      user: PropTypes.string,
    }).isRequired,
    user: PropTypes.shape({
      uid: PropTypes.string,
    }),
    deleteIdea: PropTypes.func,
  };

  static defaultProps = {
    user: null,
    deleteIdea: null,
  };

  state = {
    imageHeight: 0,
  };

  componentDidMount = () => {
    const { image } = this.props.recipe;
    if (image && image !== '') {
      Image.getSize(image, (width, height) => {
        this.setState({
          imageHeight: Math.min(AppSizes.screen.width * (height / width),
            AppSizes.screen.height * 0.4),
        });
      });
    }
  }

  handleDelete = () => {
    Alert.alert(
      'Are you sure you want to delete your submission?',
      'This action cannot be undone.',
      [
        { text: 'Cancel' },
        { text: 'Delete',
          onPress: () => {
            if (this.props.deleteIdea) {
              this.props.deleteIdea(this.props.recipe).then(() => {
                Alert.alert('Your submission was successfully deleted.',
                null,
                  [{ text: 'OK',
                    onPress: () => {
                      Actions.app({ type: 'reset' });
                      Actions.pop();
                    } }]);
              });
            }
          } },
      ],
    );
  };

  /**
    * Method
    */
  renderMethod = (method) => {
    const jsx = [];
    let iterator = 1;

    method.forEach((item) => {
      jsx.push(
        <View key={`method-${iterator}`} style={[AppStyles.row]}>
          <View><Text> {iterator}. </Text></View>
          <View style={[AppStyles.paddingBottomSml, AppStyles.paddingLeftSml, AppStyles.flex1]}>
            <Text>{item.toString()}</Text>
          </View>
        </View>,
      );
      iterator += 1;
    });

    return jsx;
  }

  render = () => {
    const { title, description, image, body, contactEmail,
      contactPhone, contactWebsite, user } = this.props.recipe;
    const uid = this.props.user ? this.props.user.uid : null;
    const styles = StyleSheet.create({
      featuredImage: {
        left: 0,
        right: 0,
        height: this.state.imageHeight,
        resizeMode: 'cover',
        backgroundColor: '#FFF',
      },
    });

    return (
      <ScrollView style={[AppStyles.container]}>
        {image !== '' &&
          <Image
            source={{ uri: image }}
            style={[styles.featuredImage]}
          />
        }

        <Card>
          <Text h1>{title}</Text>
          <Text>{description}</Text>
        </Card>

        {body &&
          <Card>
            <Text h2>Information</Text>
            <Text>{body}</Text>
          </Card>
        }

        {(contactEmail || contactPhone || contactWebsite) &&
          <Card>
            <Text h2>Contact</Text>
            {contactEmail && <Button
              title={contactEmail}
              backgroundColor={AppColors.brownEPTheme.intenseRed}
              icon={{ name: 'email' }}
              onPress={() => sendEmail(contactEmail, null, null, null, null)}
            />
            }
            {(contactEmail && (contactPhone || contactWebsite)) && <Spacer size={5} />}

            {contactPhone && <Button
              title={contactPhone}
              backgroundColor={AppColors.brownEPTheme.intenseRed}
              icon={{ name: 'phone' }}
              onPress={() => sendText(contactPhone)}
            />}

            {(contactPhone && contactWebsite) && <Spacer size={5} />}

            {contactWebsite && <Button
              title={contactWebsite.replace(/^https?:\/\//i, '').replace(/\/$/, '')}
              backgroundColor={AppColors.brownEPTheme.intenseRed}
              icon={{ name: 'computer' }}
              onPress={() => openLink(/^https?:\/\//i.test(contactWebsite) ? contactWebsite : `http://${contactWebsite}`)}
            />}
          </Card>
        }

        {uid && user === uid &&
          <Card>
            <Text h2>Your Submission</Text>
            <Button
              title="Delete Submission"
              backgroundColor={AppColors.brownEPTheme.intenseRed}
              onPress={this.handleDelete}
            />
          </Card>
        }

        <Spacer size={60} />
      </ScrollView>
    );
  }
}

/* Export Component ==================================================================== */
export default RecipeView;
