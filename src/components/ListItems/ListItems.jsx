import { useEffect, useState } from 'react';
import RecipePreview from '../RecipePreview/RecipePreview';
import UserCard from '../UserCard/UserCard';
import { TABS } from '../TabsList/const';
import Message from '../Message/Message';
import css from './ListItems.module.css';
import clsx from 'clsx';

const ListItems = ({ currentTab, isOwnProfile, items }) => {
  const [visibleItems, setVisibleItems] = useState(items);
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

  const handleUnfollowRemove = userId => {
    setVisibleItems(prev => prev.filter(user => user.id !== userId));
  };

  const handleFavoriteRemove = recipeId => {
    setVisibleItems(prev => prev.filter(recipe => recipe.id !== recipeId));
  };

  const handleRecipeRemove = recipeId => {
    setVisibleItems(prev => prev.filter(recipe => recipe.id !== recipeId));
  };

  useEffect(() => {
    if (items.length) {
      setVisibleItems(items);
    }
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
            handleRemove={handleRecipeRemove}
            handleFavoriteRemove={handleFavoriteRemove}
            key={recipe.id}
            recipe={recipe}
            isFavorites={currentTab === TABS.FAVORITES}
            isOwnProfile={currentTab === TABS.MY_RECIPES}
          />
        ))}

      {showUserCard &&
        visibleItems.map(user => (
          <UserCard
            key={user.id}
            user={user}
            activeTab={currentTab}
            onUnfollow={
              isOwnProfile && currentTab === TABS.FOLLOWING
                ? handleUnfollowRemove
                : undefined
            }
          />
        ))}
    </div>
  );
};

export default ListItems;
