/**
 * Recipe Default Store
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
export default {
  meals: [
    { id: 1, title: 'Popular' },
    { id: 2, title: 'Latest' },
  ],
  recipes: [
    {
      id: 1,
      title: 'Brown EP',
      description: 'The Brown Entrepreneurship Program (Brown EP) is the main student entrepreneurship initiative at Brown University. Our mission is to ignite the entrepreneurial spirit of the students on College Hill.',
      body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
      user: 'wdencker@gmail.com',
      contactEmail: 'wesley_dencker@brown.edu',
      contactPhone: '3038687124',
      contactWebsite: 'http://brownentrepreneurship.com/',
      image: 'https://static1.squarespace.com/static/54b7eb8fe4b089bfadc6da24/t/551c56e4e4b0440bd8480648/1427920618272/Gates+try+newest+3.jpg?format=1500w',
      createdOn: 1503989984020,
      numFavorites: 5,
    },
    {
      id: 2,
      title: 'Brown EP 2',
      description: 'Making entrepreneurship happen at Brown and RISD',
      body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
      user: 'wdencker@gmail.com',
      contactEmail: 'wesley_dencker@brown.edu',
      contactPhone: '3038687124',
      contactWebsite: 'innovateonthehill.com',
      image: 'https://static1.squarespace.com/static/54b7eb8fe4b089bfadc6da24/t/57d625bb44024343d19f1ad1/1498016742392/',
      createdOn: 1503990007992,
      numFavorites: 1,
    },
  ],
  favourites: [],
};
