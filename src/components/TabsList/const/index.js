export const TABS = {
  RECIPES: 'recipes',
  MY_RECIPES: 'my-recipes',
  FAVORITES: 'favorites',
  FOLLOWERS: 'followers',
  MY_FOLLOWERS: 'my-followers',
  FOLLOWING: 'following',
};

export const PRIVATE_TABS = [
  { tab: TABS.MY_RECIPES, label: 'My Recipes' },
  { tab: TABS.FAVORITES, label: 'My Favorites' },
  { tab: TABS.MY_FOLLOWERS, label: 'Followers' },
  { tab: TABS.FOLLOWING, label: 'Following' },
];

export const USER_TABS = [
  { tab: TABS.RECIPES, label: 'Recipes' },
  { tab: TABS.FOLLOWERS, label: 'Followers' },
];
