export const currentApi = (keyword = "a") =>
  `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${keyword}`;

export default currentApi;
