export const selectRecipes = state => state.recipes.items;
export const selectLoading = state => state.recipes.loading;
export const selectError = state => state.recipes.error;
export const selectFavoriteRecipes = state => state.recipes.favorites;
export const selectPopularRecipes = state => state.recipes.popular;
