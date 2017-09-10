/**
 * Recipe View Screen
 *  - The individual recipe screen
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  email as sendEmail,
  text as sendText,
  web as openLink } from 'react-native-communications';
import {
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
      information: PropTypes.string,
      contactEmail: PropTypes.string,
      contactPhone: PropTypes.string,
      contactWebsite: PropTypes.string,
      image: PropTypes.string,
    }).isRequired,
  }

  state = {
    imageHeight: 0,
  }

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

  /**
    * Ingredients
    */
  renderIngredients = (ingredients) => {
    const jsx = [];
    let iterator = 1;

    ingredients.forEach((item) => {
      jsx.push(
        <View key={`ingredient-${iterator}`} style={[AppStyles.row]}>
          <View><Text> - </Text></View>
          <View style={[AppStyles.paddingLeftSml, AppStyles.flex1]}>
            <Text>{item.toString()}</Text>
          </View>
        </View>,
      );
      iterator += 1;
    });

    return jsx;
  }

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
    const { title, description, image, information, contactEmail,
      contactPhone, contactWebsite } = this.props.recipe;
    const styles = StyleSheet.create({
      featuredImage: {
        left: 0,
        right: 0,
        height: this.state.imageHeight,
        resizeMode: 'cover',
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

        {information &&
          <Card>
            <Text h2>Information</Text>
            <Text>{information}</Text>
          </Card>
        }

        {(contactEmail || contactPhone || contactWebsite) &&
          <Card>
            <Text h2>Contact</Text>
            {contactEmail && <Button
              title={contactEmail}
              backgroundColor={AppColors.brownEPTheme.red1}
              icon={{ name: 'email' }}
              onPress={() => sendEmail(contactEmail, null, null, null, null)}
            />
            }
            {(contactEmail && (contactPhone || contactWebsite)) && <Spacer size={5} />}

            {contactPhone && <Button
              title={contactPhone}
              backgroundColor={AppColors.brownEPTheme.red1}
              icon={{ name: 'phone' }}
              onPress={() => sendText(contactPhone)}
            />}

            {(contactPhone && contactWebsite) && <Spacer size={5} />}

            {contactWebsite && <Button
              title={contactWebsite.replace(/^https?:\/\//i, '').replace(/\/$/, '')}
              backgroundColor={AppColors.brownEPTheme.red1}
              icon={{ name: 'computer' }}
              onPress={() => openLink(/^https?:\/\//i.test(contactWebsite) ? contactWebsite : `http://${contactWebsite}`)}
            />}
          </Card>
        }

        <Spacer size={60} />
      </ScrollView>
    );
  }
}

/* Export Component ==================================================================== */
export default RecipeView;
