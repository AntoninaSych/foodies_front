import RecipePreview from '../RecipePreview/RecipePreview';
import UserCard from '../UserCard/UserCard';
import styles from './ListItems.module.css';
import { useState } from 'react';

const ListItems = ({ currentTab, items = [] }) => {
  const isRecipeTab = ['my-recipes', 'my-favorites'].includes(currentTab);
  const isUserTab = ['followers', 'following'].includes(currentTab);

  const [visibleItems, setVisibleItems] = useState(items);

  const handleUnfollowRemove = userId => {
    setVisibleItems(prev =>
      prev.filter(user => (user._id || user.id) !== userId)
    );
  };

  if (!visibleItems || visibleItems.length === 0) {
    return <div className={styles.empty}>No items to display.</div>;
  }

  return (
    <div className={styles.list}>
      {isRecipeTab &&
        visibleItems.map(recipe => (
          <RecipePreview
            key={recipe._id || recipe.id}
            recipe={recipe}
            isFavorite={currentTab === 'my-favorites'}
            isOwnProfile={currentTab === 'my-recipes'}
          />
        ))}

      {isUserTab &&
        visibleItems.map(user => (
          <UserCard
            key={user._id || user.id}
            user={user}
            activeTab={currentTab}
            onUnfollow={
              currentTab === 'following' ? handleUnfollowRemove : undefined
            }
          />
        ))}
    </div>
  );
};

export default ListItems;
