import RecipePreview from '../RecipePreview/RecipePreview';
import UserCard from '../UserCard/UserCard';
import styles from './ListItems.module.css';

const ListItems = ({ activeTab, items = [] }) => {
  const isRecipeTab = ['my-recipes', 'my-favorites', 'recipes'].includes(
    activeTab
  );
  const isUserTab = ['followers', 'following'].includes(activeTab);

  const list = Array.isArray(items) ? items : items?.data || [];

  if (!list.length) {
    return <div className={styles.empty}>No items to display.</div>;
  }

  return (
    <div className={styles.list}>
      {isRecipeTab &&
        list.map(recipe => (
          <RecipePreview
            key={recipe._id || recipe.id}
            recipe={recipe}
            listType={activeTab}
            isOwnProfile={activeTab === 'my-recipes'}
          />
        ))}

      {isUserTab &&
        list.map(user => (
          <UserCard
            key={user._id || user.id}
            user={user}
            activeTab={activeTab}
          />
        ))}
    </div>
  );
};

export default ListItems;
