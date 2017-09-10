/**
 * Recipe Actions
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */

 /* global window */
import { Firebase, FirebaseRef, FirebaseStorageRef } from '@constants/';
import RNFetchBlob from 'react-native-fetch-blob';
/**
  * Get this User's Favourite Recipes
  */
export function getFavourites(dispatch) {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  const UID = Firebase.auth().currentUser.uid;
  if (!UID) return false;

  const ref = FirebaseRef.child(`favourites/${UID}`);

  return ref.on('value', (snapshot) => {
    const favs = snapshot.val() || [];

    return dispatch({
      type: 'FAVOURITES_REPLACE',
      data: favs,
    });
  });
}

/**
  * Reset a User's Favourite Recipes in Redux (eg for logou)
  */
export function resetFavourites(dispatch) {
  return dispatch({
    type: 'FAVOURITES_REPLACE',
    data: [],
  });
}

/**
  * Update My Favourites Recipes
  */
export function replaceFavourites(newFavourites) {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  const UID = Firebase.auth().currentUser.uid;
  if (!UID) return false;

  return () => FirebaseRef.child(`favourites/${UID}`).set(newFavourites);
}

/**
  * Get Meals
  */
export function getMeals() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Firebase.Promise((resolve) => {
    const ref = FirebaseRef.child('meals');

    return ref.once('value').then((snapshot) => {
      const meals = snapshot.val() || {};

      return resolve(dispatch({
        type: 'MEALS_REPLACE',
        data: meals,
      }));
    });
  });
}

/**
  * Get Recipes
  */
export function getRecipes() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Firebase.Promise((resolve) => {
    const ref = FirebaseRef.child('recipes');

    return ref.on('value', (snapshot) => {
      const recipes = snapshot.val() || {};

      return resolve(dispatch({
        type: 'RECIPES_REPLACE',
        data: recipes,
      }));
    });
  });
}

export function addIdea(formData, imageURL) {
  if (Firebase === null) return () => new Promise(resolve => resolve());
  return () => new Firebase.Promise((resolve) => {
    const UID = Firebase.auth().currentUser.uid;
    if (!UID) return false;
    const ref = FirebaseRef.child('recipes');
    const newEntryRef = ref.push();
    const id = newEntryRef.key;
    const { Title: title, Description: description, Body: body,
      ContactEmail: contactEmail, ContactPhone: contactPhone,
      ContactWebsite: contactWebsite } = formData;
    return resolve(newEntryRef.set({
      id,
      title,
      description,
      body,
      contactEmail,
      contactPhone,
      contactWebsite,
      user: UID,
      createdOn: Firebase.database.ServerValue.TIMESTAMP,
      numFavorites: 0,
      image: imageURL,
    }));
  });
}

export function deleteIdea(idea) {
  if (Firebase === null) return () => new Promise(resolve => resolve());
  return () => new Firebase.Promise((resolve) => {
    const UID = Firebase.auth().currentUser.uid;
    if (!UID || !idea || idea.user !== UID) return false;
    return resolve(FirebaseRef.child('recipes').child(idea.id).remove());
  });
}

export function uploadImage(uploadURI) {
  const Blob = RNFetchBlob.polyfill.Blob;
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
  window.Blob = Blob;
  const fs = RNFetchBlob.fs;
  const mime = 'application/octet-stream';
  return () => new Firebase.Promise((resolve, reject) => {
    const timestamp = new Date().getTime().toString();
    console.log('timestamp', timestamp);
    let uploadBlob = null;
    const imageRef = FirebaseStorageRef.child(`images/${timestamp}`);

    fs.readFile(uploadURI, 'base64')
      .then(data => Blob.build(data, { type: `${mime};BASE64` }))
      .then((blob) => {
        uploadBlob = blob;
        return imageRef.put(blob, { contentType: mime });
      })
      .then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL();
      })
      .then((url) => {
        resolve(url);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function updateFavoriteCount(id, updateAmount) {
  return () => new Firebase.Promise((resolve) => {
    const ref = FirebaseRef.child('recipes').child(id).child('numFavorites');
    return resolve(ref.transaction(numFavorites => (numFavorites || 0) + updateAmount));
  });
}
