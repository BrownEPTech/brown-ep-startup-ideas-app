import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Image,
  Platform,
  View,
  StyleSheet,
} from 'react-native';
import FormValidation from 'tcomb-form-native';
import ImagePicker from 'react-native-image-picker';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { web as openLink } from 'react-native-communications';
import { SocialIcon } from 'react-native-elements';

import TcombTextInput from '@components/tcomb/TextInput';

// Consts and Libs
import { AppStyles, AppColors, AppSizes } from '@theme/';

// Components
import { Alerts, Button, Card, Spacer, Text } from '@ui/';

/* Styles ==================================================================== */
const styles = StyleSheet.create({
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
let redirectTimeout;

class AddItemForm extends Component {
  static componentName = 'AddItemForm';

  static propTypes = {
    user: PropTypes.shape({
      email: PropTypes.string,
      uid: PropTypes.string,
    }),
    submit: PropTypes.func,
    uploadImage: PropTypes.func,
  };

  static defaultProps = {
    user: null,
    submit: null,
    uploadImage: null,
  };

  constructor(props) {
    super(props);
    this.resetFormState(props);
  }

  componentWillUnmount = () => clearTimeout(redirectTimeout);

  resetFormState = (props) => {
    const formFields = {};
    formFields.Title = FormValidation.String;
    formFields.Description = FormValidation.String;
    formFields.Body = FormValidation.String;
    formFields.ContactEmail = FormValidation.maybe(this.validEmail);
    formFields.ContactPhone = FormValidation.maybe(FormValidation.String);
    formFields.ContactWebsite = FormValidation.maybe(FormValidation.String);

    this.state = {
      resultMsg: {
        status: '',
        success: '',
        error: '',
      },
      imageURI: null,
      uploadedImageURL: null,
      form_fields: FormValidation.struct(formFields),
      form_values: {
        ContactEmail: (props.user && props.user.email) ? props.user.email : '',
      },
      options: {
        fields: {
          Title: {
            template: TcombTextInput,
            error: 'Please enter a title for your project or idea.',
            maxLength: 40,
            multiline: true,
          },
          Description: {
            template: TcombTextInput,
            error: 'Please enter a short description for your project or idea.',
            multiline: true,
          },
          Body: {
            template: TcombTextInput,
            error: 'Please enter some information about your project or idea.',
            clearButtonMode: 'while-editing',
            multiline: true,
          },
          ContactEmail: {
            template: TcombTextInput,
            error: 'Please enter a valid email.',
          },
          ContactPhone: {
            template: TcombTextInput,
          },
          ContactWebsite: {
            template: TcombTextInput,
          },
        },
      },
    };
  }

  validEmail = FormValidation.refinement(
    FormValidation.String, (email) => {
      const regularExpression = /^.+@.+\..+$/i;

      return regularExpression.test(email);
    },
  );

  pickImage = () => {
    const formValues = this.form.getValue();
    ImagePicker.launchImageLibrary({}, (response) => {
      if (response && response.uri) {
        const { uri } = response;
        const imageURI = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        this.setState({ imageURI, form_values: formValues });
        console.log('imageURI', imageURI);
      }
    });
  }

  submitFormData = (formData) => {
    if (this.props.submit) {
      this.props.submit(formData, this.state.uploadedImageURL).then(() => {
        this.setState({
          resultMsg: { success: 'Success! Your submission was added.' },
        }, () => {
          // Timeout to ensure success message is seen/read by user
          redirectTimeout = setTimeout(() => {
            this.resetFormState(this.props);
            Actions.recipes();
          }, 500);

          return true;
        });
      }).catch(err => this.setState({ resultMsg: { error: err.message } }));
    } else {
      this.setState({ resultMsg: { error: 'Submit function missing' } });
    }
  }

  handleSubmit = () => {
    const formData = this.form.getValue();
    if (formData) {
      this.setState({ form_values: formData }, () => {
        this.setState({ resultMsg: { status: 'One moment...' } });

        // Scroll to top, to show message
        if (this.scrollView) this.scrollView.scrollToPosition(0, 0, true);

        if (this.state.imageURI && this.props.uploadImage) {
          this.props.uploadImage(this.state.imageURI).then((uploadedImageURL) => {
            this.setState({ uploadedImageURL }, () => {
              this.submitFormData(formData);
            });
          }).catch(err => this.setState({ resultMsg: { error: err.message } }));
        } else {
          this.submitFormData(formData);
        }
      });
    }
    return true;
  }

  render = () => {
    const Form = FormValidation.form.Form;
    return this.props.user && this.props.user.uid
      ?
        <KeyboardAwareScrollView
          automaticallyAdjustContentInsets={false}
          ref={(a) => { this.scrollView = a; }}
          style={[AppStyles.container]}
        >
          <Card>
            <Alerts
              status={this.state.resultMsg.status}
              success={this.state.resultMsg.success}
              error={this.state.resultMsg.error}
            />

            <Form
              ref={(b) => { this.form = b; }}
              type={this.state.form_fields}
              value={this.state.form_values}
              options={this.state.options}
            />

            <Spacer size={10} />
            <Text p style={[{ fontWeight: 'bold' }]}>
              {`Image${this.state.imageURI ? ' (selected)' : ''}`}
            </Text>

            <Button
              small
              title={this.state.imageURI ? 'Upload Different Image' : 'Upload Image'}
              backgroundColor={AppColors.brownEPTheme.intenseRed}
              onPress={this.pickImage}
            />

            <Spacer size={25} />

            <Button
              title="Submit"
              onPress={this.handleSubmit}
              backgroundColor={AppColors.brownEPTheme.intenseRed}
            />

            <Spacer size={10} />
          </Card>
        </KeyboardAwareScrollView>
      :
      (
        <View style={[AppStyles.container]}>
          <Spacer size={20} />
          <Text h5 style={[AppStyles.textCenterAligned, styles.blackText]}>
            Please login or sign up to add a new item.
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
              source={require('../../../images/made-by-brown-ep.png')}
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
      );
  }
}

export default AddItemForm;
