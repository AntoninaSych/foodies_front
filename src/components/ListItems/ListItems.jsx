import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import RecipePreview from '../RecipePreview/RecipePreview';
import UserCard from '../UserCard/UserCard';
import { TABS } from '../TabsList/const';
import Message from '../Message/Message';
import { selectFollowing } from '../../redux/users/selectors';
import { selectFavoriteRecipes } from '../../redux/recipes/selectors';
import { selectUser } from '../../redux/auth/selectors';
import css from './ListItems.module.css';

const ListItems = ({ currentTab, items, isOwnProfile }) => {
  const [visibleItems, setVisibleItems] = useState(items);
  const authUser = useSelector(selectUser);
  const favorites = useSelector(selectFavoriteRecipes);
  const following = useSelector(selectFollowing);

  const showRecipePreview = [
    TABS.RECIPES,
    TABS.MY_RECIPES,
    TABS.FAVORITES,
  ].includes(currentTab);
  const showUserCard = [
    TABS.FOLLOWERS,
    TABS.MY_FOLLOWERS,
    TABS.FOLLOWING,
  ].includes(currentTab);

  const handleUnfollow = userId => {
    if (currentTab === TABS.FOLLOWING) {
      setVisibleItems(prev => prev.filter(user => user.id !== userId));
    }
  };

  const handleFavoriteRemove = recipeId => {
    setVisibleItems(prev => prev.filter(recipe => recipe.id !== recipeId));
  };

  const handleRecipeRemove = recipeId => {
    setVisibleItems(prev => prev.filter(recipe => recipe.id !== recipeId));
  };

  const isFollowing = userId => {
    if (Array.isArray(following)) {
      return following.some(item => item.id === userId);
    }
    return false;
  };

  const isFavorite = recipeId => {
    if (Array.isArray(favorites)) {
      return favorites.some(item => item.id === recipeId);
    }
    return false;
  };

  useEffect(() => {
    setVisibleItems(items);
  }, [items]);

  const showMessage = () => {
    if (currentTab === TABS.FOLLOWING) {
      return 'Your account currently has no subscriptions to other users. Learn more about our users and select those whose content interests you.';
    }
    if (currentTab === TABS.MY_FOLLOWERS) {
      return 'There are currently no followers on your account. Please engage our visitors with interesting content and draw their attention to your profile.';
    }
    if (currentTab === TABS.FOLLOWERS) {
      return 'There are currently no followers on this account.';
    }
    if (currentTab === TABS.FAVORITES) {
      return 'Nothing has been added to your favorite recipes list yet. Please browse our recipes and add your favorites for easy access in the future.';
    }
    if (currentTab === TABS.MY_RECIPES) {
      return 'Nothing has been added to your recipes list yet. Please browse our recipes and add your favorites for easy access in the future.';
    }
    if (currentTab === TABS.RECIPES) {
      return 'Nothing has been added to recipes list of this account.';
    }

    return 'No data found.';
  };

  if (!visibleItems || visibleItems.length === 0) {
    return <Message className={css.message}>{showMessage()}</Message>;
  }

  return (
    <div className={clsx(css.list)}>
      {showRecipePreview &&
        visibleItems.map(recipe => (
          <RecipePreview
            key={recipe.id}
            recipe={recipe}
            handleFavoriteRemove={handleFavoriteRemove}
            handleRemove={handleRecipeRemove}
            isFavorite={isFavorite(recipe.id)}
            isFavorites={currentTab === TABS.FAVORITES}
            isOwnProfile={isOwnProfile}
          />
        ))}

      {showUserCard &&
        visibleItems.map(user => (
          <UserCard
            key={user.id}
            user={user}
            currentUser={authUser.id === user.id}
            handleUnfollow={handleUnfollow}
            isFollowing={isFollowing(user.id)}
          />
        ))}
    </div>
  );
};

export default ListItems;
