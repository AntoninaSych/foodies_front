import RecipePreview from '../RecipePreview/RecipePreview';
import UserCard from '../UserCard/UserCard';
import styles from './ListItems.module.css';

const ListItems = ({ currentTab, items = [] }) => {
  const isRecipeTab = ['my-recipes', 'my-favorites'].includes(currentTab);
  const isUserTab = ['followers', 'following'].includes(currentTab);

  if (!items || items.length === 0) {
    return <div className={styles.empty}>No items to display.</div>;
  }

  return (
    <div className={styles.list}>
      {isRecipeTab &&
        items.map(recipe => (
          <RecipePreview
            key={recipe._id || recipe.id}
            recipe={recipe}
            listType={currentTab === 'my-favorites' ? 'favorites' : 'recipes'}
            isOwnProfile={currentTab === 'my-recipes'}
          />
        ))}

      {isUserTab &&
        items.map(user => (
          <UserCard
            key={user._id || user.id}
            user={user}
            currentTab={currentTab}
          />
        ))}
    </div>
  );
};

export default ListItems;
