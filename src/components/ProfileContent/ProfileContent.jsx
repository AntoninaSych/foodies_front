import { useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import { useParams } from 'react-router-dom';
import TabsList from '../TabsList/TabsList';
import ListItems from '../ListItems/ListItems';
import { useEffect, useState } from 'react';
import {
  getFavoritesApi,
  recipesFetch,
  recipesOwnFetch,
} from '../../api/recipesApi';
import {
  fetchCurrentUserFollowing,
  fetchCurrentUserFollowers,
  fetchUserFollowers,
} from '../../api/authApi';
import { errorHandler } from '../../utils/notification';
import { TABS } from '../TabsList/const';
import { selectToken, selectUser } from '../../redux/auth/selectors';
import { CATALOG_LIMIT } from '../../const';

const ProfileContent = () => {
  const { id: userId } = useParams();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const authUser = useSelector(selectUser);
  const token = useSelector(selectToken);
  const [currentTab, setCurrentTab] = useState();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const limit = isMobile ? 8 : CATALOG_LIMIT;
  const current = authUser.id === userId;

  useEffect(() => {
    const fetchData = async () => {
      console.log('currentTab', currentTab);
      try {
        switch (currentTab) {
          case TABS.MY_RECIPES: {
            const { items } = await recipesOwnFetch(token, {
              page,
              limit,
            });
            setItems(items);
            break;
          }
          case TABS.RECIPES: {
            if (userId) {
              const { items } = await recipesFetch({
                page,
                limit,
                owner: userId,
              });
              setItems(items);
            }
            break;
          }

          case TABS.FAVORITES: {
            const response = await getFavoritesApi(token, {
              page,
              limit,
            });
            setItems(response);
            break;
          }

          case TABS.MY_FOLLOWERS: {
            const response = await fetchCurrentUserFollowers(token, {
              page,
              limit,
            });
            setItems(response);
            break;
          }

          case TABS.FOLLOWING: {
            const response = await fetchCurrentUserFollowing(token, {
              page,
              limit,
            });
            setItems(response);
            break;
          }

          case TABS.FOLLOWERS: {
            if (userId) {
              const response = await fetchUserFollowers(token, userId, {
                page,
                limit,
              });
              setItems(response);
            }
            break;
          }

          default: {
            setItems([]);
          }
        }
      } catch (error) {
        errorHandler(error, 'Error while fetching data.');
      }
    };
    if (currentTab) {
      fetchData();
    }
  }, [userId, limit, page, token, currentTab]);

  useEffect(() => {
    if (userId && authUser) {
      const tab = authUser.id === userId ? TABS.MY_RECIPES : TABS.RECIPES;
      setCurrentTab(tab);
    }
  }, [authUser, userId]);

  const handleOnTabChange = tab => {
    setCurrentTab(tab);
    setPage(1);
  };

  return (
    <div>
      <TabsList currentTab={currentTab} onChange={handleOnTabChange} />
      <ListItems isOwnProfile={current} currentTab={currentTab} items={items} />
    </div>
  );
};

export default ProfileContent;
